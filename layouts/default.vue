<template>
  <div>
    <AuthInfo />
    <slot />
  </div>
</template>

<script setup>
const user = useUsers();
onMounted(async () => {
  await callOnce(user.fetchCurrent);
  console.log("Fetch Current User From /layouts/default.vue", user.data);
});
</script>
