<template>
  <div>
    <h1>Buy Premium</h1>
    <p>Buy premium to get access to all the features</p>
    <button @click="buy">Buy</button>
  </div>
</template>
<script setup>
const buy = async () => {
  const res = await $fetch("/api/payment/checkout", {
    method: "POST",
  });
  console.log(res);
};
</script>
