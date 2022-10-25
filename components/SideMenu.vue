<template>
  <div class="side-menu" v-bind:class="{ 'side-menu-open': sideMenuOpened }">
    <div class="side-menu-main" v-on:mouseleave="hoveredMenuIndex = null">
      <div
        v-for="menu in menuItems"
        class="side-menu-main-tab"
        v-on:mouseover="hoveredMenuIndex = menu.index"
      >
        <span class="side-menu-tab-title">{{ menu.name | uppercase }}</span>
        <ArrowRight v-if="!!menu.items.length"></ArrowRight>
      </div>
      <div
        class="side-menu inner-side-menu"
        v-if="hoveredMenuIndex !== null"
        v-bind:class="{
          'inner-side-menu-open': menuItems?.[hoveredMenuIndex]?.items?.length,
        }"
      >
        <div
          class="side-menu-main"
          :set="(subMenuItems = menuItems?.[hoveredMenuIndex]?.items)"
        >
          <div v-for="subMenu in subMenuItems" class="side-menu-main-tab">
            <NuxtLink
              class="menu-link"
              :to="`/collections/${subMenu.configuration_name}`"
            >
              <span class="side-menu-tab-title">{{
                subMenu.name | uppercase
              }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.side-menu {
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 20vw;
  background: #fff;
  height: calc(100vh - 40px);
  top: 40px;
  left: -20vw;
  transition: all 0.3s ease;
}

.inner-side-menu {
  transition: none;
}

.side-menu-open {
  border: 1px solid #000000;
  border-top: none;
  border-bottom: none;
  left: 0;
}

.inner-side-menu-open {
  border: 1px solid #000000;
  border-top: none;
  border-bottom: none;
  left: 20vw;
}

.side-menu-main {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.side-menu-main-tab {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  border-bottom: 1px solid #000;
  cursor: pointer;
}

.side-menu-main-tab:hover {
  background: black;
}

.side-menu-main-tab:hover .side-menu-tab-title {
  color: #fff;
}

.side-menu-tab-arrow {
  margin-right: 10px;
}

.side-menu-main-tab:hover .side-menu-tab-arrow {
  fill: #fff;
}

.side-menu-tab-title {
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  color: #000;
  text-transform: uppercase;
  margin-left: 18px;
}

@media (max-width: 768px) {
  .side-menu-open {
    width: 180px;
  }

  .inner-side-menu-open {
    width: 180px;
    left: 180px;
  }
}

.menu-link {
  width: 100%;
  text-decoration: none;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { MenuItemModel } from "~/core/models/menu.model";
import ArrowRight from "~/assets/svg/arrow-right.svg?inline";

export default defineComponent({
  name: "SideMenu.vue",
  components: {
    ArrowRight,
  },
  props: {
    sideMenuOpened: {
      type: Boolean,
      default: false,
    },
    menuItems: {
      type: Array as PropType<MenuItemModel[]>,
      default: () => [],
    },
  },
  data() {
    return {
      sideSubMenuOpened: false,
      hoveredMenuIndex: null,
    };
  },
  filters: {
    uppercase(value: string) {
      return value.toUpperCase();
    },
  },
});
</script>
