<script setup lang="ts">
import { ref } from 'vue'
import { useFetchJSON } from './hooks/useFetchJSON'
import { publicPath } from './lib/setting'

const query = ref('')
const inputValue = ref('')

const pkmnURL = new URL('pkmn.json', publicPath).href
const pkmn = useFetchJSON<Pokemon[]>(pkmnURL)
function onsubmit() {
  if (inputValue.value) {
    query.value = inputValue.value
    console.log(pkmn)
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
