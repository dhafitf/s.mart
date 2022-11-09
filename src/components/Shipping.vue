<script setup>
import ArrowDownIcon from "./icons/IconArrowDown.vue";
import PersonIcon from "./icons/IconPerson.vue";
import AddressIcon from "./icons/IconAddress.vue";
import Cart from "./Cart.vue";
import Payment from "./Payment.vue";
</script>

<script>
export default {
  name: "Shipping",
  props: {
    getActiveComponent: Function,
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
      <div class="text-white font-bold">
        <div>Shipping</div>
      </div>
    </div>
    <div class="w-full mt-4 mb-14 bg-white h-[3px]"></div>
    <div class="px-6 flex flex-col gap-6 text-white">
      <div>
        <div class="flex items-center gap-4 font-bold">
          <PersonIcon />
          <span>Contact Information</span>
        </div>
        <div class="flex mt-4 flex-col gap-3">
          <input
            class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
            type="text"
            placeholder="Full Name"
          />
          <input
            class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
            type="text"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div class="mt-8">
        <div class="flex items-center gap-4 font-bold">
          <AddressIcon />
          <span>Address</span>
        </div>
        <div class="flex mt-4 flex-col gap-3">
          <input
            class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
            type="text"
            placeholder="Address Line 1"
          />
          <input
            class="px-6 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
            type="text"
            placeholder="Address Line 2"
          />
          <div class="flex justify-between gap-6">
            <input
              class="px-6 flex-1 py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
              type="text"
              placeholder="Country"
            />
            <input
              class="px-6 max-w-[200px] py-3 rounded-2xl focus:outline-none text-primary placeholder:text-primary"
              type="text"
              placeholder="Post Code"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      v-on:click="getActiveComponent(Payment)"
      class="flex cursor-pointer hover:bg-primaryAlt hover:text-primary z-30 transition-all fixed right-6 bottom-6 items-center text-white w-72 border justify-between px-3 py-2 rounded-md"
    >
      Go to Payment
      <span class="-rotate-90"><ArrowDownIcon /></span>
    </div>
  </div>
</template>
