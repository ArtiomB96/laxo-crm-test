<script setup>
import { ref, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { useApiStore } from "../stores/apiStore";

const apiStore = useApiStore();
const router = useRouter();
const login = ref("");
const password = ref("");
const responseMessage = ref("");

const emit = defineEmits(["logout"]);

const authenticate = async () => {
  try {
    await apiStore.authenticate(login.value, password.value, router);

    if (apiStore.isAuth) {
      responseMessage.value = "Успешная авторизация!";
      emit("authenticated");
    } else {
      responseMessage.value = apiStore.errorMsg || "Ошибка авторизации";
    }
  } catch (error) {
    responseMessage.value = `Ошибка авторизации: ${error.message}`;
  }
};
</script>
<template>
  <div class="container">
    <div class="auth-container">
      <h2 class="auth-title">Авторизация</h2>
      <form class="auth-form" @submit.prevent="authenticate">
        <div class="form-group">
          <input
            v-model="login"
            class="input"
            type="email"
            placeholder="Email"
            required
          />
        </div>
        <div class="form-group">
          <input
            v-model="password"
            class="input"
            type="password"
            placeholder="Пароль"
            required
          />
        </div>
        <button type="submit" class="auth-button">Войти</button>

        <p class="response-message">{{ responseMessage }}</p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.auth-container {
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

.auth-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.auth-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  margin-bottom: 5px;
  color: #555;
}

input[type="email"],
input[type="password"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

input[type="email"]:focus,
input[type="password"]:focus {
  border-color: #007bff;
  outline: none;
}
.input {
  max-width: 346px;
  width: 100%;
  box-sizing: border-box;
  height: 28px;
  border-radius: 4px;
  border: 1px solid #ccc;
  padding-left: 5px;
}
.auth-button {
  padding: 10px;
  background-color: #f85050;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.auth-button:hover {
  background-color: #0056b3;
}
.response-message {
  text-align: center;
  color: #d9534f;
  margin-top: 10px;
}
</style>
