<template>
  <div :id="liste_tache">
  <h1 class="text-black text-center text-2xl pt-2 font-bold">Liste de vos Tâches</h1>
  <ul class="mt-10" v-for="tache in props.tache" >
    <li :key="tache.id" class="flex m-2 justify-between">
     <div > <span class="pl-2 font-bold font-serif text-center w-1/2">{{ tache.nom}} </span>
    </div>
      <div class="flex justify-between w-1/2 item-center ">
      <span class="">{{ tache.debut }}</span>
      <button @click="details_fn(tache.id)" class=" hover:bg-green-600 transition duration-300 bg-green-700 text-white p-1 text-center hover:cursor-pointer shadow-md">Détails</button>
      <button class=" hover:bg-blue-400  transition duration-300 bg-blue-200 text-white text-center p-1 hover:cursor-pointer shadow-md" @click="start(tache)">Commencer</button>
      <button class="  hover:bg-red-900 transition duration-300 bg-red-800 text-white p-1 text-center hover:cursor-pointer shadow-md" @click="supprimerTache(tache)">
        Supprimer
      </button>
    </div>
    </li>
    <div :id="tache.id" class="det">
    <div class=" flex flex-col w-2/3 m-auto text-center" >
        <span class="span"><b>Nom :</b> {{ tache.nom }}</span>
         <span class="span"> <b>Date de debut : </b>{{ tache.debut }}</span>
        <span class="span"><b>Durrée : </b>{{ parseInt(tache.duree) }} heures {{(tache.duree*60)%60 }}minutes</span> 
        <span class="span"><b>Catégorie : </b>{{ tache.categorie }}</span>
        <span class="span"><b>Description : </b> {{ tache.description }}</span>
      </div>
    </div>
    <hr class="w-full" />
  </ul>
</div>
<Formulaire  @ajoute="ajouter" :id="toogle"></Formulaire>
<div>
   <button :id="btn_ajout" @click="afficher_form" class="fixed left-1/2 transform -translate-x-1/2 bottom-4 px-6 py-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition duration-300">
  Ajouter +
</button>
 </div>
 <Commencer v-if="com" ></Commencer>
 </template>

<script setup>

import { provide, ref } from 'vue';

import Commencer from './cpnts_scndre/commencer.vue';

import Formulaire from './cpnts_scndre/formulaire.vue';

// Définir les props du composant (reçoit les tâches en tant qu'array)

const props = defineProps({
  tache: {
    type: Array,
    required: true,
  },
});

// Déclarer l'événement 'supp' que ce composant va émettre

const emit = defineEmits(['supp','ajout']); // nécessaire car notre button se repère plusieurs fois 

const supprimerTache = (tache) => {
  emit('supp', tache); // Emmet l'événement vers le parent avec la tâche
};

const liste_tache=ref('') // ref qui constitue l'id de la div de notre liste de tâche qui va permettre ou non de l'afficher

const toogle=ref('hidden')

const com=ref(false) // variable qui va permettre ou non d'afficher notre chron lord de l'excution de la tâche 

const heure=ref(0)

const min =ref(0)

const taches=ref({
  'nom':'',
  'durre':0,
  "debut":'',
  'categorie':'',
  'description':''
}) // variable qui contenir la tache qu'on va créer à partir du formulaire pour l'envoyer au notre base de données


function ajouter(){

  taches.value.durre=heure.value+(min.value/60)

  taches.value.deb=""+taches.value.deb

  if (taches.value.nom && taches.value.durre && taches.value.debut && taches.value.categorie) { 
    const today=getTodayDate()
  if (today>taches.value.deb)
      alert("Il y'a un problème avec la date que vous avez définis")

  else{   

   emit('ajout',taches.value)

   taches.value.nom=''

   heure.value=0; min.value=0; 

   taches.value.debut=0; 

   taches.value.categorie=''
   
   taches.value.description=''

  liste_tache.value=''// on réaffiche la liste de nos taches 

  toogle.value='hidden'
 } 
  }else
     alert('vous devez remplir tous les champs obligatoire ')
   
}
// Fonction qui permet d'afficher le formulaire quand on clique sur le bouton ajouter 
function afficher_form() {

  liste_tache.value='hidden'
  toogle.value=''
}

// Fonction qui permet d'afficher et de masquer les détails 

function details_fn(params) {
 let div=document.getElementById(params)
 div.classList.toggle('det')

}
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const tache=ref('{}')
function start(params) {
  const today=getTodayDate();
  console.log(today)
  console.log(params.debut)
  if (today==params.debut) {
   com.value=true
   tache.value=params
    
  }else
  alert("La date de debut de la tâche n'est pas encore arrivé ")
  
  
}
// Envoie de variables aux enfants 

// à l'enfant commencer 

provide('tache',tache)
provide('com',com)

// à l'enfant form
provide('taches',taches)
provide('heure',heure)
provide('min',min)

</script>

<style scoped>


</style>
