<script setup>
import GoogleIcon from "../components/icons/IconGoogle.vue";
import FacebookIcon from "../components/icons/IconFacebook.vue";
import AppleIcon from "../components/icons/IconApple.vue";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const isInvalid = ref(false);
const isLoading = ref(false);
const router = useRouter();

const handleSubmit = () => {
  isLoading.value = true;
  let userAgent = navigator.userAgent;
  const data = {
    email: email.value,
    password: password.value,
    device_name: userAgent,
  };

  axios
    .post("https://fe-test.primeskills.id/api/login", data)
    .then((res) => {
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.userData));
        localStorage.setItem("token", res.data.token);
        router.push("/");
      }
      isInvalid.value = true;
      isLoading.value = false;
    })
    .catch((err) => {
      isInvalid.value = true;
      console.log(err);
      isLoading.value = false;
    });
};
</script>

<template>
  <div
    :style="{ backgroundImage: `url(/login_bg.png)` }"
    class="h-screen w-full object-cover object-center"
  >
    <div class="w-2/4 px-6 absolute top-0 h-screen font-AudioWide text-7xl">
      <div class="absolute tracking-wide bottom-4 text-white pb-20">
        Welcome back
      </div>
    </div>
    <div
      class="w-2/4 px-8 text-primary absolute flex-col top-0 right-0 flex items-center justify-center h-screen bg-white"
    >
      <div class="mb-6"><img src="/logo.svg" alt="" /></div>
      <span class="font-bold">Login to an existing account</span>
      <div
        v-if="isInvalid"
        class="font-semibold w-full pt-4 text-left text-red-500"
      >
        * Incorrect email or password
      </div>
      <div class="flex mt-4 w-full flex-col gap-3">
        <input
          class="px-6 py-3 rounded-2xl focus:outline-none bg-primaryAlt text-primary placeholder:text-primary"
          type="email"
          placeholder="Email"
          v-model="email"
        />
        <input
          class="px-6 py-3 rounded-2xl focus:outline-none bg-primaryAlt text-primary placeholder:text-primary"
          type="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="flex text-sm items-center justify-between w-full pt-2">
        <div class="flex items-center gap-2">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            value="Remember Me"
          />
          <label for="rememberMe">Remember me</label>
        </div>
        <span class="underline">Forgot password?</span>
      </div>
      <div
        v-if="!isLoading"
        @click="handleSubmit"
        class="w-full cursor-pointer mt-8 py-3 rounded-lg text-center bg-primary text-white"
      >
        Login
      </div>
      <div
        v-if="isLoading"
        class="w-full cursor-wait mt-8 py-3 rounded-lg text-center bg-gray-400 text-white"
      >
        Loading
      </div>
      <div class="w-full mt-16 relative">
        <div class="bg-primary w-full h-[1px] mt-4"></div>
        <div
          class="absolute font-semibold bg-white top-1 px-4 translate-x-2/4 right-2/4"
        >
          or sign in with
        </div>
        <div class="flex items-center mt-6 justify-center gap-6">
          <GoogleIcon />
          <FacebookIcon />
          <AppleIcon />
        </div>
      </div>
    </div>
  </div>
</template>
