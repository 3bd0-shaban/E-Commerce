import express from "express";
const Router = express.Router();
import { auth, isAdmin } from "../Middlewares/Auth.js";
import {
  Add_New_Brand,
  Fetch_All_Brands,
  Get_Spicific_Brand,
  Delete_Brand,
  Update_Brand,
} from "./../Controllers/BrandController.js";

Router.post("/", Add_New_Brand);
Router.get("/", Fetch_All_Brands);
Router.get("/:id", Get_Spicific_Brand);
Router.delete("/:id", auth, isAdmin, Delete_Brand);
Router.put("/:id", auth, isAdmin, Update_Brand);

export default Router;
