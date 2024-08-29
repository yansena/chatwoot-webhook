import { Router } from "express";
import { menuController } from "../controllers/menuController";
import { messageController } from "../controllers/messageController";

const router = Router();

router.post("/menu", menuController);
router.post("/messages", messageController);
// router.post("/create-message", menuController);

export default router;
