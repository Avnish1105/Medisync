import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoutes from './routes/adminRoutes.js';

// App config
const app = express();
const PORT = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json()); // Add this line for JSON body parsing
app.use(cors());

// API endpoints
app.get('/', (req, res) => { res.send('API working aa') });
app.use('/api/admin', adminRoutes);
//localhost:4000/api/admin/add-doctor
app.listen(PORT, () => {
  console.log(`Server is running on port${PORT}`);
});