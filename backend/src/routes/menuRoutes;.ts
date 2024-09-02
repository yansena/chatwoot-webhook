import { Router } from 'express';
import { menuController } from '../controllers/menuController';

const router = Router();

// Criação de um novo menu
router.post('/create', menuController.createMenu);

// Recupera um menu específico por ID
router.get('/:id', menuController.getMenu);

// Atualiza um menu existente
router.put('/:id', menuController.updateMenu);

// Deleta um menu
router.delete('/:id', menuController.deleteMenu);

// Recupera todos os menus
router.get('/', menuController.getAllMenus);

export default router;
