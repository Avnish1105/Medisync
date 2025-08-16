import express from 'express';
import { addDoctor,loginAdmin } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import authAdmin from '../middleware/allAdmin.js';

const router = express.Router();

router.post('/add-doctor', authAdmin,upload.single('image'), addDoctor);
router.post('/login', loginAdmin);

export default router;
