<template>
 <div class="products_container">
    <div class="filter_container">
        <span>Filtros Selecionados: </span>
        <h1 v-for="(filter, index) in landingStore.filtersName" :key="index">
                {{ filter }}
        </h1>
    </div>
 </div>
</template>

<script setup>
import { useLandingStore } from '@/stores/landingStore';


    const landingStore = useLandingStore()
</script>

<style scoped>
.filter_container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
    margin-left: 40px;
    font-size: 18px;
    background-color: #F0FBE2;
    padding: 6px 18px;
    border-radius: 20px;
}

h1 {
    background-color: #697C51;
    padding: 0 10px;
    border-radius: 12px;
    color: #B5D985;
    font-weight: 600;
}

span {
    font-size: 18px;
    color: #B5D985;
    font-weight: 700;
}
</style>