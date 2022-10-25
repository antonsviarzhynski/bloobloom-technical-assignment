import { GLASSES } from "~/core/models/glasses.model";

export interface MenuItem {
  id: number;
  name: string;
  configuration_name: string;
}

export interface Menu {
  collections: MenuItem[];
  meta: {
    total_count: number;
  };
}

let menuIndex = 0;

export class MenuItemModel {
  items!: MenuItem[];
  index!: number;
  name!: GLASSES | string;

  constructor(name: GLASSES | string, items: MenuItem[]) {
    let menuItems;

    if (name !== null) {
      menuItems = items
        .filter((item) => item.configuration_name.includes(name))
        .map((item) => ({ ...item, name: item.name.split(" ")[1] }));
    }

    const model = {
      items: menuItems,
      index: menuIndex,
      name,
    } as MenuItemModel;

    menuIndex += 1;

    return model;
  }

  static resetMenuIndex() {
    menuIndex = 0;
  }
}
