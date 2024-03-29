import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import errorMiddleware from './Middlewares/Error.js';
import UsersRouter from './Routes/UsersRouter.js';
import CategoryRouter from './Routes/CategoryRouter.js';
import ProductsRouter from './Routes/ProductsRouter.js';
import BannersRouter from './Routes/BannersRouter.js';
import CartRouter from './Routes/CartRouter.js';
import OrdersRouter from './Routes/OrdersRouter.js';
import IsssesRouter from './Routes/IssessRouter.js';
import ReviewsRouter from './Routes/ReviewsRouter.js';
import WhiteListRouter from './Routes/WhiteListRoter.js';
import BrandRouter from './Routes/BrandRouter.js';
import AdminRouter from './Routes/AdminRouter.js';
import AllowedOrigins from "./Origins.js";
import SocketServer from "./SocketServer.js";
import { createServer } from 'http';
import { Server } from "socket.io";
import config from './config.js';
const app = express();
const http = createServer(app);

const port = config.PORT || 5000;
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://market-gcww.onrender.com/',
    ],
    credentials: true,
    origin: true
  })
);

// async function update() {
//   try {
//     const user = await Users.updateMany({}, { $set: { profilePicture: 'http://localhost:5000/images/default.png' } })
//     if (user) {
//       console.log('updated')
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }
// update()


app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
// app.use(fileUpload({ useTempFiles: true }));
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    http.listen(port, () => {
      console.log(`Successfully started at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
  const io = new Server(http, {
    cors: {
        origin: AllowedOrigins,
        credentials: true
    }
});
io.on('connection', (socket) => {
    SocketServer(socket);
});
app.get('/api/keys/paypal', (req, res) => {
  res.send(process.env.PayPal_Client_ID || "SB")
})
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/api/auth', UsersRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/banner', BannersRouter);
app.use('/api/product', ProductsRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/cart', CartRouter);
app.use('/api/order', OrdersRouter);
app.use('/api/issess', IsssesRouter);
app.use('/api/review', ReviewsRouter);
app.use('/api/whitelist', WhiteListRouter);
app.use('/api/brand', BrandRouter);
app.use(errorMiddleware);
