import { defineStore } from "pinia";

export const useUsers = defineStore("users", {
  state: () => ({
    data: [],
    auth: false,
  }),
  actions: {
    async fetchCurrent(): Promise<Response> {
      const res = await $fetch("/api/user/auth", {
        credentials: "include",
      });

      console.log("current user", res);

      if (res.status !== 200 || !res.data.user) return res;
      this.data = res.data.user;
      return res;
    },
    async checkAuth(): Promise<Boolean> {
      const res = await this.fetchCurrent();
      if (!res) return false;
      if (res.status !== 200) return false;
      this.auth = true;
      console.log("check auth = " + this.auth, res);
      return true;
    },
    async logout(): Promise<Response> {
      const res = await $fetch("/api/user/logout", {
        credentials: "include",
      });

      console.log("logout", res);

      if (res.status !== 200) return res;
      this.auth = false;
      this.data = [];
      return res;
    },
  },
});
