export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  nitro: {
    imports: {
      dirs: ["@/server/classes/*"],
    },
  },
});
