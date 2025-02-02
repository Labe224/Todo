<template>
<form action="">

    <div class="w-200 bg-zinc-400 h-110 m-auto mt-2" >
      <h1 class="text-center font-bold font-serif space-x-0.5 pt-2 text-2xl">Ajout d'une nouvelle tâche </h1>
      <div class="div"><span class="label">Tâche * :</span> <input type="text" required class="input" v-model="taches.nom"></div>
      <div class="div"><span class="label">Durée * :</span> <div><input type="number" required class="time" v-model="heure"> Heures: <input type="number" class="time" v-model="min">Minutes </div></div>
      <div class="div"><span class="label">Date de debut * :</span> <input type="date" required class="input" v-model="taches.debut"></div>
      <div class="div"> <span class="label">Catégorie * :</span><select name="" id="select" class="input" v-model="taches.categorie">
        <option value="Moins Important">Moins Important</option>
        <option value="Important">Important</option>
        <option value="Très Important">Très important</option>
        <option value="Vitale">Vitale</option>
      </select></div>
      <div class="div"> <span>Description:</span> <textarea v-model="taches.description" name="" id="" cols="80" rows="2" class="bg-zinc-700 text-zinc-300 text-center italic"> Entrez une description</textarea></div>
  
  <button class="bg-blue-200 text-white text-center p-1 w-35
  hover:cursor-pointer shadow-md mt-4 ml-82 " @click.prevent="ajout"> Ajouter  </button>
  </div>
  </form>
</template>

<script setup>

import { inject } from 'vue';
const emit=defineEmits(['ajoute'])
const taches=inject('taches')
const min=inject('min')
const heure=inject('heure')

function ajout(){
  emit('ajoute')
}



</script>