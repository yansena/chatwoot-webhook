import { Router } from "express";
import { menuController } from "../controllers/menuController";
import { messageController } from "../controllers/messageController";
import { webhookController } from "../controllers/webhookController";

const router = Router();

// router.post("/menu", menuController);
// router.post("/messages", messageController);
router.post("/webhook", webhookController.handleWebhook);

export default router;
