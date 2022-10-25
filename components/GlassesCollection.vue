<template>
  <div>
    <div class="collection-container">
      <div
        class="collection-item"
        v-for="glasses in glassesCollection"
        :key="glasses.id"
      >
        <div class="collection-item-name">{{ glasses.name }}</div>
        <img class="collection-item-image" :src="glasses.image" />
      </div>
    </div>
    <client-only v-if="collectionHasGlasses">
      <infinite-loading
        :identifier="infinityLoaderId"
        @infinite="$emit('infinite-scroll', $event)"
      >
        <span slot="no-more">There is no more Glasses</span>
      </infinite-loading>
    </client-only>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { GlassesModel } from "~/core/models/glasses.model";

export default defineComponent({
  name: "GlassesCollection.vue",
  props: {
    glassesCollection: {
      type: Array as PropType<GlassesModel[]>,
      default: () => [],
    },
    infinityLoaderId: {
      type: String,
      default: "",
    },
  },
  computed: {
    collectionHasGlasses(): boolean {
      return !!this.glassesCollection.length;
    },
  },
});
</script>

<style scoped>
.collection-container {
  width: 100%;
  height: 100%;
  display: grid;
  margin-bottom: 20px;
  grid-template-columns: 33.3% 33.3% 33.3%;
}

@media (max-width: 1280px) and (min-width: 768px) {
  .collection-container {
    grid-template-columns: 50% 50%;
  }
}

@media (max-width: 768px) {
  .collection-container {
    grid-template-columns: 100%;
  }
}

.collection-item {
  min-width: 350px;
  min-height: 430px;
  width: 100%;
  height: 100%;
  display: flex;
  border: 1px solid #000;
  position: relative;
  z-index: 5;
}

.collection-item-name {
  text-align: center;
  width: 100%;
  top: 20px;
  position: absolute;
  height: 30px;
}

.collection-item-image {
  width: 100%;
  height: auto;
}
</style>
