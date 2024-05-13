<template>
  <ReviewAdd :book_id="id" />
  <article
    v-if="state.reviews && state.reviews.length > 0"
    v-for="(review, index) in state.reviews"
    :key="index"
  >
    <h3>{{ review.content }}</h3>
    <p>Rating: {{ review.rating }}</p>
    <p>Spoiler: {{ review.spoiler }}</p>
    <p
      v-if="user.data && review.user_id === user.data.user_id"
      @click="deleteReview(review.review_id)"
    >
      DELETE
    </p>
  </article>
  <pre><code>{{ book }}</code></pre>
</template>
<script setup>
const route = useRoute();
const id = ref(route.params.id);

const user = useUsers();

const book = ref({});
const state = reactive({
  message: "",
  status: 0,
  reviews: [],
});

const getBookById = async () => {
  const res = await $fetch("/api/book/single/" + id.value);
  console.log(res);
  if (res.status !== 200) {
    state.message = res.message;
    return;
  }
  state.message = res.message;
  if (Array.isArray(res.data.items)) {
    book.value = res.data.items.find((bk) => {
      return bk.id === id.value;
    });
  } else {
    book.value = res.data.items;
  }
};

const getReviews = async () => {
  const res = await $fetch("/api/review/book/" + id.value);
  if (res.status !== 200 || !res.data) {
    state.message = res.message;
    return;
  }
  state.message = res.message;
  state.reviews = res.data;
};

const deleteReview = async (id) => {
  const res = await $fetch("/api/review/" + id, {
    method: "DELETE",
    credentials: "include",
  });
  console.log(res);
  await getReviews();

  if (res.status !== 200) {
    state.message = res.message;
    return;
  }
  return res;
};

if (id.value) {
  getBookById();
  getReviews();
}
</script>
