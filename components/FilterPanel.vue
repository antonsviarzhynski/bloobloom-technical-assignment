<template>
  <div class="filter-panel">
    <div class="filter-name">{{ name }}</div>
    <div class="filter-options">
      <div class="filter-option" v-for="option in options">
        <input
          type="checkbox"
          :id="option.id"
          :checked="option.selected"
          v-on:change="
            $emit('filter-toggled', { filterId: filterId, optionId: option.id })
          "
        />
        <label :for="option.id">{{ option.name }}</label>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FilterOption } from "~/core/models/filter.model";

export default defineComponent({
  name: "FilterPanel.vue",
  props: {
    name: {
      type: String,
      default: "",
    },
    filterId: {
      type: String,
      default: "",
    },
    options: {
      type: Array as PropType<FilterOption[]>,
      default: () => [],
    },
  },
});
</script>

<style scoped>
.filter-panel {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #000;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
}

.filter-option {
  display: flex;
  gap: 5px;
  padding: 10px;
}
</style>
