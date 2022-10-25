<template>
  <div>
    <header class="header">
      <div
        class="header-menu"
        v-on:mouseover="sideMenuOpened = true"
        v-on:mouseleave="sideMenuOpened = false"
      >
        <a class="header-menu-btn">Menu</a>
        <SideMenu :sideMenuOpened="sideMenuOpened" :menuItems="menuItems" />
      </div>
    </header>
    <main class="main">
      <div class="collection-container">
        <div v-on:click="filtersOpened = !filtersOpened" class="filter-btn">
          <FilterIcon />
        </div>
        <div class="collection-name">
          <span>
            {{ collectionName | uppercase }}
          </span>
        </div>
      </div>
      <transition-group name="filter-panel">
        <div
          v-if="filtersOpened"
          v-for="filter in filterPanels"
          :key="filter.id"
        >
          <FilterPanel
            :key="filter.id"
            :filterId="filter.id"
            :name="filter.name"
            :options="filter.options"
            @filter-toggled="onFilterToggled($event)"
          />
        </div>
      </transition-group>

      <GlassesCollection
        v-if="glassesCollection.length"
        :infinityLoaderId="infinityLoaderId"
        :glassesCollection="glassesCollection"
        @infinite-scroll="onInfiniteScroll($event)"
      />
    </main>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 40px;
  border: 1px solid #000;
  background-color: #fff;
  box-sizing: border-box;
}

.header-menu {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 50px;
}

.header-menu-btn {
  padding: 10px;
  border: 1px solid #000;
  cursor: pointer;
}

.header-menu:hover {
  text-decoration: underline;
}

.main {
  margin-top: 40px;
  border: 1px solid #000;
  border-top: 0;
  height: auto;
}

.filter-btn {
  height: 36px;
  width: 36px;
  margin-left: 10px;
  cursor: pointer;
}

.collection-container {
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;
  align-items: center;
}

.collection-name {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border: 1px solid #000;
}

.filter-panel-enter-active {
  transition: all 0.4s ease;
}

.filter-panel-leave-active {
  transition: all 0.2s ease;
}

.filter-panel-enter,
.filter-panel-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>

<script lang="ts">
import Vue from "vue";
import { Context } from "@nuxt/types";

import { MenuItemModel } from "~/core/models/menu.model";
import { FilterPanelModel, ToggledFilter } from "~/core/models/filter.model";
import { GlassesModel } from "~/core/models/glasses.model";
import { FILTERS_THROTTLE_TIME } from "~/core/constants/filter.constants";
import { generateId, throttle } from "~/core/utils";
import { InfinityLoaderEvent } from "~/core/models/ininity-loader.model";
import FilterIcon from "~/assets/svg/filter.svg?inline";

export default Vue.extend({
  components: {
    FilterIcon,
  },
  data() {
    return {
      sideMenuOpened: false,
      menuItems: [] as MenuItemModel[],
      filtersOpened: false,
      filterPanels: [] as FilterPanelModel[],
      glassesCollection: [] as GlassesModel[],
      page: 1,
      limitPerPage: 12,
      infinityLoaderId: generateId(),
    };
  },
  async asyncData({ params, app }: Context): Promise<{
    menuItems: MenuItemModel[];
    glassesCollection: GlassesModel[];
    pageNumber: number;
  }> {
    const paginationSettings = {
      pageNumber: 1,
      pageLimit: 12,
      shapes: [],
      colours: [],
      collectionType: params.type,
    };

    const menuItems = await app.$menuService.fetchMenuItems();
    const menuItemsVm = app.$menuService.createMenuItemsModel(menuItems);

    const glassesCollection = await app.$glassesService.fetchGlassesCollection(
      paginationSettings
    );
    const glassesCollectionVm =
      app.$glassesService.createGlassesModel(glassesCollection);

    return {
      menuItems: menuItemsVm,
      glassesCollection: glassesCollectionVm,
      pageNumber: paginationSettings.pageNumber + 1,
    };
  },
  created() {
    this.filterPanels = this.$filterService.getFilterPanels();
    this.applyFilters = throttle(this.applyFilters, FILTERS_THROTTLE_TIME);
  },
  methods: {
    onFilterToggled(toggled: ToggledFilter) {
      this.filterPanels = this.$filterService.handleToggledFilter(
        toggled,
        this.filterPanels
      );

      this.applyFilters();
    },
    async onInfiniteScroll(event: InfinityLoaderEvent) {
      this.incrementPage();

      const { glassesCollection } = await this.fetchGlasses();

      const isCollectionEmpty = glassesCollection.length === 0;
      if (isCollectionEmpty) {
        event.complete();
        return;
      }

      const glassesCollectionVm =
        this.$glassesService.createGlassesModel(glassesCollection);
      this.glassesCollection.push(...glassesCollectionVm);

      setTimeout(() => {
        event.loaded();
      }, 100);
    },
    async applyFilters(): Promise<void> {
      this.resetPage();
      this.resetLoaderId();

      const { glassesCollection } = await this.fetchGlasses();
      const glassesCollectionVm =
        this.$glassesService.createGlassesModel(glassesCollection);

      this.glassesCollection = glassesCollectionVm;
    },
    async fetchGlasses() {
      const { colours, shapes } = this.$filterService.getSelectedFilters(
        this.filterPanels
      );

      const glassesCollection =
        await this.$glassesService.fetchGlassesCollection({
          pageNumber: this.page,
          pageLimit: this.limitPerPage,
          collectionType: this.collectionType,
          colours,
          shapes,
        });

      return {
        glassesCollection,
      };
    },
    incrementPage() {
      this.page += 1;
    },
    resetPage() {
      this.page = 1;
    },
    resetLoaderId() {
      this.infinityLoaderId = generateId();
    },
  },
  computed: {
    collectionType(): string {
      return this.$route.params.type;
    },
    collectionName(): string {
      return this.collectionType.replace("-", " ");
    },
  },
  filters: {
    uppercase(value: string) {
      return value.toUpperCase();
    },
  },
});
</script>
