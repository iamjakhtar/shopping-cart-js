class Cart {
    constructor(discounts) {
        this.cartItems = [];
        this.discounts = discounts;
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
    }

    getNetCartTotal() {
        if (!this.cartItems.length) return 0.00;
        return this.getCartItems()
            .map(item => parseFloat(item.price) * item.qty)
            .reduce((total, next) => total + next, 0);

    }

    getProductByName(productName) {
        return this.getCartItems().find(item => item.name === productName);
    }

    getTotalCartItems() {
        return this.cartItems.reduce((total, next) => total + next.qty, 0);
    }

    getProductTotal(productName) {
        const product = this.getProductByName(productName);
        return product ? parseFloat(product.price * product.qty) : 0;
    }

    getTotalDiscount() {
        let totalDiscount = 0;
        this.discounts.forEach(({name, requiredQty, discountPrice}) => {
            const product = this.getProductByName(name);

            if (product) {
                const discountUnits = Math.floor(product.qty / requiredQty);
                const totalPrice = discountUnits * requiredQty * parseFloat(product.price);
                const discountedTotal = discountUnits * discountPrice;
                totalDiscount += totalPrice - discountedTotal;
            }
        })
        return parseFloat((totalDiscount).toFixed(2));
    }

    getCartTotal() {
        const cartTotal = (this.getNetCartTotal() - this.getTotalDiscount()).toFixed(2);
        return parseFloat(cartTotal);
    }
}
