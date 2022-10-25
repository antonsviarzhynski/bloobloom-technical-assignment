export const COLOUR_FILTERS = [
  "black",
  "tortoise",
  "coloured",
  "crystal",
  "dark",
  "bright",
];

export const SHAPE_FILTERS = [
  "square",
  "rectangle",
  "round",
  "cat-eye",
];

export const FILTERS_THROTTLE_TIME = 1000;

export const FILTERS_QUERY_PARAMS = {
  PAGE_LIMIT: 'page[limit]=',
  PAGE_NUMBER: 'page[number]=',
  SHAPE: 'filters[glass_variant_frame_variant_frame_tag_configuration_names][]=',
  COLOUR: 'filters[glass_variant_frame_variant_colour_tag_configuration_names][]='
}
