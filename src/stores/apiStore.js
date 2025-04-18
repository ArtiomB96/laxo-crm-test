import { defineStore } from "pinia";

const savedSid = localStorage.getItem("sid");
export const useApiStore = defineStore("api", {
  state: () => ({
    sid: savedSid,
    contact: null,
    deals: [],
    error: null,
    statuses: [],
    errorMsg: "",
    isAuth: false,
    statusIsChanged: false,
  }),
  actions: {
    async rpcRequest(className, method, params) {
      const requestData = [
        {
          class: className,
          method: method,
          param: params,
          sid: this.sid,
          domain: "artB",
        },
      ];

      try {
        const response = await fetch("/api/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Ошибка: ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        this.error = error.message;
        console.error("Ошибка при отправке RPC-запроса:", error);
        throw error;
      }
    },

    async authenticate(login, password, router) {
      const response = await this.rpcRequest("user_session", "auth", {
        login,
        pass: password,
      });

      const hasError = response.some((item) => item.code === 500);

      if (hasError) {
        console.error("Неверный логин или пароль");
        this.errorMsg = "Неверный логин или пароль";
        return;
      }

      if (response && response.length > 1) {
        const session = response[1].response;
        if (session && session.sid) {
          localStorage.setItem("sid", session.sid);
          localStorage.setItem("isAuthenticated", true);
          this.sid = session.sid;
          this.isAuth = true;
          router.push("/deals");
        } else {
          console.error("SID не получен из ответа");
          this.isAuth = false;
        }
      } else {
        console.error("Ошибка аутентификации", response);
        this.isAuth = false;
      }
    },

    async fetchDeals() {
      const sid = localStorage.getItem("sid");
      if (!sid) {
        console.error("SID не найден в localStorage");
        return;
      }

      const params = {
        deleted: null,
      };

      try {
        const data = await this.rpcRequest("order", "get_list", params);

        this.deals = data[0].response;
      } catch (error) {
        console.error("Ошибка при получении сделок:", error);
      }
    },
    async changeDealStatus(order_id, order_status_id) {
      const sid = localStorage.getItem("sid");
      if (!sid) {
        console.error("SID не найден в localStorage");
        return;
      }
      const params = {
        order_id: Number(order_id),
        order_status_id: order_status_id,
      };

      try {
        await this.rpcRequest("order", "set_status", params);
        this.statusIsChanged = true;
      } catch (error) {
        console.error("Ошибка при получении сделок:", error);
      }
    },
    async getStatus() {
      const sid = localStorage.getItem("sid");
      if (!sid) {
        console.error("SID не найден в localStorage");
        return;
      }

      try {
        const data = await this.rpcRequest("order_status", "get_list");

        this.statuses = data[0].response;
      } catch (error) {
        console.error("Ошибка при получении сделок:", error);
      }
    },
  },
});
