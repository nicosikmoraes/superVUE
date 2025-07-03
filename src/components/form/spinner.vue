<template>
  <span class="spinner"></span>
</template>

<style>
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: white; /* cor do spinner */
  border-radius: 50%;
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
  display: inline-block;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
