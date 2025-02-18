<template>
    <Header :tache="taches" @reach="rechercher"></Header>
    <Body :tache="tabfilter" @supp="deleteItems" @ajout="addItems"></Body>
  </template>
  
  <script setup>
  import Header from './components/Header.vue'
  import Body from './components/body.vue'
  import { ref } from 'vue'
  
  const taches=ref([])   // Liste des tâches initiale

  taches.value=JSON.parse(localStorage.getItem("taches")) || taches.value
<<<<<<< HEAD


  const tabfilter = ref([])  // Liste des tâches filtrées

  tabfilter.value=[...taches.value]
=======

  const tabfilter = ref([])  // Liste des tâches filtrées

  
>>>>>>> 42e59dcd3bfdf46a082a7d08d9c395aea88188c7
  
  
  // Récupérer les données de l'API
 /* async function recupere() {
      const reponse = await fetch('http://127.0.0.1:8000/')
      if (reponse.ok === true) {
          const data = await reponse.json()
          taches.value = data.taches  // Stocke les tâches récupérées
          tabfilter.value = [...taches.value] // Initialise tabfilter avec toutes les tâches copie sans lié les deux réferences   
        } else {
          throw new Error("Impossible de contacter le serveur");
      }
  }

  recupere()*/
<<<<<<< HEAD
  // fonction qui permet d'ajouter sans passer par l'API

  function addItems(objet){
    taches.value=JSON.parse(localStorage.getItem("taches"))
    const id=taches.value.length
=======
  tabfilter.value = JSON.parse(localStorage.getItem("taches")) || [... taches.value]
  // fonction qui permet d'ajouter sans passer par l'API

  function addItems(objet){
    const id=tabfilter.value.length
>>>>>>> 42e59dcd3bfdf46a082a7d08d9c395aea88188c7
    objet.id=id
    taches.value.push(objet)
    localStorage.setItem("taches",JSON.stringify(taches.value))
    tabfilter.value = JSON.parse(localStorage.getItem("taches"))
    
  }

  
  
  // Envoi de données à l'API
 /* async function envoie(objet) {
     
      console.log(objet)
    
      try {
          const r = await fetch('http://127.0.0.1:8000/a', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(objet),
          });
  
          if (r.ok) {
              console.log("Bien reçu");
              const reponse = await r.json();
              console.log(reponse);
              recupere()
          } else {
              throw new Error('Impossible d\'ajouter du contenu au serveur');
          }
  
      } catch (error) {
          console.error(error.message);
      }
  }*/

  // supprimer taches 
  function deleteItems(tache){
    let indice=tache.id
    tabfilter.value.splice(indice,1)
    taches.value.splice(indice,1)
    localStorage.setItem("taches",JSON.stringify(taches.value))
    
  }
  // Supprimer une tâche
  /*async function supprimer(tache) {
      console.log(tache.id)
      const url = 'http://127.0.0.1:8000/' + tache.id
      const d = await fetch(url, {
          method: 'DELETE',
      })
      if (d.ok === true) {
          console.log("suppression réussi")
      } else {
          throw new Error("Erreur de suppression");
      }
      recupere()
  } */
  
  // Fonction de recherche
  function rechercher(params) {
      taches.value=JSON.parse(localStorage.getItem('taches'))
      tabfilter.value = taches.value.filter(tache =>
          tache.nom.toLowerCase().includes(params.toLowerCase())
      );
  }
  
  </script>
  
  <style scoped>
  
  </style>
  
