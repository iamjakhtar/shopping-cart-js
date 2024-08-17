

const cartDropdown = document.getElementById("cart");
const cartIcon = document.querySelector(".cart-icon");
const addToCartButton = document.getElementById("add-to-cart");

const cart  = new Cart();
function toggleCartOpen() {
    if (cartDropdown.classList.contains('hide-cart')) {
        cartDropdown.classList.remove('hide-cart');
    } else {
        cartDropdown.classList.add('hide-cart');
    }
}

cartIcon.addEventListener("click", toggleCartOpen);

addToCartButton.addEventListener("click", (event) => {
    const productCard = event.target.closest('.product-card');
    const productName = productCard.getAttribute("data-name");
    const price = productCard.getAttribute("data-price");
    
    try {
        cart.addToCart(new Product(productName, price));
    } catch (error) {
        alert(error.message);
    }
});
