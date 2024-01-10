import express from "express"
import controller from "../controllers/controller.js";
import authenticate from "../middleware/authenticate.js";

const router = new express.Router();

router.get("/" ,controller.home )
router.post("/login",controller.login)
router.post("/register",controller.inserOne )
router.get("/validuser", authenticate , controller.dashboard )

export default router ;