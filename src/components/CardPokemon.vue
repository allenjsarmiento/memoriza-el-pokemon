<template>
    <div  class="card-pokemon-wrapper" >
        <div 
            class="card-pokemon"
            :class="{ 'flipped': isFlipped}"
        >

            <div 
            class="card-pokemon-front" 
            >
                <img :src="pokemon.image" :alt="pokemon.name" >
            </div>

            <div 
                class="card-pokemon-back"
                @click="selectedPokemon(pokemon)"
                :class="{'disabled':isLoading}"
            >   
                <div class="flex justify-center items-center w-full h-full">
                    <img src="@/assets/pokeball.png" alt="">
                </div>
               
            </div>
        </div>
    </div>
</template>

<script lang='ts' setup>
import type { PokemonGame, PokemonID } from '@/types/pokemons.type';


interface Props{
    isFlipped:boolean;
    pokemon:PokemonGame;
    isLoading:boolean
}

const props = defineProps<Props>()

interface Emits{
    (e:'selectedPokemon',value1:PokemonID,value2:number):void
}

const emits = defineEmits<Emits>()

const selectedPokemon = (pokemon:PokemonGame) => {
    emits('selectedPokemon',pokemon.idUnique,pokemon.id)
}
    
</script>

<style scoped>

.disabled {
  pointer-events: none;

}

</style>