<template>
  <button @click="logout">Logout</button>
</template>
<script setup>
const user = useUsers();
const router = useRouter();
const logout = async () => {
  await user.logout();
  router.push("/connexion");
};
</script>
