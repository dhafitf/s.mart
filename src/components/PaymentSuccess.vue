<script>
import CartIcon from "./icons/IconCart.vue";

export default {
  name: "PaymentSuccess",
  props: {
    getActiveComponent: Function,
  },
  components: { CartIcon },
  created() {
    setTimeout(() => this.getActiveComponent(null), 2000);
  },
};
</script>

<template>
  <div class="w-[568px] py-6 z-20 bg-primary fixed top-0 right-0 h-screen">
    <div
      class="flex text-white font-bold px-8 w-full h-screen justify-center items-center flex-col"
    >
      <div class="rounded-full p-14 border-8 flex items-center justify-center">
        <CartIcon />
      </div>
      <div class="text-4xl text-center pt-4">Thank you for your purchase!</div>
    </div>
  </div>
</template>
