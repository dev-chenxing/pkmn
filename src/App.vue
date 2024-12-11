<script setup lang="ts">
import { ref } from 'vue'
import pkmn from "./pkmn.json"

const prompts = ref<Array<string>>([])
const inputValue = ref('')

function getPokeTypes(query: string): Array<string>| undefined{
	return pkmn.find((pokemon) => {return pokemon.name === query})?.types
}

function onsubmit() {
	if (inputValue.value) {
		const query = inputValue.value.toLowerCase()
		const types = getPokeTypes(query)
		if (types) prompts.value.push(types.join(" "))
			else prompts.value.push("no result")
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
	<template v-for="(prompt, i) in prompts" :key="i">
		<p >{{ prompt }}</p>
	</template>
</template>

<style scoped></style>
