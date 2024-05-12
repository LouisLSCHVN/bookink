export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("Auth middleware");

  const auth = await useUsers().checkAuth();
  if (!auth) {
    return navigateTo("/connexion");
  }
});
