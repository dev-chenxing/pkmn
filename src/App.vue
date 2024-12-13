<script setup lang="ts">
import { onUpdated, ref, type Ref } from 'vue'
import pkmn from './pkmn.json'

const PokeTypes = {
  normal: {
    label: 'NORMAL',
    color: '#A8A878',
  },
  fighting: {
    label: 'FIGHT',
    color: '#C03028',
  },
  flying: {
    label: 'FLYING',
    color: '#A890F0',
  },
  poison: {
    label: 'POISON',
    color: '#A040A0',
  },
  ground: {
    label: 'GROUND',
    color: '#E0C068',
  },
  rock: {
    label: 'ROCK',
    color: '#B8A038',
  },
  bug: {
    label: 'BUG',
    color: '#A8B820',
  },
  ghost: {
    label: 'GHOST',
    color: '#705898',
  },
  steel: {
    label: 'STEEL',
    color: '#B8B8D0',
  },
  // 'mystery': {
  //   label: '???',
  //   color: "#68A090"
  // },
  fire: {
    label: 'FIRE',
    color: '#F08030',
  },
  water: {
    label: 'WATER',
    color: '#6890F0',
  },
  grass: {
    label: 'GRASS',
    color: '#78C850',
  },
  electric: {
    label: 'ELECTR',
    color: '#F8D030',
  },
  psychic: {
    label: 'PSYCHC',
    color: '#F85888',
  },
  ice: {
    label: 'ICE',
    color: '#98D8D8',
  },
  dragon: {
    label: 'DRAGON',
    color: '#7038F8',
  },
  dark: {
    label: 'DARK',
    color: '#705848',
  },
}

type PokeType = keyof typeof PokeTypes

const PokeTypeEffectives = {
  normal: {
    rock: 0.5,
    steel: 0.5,
    ghost: 0,
  },
  fire: {
    fire: 0.5,
    water: 0.5,
    grass: 2,
    ice: 2,
    bug: 2,
    rock: 0.5,
    dragon: 0.5,
    steel: 2,
  },
  water: {
    fire: 2,
    water: 0.5,
    grass: 0.5,
    ground: 2,
    rock: 2,
    dragon: 0.5,
  },
  electric: {
    water: 2,
    electric: 0.5,
    grass: 0.5,
    ground: 0,
    flying: 2,
    dragon: 0.5,
  },
  grass: {
    fire: 0.5,
    water: 2,
    grass: 0.5,
    poison: 0.5,
    ground: 2,
    flying: 0.5,
    bug: 0.5,
    rock: 2,
    dragon: 0.5,
    steel: 0.5,
  },
  ice: {
    water: 0.5,
    grass: 2,
    ice: 0.5,
    ground: 2,
    flying: 2,
    dragon: 2,
    steel: 0.5,
    fire: 0.5,
  },
  fighting: {
    normal: 2,
    ice: 2,
    poison: 0.5,
    flying: 0.5,
    psychic: 0.5,
    bug: 0.5,
    rock: 2,
    dark: 2,
    steel: 2,
    ghost: 0,
  },
  poison: {
    grass: 2,
    poison: 0.5,
    ground: 0.5,
    rock: 0.5,
    ghost: 0.5,
    steel: 0,
  },
  ground: {
    fire: 2,
    electric: 2,
    grass: 0.5,
    poison: 2,
    flying: 0,
    bug: 0.5,
    rock: 2,
    steel: 2,
  },
  flying: {
    electric: 0.5,
    grass: 2,
    fighting: 2,
    bug: 2,
    rock: 0.5,
    steel: 0.5,
  },
  psychic: {
    fighting: 2,
    poison: 2,
    psychic: 0.5,
    dark: 0,
    steel: 0.5,
  },
  bug: {
    fire: 0.5,
    grass: 2,
    fighting: 0.5,
    poison: 0.5,
    flying: 0.5,
    psychic: 2,
    ghost: 0.5,
    dark: 2,
    steel: 0.5,
  },
  rock: {
    fire: 2,
    ice: 2,
    fighting: 0.5,
    ground: 0.5,
    flying: 2,
    bug: 2,
    steel: 0.5,
  },
  ghost: {
    normal: 0,
    psychic: 2,
    dark: 0.5,
    steel: 0.5,
    ghost: 2,
  },
  dragon: {
    dragon: 2,
    steel: 0.5,
  },
  dark: {
    fighting: 0.5,
    psychic: 2,
    ghost: 2,
    dark: 0.5,
    steel: 0.5,
  },
  steel: {
    fire: 0.5,
    water: 0.5,
    electric: 0.5,
    ice: 2,
    rock: 2,
    steel: 0.5,
  },
}

export interface Pokemon {
  name: string
  types: PokeType[]
}

export interface PokePrompt {
  query: string
  result: Pokemon | string
}

const prompts: Ref<Array<PokePrompt>> = ref([])
const inputValue = ref('')
const sectionRef = ref<InstanceType<typeof HTMLDivElement>>()

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
      <span>Pokedex Emerald> </span>
      <input type="search" autocomplete="off" placeholder="Search Pokedex" v-model="inputValue" />
    </form>
  </header>
  <div class="overflow-y-scroll" id="section" ref="sectionRef">
    <template v-for="(prompt, i) in prompts" :key="i">
      <p v-if="typeof prompt.result === 'string'" class="leading-[22x] h-5">
        {{ prompt.query }}> {{ prompt.result }}
      </p>
      <p v-else class="leading-[22x] h-5 inline-block">
        {{ prompt.result.name.toUpperCase() }}/
        <template v-for="type in prompt.result.types" :key="type">
          <span
            :style="{
              backgroundColor: PokeTypes[type].color,
            }"
            class="text-shadow tracking-tighter px-1 rounded-sm h-[17px] text-white mr-1"
          >
            {{ PokeTypes[type].label }}
          </span> </template
        >/
        <template
          v-for="[multiplier, types] in Object.entries(
            getTypeEffectiveness(prompt.result.types),
          ).sort(([a, _], [b, __]) => Number(b) - Number(a))"
        >
          <template v-if="types.length > 0">
            Takes {{ multiplier }}x from
            <template v-for="type in types" :key="type">
              <span
                :style="{
                  backgroundColor: PokeTypes[type].color,
                }"
                class="text-shadow tracking-tighter px-1 rounded-sm h-[17px] text-white mr-1"
              >
                {{ PokeTypes[type].label }}
              </span>
            </template>
          </template>
        </template>
      </p>
    </template>
  </div>
</template>

<style>
#section {
  height: calc(100% - 24px);
}
* {
  box-sizing: border-box;
}

body {
  font-family: Consolas;
  font-size: 16px;
  max-height: 100vh;
}

#app {
  padding: 4px 8px;
  overflow: clip;
  height: 100vh;
}

input:focus-visible {
  outline: none;
}
</style>
