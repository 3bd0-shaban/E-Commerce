import express from "express";
const Router = express.Router();
import { auth } from "../Middlewares/Auth.js";
import {
    Add_New_Cart,
    Find_Items_In_Cart,
    Delete_Specific_Item_In_Cart,
    Delete_All_Items_In_Cart,
    Increment,
    Decrement,
} from "../Controllers/CartController.js";

Router.post("/:product_Id", auth, Add_New_Cart);
Router.post("/increment/:product_Id", auth, Increment);
Router.post("/decrement/:product_Id", auth, Decrement);
Router.get("/", auth, Find_Items_In_Cart);
Router.post("/deleteall", auth, Delete_All_Items_In_Cart);
Router.post("/delete-single/:product_Id", auth, Delete_Specific_Item_In_Cart);

export default Router;
