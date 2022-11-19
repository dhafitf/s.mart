<script>
export default {
  name: "Headers",
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
};
</script>

<template>
  <header class="sticky top-0 backdrop-blur-sm z-20 bg-[#ffffff9a]">
    <div class="flex items-center text-primary">
      <h1 @click="ngok" class="w-80">
        <img src="../assets/logo.png" alt="" />
      </h1>
      <nav
        class="flex-1 text-xl font-semibold w-full flex justify-center items-center gap-8"
      >
        <a class="hover:text-secondary" href="#news">News</a>
        <a class="hover:text-secondary" href="#promos">Promos</a>
        <a class="hover:text-secondary" href="#categories">Categories</a>
        <a class="hover:text-secondary" href="#browse">Browse</a>
      </nav>
      <div class="pr-14 hidden md:flex md:pl-4 items-center gap-8">
        <div class="font-medium">
          Welcome back,
          <span class="font-bold">{{ this.user.name }} !</span>
        </div>
        <div class="w-12 h-12 bg-[#7e7e7e]"></div>
      </div>
    </div>
  </header>
</template>
