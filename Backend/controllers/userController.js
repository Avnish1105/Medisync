import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';
import {v2 as cloudinary} from 'cloudinary';

// API to register a new user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log('Received registration request:', { name, email });

        if (!name || !email || !password) {
            console.log('Missing fields');
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        if (!validator.isEmail(email)) {
            console.log('Invalid email:', email);
            return res.json({ success: false, message: "Please enter a valid email address" });
        }

        if (password.length < 8) {
            console.log('Password too short');
            return res.json({ success: false, message: "Password must be at least 8 characters long" });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log('Email already registered:', email);
            return res.json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedPassword
        };

        const newUser = new userModel(userData);
        const user = await newUser.save();
        console.log('New user registered:', user);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.json({ success: true, token });

    } catch (error) {
        console.log('Error in registerUser:', error);
        res.json({ success: false, message: error.message });
    }
}

//API for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email });

        const user = await userModel.findOne({ email });

        if (!user) {
            console.log('User not found:', email);
            return res.json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            console.log('Login successful for:', email);
            res.json({ success: true, token });
        } else {
            console.log('Invalid credentials for:', email);
            res.json({ success: false, message: "Invalid credentials" });
        }
    }
    catch (error) {
        console.log('Error in loginUser:', error);
        res.json({ success: false, message: error.message });
    }
}

//API to  get user profile data
const getProfile = async (req, res) => {
    try{
        const {userId} = req.body;
        const userData = await userModel.findById(userId).select('-password');

        res.json({ success: true, userData });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}

//API to update user profile data
const updateProfile = async (req, res) => {
    try {
        const { userId, name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            console.log('Profile update failed: Missing fields');
            return res.json({ success: false, message: "Please fill all the fields" });
        }

        let parsedAddress = address;
        if (address && typeof address === "string") {
            try {
                parsedAddress = JSON.parse(address);
                console.log('Parsed address:', parsedAddress);
            } catch (err) {
                console.log('Profile update failed: Address is not valid JSON');
                return res.json({ success: false, message: "Address is not valid JSON" });
            }
        }

        await userModel.findByIdAndUpdate(userId, { name, phone, address: parsedAddress, dob, gender });
        console.log(`Profile updated for userId: ${userId}`);
        console.log('Updated fields:', { name, phone, address: parsedAddress, dob, gender });

        if (imageFile) {
            //Upload image to cloudinary
            const imaageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
            const imageUrl = imaageUpload.secure_url;
            await userModel.findByIdAndUpdate(userId, { image: imageUrl });
            console.log('Profile image updated:', imageUrl);
        }

        res.json({ success: true, message: "Profile updated successfully" });

    } catch (error) {
        console.log('Error in updateProfile:', error);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, getProfile, updateProfile };