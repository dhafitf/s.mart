import { reactive } from "vue";

export const store = reactive({
  cartItem: [],
  apiQuery: {
    sortBy: "",
    category: "",
  },
});
