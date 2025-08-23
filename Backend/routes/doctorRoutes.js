import express from 'express';
import { doctorList, doctorLogin } from '../controllers/doctorController.js'; // <-- use doctorLogin
import doctorModel from '../models/doctormodel.js';
const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', doctorLogin); // <-- use doctorLogin

// Get doctor details by ID
doctorRouter.get('/:id', async (req, res) => {
  try {
    const doctor = await doctorModel.findById(req.params.id);
    if (!doctor) return res.json({ success: false, message: "Doctor not found" });
    res.json({ success: true, doctor });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

export default doctorRouter;