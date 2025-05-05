
import { UuidAdapter } from "@/adapters/UuidAdapter"
import { fetchPokemons } from "@/services/pokemonService"
import type { PokemonGame, PokemonGameInit, PokemonResponse,  } from "@/types/pokemons.type"
import { ref } from "vue"

const uuid = new UuidAdapter() 

const pokemonGameInitDefault:PokemonGameInit = {
    limit:50,
    numPokemons:6
}

const usePokemons = () => {

    const pokemons= ref<PokemonGame[]>([])

    const getPokemons = async (pokemonGameInit:PokemonGameInit=pokemonGameInitDefault) => {	

        const data:PokemonResponse = await fetchPokemons(pokemonGameInit.limit!)

        const idsRandom = Array.from({length: pokemonGameInit.limit!}, (_, i) => i + 1)
            .sort( ()=>Math.random() - 0.5)
            .slice(0,pokemonGameInit.numPokemons)
      

        if(data.results){
            pokemons.value = data.results.map( pokemon => {
                const id = pokemon.url.split('/').slice(-2)[0]
                const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
                return {
                    name: pokemon.name,
                    image,
                    id: Number(id),
                    idUnique : ''
                }

            }).filter( pokemon =>  idsRandom.includes(pokemon.id) ) 
        }

        pokemons.value = [...pokemons.value,...pokemons.value]

        pokemons.value = pokemons.value.map((pokemon)=>({
            name:pokemon.name,
            image:pokemon.image,
            id:pokemon.id,
            idUnique: uuid.generate()
        }))

        pokemons.value = pokemons.value.sort(()=> Math.random() - 0.5)

    }

    return {
        pokemons,
        getPokemons
    }
}

export default usePokemons