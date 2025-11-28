import express from "express";
import {
  customerLogin,
  getAllCustomers
} from "../controllers/customerController.ts";

const router = express.Router();

router.post("/login", customerLogin);
router.get("/", getAllCustomers);


export default router;
