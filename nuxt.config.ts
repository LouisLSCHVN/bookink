export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      GOOGLE_BOOKS_API_KEY: process.env.GOOGLE_BOOKS_API_KEY,
    },
  },
  modules: ["@pinia/nuxt"],
  nitro: {
    compressPublicAssets: {
      gzip: true,
    },
  },
});
