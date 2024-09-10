
const productsList = document.getElementById("product-list");
const cartDropdown = document.getElementById("cart");
const cartIcon = document.querySelector(".cart-icon");
const badge = document.getElementById("badge");

const discounts = [
    new Discount("A", 3, 1.30),
    new Discount("B", 2, 0.45)
];

const cart  = new Cart(discounts);

function toggleCartOpen() {
    cartDropdown.classList.toggle("hide-cart");
    if (!cart.getCartItems().length && !cartDropdown.classList.contains('hide-cart')) {
        cartDropdown.innerHTML = "<p>Cart is empty</p>";
    }
}

function closeCart() {
    cartDropdown.classList.add("hide-cart");
}

function openCart() {
    cartDropdown.classList.remove("hide-cart");
    debouncedCartClose();
}

const debouncedCartClose = debounce(closeCart, 2000);

cartIcon.addEventListener("click", toggleCartOpen);


stock.forEach(product => {
    const productCard = createProductCard(product);
    productsList.insertAdjacentHTML("beforeend", productCard);
})

productsList.addEventListener("click", (event) => {
    if (event.target.closest("[data-action='add-to-cart']")) {

        const productCard = event.target.closest('.product-card');
        const productName = productCard.getAttribute("data-name");
        const product = stock.find(p => p.name === productName);
        if (product) {

            try {
                cart.addToCart(new Product(product.name, product.price));
                renderCartItems();
                badge.textContent = cart.getTotalCartItems();
                openCart();
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
                <button data-action="add-to-cart" >
                <i class="fas fa-plus-circle"></i> ADD TO CART
                </button>
            </div>
        </article>`
    )
}

function renderCartItems() {
    cartDropdown.innerHTML = "";
    const cartItems = cart.getCartItems();
    let cartHtml = "";

    if (cartItems.length) {
        cartHtml += `
            <div class="cart-header">
                <span>Name</span><span>Qty</span><span>Price</span>
            </div>
        `;
        
        cartItems.forEach(cartItem => {
            cartHtml += createCartItem(cartItem);
        });
        cartHtml += `
            <div class="cart-footer">
                ${createFooterRow("Net Total:", cart.getNetCartTotal())}
                ${createFooterRow("Discount:", cart.getTotalDiscount())}
                ${createFooterRow("Total:", cart.getCartTotal())}
            </div>
        `;
    } else {
        cartHtml += "<p>Cart is empty</p>";
    }

    cartDropdown.innerHTML = cartHtml;
}


function createFooterRow(label, amount) {
    const roundedAmount = amount.toFixed(2);
    return `
        <div>
            <span>${label}</span>
            <span>£${roundedAmount}</span>
        </div>
    `;
}

function createCartItem(cartItem) {
    return `
        <div class="cart-item">
            <span>${cartItem.name}</span>
            <span>${cartItem.qty}</span>
            <span>£${(cartItem.price * cartItem.qty).toFixed(2)}</span>
        </div>
    `;
}

function debounce(callBackFunc, delay) {
    let timerId;

    return function(...args) {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => callBackFunc(args), delay);
    }
}