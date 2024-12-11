<script setup lang="ts">
import { ref } from 'vue'

const query = ref('')
const inputValue = ref('')
function onsubmit() {
  if (inputValue.value) {
    query.value = inputValue.value
    inputValue.value = ''
  }
}
</script>

<template>
  <header class="flex">
    <form class="w-full" @submit.prevent="onsubmit">
      <span>Pokedex> </span>
      <input
        type="search"
        autocomplete="off"
        placeholder="Search Pokedex"
        class="bg-black"
        v-model="inputValue"
      />
    </form>
  </header>
  <section>
    <p>{{ query }}</p>
  </section>
</template>

<style scoped></style>
