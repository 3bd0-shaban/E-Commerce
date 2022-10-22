import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import router from './Routes/Router.js';
import ProductsRouter from './Routes/ProductsRouter.js';
const app = express();
const port = process.env.PORT || 5000
dotenv.config();
app.use(cors({
    origin: "http://localhost:3000", 
    credentials: true
}));
app.use(cookieParser());
app.use(helmet());
app.use(morgan('common'));
mongoose.connect(process.env.MongoDB_URL).then(() => {
    app.listen(port, () => {
        console.log(`Successfully started at http://localhost:${port}`)
    })
}).catch((err) => {
    console.log(err)
});

app.use(express.json())
app.use('/api/auth', router);
app.use('/api/upload', ProductsRouter);