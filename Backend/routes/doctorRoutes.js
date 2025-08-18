import express from 'express';
import { doctorList } from '../controllers/doctorController.js';
import doctorModel from '../models/doctormodel.js'; // Add this import
const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);

// Add this route to get doctor details by ID
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