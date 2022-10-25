import {
  Glass,
  GlassesModel,
  GlassesParams,
  GlassesQueryParams,
  GlassesResponse,
} from "~/core/models/glasses.model";
import { generateId } from "~/core/utils";
import { FILTERS_QUERY_PARAMS } from "~/core/constants/filter.constants";
import { COLLECTION_LIST_API_BY_TYPE } from "~/core/constants/api.constants";

export class GlassesService {
  async fetchGlassesCollection({
    pageNumber,
    pageLimit,
    shapes,
    colours,
    collectionType,
  }: GlassesParams): Promise<Glass[]> {
    try {
      const params = this.createQueryParams({
        pageNumber,
        pageLimit,
        shapes,
        colours,
      });

      const url = `${COLLECTION_LIST_API_BY_TYPE(collectionType)}/?${params}`;
      const { glasses } = await fetch(url).then(
        (res) => res.json() as unknown as GlassesResponse
      );

      return glasses;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  createQueryParams({
    pageNumber,
    pageLimit,
    shapes,
    colours,
  }: GlassesQueryParams): string {
    const pageLimitFilter = `${FILTERS_QUERY_PARAMS.PAGE_LIMIT}${pageLimit}`;
    const numberLimitFilter = `${FILTERS_QUERY_PARAMS.PAGE_NUMBER}${pageNumber}`;

    let shapesFilter = null;
    let coloursFilter = null;

    if (shapes.length) {
      shapesFilter = shapes
        .map((shape) => `${FILTERS_QUERY_PARAMS.SHAPE}${shape}`)
        .join("&");
    }

    if (colours.length) {
      coloursFilter = colours
        .map((colour) => `${FILTERS_QUERY_PARAMS.COLOUR}${colour}`)
        .join("&");
    }

    let paramsBase = `${pageLimitFilter}&${numberLimitFilter}`;

    if (shapesFilter) {
      paramsBase += `&${shapesFilter}`;
    }

    if (coloursFilter) {
      paramsBase += `&${coloursFilter}`;
    }

    return paramsBase;
  }

  createGlassesModel(glassesCollection: Glass[]): GlassesModel[] {
    return glassesCollection.map((glasses) => {
      const previewImage = glasses.glass_variants?.[0]?.media[0]?.url;

      return {
        name: glasses.name,
        id: generateId(),
        image: previewImage,
      };
    });
  }
}
