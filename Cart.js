class Cart {
    constructor() {
        this.cartItems = [];
    }

    getCartItems() {
        return this.cartItems;
    }

    addToCart(product) {
        if (!(product instanceof Product)) {
            throw new Error("Not a valid product.")
        } else if (this.cartItems.some(item => item.name === product.name)) {
            const newItems = this.cartItems.map(item => {
                if (item.name === product.name) {
                    return {...item, qty: item.qty + 1}
                }
                return item;
            })
            this.setCartItems(newItems);
        }
        else {
            this.setCartItems([...this.cartItems, {...product, qty: 1}]);
        }
    }

    setCartItems(items) {
        this.cartItems = items;
        console.log(this.cartItems);
    }
}
