import { PokeTypes } from "./pkmn"

type PokeTypeObject = {
  label: string,
  color: string
}

type PokeType = keyof typeof PokeTypes

interface Pokemon {
  name: string
  types: PokeType[]
}

interface PokePrompt {
  query: string,
  result: Pokemon | string
}
