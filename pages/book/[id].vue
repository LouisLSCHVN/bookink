<template>
  <ReviewAdd />
  <pre><code>{{ book }}</code></pre>
  <article v-if="state.reviews" v-for="(review, index) in state.reviews">
    <h3>{{ review.content }}</h3>
    <p>Rating: {{ review.rating }}</p>
    <p>Spoiler: {{ review.spoiler }}</p>
  </article>
</template>
<script setup>
const route = useRoute();
const id = ref(route.params.id);

const book = ref({});
const state = reactive({
  message: "",
  status: 0,
  reviews: [],
});

const fetchBook = async () => {
  const { data: res } = await useFetch(`/api/book/single/${id.value}`);
  if (res.value.status !== 200) {
    state.message = res.value.message;
    return;
  }
  state.message = res.value.message;

  console.log(res.value);

  getBookById(res.value.data);
};

const getBookById = (books) => {
  if (!books) return;
  if (!books.length) {
    book.value = books;
    return;
  }

  books.forEach((item) => {
    if (item.id === id.value) {
      book.value = item;
      console.log("le book en question ", book.value);
    }
  });
};

const getReviews = async () => {
  const { data: res } = await useFetch("/api/review/" + id.value);
  console.log(res.value);
  if (res.value.status !== 200 || !res.value.data) {
    state.message = res.value.message;
    return;
  }
  state.message = res.value.message;
  state.reviews = res.value.data;
};

if (id.value) {
  fetchBook();
  getReviews();
}
</script>
