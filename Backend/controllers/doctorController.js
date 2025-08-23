import doctorModel from "../models/doctormodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Use bcryptjs for consistency

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;

        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: "Doctor's availability changed successfully" });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email']);
        res.json({ success: true, doctors });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email });
        if (!doctor) {
            return res.status(401).json({ success: false, message: "Doctor not found" });
        }
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { doctorId: doctor._id, email: doctor.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.json({
            success: true,
            token,
            doctor: {
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                speciality: doctor.speciality,
                image: doctor.image,
                available: doctor.available
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { changeAvailability, doctorList, doctorLogin };