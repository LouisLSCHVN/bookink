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
      if (res.status !== 200 || !(res as any).data.user) return false;
      this.auth = true;
      console.log("check auth = " + this.auth, res);
      return true;
    },
  },
});
