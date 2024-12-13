import * as fs from "fs";

interface Pokemon {
	name: string,
	types: string[],
		typesOld?: string[]
}

function loadJson(filename: string): unknown {
	const json = fs.readFileSync(filename, "utf-8");
	return JSON.parse(json);
}
function saveJson(filename: string,data: unknown): void {
	fs.writeFileSync(filename, JSON.stringify(data, null, 0), "utf-8");
}

const pokeapi = loadJson("data/pokemon.json") as Array<Pokemon>
const pkmn: Array<Pokemon> = []
pokeapi.forEach((pkmon => {
	if (!pkmon.name.includes("-alola")) if (!pkmon.name.includes("-galar")) if (!pkmon.name.includes("-mega")) {
		if (pkmon.typesOld) pkmn.push({name:pkmon.name,types:pkmon.typesOld})
			else if (!(pkmon.types.includes("fairy"))) pkmn.push({name:pkmon.name,types:pkmon.types})
		}
}))
saveJson("src/pkmn.json", pkmn)
