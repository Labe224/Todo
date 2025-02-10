<template>
    <header class="bg-black flex justify-between w-full p-2 text-white max-phone:flex-col max-phone:bg-red-100 max-phone:h-22 max-phone:justify-start max-phone:items-start max-phone:p-0  max-phone:gap-1">
        <div class="max-phone:bg-black max-phone:w-full max-phone:m-0 max-phone:p-2 max-phone:shadow-md">
            Daily_task
        </div>
        <ul class="flex w-full gap-2.5 items-center max-phone:h-10 justify-end max-phone:justify-around max-phone:gap-0">
            <li><input type="text" placeholder="Rechercher une tâche" class="w-80 h-8 text-white p-1 text-center border-b-1 boder-white max-phone:border-1 max-phone:rounded-full max-phone:border-black max-phone:text-black max-phone:" v-model="nom" @input="$emit('reach',nom)"></li>
            <button class=" p-1 bg-blue-500 shadow-xm shadow-zinc-100 hover:scale-110 hover:cursor-pointer focus:ring-1 focus:ring-white max-phone:hidden" @click="$emit('reach',nom)">Rechercher</button>
           <div class="phone:hidden"> <i class="fas fa-search text-black bg-blue-600 p-2 " @click="$emit('reach',nom)"></i></div>
        </ul>
        
    </header>

</template>
<script setup>  
import { ref } from 'vue';
const nom=ref('')
</script>

<style scoped>

</style>