<script setup>
import ArrowDownIcon from "./icons/IconArrowDown.vue";
import AddressIcon from "./icons/IconAddress.vue";
import Cart from "./Cart.vue";
import Shipping from "./Shipping.vue";
import PaymentSuccess from "./PaymentSuccess.vue";
import { store } from "../utils/store";
</script>

<script>
export default {
  name: "Payment",
  props: {
    getActiveComponent: Function,
  },
  methods: {
    clearCart() {
      store.cartItem = [];
    },
  },
};
</script>

<template>
  <div class="w-[568px] py-6 z-20 bg-primary fixed top-0 right-0 h-screen">
    <div class="px-6 flex items-center">
      <img src="../assets/shoppingcart.png" alt="" />
      <div
        v-on:click="getActiveComponent(Cart)"
        class="text-white cursor-pointer pl-4"
      >
        <div>Shopping Cart</div>
      </div>
      <div class="-rotate-90 px-2 text-white"><ArrowDownIcon /></div>
      <div
        v-on:click="getActiveComponent(Shipping)"
        class="text-white cursor-pointer"
      >
        <div>Shipping</div>
      </div>
      <div class="-rotate-90 px-2 text-white"><ArrowDownIcon /></div>
      <div class="text-white font-bold">
        <div>Payment</div>
      </div>
    </div>
    <div class="w-full mt-4 mb-14 bg-white h-[3px]"></div>
    <div class="px-6 flex flex-col gap-6 text-white">
      <div class="flex relative flex-col border rounded-2xl p-12">
        <div class="absolute font-bold mx-6 px-3 bg-primary -top-4 left-3">
          Before you place your order
        </div>
        <span>Got a discount code?</span>
        <input
          class="px-6 mt-4 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
          type="text"
          placeholder="Discount Code"
        />
      </div>
      <div class="pt-4">
        <span class="font-semibold">Summary</span>
        <div class="pt-2 flex flex-col gap-2">
          <div class="grid grid-cols-[3fr_1fr_2fr]">
            <span class="truncate">Plain Basic T-Shirt - Number 1</span>
            <span class="text-center justify-self-center">x2</span>
            <span class="text-end">128.000</span>
          </div>
          <div class="grid grid-cols-[3fr_1fr_2fr]">
            <span class="truncate">Desk Lamp - Short</span>
            <span class="text-center justify-self-center">x1</span>
            <span class="text-end">128.000</span>
          </div>
          <div class="flex justify-between">
            <span class="truncate">Shipping</span>
            <span class="text-end">30.000</span>
          </div>
          <div class="bg-white w-full h-[1px]"></div>
          <div class="flex font-medium gap-12 justify-end">
            <span>Total</span>
            <span>254.000</span>
          </div>
        </div>
      </div>
      <div class="mt-8">
        <div class="flex items-center gap-4 font-bold">
          <AddressIcon />
          <span>Payment Information</span>
        </div>
        <div class="flex mt-4 flex-col gap-6">
          <input
            class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
            type="email"
            placeholder="Email"
          />
          <input
            class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
            type="text"
            placeholder="Card Number"
          />
          <div class="flex justify-between gap-6">
            <input
              class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
              type="text"
              placeholder="MM/YY"
            />
            <input
              class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
              type="text"
              placeholder="CVC"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-on:click="getActiveComponent(PaymentSuccess)"
      @click="clearCart"
      class="flex cursor-pointer hover:bg-primaryAlt hover:text-primary z-30 transition-all fixed right-6 bottom-6 items-center text-white w-72 border justify-between px-3 py-2 rounded-md"
    >
      Place Order
      <span class="-rotate-90"><ArrowDownIcon /></span>
    </div>
  </div>
</template>
