import express from "express";
import { getCustomers, deleteUser } from "../controllers/client.js";

const router = express.Router();

router.get("/customers", getCustomers);
router.delete("/user/:id", deleteUser);

export default router;
