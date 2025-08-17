import express from 'express';
import { addDoctor, allDoctors, loginAdmin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/authAdmin.js'; // <-- updated import
import { changeAvailability } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.post('/login', loginAdmin);
router.post('/all-doctors', authAdmin, allDoctors);
router.post('/change-availability', authAdmin, changeAvailability);

export default router;
