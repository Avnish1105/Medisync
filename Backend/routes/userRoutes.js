import express from 'express';
import { registerUser,loginUser, getProfile,updateProfile } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';
import upload from '../middleware/multer.js';


const userRouter = express.Router();


userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.get('/get-profile',authUser ,getProfile); // Added route to get user profile
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile); // Added route to update user profile
export default userRouter;