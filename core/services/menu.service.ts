import { Menu, MenuItem, MenuItemModel } from "~/core/models/menu.model";
import { GLASSES } from "~/core/models/glasses.model";
import {
  HOME_TRY_MENU_LABEL,
  PAIR_FOR_PAIR_MENU_LABEL,
} from "~/core/constants/menu.constants";
import { MENU_ITEMS_API } from "~/core/constants/api.constants";

let menuIndex = 0;

export class MenuService {
  async fetchMenuItems(): Promise<MenuItem[]> {
    try {
      const { collections } = await fetch(MENU_ITEMS_API).then(
        (res) => res.json() as unknown as Menu
      );

      return collections;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  createMenuItemsModel(items: MenuItem[]) {
    MenuItemModel.resetMenuIndex();

    const spectaclesMenuItem = new MenuItemModel(GLASSES.Spectacles, items);
    const sunglassesMenuItem = new MenuItemModel(GLASSES.Sunglasses, items);
    const homeTryMenuItem = new MenuItemModel(HOME_TRY_MENU_LABEL, []);
    const p4pMenuItem = new MenuItemModel(PAIR_FOR_PAIR_MENU_LABEL, []);

    const menuItems: MenuItemModel[] = [
      spectaclesMenuItem,
      sunglassesMenuItem,
      homeTryMenuItem,
      p4pMenuItem,
    ];

    return menuItems;
  }

  static resetMenuIndex() {
    menuIndex = 0;
  }
}
