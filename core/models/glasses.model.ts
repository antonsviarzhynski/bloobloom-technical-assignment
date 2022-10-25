export enum GLASSES {
  Spectacles = 'spectacles',
  Sunglasses = 'sunglasses'
}

export interface CostBreakdown {
  id: number;
  materials: number;
  labour: number;
  transport: number;
  taxes: number;
  bloobloom_price: number;
  retail_price: number;
}

export interface Medium {
  id: number;
  medium_type: string;
  mime_type: string;
  file_location: string;
  file_name: string;
  original_file_name: string;
  size: number;
  url: string;
  position: number;
}

export interface Colour {
  id: number;
  name: string;
  media: Medium[];
}

export interface FrameVariant {
  id: number;
  name: string;
  configuration_name: string;
  barcode?: any;
  harmonized_system_code?: any;
  stock_keeping_unit?: any;
  status: string;
  colour: Colour;
}

export interface Medium2 {
  id: number;
  medium_type: string;
  mime_type: string;
  file_location: string;
  file_name: string;
  original_file_name: string;
  size: number;
  url: string;
  position: number;
}

export interface GlassVariant {
  id: number;
  barcode?: any;
  harmonized_system_code?: any;
  stock_keeping_unit?: any;
  inventory: boolean;
  home_trial_available: boolean;
  price: number;
  default_glass_variant: boolean;
  frame_variant: FrameVariant;
  media: Medium2[];
}

export interface Glass {
  id: number;
  name: string;
  configuration_name: string;
  default_collection_name?: any;
  cost_breakdown: CostBreakdown;
  glass_variants: GlassVariant[];
}

export interface Meta {
  total_count: number;
}

export interface GlassesResponse {
  glasses: Glass[];
  meta: Meta;
}

export interface GlassesModel {
  name: string;
  image: string | undefined;
  id: string;
}

export interface GlassesQueryParams {
  pageNumber: number;
  pageLimit: number;
  shapes: string[];
  colours: string[];
}

export interface GlassesParams extends GlassesQueryParams {
  collectionType: string
}
