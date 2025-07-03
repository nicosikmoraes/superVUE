<template>
    <div class="options_container">
        <div class="login_btn">Entrar</div>
        <div class="cart_btn">
            <img id="img_cart" src="/src/assets/images/cart-plus.png">
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
/* Container */
.options_container {
  display: flex;
  align-items: center;
  gap: 15px;
}

/* Button */
.login_btn {
    background-color: #b5d985;
    color: white;
    font-weight: 600;
    padding: 7px 15px;
    border-radius: 6px;
    opacity: 0.9;
    cursor: pointer;
}

.login_btn:hover {
    opacity: 1;
    transform: scale(1.05);
}

/* Carrinho */
.cart_btn {
    min-width: 40px;
}

#img_cart {
    width: 65px;
    cursor: pointer;
}

#img_cart:hover {
    transform: scale(1.1);
}

</style>