import './assets/style.css'
import { createApp } from 'vue';
import App from './App.vue';  // Assure-toi que le nom du composant est "App" avec une majuscule

const app = createApp(App);  // Crée l'application Vue avec le composant App

app.mount('#app');  // Monte l'application sur l'élément avec l'ID "app"
