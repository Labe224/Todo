<template>
    <header class="bg-black flex justify-between p-2 w-full text-white">
        <div>
            Daily_task
        </div>
        <ul class="flex gap-2.5 items-center">
            <li><input type="text" placeholder="Rechercher une tâche" class="w-80 h-8 text-white p-1 text-center border-b-1 boder-white" v-model="nom"></li>
            <button class=" p-1 bg-blue-500 shadow-xm shadow-zinc-100 hover:scale-110 hover:cursor-pointer focus:ring-1 focus:ring-white" @click="$emit('reach',nom)">Rechercher</button>
        </ul>
        
    </header>

</template>
<script setup>  
</script>

<style scoped>

</style>