<template>
  <pre><code>{{ book }}</code></pre>
</template>
<script setup>
const route = useRoute();
const id = ref(route.params.id);

const book = ref({});
const state = reactive({
  message: "",
  status: 0,
});

const fetchBook = async () => {
  const res = await $fetch(`/api/book/single/${id.value}`);
  if (res.status !== 200) {
    state.message = res.message;
    return;
  }
  console.log(res);
  state.message = res.message;

  console.log(res.data);
  res.data.items.forEach((item) => {
    if (item.id === id.value) {
      book.value = item;
      console.log("le book en question ", book.value);
    }
  });
};

if (id.value) {
  fetchBook();
}
</script>
