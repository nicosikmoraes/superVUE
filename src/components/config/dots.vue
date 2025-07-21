<template>
  <div class="loading-dots">
    <span class="dot">.</span><span class="dot">.</span><span class="dot">.</span>
  </div>
</template>

<style scoped>
.loading-dots {
  font-size: 10px;
  font-weight: bold;
  display: inline-block;
}

.dot {
  animation: blink 1.4s infinite;
  opacity: 0;
  color: #afafaf;
}

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}
.dot:nth-child(4) {
  animation-delay: 0.6s;
}

@keyframes blink {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
