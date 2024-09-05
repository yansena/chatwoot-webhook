import { Router } from "express";
import { menuController } from "../controllers/menuController";

const router = Router();

router.get("/", menuController.getLatestMenus);

router.get("/all", menuController.getAllMenus);

router.get("/detail/:id", menuController.getMenuIdDetails);

// Criação de um novo menu
router.post("/create", menuController.createMenu);

// Recupera um menu específico por ID
router.get("/:id", menuController.getMenu);

// Atualiza um menu existente
router.put("/:id", menuController.updateMenu);

// Deleta um menu
router.delete("/:id", menuController.deleteMenu);

// Recupera todos os menus

export default router;
