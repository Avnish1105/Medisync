import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctormodel.js';
import appointmentModel from '../models/appointmentmodel.js';

// API to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please fill all the fields" });
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "Email already registered" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const userData = { name, email, password: hashedPassword };
        const newUser = new userModel(userData);
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        // userId is set by auth middleware (from token)
        const userId = req.userId || req.body.userId;
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

// API to update user profile data
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        // Individual field validation with specific messages
        if (!name || !name.trim()) {
            return res.json({ success: false, message: "Name is required" });
        }
        if (!phone || !phone.trim()) {
            return res.json({ success: false, message: "Phone is required" });
        }
        if (!/^\d{10}$/.test(phone)) {
            return res.json({ success: false, message: "Please enter a valid 10-digit phone number" });
        }
        if (!gender || !gender.trim()) {
            return res.json({ success: false, message: "Gender is required" });
        }
        if (!dob || !dob.trim()) {
            return res.json({ success: false, message: "Date of birth is required" });
        }
        if (isNaN(Date.parse(dob))) {
            return res.json({ success: false, message: "Please select a valid date of birth" });
        }

        // Address: parse if string, allow empty lines
        let parsedAddress = address;
        if (address && typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address);
                // Remove empty lines from address object
                if (parsedAddress && typeof parsedAddress === "object") {
                    if (!parsedAddress.line1?.trim()) delete parsedAddress.line1;
                    if (!parsedAddress.line2?.trim()) delete parsedAddress.line2;
                }
            } catch (err) {
                return res.json({ success: false, message: "Address is not valid JSON" });
            }
        }

        await userModel.findByIdAndUpdate(userId, {
            name,
            phone,
            address: parsedAddress,
            dob,
            gender
        });

        if (imageFile) {
            // Upload image to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
        }

        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

//API to book an appointment
const bookAppointment = async (req, res) => {
    try{
        const {userId, docId, slotDate, slotTime} = req.body;

        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({success: false, message: "Doctor is not available for booking"});

        }

        let slots_booked = docData.slots_booked;

        //checking for slot availability
        if (slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success: false, message: "Slot not available"});
            }

            else{
                slots_booked[slotDate].push(slotTime);
            }
        } else{
           slots_booked[slotDate] = [];
              slots_booked[slotDate].push(slotTime); 
        }

        const userData = await userModel.findById(userId).select('-password');

        delete docData.slots_booked;

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        //save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });   
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment };