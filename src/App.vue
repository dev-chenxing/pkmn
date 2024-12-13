<script setup lang="ts">
import { onUpdated, ref, type Ref } from 'vue'
import pkmn from './pkmn.json'
import { PokeTypes, PokeTypeEffectives } from './pkmn.ts'

type PokeType = keyof typeof PokeTypes

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

<style scoped>
#section {
	height: calc(100% - 24px);
}
</style>
