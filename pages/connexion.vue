<template>
  <AuthSignup />
  <AuthLogin />
  <AuthResetPass />
  <br v-for="i in 10" :key="i" />
  <BookSearch />
</template>
<script setup>
if (useUsers().auth) useRouter().push("/");
</script>
