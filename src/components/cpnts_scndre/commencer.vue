<template>

    <div class="w-full h-1/1 bg-zinc-200 absolute top-10 " v-if="is_visible">
        <h1 class="text-center text-2xl font-bold font-serif p-4"> Tache en cours: {{ tache.nom }}</h1>
        <div class=" flex flex-col w-2/3 m-auto text-center" >
         <span class="span"> <b>Date de debut:</b> Aujourd'hui </span>
        <span class="span"> <b>Durrée : </b> {{ parseInt(tache.duree) }} heures {{ (tache.duree*60)%60 }}minutes</span> 
        <span class="span"> <b>Catégorie : </b>{{ tache.categorie }}</span>
        <span class="span"> <b>Description : </b> {{ tache.description }}</span>
      </div>

         <div> 
            <hr class="w-full mt-5">
           <h1 class="text-center font-semibold p-5 font-serif " style="font-size: 19px ;">Temps restant </h1>
           <div class="w-120 h-50 bg-amber-100 m-auto rounded-full border-2 border-black flex justify-center items-center max-phone:w-80">
               <span class="time_">{{ parseInt(tache.duree) }}</span> <span class="label_time">H</span>
               <span class="time_">{{ parseInt((tache.duree*60)%60) }}</span> <span class="label_time">Min</span>
               <span class="time_">00</span> <span class="label_tim">S</span>
           </div>

        <div class="flex justify-center gap-15 mt-10 ">
           <button class="btn bg-amber-200" @click="debuter(tache.duree)" id="deb"> Commencer </button>
           <button class="btn bg-amber-50" @click="pause">{{is_paused }}</button>
        </div>

         </div>
         <hr class="w-full mt-1">

        <div class="flex justify-center mt-5">
         <button class="w-30 bg-red-600 font-bold text-white py-3 rounded-full" @click="quitter">Quitter </button>
        </div>
    </div>
</template>

<script setup>
import { inject ,ref } from 'vue';


const is_visible=inject('com') // variable qui permet d'afficher ou non la partie tâche en cours

function quitter(){

    if (confirm("Voulez vous quitter ?")){

    clearInterval(intervalle) // arrêter le timer 

    is_visible.value=false
        
    }
   
}


const tache=inject('tache') // variable qui contient la tache qui s'éxcute 

const spans=document.getElementsByClassName("time_") // récuperation de nos span qui constitue le chrono

var heure= parseInt(tache.value.duree) // récuperation de la durrée en heure 

var min=(tache.value.duree*60)%60  // récuperation de la minutes 

var sec=0



// fonction qui permet de commencer 
let intervalle

function debuter() {

    
const debut = document.getElementById('deb');

// Désactiver l'élément
debut.disabled = true;

// Changer la couleur de fond
debut.style.backgroundColor = 'green';

   intervalle=setInterval(() => {

    if (min==0 && heure==0 && sec==0) {
        alert("le temps impartie est fini la tâche sera supprimé sur votre liste de tâche ")

        tache_accomplie(tache.value.nom) // suppression de la tache 
        
        clearInterval(intervalle)
    }

      if (sec==0 && min!=0){
        sec=60
        min--

      }
      if (min==0 && sec==0){
        heure--
        min=59
        sec=60
      }
      sec--

      spans[0].textContent=(""+heure).padStart(2,"0");
      spans[1].textContent=(""+min).padStart(2,"0");
      spans[2].textContent=(""+sec).padStart(2,"0");


        
    }, 1000);  
       
}
let paused=true

const is_paused=ref('pause')

function pause() { // fonction qui permet de mettre en pause notre chrono 
    if(paused){
    clearInterval(intervalle)
    is_paused.value="Reprendre"}

    else{
        debuter() // on fait appel à la fonction debuter qui rélance le chrono à là où on sait arrêter
        is_paused.value='pause'
    }
    paused=!paused
    
    
}

async function tache_accomplie() { // fonction qui permet de supprimer la tâche accomplie
  
 const url= 'http://127.0.0.1:8000/'+tache.value.nom;
 console.log(url)
 const reponse= await fetch(url,{
    method: 'DELETE',
 })

 if (reponse.ok===true){
    console.log(" Reponse bien prise en compte ")
 }
 
     
}

</script>