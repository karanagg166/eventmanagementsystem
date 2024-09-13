import express from 'express';
import dotenv from 'dotenv';
import AuthRoutes from './Routes/AuthRoutes.js';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import path, { dirname } from "path";
const __dirname = path.resolve();
    dotenv.config()
    const app = express();
    app.use(cors({
        origin: ['http://localhost:5173'],
        credentials: true
    }))
// Database Connection
 mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log('Database Connected'))
 .catch((err) => console.log('Database not Connected', err))

// Middleware 

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}));
app.use('/api/Auth',AuthRoutes);
app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve index.html for all non-API routes (optional, if serving React app)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
const port = process.env.PORT || 7000;

app.listen(port, () => {
    console.log(`listening on port of ${port}`);
} )