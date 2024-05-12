<template>
  <h3>User</h3>
  <pre>
      {{ user.data }}
    </pre
  >
  <h1>
    Auth ? <kbd>{{ auth }}</kbd>
  </h1>
</template>
<script setup>
const user = useUsers();
const auth = await user.checkAuth();
</script>
