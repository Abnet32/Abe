import express from "express";
import {
  registerCustomer,
  customerLogin,
} from "../controllers/customerController.ts";

const router = express.Router();

router.post("/login", customerLogin);
router.post("/register", registerCustomer);

export default router;
