import validator from "validator";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctormodel.js";

//API for adding doctor
const addDoctor = async(req,res) => {
    try {
        console.log('BODY:', req.body);
        console.log('FILE:', req.file);
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file;

        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
            return res.status(400).json({ error: "All fields are required" });
        }

        //validating email
        if(!validator.isEmail(email)) {
            return res.status(400).json({ error: "Invalid email format" });
        }

        //validating password
        if(password.length < 8) {
            return res.status(400).json({ error: "Please enter a strong password" });
        }
        
        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Uploading image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"});
        const imageUrl = imageUpload.secure_url;

        let parsedAddress = address;
        try {
            if (typeof address === "string") {
                parsedAddress = JSON.parse(address);
            }
        } catch (e) {
            return res.status(400).json({ error: "Invalid address format" });
        }

        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: parsedAddress,
            date: Date.now(),
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success: true, message: "Doctor added successfully", imageUrl});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export {addDoctor};