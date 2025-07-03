<template>
<div class="input_search">
    <input class="inp"  type="text" placeholder="Digite sua pesquisa...">
    <button class="btn" type="button">&#8594;</button>
</div>
</template>

<script setup></script>

<style scoped>

/* Input Container */
.input_search {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

/* Button */
.btn {
    background-color: #b5d985;
    color: white;
    border-radius: 7px;
    height: 40px;
    width: 50px;
    opacity: 0.8;
    cursor: pointer;
}

.btn:hover {
    opacity: 1;
}

/* Input */
.inp {
    border: 1px solid #b5d985;
    padding: 4px 10px;
    border-radius: 7px;
    width: 50%;
    height: 40px;
}

.inp:focus {
    border: 2px solid #b5d985;   
    outline: none;
    box-shadow: none;
}
</style>