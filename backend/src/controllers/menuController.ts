import { Request, Response } from "express";
import { menuService } from "../services/menuService";

export const menuController = {
  async createMenu(req: Request, res: Response) {
    try {
      const { name, content, type, options } = req.body;
      if (!name || !content || !options || !Array.isArray(options)) {
        return res.status(400).json({ message: "Parâmetros inválidos" });
      }

      const menu = await menuService.createMenu({
        name,
        content,
        type,
        options,
      });

      const responseData = {
        id: menu.id,
        name: menu.name,
        content: menu.content,
        type: menu.type,
        options: menu.options.map((option) => ({
          id: option.id,
          title: option.title,
          value: option.value,
          response: {
            id: option.menuResponse.id,
            responseType: option.menuResponse.responseType,
            content: option.menuResponse.content,
          },
        })),
      };

      return res.status(201).json(responseData);
    } catch (error) {
      console.error("Error creating menu:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getMenuIdDetails(req: Request, res: Response) {
    console.log("getMenuIdDetails");
    try {
      const id = parseInt(req.params.id, 10);
      const menu = await menuService.getMenuIdDetail(id);
      if (menu) {
        res.status(200).json(menu);
      } else {
        res.status(404).json({ message: "Menu not found" });
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getMenu(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const menu = await menuService.getMenu(id);
      if (menu) {
        res.status(200).json(menu);
      } else {
        res.status(404).json({ message: "Menu not found" });
      }
    } catch (error) {
      console.error("Error fetching menu:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async updateMenu(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const { name, content, type, options } = req.body;

      const updatedMenu = await menuService.updateMenu(id, {
        name,
        content,
        type,
        options,
      });
      if (updatedMenu) {
        res.status(200).json(updatedMenu);
      } else {
        res.status(404).json({ message: "Menu not found" });
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async deleteMenu(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      const success = await menuService.deleteMenu(id);
      if (success) {
        res.status(200).json({ message: "Menu deletado com sucesso" });
      } else {
        res.status(404).json({ message: "Menu not found" });
      }
    } catch (error) {
      console.error("Error deleting menu:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getAllMenus(req: Request, res: Response) {
    try {
      const menus = await menuService.getAllMenus();
      res.status(200).json(menus);
    } catch (error) {
      console.error("Error fetching menus:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },

  async getLatestMenu(req: Request, res: Response) {
    try {
      const menus = await menuService.getLatestMenu();
      res.status(200).json(menus);
    } catch (error) {
      console.error("Error fetching menus:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
