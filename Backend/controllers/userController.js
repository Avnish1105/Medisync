import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctormodel.js';
import appointmentModel from '../models/appointmentmodel.js';
import mongoose from 'mongoose';

// API to register a new user
const registerUser = async (req, res) => {
    try {
        console.log("Register request body:", req.body);
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
        console.error("Register error:", error);
        res.json({ success: false, message: error.message });
    }
}

// API for user login
const loginUser = async (req, res) => {
    try {
        console.log("Login request body:", req.body);
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
        console.error("Login error:", error);
        res.json({ success: false, message: error.message });
    }
}

// API to get user profile data
const getProfile = async (req, res) => {
    try {
        console.log("Get profile for userId:", req.userId || req.body.userId);
        // userId is set by auth middleware (from token)
        const userId = req.userId || req.body.userId;
        const userData = await userModel.findById(userId).select('-password');
        res.json({ success: true, userData });
    } catch (error) {
        console.error("Get profile error:", error);
        res.json({ success: false, message: error.message });
    }
}

// API to update user profile data
const updateProfile = async (req, res) => {
    try {
        console.log("Update profile request body:", req.body);
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
        console.error("Update profile error:", error);
        res.json({ success: false, message: error.message });
    }
}

// API to book an appointment
const bookAppointment = async (req, res) => {
    try {
        console.log("Book appointment request body:", req.body);
        let { userId, docId, slotDate, slotTime } = req.body;

        // Convert IDs to ObjectId
        if (!mongoose.Types.ObjectId.isValid(docId)) {
            return res.json({ success: false, message: "Invalid doctor ID" });
        }
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: "Invalid user ID" });
        }
        docId = new mongoose.Types.ObjectId(docId);
        userId = new mongoose.Types.ObjectId(userId);

        const docData = await doctorModel.findById(docId).select('-password');
        if (!docData) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        if (!docData.available) {
            return res.json({ success: false, message: "Doctor is not available for booking" });
        }

        let slots_booked = docData.slots_booked || {};

        // Check for slot availability
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot not available" });
            } else {
                slots_booked[slotDate].push(slotTime);
            }
        } else {
            slots_booked[slotDate] = [slotTime];
        }

        const userData = await userModel.findById(userId).select('-password');

        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: new Date()
        };

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        // Save new slots data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully", appointment: newAppointment });
        console.log("Appointment booked for userId:", userId, "docId:", docId, "slot:", slotDate, slotTime);
    } catch (error) {
        console.error("Book appointment error:", error);
        res.json({ success: false, message: error.message });
    }
};

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {
    try {
        console.log("List appointments for userId:", req.userId || (req.body && req.body.userId));
        // For GET, userId is set by authUser middleware on req.body.userId and/or req.userId
        const userId = req.userId || (req.body && req.body.userId);
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.json({ success: false, message: "Invalid user ID" });
        }
        const appointments = await appointmentModel.find({ userId: new mongoose.Types.ObjectId(userId) });
        res.json({ success: true, appointments });
    } catch (error) {
        console.error("List appointments error:", error);
        res.json({ success: false, message: error.message });
    }
};

//API to cancel an appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);
        if (!appointmentData) {
            return res.json({ success: false, message: "Appointment not found" });
        }
        // Verify the appointment user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({ success: false, message: "You are not authorized to cancel this appointment" });
        }
        if (appointmentData.cancelled) {
            return res.json({ success: false, message: "Appointment already cancelled" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Releasing the doctor's slot
        const { docId, slotDate, slotTime } = appointmentData;
        const doctorData = await doctorModel.findById(docId);
        if (!doctorData) {
            return res.json({ success: false, message: "Doctor not found" });
        }

        let slots_booked = doctorData.slots_booked || {};
        if (slots_booked[slotDate]) {
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
            // Remove the date key if no slots left for that date
            if (slots_booked[slotDate].length === 0) {
                delete slots_booked[slotDate];
            }
        }

        await doctorModel.findByIdAndUpdate(docId, { slots_booked });

        res.json({ success: true, message: "Appointment cancelled successfully" });
    } catch (error) {
        console.error("Cancel appointment error:", error);
        res.json({ success: false, message: error.message });
    }
};

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment };