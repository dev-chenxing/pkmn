type PokeTypeObject = {
	label: string,
	color: string
}

type PokeType = keyof typeof PokeTypes
export const PokeTypes = {
	'normal' : {
		label: 'NORMAL',
		color: '#A8A878'
		},
	'fighting' : {
		label: 'FIGHT',
		color: '#C03028'
		},
	'flying' : {
		label: 'FLYING',
		color: '#A890F0'
		},
	'poison' : {
		label: 'POISON',
		color: '#A040A0'
		},
	'ground' : {
		label: 'GROUND',
		color: '#E0C068'
		},
	'rock' : {
		label: 'ROCK',
		color: '#B8A038'
		},
	'bug' : {
		label: 'BUG',
		color: '#A8B820'
		},
	'ghost' : {
		label: 'GHOST',
		color: '#705898'
		},
	'steel' : {
		label: 'STEEL',
		color: '#B8B8D0'
		},
	'???':{
		label: '???',
		color: "#68A090"
	},
	'fire' : {
		label: 'FIRE',
		color: '#F08030'
		},
	'water' : {
		label: 'WATER',
		color: '#F08030'
		},
	'grass' : {
		label: 'GRASS',
		color: '#F08030'
		},
	'electric' : {
		label: 'ELECTR',
		color: '#F85888'
		},
	'psychic' : {
		label: 'PSYCHC',
		color: '#F85888'
		},
	'ice' : {
		label: 'ICE',
		color: '#98D8D8'
		},
	'dragon' : {
		label: 'DRAGON',
		color: '#7038F8'
		},
	'dark' : {
		label: 'DARK',
		color: '#705848'
		}
}

interface Pokemon {
	name: string
	types: PokeType[]
}
