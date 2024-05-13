<template>
  <h3>User</h3>
  <pre>
      {{ user.data }}
    </pre
  >
  <AuthLogout />
  <h1>
    Auth ? <kbd>{{ user.auth }}</kbd>
  </h1>
  <PremiumBuy />
</template>
<script setup>
const user = useUsers();
</script>
