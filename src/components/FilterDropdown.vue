<template>
  <Menu as="div" class="relative inline-block text-left z-10">
    <div>
      <MenuButton
        class="rounded-lg text-primary flex items-center overflow-hidden bg-primaryAlt px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <div class="gap-2 flex items-center mr-6">
          <span class="w-5 h-5"><FilterIcon /></span>
          <span class="bg-primaryAlt text-primary">Filter</span>
        </div>
        <ArrowDownIcon />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute w-96 text-primary right-0 mt-2 origin-top-right divide-y rounded-md bg-primaryAlt shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <div class="px-4 py-3">
          <div class="text-sm mb-4">Category</div>
          <div class="flex flex-wrap gap-2">
            <MenuItem
              v-for="category in props.categories"
              :key="category"
              @click="selectCategory(category)"
            >
              <button
                :class="[
                  selectedCategory === category && 'bg-primary text-white',
                  'group transition-all hover:bg-primary hover:text-white min-w-[80px] justify-center border border-primary flex items-center rounded-md px-2 py-[2px] text-sm',
                ]"
              >
                {{ category.name }}
              </button>
            </MenuItem>
          </div>
        </div>
        <div class="px-4 py-3">
          <div class="text-sm mb-4">Sort by</div>
          <div class="flex flex-wrap gap-2">
            <MenuItem
              v-for="sortBy in sortByList"
              :key="sortBy"
              @click="selectSortBy(sortBy)"
            >
              <button
                :class="[
                  selectedsortBy.name === sortBy.name &&
                    'bg-primary text-white',
                  'group transition-all hover:bg-primary hover:text-white min-w-[80px] justify-center border border-primary flex items-center rounded-md px-2 py-[2px] text-sm',
                ]"
              >
                {{ sortBy.name }}
              </button>
            </MenuItem>
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/vue";
import ArrowDownIcon from "./icons/IconArrowDown.vue";
import FilterIcon from "./icons/IconFilter.vue";
import { ref } from "vue";
import { store } from "../utils/store";

const sortByList = [
  {
    name: "Highest Price",
    query: ["price", "sortType=desc"],
  },
  {
    name: "Lowest Price",
    query: ["price", "sortType=asc"],
  },
  {
    name: "Most Sales",
    query: ["mostSales"],
  },
  {
    name: "Newest",
    query: ["newest"],
  },
  {
    name: "Oldest",
    query: ["oldest"],
  },
];

const props = defineProps({
  categories: Object,
});

const selectedCategory = ref({});
const selectedsortBy = ref({});

function selectCategory(category) {
  if (category.name === selectedCategory.value.name) {
    store.apiQuery.category = "";
    return (selectedCategory.value = {});
  }
  selectedCategory.value = category;
  store.apiQuery.category = `categoryId=${selectedCategory.value.id}`;
}

function selectSortBy(sort) {
  if (sort.name === selectedsortBy.value.name) {
    store.apiQuery.sortBy = "";
    return (selectedsortBy.value = {});
  }
  selectedsortBy.value = sort;
  store.apiQuery.sortBy = `sortBy=${selectedsortBy.value.query.join("&")}`;
}
</script>
