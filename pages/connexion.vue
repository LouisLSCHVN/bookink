<template>
  <AuthSignup />
  <AuthLogin />
  <AuthResetPass />
  <br v-for="i in 10" :key="i" />
  <BookSearch />
</template>
<script setup>
definePageMeta({
  middleware: "guest",
});
</script>
