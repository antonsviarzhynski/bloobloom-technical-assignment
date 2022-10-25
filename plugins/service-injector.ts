import { Plugin } from '@nuxt/types'
import {FilterService} from "~/core/services/filter.service";
import {MenuService} from "~/core/services/menu.service";
import {GlassesService} from "~/core/services/glasses.service";

declare module 'vue/types/vue' {
  interface Vue {
    $filterService: FilterService
    $glassesService: GlassesService
    $menuService: MenuService
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $filterService: FilterService
    $glassesService: GlassesService
    $menuService: MenuService
  }

  interface Context {
    $filterService: FilterService
    $glassesService: GlassesService
    $menuService: MenuService
  }
}

const myPlugin: Plugin = (context, inject) => {
  inject('menuService', new MenuService())
  inject('filterService', new FilterService())
  inject('glassesService', new GlassesService())
}

export default myPlugin;
