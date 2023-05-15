import express from "express";
import {
    Upload_Category,
    Update_Category,
    Delete_Category,
    Get_All_Category,
    Get_Spicific_Category,
} from "../Controllers/CategoryController.js";
import { auth, isAdmin } from "../Middlewares/Auth.js";
const Router = express.Router();

Router.get("/", Get_All_Category);
Router.get("/:id", Get_Spicific_Category);
Router.post("/", auth, isAdmin, Upload_Category);
Router.put("/:id", auth, isAdmin, Update_Category);
Router.delete("/:id", auth, isAdmin, Delete_Category);
export default Router;
