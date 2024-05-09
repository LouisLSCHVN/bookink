import { useUsers } from "~/stores/users.store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUsers();
  const auth = await user.checkAuth();
  if (!auth) {
    return navigateTo("/connexion");
  }
});
