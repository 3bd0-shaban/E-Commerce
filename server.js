import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import errorMiddleware from './Middlewares/Error.js';
import UsersRouter from './Routes/UsersRouter.js';
import CategoryRouter from './Routes/CategoryRouter.js';
import ProductsRouter from './Routes/ProductsRouter.js';
import BannersRouter from './Routes/BannersRouter.js';
import CartRouter from './Routes/CartRouter.js';
import OrdersRouter from './Routes/OrdersRouter.js';
import IsssesRouter from './Routes/IssessRouter.js'
import ReviewsRouter from './Routes/ReviewsRouter.js'
import WhiteListRouter from './Routes/WhiteListRoter.js'
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
app.use(fileUpload({ useTempFiles: true }))
mongoose.connect(process.env.MongoDB_URL)
    .then(() => {
        app.listen(port, () => {
            console.log(`Successfully started at http://localhost:${port}`)
        })
    }).catch((err) => {
        console.log(err)
    });
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(errorMiddleware)
app.use('/api/auth', UsersRouter);
app.use('/api/banner', BannersRouter);
app.use('/api/upload', ProductsRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', OrdersRouter);
app.use('/api/issess', IsssesRouter);
app.use('/api/review', ReviewsRouter);
app.use('/api/whitelist', WhiteListRouter);