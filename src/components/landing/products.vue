<template>
    <h1 v-for="(filter, index) in landingStore.filtersName" :key="index">
        {{ filter }}
    </h1>
</template>

<script setup>
import { useLandingStore } from '@/stores/landingStore';


    const landingStore = useLandingStore()
</script>

<style scoped></style>