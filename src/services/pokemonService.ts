
import { buildApiAdapter } from "@/factory/apiAdapterFactory"
import type { PokemonResponse } from "@/types/pokemons.type"


const pokemonApi = buildApiAdapter('axios')

export const fetchPokemons = async (limit: number = 50) => {

    const data = await pokemonApi.get<PokemonResponse>(`/pokemon?limit=${limit}`)
    return data
}