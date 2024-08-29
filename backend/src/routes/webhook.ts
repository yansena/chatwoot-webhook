import { Router } from "express";
import { menuController } from "../controllers/webhookController";

const router = Router();

router.post("/create-message", menuController);

export default router;
