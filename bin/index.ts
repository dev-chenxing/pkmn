import * as fs from "fs";

function loadJson(filename: string): unknown {
	const json = fs.readFileSync(filename, "utf-8");
	return JSON.parse(json);
}
function saveJson(filename: string,data: unknown): void {
	fs.writeFileSync(filename, JSON.stringify(data, null, 0), "utf-8");
}

const pokeapi = loadJson("data/pokemon.json") as Record<string, string|Array<string>>[]
const pkmn = pokeapi.map((pkmon => {return {name:pkmon.name,types:pkmon.types}}))
saveJson("src/pkmn.json", pkmn)
