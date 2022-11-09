<script>
import StarIcon from "./icons/IconStar.vue";

export default {
  name: "ProductCard",
  props: {
    item: Object,
  },
  components: { StarIcon },
};
</script>

<template>
  <div
    class="w-full rounded-md transition-all duration-500 h-full group hover:shadow-2xl hover:scale-[1.02]"
  >
    <!-- <div
    v-for="(item, index) in filteredProduct"
    :key="index"
    class="w-full rounded-md transition-all duration-500 h-full group hover:shadow-2xl hover:scale-[1.02]"
  > -->
    <div class="relative overflow-hidden rounded-lg">
      <img
        class="object-center object-cover w-full"
        :src="item.variant[0].imageUrl"
        alt=""
      />
      <div
        class="absolute transition-all duration-500 opacity-0 group-hover:opacity-100 ml-6 left-0 bottom-4 z-10 flex items-center gap-2"
      >
        <div class="w-6 h-6 bg-black border border-gray-500 rounded"></div>
        <div class="w-6 h-6 bg-white border border-gray-500 rounded"></div>
        <div class="w-6 h-6 bg-purple-500 border border-gray-500 rounded"></div>
        <div class="w-6 h-6 bg-blue-400 border border-gray-500 rounded"></div>
      </div>
    </div>
    <div class="p-4">
      <div class="font-semibold text-lg line-clamp-1">
        {{ item.title }}
      </div>
      <div class="my-2">
        {{
          item.price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })
        }}
      </div>
      <div class="flex justify-between">
        <span class="text-secondary font-bold flex items-center gap-1">
          <StarIcon />
          {{ item.rating }}</span
        >
        <span class="text-[#757575]">{{ item.sold }} sold</span>
      </div>
    </div>
  </div>
  <ProductModal />
</template>
