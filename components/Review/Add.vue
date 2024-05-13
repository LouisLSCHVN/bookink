<template>
  <form @submit.prevent="handleSubmit">
    <label for="content">Content</label>
    <textarea v-model="review.content" id="content"></textarea>
    <label for="rating">Rating</label>
    <input v-model="review.rating" type="number" id="rating" min="0" max="5" />
    <label for="spoiler">Spoiler</label>
    <input v-model="review.spoiler" type="checkbox" id="spoiler" />
    <button type="submit">Submit</button>
  </form>
</template>
<script setup>
const props = defineProps(["book_id"]);

const review = reactive({
  book_id: props.book_id,
  content: "",
  rating: 0,
  spoiler: false,
});

const handleSubmit = async () => {
  const res = await $fetch("/api/review/create", {
    method: "POST",
    body: review,
  });
  console.log(res);
};
</script>
