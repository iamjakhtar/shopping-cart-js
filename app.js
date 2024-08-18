
const productsList = document.getElementById("product-list");
const cartDropdown = document.getElementById("cart");
const cartIcon = document.querySelector(".cart-icon");
const addToCartButton = document.getElementById("add-to-cart");

const discounts = [
    new Discount("A", 3, 1.30),
    new Discount("B", 2, 0.45)
];

const cart  = new Cart(discounts);
function toggleCartOpen() {
    if (cartDropdown.classList.contains('hide-cart')) {
        cartDropdown.classList.remove('hide-cart');
        if (!cart.getCartItems().length) {
            cartDropdown.innerHTML = "<p>Cart is empty</p>";
        }
    } else {
        cartDropdown.classList.add('hide-cart');
    }
}

cartIcon.addEventListener("click", toggleCartOpen);


stock.forEach(product => {
    const productCard = createProductCard(product);
    productsList.insertAdjacentHTML("beforeend", productCard);
})

productsList.addEventListener("click", (event) => {
    if (event.target.closest("button#add-to-cart")) {

        const productCard = event.target.closest('.product-card');
        const productName = productCard.getAttribute("data-name");
        const product = stock.find(p => p.name === productName);
        // const price = productCard.getAttribute("data-price");
        if (product) {

            try {
                cart.addToCart(new Product(product.name, product.price));
                renderCartItems();
            } catch (error) {
                alert(error.message);
            }
        }
    }
});


function createProductCard(productObj) {
    const { name, price, image} = productObj;
    return (`
        <article class="product-card" data-name="${name}" data-price="${price}">
            <img src="${image}" alt="Apple image">
            <div class="product-card-info">
                <h3>Product ${name}</h3>
                <p>£${price}</p>
            </div>
            <div class="product-card-footer">
                <button id="add-to-cart" >
                <i class="fas fa-plus-circle"></i> ADD TO CART
                </button>
            </div>
        </article>`
    )
}

function renderCartItems() {
    cartDropdown.innerHTML = "";
    const cartItems = cart.getCartItems();
    if (cartItems.length) {
        const header = `
            <div class="cart-header">
                <span>Name</span><span>Qty</span><span>Price</span>
            </div>
        `;
        cartDropdown.insertAdjacentHTML("beforeend", header);
    } 

    cartItems.forEach(cartItem => {
        const cartItemNode = `
            <div class="cart-item">
                <span>${cartItem.name}</span>
                <span>${cartItem.qty}</span>
                <span>£${(cartItem.price * cartItem.qty).toFixed(2)}</span>
            </div>
        `;
        cartDropdown.insertAdjacentHTML("beforeend", cartItemNode);
    });

    const cartFooter = `
        <div class="cart-footer">
            <div>
                <span>Net Total:</span>
                <span>£${cart.getNetCartTotal().toFixed(2)}</span>
            </div>
            <div>
                <span>Discount:</span>
                <span>£${cart.getTotalDiscount()}</span>
            </div>
            <div>
                <span>Total:</span>
                <span>£${cart.getCartTotal()}</span>
            </div>
        </div>
    `;

    cartDropdown.insertAdjacentHTML("beforeend", cartFooter);
}


