export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@pinia/nuxt"],
  nitro: {
    compressPublicAssets: {
      gzip: true,
    },
  },
});
