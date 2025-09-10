import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import cartrouter from './routes/cartRoute.js';
import orderRoutes from './routes/orderRoutes.js';
dotenv.config()
let app = express();
let PORT = process.env.PORT || 8000;

app.use(cookieParser());
app.use(cors({
  origin: [`http://localhost:5173`, `http://localhost:5174`],
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartrouter);
app.use('/api/orders', orderRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(8000, () => {
  console.log('Server is running on port 8000');
  connectDB();// Connect to MongoDB when the server starts
});
