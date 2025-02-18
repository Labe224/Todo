<template>
 
  
  <div :id="liste_tache" class="bg-red-200 w-full max-tab:w-full">
  <h1 class="text-black text-center text-2xl pt-2 font-bold">Liste de vos Tâches</h1>
  <h1 v-if="props.tache.length==0" class="text-center font-bold pt-12">
    Vous n'avez aucune taches encore
  </h1>
  <ul class="mt-10 w-full" v-for="tache in props.tache" >
    <li :key="tache.id" class="flex m-2 justify-between">
     <div > <span class="pl-2 font-bold font-serif text-center w-1/2">{{ tache.nom }} </span>
    </div>
      <div class="flex justify-between w-1/2 item-center max-tab:justify-around">
      <span class="">{{ tache.debut }}</span>
      <button @click="details_fn(tache.nom,1)" class=" btn_details">Détails</button>
      <button class=" btn_commencer" @click="start(tache)">Commencer</button>
      <button class=" btn_supprimer  " @click="supprimerTache(tache)">
        Supprimer
      </button>
      <div class="pop_up absolute w-50 bg-white p-5 mb-10 hidden mt-7" :class="tache.nom">
        <ul class="w-full font-bold ">
          <li class="items text-green-300" @click="details_fn(tache.nom,0)">Details</li>
          <li class="items text-blue-300" @click="start(tache)">commencer</li>
          <li class="items text-red-300" @click="supprimerTache(tache)">supprimer</li>
        </ul>
      </div>
      <div class="hidden max-tab:block"><i class="fas fa-bars " @click="affiche_pup(tache.nom)"></i></div>
    </div>
    </li>
    <div :class="tache.nom" class="det">
    <div class=" flex flex-col w-2/3 m-auto text-center" >
        <span class="span"><b>Nom :</b> {{ tache.nom }}</span>
         <span class="span"> <b>Date de debut : </b>{{ tache.debut }}</span>
        <span class="span"><b>Durrée : </b>{{ parseInt(tache.duree) }} heures {{(tache.duree*60)%60 }}minutes</span> 
        <span class="span"><b>Catégorie : </b>{{ tache.categorie }}</span>
        <span class="span"><b>Description : </b> {{ tache.description }}</span>
      </div>
      <button class="hidden max-tab:block text-center text-zinc-600 m-auto font-bold border-1 bg-amber-100 p-1 my-2 shadow-md" @click="details_fn(tache.nom)">masquer</button>
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

function affiche_pup(params) {
  const ma_div=document.getElementsByClassName(params)
  ma_div[0].classList.toggle('hidden')
  
}

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
   'id':2,
  'nom':'',
  'duree':0,
  "debut":'',
  'categorie':'',
  'description':''
}) // variable qui contenir la tache qu'on va créer à partir du formulaire pour l'envoyer au notre base de données


function ajouter(){

  taches.value.duree=heure.value+(min.value/60)

  if (taches.value.nom && taches.value.duree && taches.value.debut && taches.value.categorie) { 
    const today=getTodayDate()
  if (today>taches.value.debut)
      alert("Il y'a un problème avec la date que vous avez définis")

  else{   
   emit('ajout',taches.value)
   taches.value.nom='' 
    taches.value.duree=0
    taches.value.debut =''
    taches.value.categorie=''
    taches.value.description=''
    min.value=0
    heure.value=0
 

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

function details_fn(params,params2) {

 let div=document.getElementsByClassName(params)
 div[1].classList.toggle('det')
 if (params2==0)
 affiche_pup(params)
 

}
function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const tache=ref('{}') 

// fonction qui permet de commencer une tâche 
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
