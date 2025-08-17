import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoutes from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.get('/', (req, res) => { 
  console.log('Root endpoint hit');
  res.send('API working aa');
});
app.use('/api/admin', adminRoutes);
app.use('/api/doctor', doctorRouter);
app.use('/api/user', userRouter);

// Error handling middleware (optional, for better logging)
app.use((err, req, res, next) => {
  console.error('Global error:', err);
  res.status(500).json({ success: false, message: err.message });
});

//localhost:4000/api/admin/add-doctor
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});