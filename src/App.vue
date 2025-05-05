<template>
  <h1 class="text-6xl font-extrabold text-center text-black drop-shadow-md mt-3">
    ¡Memoriza el Pokémon!
    <span class="block text-3xl  mt-3 mb-5 font-normal">
      Encuentra las parejas y demuestra tu memoria
    </span>
  </h1>
  <div class="grid grid-cols-4 gap-4 py-5 mx-4 md:mx-0">
    <CardPokemon
      v-for="pokemon in pokemons" 
      :key="pokemon.idUnique" 
      :pokemon="pokemon"
      :is-flipped="idsSelected.includes(pokemon.idUnique) || idsGuessed.includes(pokemon.id)"
      @selected-pokemon="onSelectedPokemon"
      :is-loading="isLoading"
      
    />
  </div>
</template>

<script lang="ts" setup>
import { onMounted,ref } from 'vue';
import usePokemons from './composables/usePokemons';
import type { PokemonID } from './types/pokemons.type';
import { sleep } from './utils/sleep';
import CardPokemon from './components/CardPokemon.vue';



const {pokemons,getPokemons} = usePokemons()

const idsSelected = ref<PokemonID[]>([])
const idsGuessed = ref<number[]>([])
const isLoading = ref(false)

const onSelectedPokemon = async(idPokemonSelected:PokemonID,idPokemon:number) => {

  idsSelected.value = [...idsSelected.value,idPokemonSelected]

  if(idsSelected.value.length >=2){

    const pokemon1 = pokemons.value.find((p)=>p.idUnique === idsSelected.value[0])
    const pokemon2 = pokemons.value.find((p)=>p.idUnique === idsSelected.value[1])


    if(pokemon1?.id ===  pokemon2?.id){
      idsGuessed.value = [...idsGuessed.value,idPokemon]
    }

    isLoading.value = true

    await sleep(600);
    idsSelected.value = []
    isLoading.value = false
  }

  //verificar si ya gano
  if(pokemons.value.length/2 === idsGuessed.value.length){
    alert('Ganaste!!!')
    startGame()
  }
  

}

const startGame = () => {
  idsSelected.value = []
  idsGuessed.value = []
  isLoading.value = false
  getPokemons()
}

onMounted(() => {
  startGame()
})

</script>

<style scoped>

</style>
