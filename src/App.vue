<script setup lang="ts">
import { onUpdated, ref, type Ref } from 'vue'
import pkmn from './pkmn.json'
import type { PokePrompt, PokeType } from './pkmn.d.ts'
import { PokeTypes } from './pkmn.ts'

const prompts: Ref<Array<PokePrompt>> = ref([])
const inputValue = ref('')
const sectionRef = ref<InstanceType<typeof HTMLDivElement>>()

function getPokeTypes(query: string): Array<string> | undefined {
  return pkmn.find((pokemon) => {
    return pokemon.name === query
  })?.types
}

function onsubmit() {
  if (inputValue.value) {
    const query = inputValue.value.toLowerCase()
    const types = getPokeTypes(query)
    prompts.value.push({
      query: query,
      output: types || 'no result',
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
      <input
        type="search"
        autocomplete="off"
        placeholder="Search Pokedex"
        class="bg-black"
        v-model="inputValue"
      />
    </form>
  </header>
  <div class="overflow-y-scroll" id="section" ref="sectionRef">
    <template v-for="(prompt, i) in prompts" :key="i">
      <p v-if="typeof prompt.output === 'string'" class="leading-[14px] h-5">
        {{ prompt.query }}> {{ prompt.output }}
      </p>
      <p v-else class="flex gap-1 leading-[14px] h-5">
        {{ prompt.query }}>
        <template v-for="type in prompt.output" :key="type">
          <span
            :style="{
              backgroundColor: PokeTypes[type as PokeType].color,
            }"
            class="text-shadow tracking-tighter px-1 rounded-sm h-[17px]"
            >{{ PokeTypes[type as PokeType].label }}</span
          >
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
