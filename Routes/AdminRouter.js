import express from "express";
import { Fetch_Reviews, Delete_Review } from "../Controllers/AdminController.js";
const Router = express.Router();
import { auth, isAdmin } from "../Middlewares/Auth.js";



Router.get("/reviews", auth, isAdmin, Fetch_Reviews);
Router.delete("/delete-review/:id", auth, isAdmin, Delete_Review);


export default Router;
