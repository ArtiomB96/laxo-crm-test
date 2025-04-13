<script setup>
import { onMounted } from "vue";
import { useApiStore } from "../stores/apiStore";

const apiStore = useApiStore();

onMounted(async () => {
  apiStore.fetchDeals();
  apiStore.getStatus();
});

const logout = () => {
  localStorage.removeItem("sid");
  localStorage.removeItem("isAuthenticated");

  location.reload();
};
</script>
<template>
  <div class="deal-list">
    <h2>Список сделок</h2>
    <ul>
      <li v-for="deal in apiStore.deals" :key="deal.id" class="deal-item">
        <div class="deal-info">
          <span class="deal-name">{{ deal.order_name }}</span>
          <span class="deal-id">ID: {{ deal.order_id }}</span>
        </div>
        <div class="deal-actions">
          <select v-model="deal.order_status_id" class="status-select">
            <option
              v-for="status in apiStore.statuses"
              :key="status.order_status_id"
              :value="status.order_status_id"
            >
              {{ status.order_status_name }}
            </option>
          </select>
          <button
            class="change-button"
            @click="
              apiStore.changeDealStatus(deal.order_id, deal.order_status_id)
            "
          >
            Изменить
          </button>
        </div>
      </li>
    </ul>
    <p v-if="apiStore.error" class="error-message">{{ apiStore.error }}</p>
    <button class="logout-button" @click="logout">Выйти</button>
  </div>
</template>



<style scoped>
.deal-list {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.deal-item {
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  transition: box-shadow 0.3s;
}

.deal-item:hover {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.deal-info {
  flex-grow: 1;
}

.deal-name {
  font-weight: bold;
  font-size: 18px;
}

.deal-id {
  color: #666;
  font-size: 14px;
}

.deal-actions {
  display: flex;
  align-items: center;
}

.status-select {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.status-select:focus {
  border-color: #007bff;
  outline: none;
}

.change-button {
  padding: 10px 15px;
  background-color: #f85050;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.change-button:hover {
  background-color: #f85077;
}

.logout-button {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.logout-button:hover {
  background-color: #c82333;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 20px;
}

@media (max-width: 600px) {
  .deal-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .deal-actions {
    width: 100%;
    margin-top: 10px;
  }

  .status-select {
    width: 100%;
    margin-bottom: 10px;
  }

  .change-button {
    width: 100%;
  }
}

@media (min-width: 601px) and (max-width: 900px) {
  .deal-item {
    flex-direction: row;
  }

  .status-select {
    width: auto;
  }

  .change-button {
    width: auto;
  }
}
</style>
