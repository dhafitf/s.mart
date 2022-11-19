<script setup>
import CartOutlineIcon from "./icons/IconCartOutline.vue";
import ProductCard from "./ProductCard.vue";
import StarIcon from "./icons/IconStar.vue";

import { ref } from "vue";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
} from "@headlessui/vue";
import { store } from "../utils/store";

const isOpen = ref(false);
const amount = ref(1);
const sizeOption = ref("XS");

function closeModal() {
  isOpen.value = false;
}

function openModal() {
  isOpen.value = true;
}

function incAmount() {
  amount.value++;
}

function decAmount() {
  if (amount.value <= 1) return alert("Amount must be at least 1");
  amount.value--;
}

function changeSize(size) {
  sizeOption.value = size;
}

function sendtoCard(item) {
  const findItem = store.cartItem.findIndex((cart) => item.name === cart.name);
  if (!findItem) {
    store.cartItem[findItem].amount++;
  } else {
    store.cartItem.push({
      id: item.id,
      name: item.name,
      price: item.price,
      amount,
      options: [sizeOption.value],
      img_url: item.img_url,
    });
  }
  isOpen.value = false;
}
</script>

<script>
export default {
  name: "ProductModal",
  props: {
    item: Object,
  },
};
</script>

<template>
  <button class="text-start" type="button" @click="openModal">
    <ProductCard :item="item" />
  </button>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-20">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex items-center h-screen justify-center p-4 text-center">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="transform overflow-hidden rounded-2xl p-6 text-left align-middle transition-all"
            >
              <div
                class="flex justify-center items-center bg-white mx-auto top-0 left-0 h-[80vh] w-full max-w-[80vw]"
              >
                <div class="rounded-lg max-h-[80vh] h-full bg-white w-full">
                  <div class="px-16 py-24 flex h-full gap-8 items-center">
                    <div
                      class="relative overflow-hidden h-full w-full max-w-md rounded-lg"
                    >
                      <img
                        class="object-center h-full absolute inset-0 object-cover"
                        :src="item.img_url"
                        alt=""
                      />
                    </div>
                    <div class="w-full flex flex-col gap-6">
                      <h2 class="text-4xl font-AudioWide font-semibold">
                        {{ item.name }}
                      </h2>
                      <div
                        class="flex items-center font-semibold justify-between"
                      >
                        <span class="text-2xl text-primary">{{
                          Number(item.price).toLocaleString("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          })
                        }}</span
                        ><span
                          class="text-secondary text-2xl font-bold flex items-center gap-1"
                        >
                          <StarIcon />
                          {{ item.rating }}</span
                        >
                      </div>
                      <div
                        class="transition-all duration-500 flex items-center gap-4"
                      >
                        <div
                          class="w-8 h-8 bg-black border border-gray-500 rounded"
                        ></div>
                        <div
                          class="w-8 h-8 bg-white border border-gray-500 rounded"
                        ></div>
                        <div
                          class="w-8 h-8 bg-purple-500 border border-gray-500 rounded"
                        ></div>
                        <div
                          class="w-8 h-8 bg-blue-400 border border-gray-500 rounded"
                        ></div>
                      </div>
                      <div
                        class="transition-all text-primary duration-500 flex items-center gap-8"
                      >
                        <div
                          v-for="size in item.sizes"
                          @click="changeSize(size)"
                          :key="size"
                          :class="[
                            sizeOption === size
                              ? 'bg-primary text-white'
                              : 'hover:bg-primary hover:text-white',
                            'w-8 h-8 border border-primary transition-all cursor-pointer flex items-center justify-center px-6 font-semibold rounded',
                          ]"
                        >
                          {{ size }}
                        </div>
                      </div>
                      <div class="flex gap-4">
                        <div
                          @click="decAmount"
                          class="border cursor-pointer border-primary hover:bg-primary hover:text-white transition-all text-lg h-6 flex items-center rounded-sm p-1"
                        >
                          -
                        </div>
                        <div>x{{ amount }}</div>
                        <div
                          @click="incAmount"
                          class="border cursor-pointer border-primary hover:bg-primary hover:text-white transition-all text-lg h-6 flex items-center rounded-sm p-1"
                        >
                          +
                        </div>
                      </div>
                      <div>
                        <p class="whitespace-pre-line">
                          {{ item.description }}
                        </p>
                      </div>
                      <div
                        @click="sendtoCard(item)"
                        class="px-8 mt-5 flex gap-4 items-center font-semibold bg-primary cursor-pointer self-end w-fit text-white rounded-md py-3"
                      >
                        <CartOutlineIcon />
                        Add to cart
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
