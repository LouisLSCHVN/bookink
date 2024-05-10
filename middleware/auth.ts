import { useUsers } from "~/stores/users.store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useUsers();
  const auth = await user.checkAuth();
  console.log("auth", auth);

  if (!auth) {
    return navigateTo("/connexion");
  }
});
