import { FilterPanelModel } from "~/core/models/filter.model";
import { generateId } from "~/core/utils";
import { ToggledFilter } from "~/core/models/filter.model";
import {
  COLOUR_FILTERS,
  SHAPE_FILTERS,
} from "~/core/constants/filter.constants";

export class FilterService {
  private prepareOptions(options: string[]) {
    return options.map((option) => ({
      name: option,
      selected: false,
      id: generateId(),
    }));
  }

  getFilterPanels() {
    return [
      {
        name: "Colour",
        options: this.prepareOptions(COLOUR_FILTERS),
        id: generateId(),
      },
      {
        name: "Shape",
        options: this.prepareOptions(SHAPE_FILTERS),
        id: generateId(),
      },
    ] as FilterPanelModel[];
  }

  public handleToggledFilter (
    toggled: ToggledFilter,
    filterPanels: FilterPanelModel[]
  ) {
    const { filterId, optionId } = toggled;

    const panelIdx = filterPanels.findIndex(
      (filter: FilterPanelModel) => filter.id === filterId
    );

    if (panelIdx === -1) {
      return filterPanels;
    }

    const options = filterPanels[panelIdx].options;
    filterPanels[panelIdx].options = options.map((option) => ({
      ...option,
      selected: option.id === optionId ? !option.selected : option.selected,
    }));

    return filterPanels;
  }

  public getSelectedFilters(filters: FilterPanelModel[]): {
    colours: string[];
    shapes: string[];
  } {
    const [colours, shapes] = filters;

    const selectedColours = colours.options
      .filter((option) => option.selected)
      .map((option) => option.name);
    const selectedShapes = shapes.options
      .filter((option) => option.selected)
      .map((option) => option.name);

    return {
      colours: selectedColours,
      shapes: selectedShapes,
    };
  }
}
