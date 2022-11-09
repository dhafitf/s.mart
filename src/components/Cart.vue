<script setup>
import ArrowDownIcon from "../components/icons/IconArrowDown.vue";
import Shipping from "./Shipping.vue";
import { store } from "../utils/store";
</script>

<script>
export default {
  name: "Cart",
  props: {
    getActiveComponent: Function,
  },
  methods: {
    incAmount(item) {
      item.amount++;
    },
    decAmount(item) {
      if (item.amount === 1) {
        let index = store.cartItem.findIndex(() => item.amount <= 0);
        store.cartItem.splice(index, 1);
        return;
      }
      item.amount--;
    },
  },
};
</script>

<template>
  <div class="w-[568px] py-6 z-20 bg-primary fixed top-0 right-0 h-screen">
    <div class="px-6 flex items-center">
      <img src="../assets/shoppingcart.png" alt="" />
      <div class="text-white pl-4 font-semibold">
        <div>Shopping Cart</div>
      </div>
    </div>
    <div class="w-full mt-4 mb-14 bg-white h-[3px]"></div>
    <div class="px-6 flex flex-col gap-6">
      <div v-for="item in store.cartItem" :key="item">
        <div class="flex items-center">
          <img
            class="max-w-[6rem] w-full h-24 object-cover object-center rounded-md overflow-hidden"
            src="/kaos.png"
            alt=""
          />
          <div class="flex w-full ml-6 flex-col text-white">
            <div class="line-clamp-1 font-bold">
              {{ item.title }}
            </div>
            <span>{{ item.options.join(", ") }}</span>
            <div class="grid grid-cols-3 mt-3">
              <span>{{
                item.price.toLocaleString("id-ID", { minimumFractionDigits: 0 })
              }}</span>
              <div class="flex justify-center gap-4">
                <div
                  @click="decAmount(item)"
                  class="border cursor-pointer border-white hover:bg-primaryAlt hover:text-primary transition-all text-lg h-6 flex items-center rounded-sm p-1"
                >
                  -
                </div>
                <div>x{{ item.amount }}</div>
                <div
                  @click="incAmount(item)"
                  class="border cursor-pointer border-white hover:bg-primaryAlt hover:text-primary transition-all text-lg h-6 flex items-center rounded-sm p-1"
                >
                  +
                </div>
              </div>
              <span class="text-end">{{
                (Number(item.price) * Number(item.amount)).toLocaleString(
                  "id-ID",
                  {
                    minimumFractionDigits: 0,
                  }
                )
              }}</span>
            </div>
          </div>
        </div>
        <div class="bg-white w-full h-[1px] mt-4"></div>
      </div>
      <div v-if="store.cartItem[1]" class="text-white font-medium text-end">
        {{
          store.cartItem
            .reduce(
              (prev, cur) => prev.price * prev.amount + cur.price * cur.amount
            )
            .toLocaleString("id-ID", {
              minimumFractionDigits: 0,
            })
        }}
      </div>
    </div>
    <div
      v-on:click="getActiveComponent(Shipping)"
      class="flex cursor-pointer hover:bg-primaryAlt hover:text-primary z-30 transition-all fixed right-6 bottom-6 items-center text-white w-72 border justify-between px-3 py-2 rounded-md"
    >
      Check Out Items
      <span class="-rotate-90"><ArrowDownIcon /></span>
    </div>
  </div>
</template>
