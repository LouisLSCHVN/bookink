<template>
  <AuthSignup />
  <AuthLogin />
  <AuthResetPass />
</template>
<script setup>
definePageMeta({
  middleware: "guest",
});
</script>
