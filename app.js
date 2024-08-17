const cart = document.getElementById("cart");
const cartIcon = document.querySelector(".cart-icon");

function toggleCartOpen() {
    if (cart.classList.contains('hide-cart')) {
        cart.classList.remove('hide-cart');
    } else {
        cart.classList.add('hide-cart');
    }
}

cartIcon.addEventListener("click", toggleCartOpen);
