<template>
  <div>
    <h1>Login</h1>
    <form>
      <input type="email" placeholder="email" v-model="login.email" />
      <input type="password" placeholder="password" v-model="login.password" />
      <button @click.prevent="submitLoginForm()">Login</button>
    </form>
    <p v-if="state.message">
      {{ state.message }}
    </p>
  </div>
</template>
<script setup>
const login = reactive({
  email: "",
  password: "",
});

const state = reactive({
  message: "",
  status: 0,
});

const submitLoginForm = async () => {
  const res = await $fetch("/api/user/login", {
    method: "POST",
    body: login,
  });
  console.log(res);
  state.message = res.message;
  state.status = res.status;
};
</script>
