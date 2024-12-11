<script setup lang="ts">
import { ref } from 'vue'
import pkmn from "./pkmn.json"

const output = ref('')
const inputValue = ref('')

function getOutput(input: string): string{
	return pkmn.find((pokemon) => {return pokemon.name === input})?.types.join(" ") ?? "No result"
}

function onsubmit() {
	if (inputValue.value) {
		output.value = getOutput(inputValue.value.toLowerCase())
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
		<p>{{ output }}</p>
	</section>
</template>

<style scoped></style>
