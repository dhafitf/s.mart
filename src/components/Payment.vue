<script setup>
import ArrowDownIcon from "./icons/IconArrowDown.vue";
import AddressIcon from "./icons/IconAddress.vue";
import Cart from "./Cart.vue";
import Shipping from "./Shipping.vue";
import PaymentSuccess from "./PaymentSuccess.vue";
import { store } from "../utils/store";
import axios from "axios";
import FormData from "form-data";
</script>

<script>
export default {
  name: "Payment",
  props: {
    getActiveComponent: Function,
  },
  methods: {
    checkoutCart() {
      const data = new FormData();
      store.cartItem.forEach((item, index) => {
        data.append(`product_id[${index}]`, item.id);
        data.append(`qty[${index}]`, item.amount);
      });
      const config = {
        method: "post",
        url: "https://fe-test.primeskills.id/api/checkout",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        data,
      };

      axios(config)
        .then(() => alert("Success"))
        .catch((err) => {
          alert(err);
          console.log(err);
        });
    },
    clearCart() {
      this.checkoutCart();
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
          <div v-for="item in store.cartItem" :key="item">
            <div class="grid grid-cols-[3fr_1fr_2fr]">
              <span class="truncate">{{ item.name }}</span>
              <span class="text-center justify-self-center"
                >x{{ item.amount }}</span
              >
              <span class="text-end">{{
                Number(item.price).toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })
              }}</span>
            </div>
          </div>
          <div class="bg-white w-full h-[1px]"></div>
          <div class="flex font-medium gap-12 justify-end">
            <span>Total</span>
            <span>{{
              store.cartItem
                .reduce((prev, next) => Number(prev.price) + Number(next.price))
                .toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                })
            }}</span>
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
