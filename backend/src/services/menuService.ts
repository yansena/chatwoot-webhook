import { Menu } from "../entities/Menu";
import { MenuOption } from "../entities/MenuOption";
import { AppDataSource } from "../data-source";
import { MenuResponses } from "../entities/MenuResponses";
import { CreateMenuDTO, ReturnMenuDTO } from "../dtos";

export const menuService = {
  async createMenu(data: CreateMenuDTO): Promise<Menu> {
    const menuRepository = AppDataSource.getRepository(Menu);
    const menuOptionRepository = AppDataSource.getRepository(MenuOption);
    const menuResponseRepository = AppDataSource.getRepository(MenuResponses);

    const menu = new Menu();
    menu.name = data.name;
    menu.content = data.content;
    menu.type = data.type || "input_select";

    menu.options = [];

    for (const optionData of data.options) {
      const option = new MenuOption();
      option.title = optionData.title;
      option.value = optionData.value;

      const savedOtion = await menuOptionRepository.save(option);

      const response = new MenuResponses();
      response.responseType = optionData.response.responseType;
      if (optionData.response.responseType === "article") {
        response.content = {
          items: optionData.response.content.items.map((item: any) => ({
            title: item.title,
            description: item.description,
            link: item.link,
          })),
        };
      } else {
        response.content = optionData.response.content;
      }
      response.menuOption = savedOtion;
      response.value = savedOtion.value;

      const savedResponse = await menuResponseRepository.save(response);

      savedOtion.menuResponse = savedResponse;
      await menuOptionRepository.save(savedOtion);

      menu.options.push(savedOtion);
    }

    return await menuRepository.save(menu);
  },

  async getMenu(id: number): Promise<ReturnMenuDTO | null> {
    const menuRepository = AppDataSource.getRepository(Menu);
    const menu = await menuRepository.findOne({
      where: { id },
      relations: ["options", "options.menuResponse"],
    });

    if (!menu) {
      throw new Error("Menu not found");
    }

    const transformedMenu = {
      content: menu.content,
      content_type: menu.type,
      content_attributes: {
        items: menu.options.map((option) => ({
          title: option.title,
          value: option.value,
        })),
      },
      private: false,
    };

    return transformedMenu;
  },

  async getMenuByName(name: string): Promise<Menu | null> {
    const menuRepository = AppDataSource.getRepository(Menu);
    return await menuRepository.findOne({
      where: { name },
    });
  },

  async updateMenu(
    id: number,
    data: Partial<CreateMenuDTO>,
  ): Promise<Menu | null> {
    const menuRepository = AppDataSource.getRepository(Menu);

    const menu = await menuRepository.findOne({
      where: { id },
      relations: ["options"],
    });

    if (!menu) {
      return null;
    }

    menu.name = data.name ?? menu.name;
    menu.content = data.content ?? menu.content;
    menu.type = data.type ?? menu.type;

    if (data.options) {
      menu.options = data.options.map((optionData) => {
        const option = new MenuOption();
        option.title = optionData.title;
        option.value = optionData.value;
        return option;
      });
    }

    return await menuRepository.save(menu);
  },

  async deleteMenu(id: number): Promise<boolean> {
    const menuRepository = AppDataSource.getRepository(Menu);
    const result = await menuRepository.delete(id);
    return (result.affected ?? 0) > 0;
  },

  async getAllMenus(): Promise<Menu[]> {
    const menuRepository = AppDataSource.getRepository(Menu);
    return await menuRepository.find({
      relations: ["options", "options.menuResponse"],
    });
  },

  async getLatestMenu(): Promise<Menu[]> {
    const menuRepository = AppDataSource.getRepository(Menu);
    return await menuRepository.find({
      order: {
        id: "DESC",
      },
      take: 1, // Limit the results to 1 (the latest one)
    });
  },
};
