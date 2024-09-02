import { AppDataSource } from "../data-source";
import { ReturnMenuResponseDTO } from "../dtos";
import { MenuOption } from "../entities/MenuOption";
import { MenuResponses } from "../entities/MenuResponses";


export const menuResponseService = {
  async getResponse(value: string, menu_id: number): Promise<ReturnMenuResponseDTO | null> {
    const menuResponseRepository = AppDataSource.getRepository(MenuResponses);

    const menuResponse = await menuResponseRepository.findOne({
      where: { value, menuOption: { menu: { id: menu_id } } },
    })

    if (!menuResponse) {
      throw new Error('Response not found');
    }


    const tranformedResponse = menuResponse.responseType ===
      "article" ? {
      content: menuResponse.content.items[0].title,
      content_type: menuResponse.responseType,
      content_attributes: {
        items: menuResponse.content.items.map((item: any) => ({
          title: item.title,
          description: item.description,
          link: item.link,
        })),
      },
      private: false,
    } : {
      content: menuResponse.content,
      content_type: menuResponse.responseType,
      private: false,
    }

    return tranformedResponse;
  }
}
