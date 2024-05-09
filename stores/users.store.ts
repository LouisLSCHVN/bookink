import { defineStore } from "pinia";

export const useUsers = defineStore("users", {
  state: () => ({
    profile: [],
    auth: false,
  }),
  actions: {
    async fetchCurrent(): Promise<void> {
      const res = await $fetch("/api/user/me");

      console.log("current user", res);

      if (res.status !== 200 || !res.data.user) return;
      this.profile = res.data.user;
    },
    async checkAuth(): Promise<boolean> {
      const res = await $fetch("/api/user/auth");


      if (res.status !== 200 || !res.data.user) return false;
      this.auth = true;
      console.log("check auth = " + this.auth, res);
      return true;
    },
  },
});
