<template>
  <div>
    <h1>Reset Password</h1>
    <form>
      <input type="email" v-model="resetData.email" placeholder="Email" />
      <input
        type="password"
        v-model="resetData.password"
        placeholder="Password"
      />
      <input
        type="password"
        v-model="resetData.password_confirmation"
        placeholder="Password Confirmation"
      />
      <button @click.prevent="sendResetPassForm()">Reset Password</button>
    </form>
    <p v-if="state.message">{{ state.message }}</p>
  </div>
</template>
<script setup>
const route = useRoute();
const userUUID = route.params.uuid;
const resetData = reactive({
  password: "",
  password_confirmation: "",
  email: "",
});

const state = reactive({
  message: "",
});

const router = useRouter();
const user = useUsers();
const sendResetPassForm = async () => {
  if (resetData.password !== resetData.password_confirmation) {
    state.message = "Passwords do not match";
    return;
  }

  const res = await $fetch(`/api/user/update-password/${userUUID}`, {
    method: "POST",
    body: resetData,
  });
  console.log(res);
  state.message = res.message;
  if (res.status === 200) {
    if (!user.auth) {
      router.push("/connexion");
    } else {
      router.push("/");
    }
  }
};
</script>
