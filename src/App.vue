<script setup lang="ts">
import { ref, type Ref } from 'vue'
import pkmn from './pkmn.json'
import { PokeTypeEffectives, PokeTypes, type PokeType } from './poke-types'

export interface Pokemon {
  name: string
  types: PokeType[]
  speciesNames: {
    en: string
  }
}

export interface PokePrompt {
  query: string
  result: Pokemon | string
}

const prompts: Ref<Array<PokePrompt>> = ref([])
const inputValue = ref('')

function normalizeBaseName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[♀♂]/g, '') // remove gender symbols
    .replace(/\s+/g, ' ') // replace multiple spaces with a single space
}

function getTypeEffectiveness(types: Array<PokeType>): Record<number, Array<PokeType>> {
  const typeEffectiveness = {} as Record<PokeType, number>
  for (const defenseType of types) {
    for (const [atkType, defenseTypes] of Object.entries(PokeTypeEffectives)) {
      const attackType = atkType as PokeType
      const defenseMul = defenseTypes as Record<PokeType, number>
      if (defenseType in defenseMul) {
        if (attackType in typeEffectiveness)
          typeEffectiveness[attackType] = typeEffectiveness[attackType] * defenseMul[defenseType]
        else typeEffectiveness[attackType] = defenseMul[defenseType]
      }
    }
  }
  const typeEffectivenessGroup: Record<number, Array<PokeType>> = {
    4: [],
    2: [],
    1: [],
    0.5: [],
    0.25: [],
    0: [],
  }
  for (const type in PokeTypes) {
    if (type in typeEffectiveness) {
      const mul = typeEffectiveness[type as PokeType]
      typeEffectivenessGroup[mul].push(type as PokeType)
    } else {
      typeEffectivenessGroup[1].push(type as PokeType)
    }
  }
  return typeEffectivenessGroup
}

function getPokemon(query: string): Pokemon | undefined {
  const normalizedQuery = query.trim().toLowerCase()
  const normalizedBaseQuery = normalizeBaseName(query)

  const exactMatch = pkmn.find((pokemon) => {
    const normalizedName = pokemon.name.toLowerCase()
    const normalizedSpeciesName = pokemon.speciesNames.en.toLowerCase()
    return normalizedName === normalizedQuery || normalizedSpeciesName === normalizedQuery
  }) as Pokemon

  if (exactMatch) return exactMatch

  return pkmn.find((pokemon) => {
    const normalizedSpeciesName = pokemon.speciesNames.en.toLowerCase()
    return normalizeBaseName(normalizedSpeciesName) === normalizedBaseQuery
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
</script>

<template>
  <div
    class="h-6 border-b-3 border-black bg-[linear-gradient(90deg,#7e0f0f_0%,#7e0f0f_4%,#a81818_4%,#a81818_6%,#c91f1f_6%,#c91f1f_94%,#a81818_94%,#a81818_96%,#7e0f0f_96%,#7e0f0f_100%)]"
    aria-hidden="true"
  ></div>
  <div class="flex min-h-0 flex-1 flex-col mx-2">
    <form class="w-full" @submit.prevent="onsubmit">
      <span>Pokédex > </span>
      <input
        type="search"
        class="bg-white caret-black focus-visible:outline-none"
        autocomplete="off"
        placeholder="Search Pokédex"
        v-model="inputValue"
      />
    </form>
    <div class="overflow-y-scroll flex-1 min-h-0">
      <template v-for="(prompt, i) in prompts.slice().reverse()" :key="i">
        <p v-if="typeof prompt.result === 'string'" class="leading-[22px]">
          {{ prompt.query }}> {{ prompt.result }}
        </p>
        <p v-else class="leading-[22px] inline-block">
          {{ prompt.result.name.toUpperCase() }}/
          <span
            v-for="type in prompt.result.types"
            :key="type"
            :style="{
              backgroundColor: PokeTypes[type].color,
            }"
            class="text-shadow tracking-tighter px-1 rounded-sm h-[17px] leading-[17px] text-white mr-1 inline-block"
          >
            {{ PokeTypes[type].label }}
          </span>
          <template
            v-for="[multiplier, types] in Object.entries(
              getTypeEffectiveness(prompt.result.types),
            ).sort(([a, _], [b, __]) => Number(b) - Number(a))"
          >
            <template v-if="types.length > 0"
              >/ Takes {{ multiplier }}x from
              <span
                v-for="type in types"
                :key="type"
                :style="{
                  backgroundColor: PokeTypes[type].color,
                }"
                class="text-shadow tracking-tighter px-1 rounded-sm h-[17px] leading-[17px] text-white mr-1 inline-block"
              >
                {{ PokeTypes[type].label }}
              </span>
            </template>
          </template>
        </p>
      </template>
    </div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: 'Ubuntu Mono';
  font-size: 16px;
  max-height: 100dvh;
}

#app {
  display: flex;
  flex-direction: column;
  overflow: clip;
  height: 100dvh;
}
</style>
