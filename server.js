import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import mongoose from 'mongoose'
// import router from './Routes/Router.js';
import data from './data.js';
const app = express();
const port = process.env.PORT || 5000
dotenv.config();
app.use(cors({
    origin: "http://localhost:3000", //react location
    credentials: true
}));
app.use(helmet());
app.use(morgan('common'));
mongoose.connect(process.env.MongoDB_URL,{
    useNewUrlParser:true
}).then(() => {
    app.listen(port,() => {
        console.log(`Successfully started at http://localhost:${port}`)
    })
}).catch((err) => {
    console.log(err)
});
app.get('/api/products',(req,res) => {
    res.send(data.products)
}
)
app.use(express.json())
// app.use('/api/auth', router);