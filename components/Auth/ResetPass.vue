<template>
  <h1>Reset Password</h1>
  <form>
    <input type="email" placeholder="email" v-model="resetPass.email" />
    <button @click.prevent="submitResetPassForm()">Reset Password</button>
  </form>
    <p v-if="state.message">
        {{ state.message }}
    </p>
</template>
<script setup>
const resetPass = reactive({
  email: "",
});

const state = reactive({
  message: "",
  status: 0,
});

const submitResetPassForm = async () => {
  const res = await $fetch("/api/user/reset-password", {
    method: "POST",
    body: resetPass,
  });
  console.log(res);
  state.message = res.message;
  state.status = res.status;
};
</script>
