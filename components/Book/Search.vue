<template>
  <div>
    <input
      type="text"
      v-model="search"
      placeholder="Search for a book"
      @keypress.enter="handleSearchBooks"
    />
    <div v-if="state.books.length > 0">
      <p v-if="state.message">
        {{ state.message }}
      </p>
      <ul>
        <li v-for="(book, index) in state.books" :key="index">
          <nuxt-link :to="'/book/' + book.id">
            {{ book.title }} by {{ book.author }}
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
const search = ref("");
const state = reactive({
  books: [],
  message: "",
});

const handleSearchBooks = async () => {
  state.books = [];
  const res = await $fetch("/api/book/" + search.value, {
    method: "GET",
  });
  console.log(res);
  if (!res.data) {
    state.message = "No books found";
    return;
  }
  state.books = res.data.map((book) => ({
    title: book.volumeInfo.title,
    author: book.volumeInfo.authors
      ? book.volumeInfo.authors.map((author) => author).join(", ")
      : "",
    id: book.id,
  }));
  state.message = res.data.length + " books found";
};
</script>
