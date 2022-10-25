const STAGING_BASE_API = "https://staging-api.bloobloom.com";
const PRODUCTION_BASE_API = "https://api.bloobloom.com";

export const MENU_ITEMS_API = `${STAGING_BASE_API}/user/v1/sales_channels/website/collections`;
export const COLLECTION_LIST_API_BY_TYPE = (collectionType: string) =>
  `${PRODUCTION_BASE_API}/user/v1/sales_channels/website/collections/${collectionType}/glasses`;
