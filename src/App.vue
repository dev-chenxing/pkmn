<script setup lang="ts">
import { onUpdated, ref, type Ref } from 'vue'
import pkmn from './pkmn.json'
import type { Pokemon, PokePrompt } from './pkmn.d.ts'
import { PokeTypes } from './pkmn.ts'

const prompts: Ref<Array<PokePrompt>> = ref([])
const inputValue = ref('')
const sectionRef = ref<InstanceType<typeof HTMLDivElement>>()

function getPokemon(query: string): Pokemon | undefined {
  return pkmn.find((pokemon) => {
    return pokemon.name === query
  }) as Pokemon
}

function onsubmit() {
  if (inputValue.value) {
    const query = inputValue.value.toLowerCase()
    const types = getPokemon(query)
    prompts.value.push({
      query: query,
      result: types || 'no result',
    })
    inputValue.value = ''
  }
}

onUpdated(() => {
  if (sectionRef.value) {
    sectionRef.value.scrollTop = sectionRef.value.scrollHeight
  }
})
</script>

<template>
  <header class="flex">
    <form class="w-full" @submit.prevent="onsubmit">
      <span>Pokedex> </span>
      <input type="search" autocomplete="off" placeholder="Search Pokedex" v-model="inputValue" />
    </form>
  </header>
  <div class="overflow-y-scroll" id="section" ref="sectionRef">
    <template v-for="(prompt, i) in prompts" :key="i">
      <p v-if="typeof prompt.result === 'string'" class="leading-[14px] h-5">
        {{ prompt.query }}> {{ prompt.result }}
      </p>
      <p v-else class="flex gap-1 leading-[14px] h-5">
        {{ prompt.result.name.toUpperCase() }}/
        <template v-for="type in prompt.result.types" :key="type">
          <button
            :style="{
              backgroundColor: PokeTypes[type].color,
            }"
            class="text-shadow tracking-tighter px-1 rounded-sm h-[17px] text-white"
          >
            {{ PokeTypes[type].label }}
          </button>
        </template>
      </p>
    </template>
  </div>
</template>

<style scoped>
#section {
  height: calc(100% - 24px);
}
</style>
