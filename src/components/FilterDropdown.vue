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
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
            >
              <button
                :class="[
                  selectedCategory === category && 'bg-primary text-white',
                  'group transition-all hover:bg-primary hover:text-white min-w-[80px] justify-center border border-primary flex items-center rounded-md px-2 py-[2px] text-sm',
                ]"
              >
                {{ category }}
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
                  selectedsortBy === sortBy && 'bg-primary text-white',
                  'group transition-all hover:bg-primary hover:text-white min-w-[80px] justify-center border border-primary flex items-center rounded-md px-2 py-[2px] text-sm',
                ]"
              >
                {{ sortBy }}
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

const categories = [
  "Fashion",
  "Health & Hygiene",
  "Tools",
  "Beauty",
  "Literature",
  "Hobbies",
];

const sortByList = [
  "Highest Price",
  "Lowest Price",
  "Most Sales",
  "Newest",
  "Oldest",
];

const selectedCategory = ref("");
const selectedsortBy = ref("");

function selectCategory(name) {
  if (name === selectedCategory.value) return (selectedCategory.value = "");
  selectedCategory.value = name;
}

function selectSortBy(name) {
  if (name === selectedsortBy.value) return (selectedsortBy.value = "");
  selectedsortBy.value = name;
}
</script>
