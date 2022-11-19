<script setup>
import Header from "../components/Header.vue";
import SearchIcon from "../components/icons/IconSearch.vue";
import FilterDropdownVue from "../components/FilterDropdown.vue";
import Cart from "../components/Cart.vue";
import { store } from "../utils/store";
import axios from "axios";
import { useRouter } from "vue-router";

// eslint-disable-next-line no-unused-vars
const router = useRouter();
</script>

<script>
import { shallowRef } from "vue";
import ProductModal from "../components/ProductModal.vue";
export default {
  name: "Home",
  data() {
    return {
      isLoading: false,
      user: JSON.parse(localStorage.getItem("user")),
      token: localStorage.getItem("token"),
      products: [],
      productsPage: 0,
      activeComponent: shallowRef(null),
      search: "",
      categories: [],
    };
  },
  mounted() {
    this.getProducts();
    this.getCategories();
  },
  methods: {
    redirectToLogin() {
      this.router.push("/login");
    },
    getActiveComponent(activeComponent) {
      this.activeComponent = activeComponent;
    },
    activateCartComponent() {
      if (!store.cartItem.length) return alert("Cart empty");
      this.activeComponent = Cart;
    },
    closeWhenOpen() {
      if (this.activeComponent !== null) {
        return (this.activeComponent = null);
      }
    },
    getCategories() {
      axios
        .get("https://fe-test.primeskills.id/api/category", {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res) => {
          this.categories = res.data.data;
        })
        .catch((err) => {
          this.redirectToLogin();
          console.log(err);
        });
    },
    getProducts() {
      this.isLoading = true;
      this.productsPage++;
      axios
        .get(
          `https://fe-test.primeskills.id/api/products?page=${this.productsPage}`,
          {
            headers: { Authorization: `Bearer ${this.token}` },
          }
        )
        .then((res) => {
          this.products.push(...res.data.data.data);
        })
        .catch((err) => {
          this.redirectToLogin();
          console.log(err);
        });
      this.isLoading = false;
    },
    getProductsByQuery(query) {
      this.isLoading = true;
      this.productsPage = 0;
      axios
        .get(`https://fe-test.primeskills.id/api${query}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((res) => {
          this.products = res.data.data.data;
          this.isLoading = false;
        })
        .catch((err) => {
          this.redirectToLogin();
          console.log(err);
        });
    },
  },
  computed: {
    apiQuery() {
      return Object.values(store.apiQuery).join("&");
    },
  },
  watch: {
    apiQuery: function (query) {
      this.getProductsByQuery(`/filter?${query}`);
    },
  },
  components: { ProductModal },
};
</script>

<template>
  <Header />
  <main class="font-SpaceGrotesk pb-40">
    <div id="promos" class="px-14">
      {{ filteredProduct }}
      <div class="text-secondary font-bold text-center pb-14">
        <div class="text-4xl">Check out our newest</div>
        <h2 class="md:text-9xl text-3xl font-AudioWide">PROMOS</h2>
      </div>
      <div class="flex flex-wrap gap-8 justify-center">
        <div class="overflow-hidden group w-fit relative rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
            class="w-[560px] h-64 object-cover object-center"
          />
          <div class="opacity-0 group-hover:opacity-100 transition-all">
            <div
              class="bg-gradient-to-t from-primary absolute inset-0 w-full h-full"
            ></div>
            <div
              class="absolute text-xl bottom-6 left-6 font-medium text-white"
            >
              50% off Sale for selected items
            </div>
          </div>
        </div>
        <div class="overflow-hidden group w-fit relative rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1603792907191-89e55f70099a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            alt=""
            class="w-[560px] h-64 object-cover object-center"
          />
          <div class="opacity-0 group-hover:opacity-100 transition-all">
            <div
              class="bg-gradient-to-t from-primary absolute inset-0 w-full h-full"
            ></div>
            <div
              class="absolute text-xl bottom-6 left-6 font-medium text-white"
            >
              Don’t be shocked when our buy 1 get 1
            </div>
          </div>
        </div>
        <div class="overflow-hidden group w-fit relative rounded-lg">
          <img
            src="https://images.unsplash.com/photo-1595865211152-eec48f9055c7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1435&q=80"
            alt=""
            class="w-[560px] h-64 object-cover object-center"
          />
          <div class="opacity-0 group-hover:opacity-100 transition-all">
            <div
              class="bg-gradient-to-t from-primary absolute inset-0 w-full h-full"
            ></div>
            <div
              class="absolute text-xl bottom-6 left-6 font-medium text-white"
            >
              to check out our Flash Sale!
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="categories" class="pt-28 px-14">
      <h2 class="text-center flex flex-col text-3xl text-primary font-bold">
        Look through our
        <span>Categories</span>
      </h2>
      <div class="grid grid-cols-4 mt-11 gap-8">
        <div class="bg-[#D9D9D9] w-full h-56 rounded-md"></div>
        <div class="bg-[#D9D9D9] w-full h-56 rounded-md"></div>
        <div class="bg-[#D9D9D9] w-full h-56 rounded-md"></div>
        <div class="bg-[#D9D9D9] w-full h-56 rounded-md"></div>
      </div>
    </div>
    <div id="browse" class="pt-28 px-14">
      <h2 class="text-center flex flex-col text-3xl text-secondary font-bold">
        or browse our full
        <span>Collection</span>
      </h2>
      <div class="my-6 flex justify-between items-center">
        <div
          class="rounded-lg text-primary overflow-hidden gap-2 bg-primaryAlt px-3 py-2 flex items-center"
        >
          <span class="w-5 h-5"><SearchIcon /></span>
          <input
            @keyup.enter="
              getProductsByQuery(`/search?product_name=${this.search}`)
            "
            v-model="search"
            type="text"
            placeholder="Search"
            class="focus:outline-none bg-primaryAlt placeholder:text-primary"
          />
        </div>
        <FilterDropdownVue :categories="this.categories" />
      </div>
      <div
        v-if="isLoading"
        class="flex items-center py-3 font-bold justify-center bg-primary mb-4 text-white rounded"
      >
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        Loading...
      </div>
      <div
        v-if="!isLoading"
        class="grid md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-10"
      >
        <ProductModal
          v-for="(item, index) in this.products"
          :key="index"
          :item="item"
        />
      </div>
      <div v-if="!isLoading" class="flex items-center mt-10 justify-center">
        <span
          @click="getProducts"
          class="bg-primary px-10 hover:bg-primaryAlt hover:text-primary transition-all cursor-pointer py-3 rounded-lg text-white font-bold"
          >Load more</span
        >
      </div>
    </div>
    <div
      @click="activateCartComponent"
      class="fixed z-10 cursor-pointer m-6 bottom-0 right-0 w-20 h-20"
    >
      <div
        class="absolute w-5 h-5 top-0 right-3 bg-primary text-white flex items-center justify-center text-sm rounded-full"
      >
        {{ store.cartItem.length }}
      </div>
      <img src="../assets/cart.png" alt="" />
    </div>
    <div
      @click="closeWhenOpen"
      v-if="activeComponent !== null"
      class="fixed z-20 top-0 left-0 h-screen w-full bg-[#25252582] backdrop-blur-sm"
    ></div>
  </main>
  <Transition name="slide-fade" mode="out-in">
    <component
      :getActiveComponent="getActiveComponent"
      :is="activeComponent"
    ></component>
  </Transition>
</template>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
