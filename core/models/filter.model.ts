export interface FilterOption {
  name: string;
  selected: boolean;
  id: string;
}

export interface FilterPanelModel {
  name: string,
  options: FilterOption[]
  id: string;
}

export interface ToggledFilter {
  filterId: string;
  optionId: string;
}
