<template>
  <div class="grid grid-cols-3 gap-4 py-5">
    <div 
      v-for="pokemon in pokemons" 
      :key="pokemon.idUnique" 
      class="card-pokemon relative" 
    >
      
      <div 
        class="w-full h-full" 
        v-show="idsSelected.includes(pokemon.idUnique) || idsGuessed.includes(pokemon.id) "
      >
        <img :src="pokemon.image" alt="" >
      </div>

      <div 
        v-show="!idsSelected.includes(pokemon.idUnique) && !idsGuessed.includes(pokemon.id) "
        class="card-pokemon-back w-full h-full "
        :class="{'disabled':isLoading}"
        @click="selectedPokemon(pokemon.idUnique,pokemon.id)"

      >

      </div>
     
     

    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted,ref } from 'vue';
import usePokemons from './composables/usePokemons';
import type { PokemonID } from './types/pokemons.type';
import { sleep } from './utils/sleep';



const {pokemons,getPokemons} = usePokemons()

const idsSelected = ref<PokemonID[]>([])
const idsGuessed = ref<number[]>([])
const isLoading = ref(false)

const selectedPokemon = async(idPokemonSelected:PokemonID,idPokemon:number) => {
  idsSelected.value = [...idsSelected.value,idPokemonSelected]

  if(idsSelected.value.length >=2){

    const pokemon1 = pokemons.value.find((p)=>p.idUnique === idsSelected.value[0])
    const pokemon2 = pokemons.value.find((p)=>p.idUnique === idsSelected.value[1])


    if(pokemon1?.id ===  pokemon2?.id){
      idsGuessed.value = [...idsGuessed.value,idPokemon]
    }

    isLoading.value = true

    await sleep(500);
    idsSelected.value = []

    isLoading.value = false
  }
}

onMounted(() => {
  getPokemons()
})

</script>

<style scoped>

.card-pokemon{
  height: 250px;
  border: 1px solid red;
}

img{
  width: 100%;
  height: 100%;
  object-fit: contain
}

.card-pokemon-back{
  background-color: black;
}

.disabled {
  pointer-events: none;

}

</style>
