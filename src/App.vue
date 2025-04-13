<template>
  <div id="app">
    <AuthComponent
      v-if="!isAuthenticated"
      @authenticated="handleAuthentication"
    />
    <DealList v-else />
  </div>
</template>

<script setup>
import { ref } from "vue";
import AuthComponent from "./components/AuthComponent.vue";
import DealList from "./components/DealList.vue";

const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");

const handleAuthentication = () => {
  isAuthenticated.value = true;
  localStorage.setItem("isAuthenticated", "true");
};
</script>

<style>
body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
