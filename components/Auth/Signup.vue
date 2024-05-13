<template>
  <div>
    <h1>Sign Up</h1>
    <form>
      <input type="text" placeholder="pseudo" v-model="signup.pseudo" />
      <input type="email" placeholder="email" v-model="signup.email" />
      <input type="password" placeholder="password" v-model="signup.password" />
      <button @click.prevent="submitSignupForm()">Signup</button>
    </form>
    <p v-if="state.message">
      {{ state.message }}
    </p>
  </div>
</template>
<script setup>
const signup = reactive({
  pseudo: "",
  email: "",
  password: "",
});

const state = reactive({
  message: "",
  status: 0,
});

const router = useRouter();
const submitSignupForm = async () => {
  const res = await $fetch("/api/user/signup", {
    method: "POST",
    body: signup,
  });
  console.log(res);
  state.message = res.message;
  state.status = res.status;
  if (res.status === 200) {
    router.push("/");
    const user = useUsers();
    console.log(res.data);
    state.data.user = user.data;
    user.auth = true;
  }
};
</script>
