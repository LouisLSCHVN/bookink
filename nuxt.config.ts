export default defineNuxtConfig({
  devtools: { enabled: true },

  nitro: {
    imports: {
      dirs: ["@/server/classes/*"],
    },
  },
});
