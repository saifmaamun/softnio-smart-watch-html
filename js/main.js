document.addEventListener('DOMContentLoaded', function () {
    // Selectors

    const productName = document.getElementById('product-name');
    const productImage = document.getElementById('product-image');
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const cartCount = document.getElementById('cart-count');
    const checkoutBtn = document.getElementById('checkout-btn');

    // State
    let selectedColor = 'purple';
    let selectedSize = 'M';
    let quantity = 1;
    let cartItems = [];

    /** Initialize App State */
    const initializeState = () => {
        document.querySelector('[data-color="purple"]').classList.add('active');
        document.querySelector('[data-size="M"]').classList.add('active');
        updatePrice();
    }

    /** Update Price Based on Size */
    const updatePrice = () => {
        const selectedSizeBtn = document.querySelector('.size-option.active');
        const price = selectedSizeBtn ? selectedSizeBtn.dataset.price : 79;
        document.querySelector('.discounted-price').textContent = `$${price}`;
        document.querySelector('.original-price').textContent = `$${parseInt(price) + 20}`;
        // console.log(parseInt(price) + 20)
    }

    /** Handle Color Selection */
    const handleColorSelection = (event) => {
        colorOptions.forEach(option => option.classList.remove('active'));
        event.currentTarget.classList.add('active');
        selectedColor = event.currentTarget.dataset.color;
        /** handle item image change */
        productImage.src = `assets/${selectedColor}.png`
        // console.log(selectedColor, productImage.src)
    }

    /** Handle Size Selection */
    const handleSizeSelection = (event) => {
        sizeOptions.forEach(option => option.classList.remove('active'));
        event.currentTarget.classList.add('active');
        selectedSize = event.currentTarget.dataset.size;
        updatePrice();
    }

    /** Handle Quantity Change */
    const handleQuantityChange = (change) => {
        quantity = Math.max(1, quantity + change);
        quantityInput.value = quantity;
    }

    /** Handle Quantity Input Change */
    const handleQuantityInputChange = (event) => {
        quantity = parseInt(event.target.value) || 1;
        event.target.value = quantity;
    }

    /** Handle Add to Cart */
    const handleAddToCart = () => {
        const item = {
            image: productImage.src,
            name: productName.innerHTML,
            color: selectedColor,
            size: selectedSize,
            quantity: quantity,
            price: parseFloat(document.querySelector('.discounted-price').textContent.replace('$', ''))
        };

        cartItems.push(item);
        // cartCount.textContent = cartItems.length;    // shows the number of cart items
        cartCount.textContent = cartItems.reduce((total, item) => { return total + item.quantity }, 0);     // shows the total item in cart
        alert(`Added ${quantity} ${selectedColor} ${selectedSize} watch(es) to cart`);
        // console.log(productName.innerHTML)
    }

    /** Handle Wishlist Toggle */
    const handleWishlistToggle = () => {
        const isWishlist = wishlistBtn.dataset.wishlist === 'true';
        wishlistBtn.dataset.wishlist = isWishlist ? 'false' : 'true';
        wishlistBtn.textContent = isWishlist ? '♡' : '♥';
        alert(isWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    }

    /** Handle Checkout */
    const handleCheckout = () => {
        openModal();
    }

    /** Render Modal HTML */
    const renderModalHTML = () => {
        const modalHTML = `
        <div id="cart-modal" class="modal-overlay">
            <div class="modal-content">
                <h2>Your Cart</h2>
                <table id="cart-items">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Color</th>
                            <th>Size</th>
                            <th>Qnt</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
                <div id="cart-total"></div>
                <div class="checkout-btn">
                <button id="continue">Continue Shopping</button>
                <button id="checkout">Checkout</button>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        document.getElementById('continue').addEventListener('click', closeModal);
        document.getElementById('checkout').addEventListener('click', function () {
            const cartTableBody = document.querySelector('#cart-items tbody');
            cartTableBody.innerHTML = '';
            closeModal(),
                cartItems = [];
            updateCartTotal();
            cartCount.textContent = "0"
        });
    }

    /** Open Modal and Update Cart */
    const openModal = () => {
        updateModalCart();
        document.getElementById('cart-modal').classList.add('show');
    }

    /** Close Modal */
    const closeModal = () => {
        document.getElementById('cart-modal').classList.remove('show');
    }

    /** Update Modal Cart Content */
    const updateModalCart = () => {
        const cartTableBody = document.querySelector('#cart-items tbody');
        cartTableBody.innerHTML = '';

        cartItems.forEach(item => {
            const rowHTML = createCartRow(item);
            cartTableBody.insertAdjacentHTML('beforeend', rowHTML);
        });

        updateCartTotal();
    }

    /** Create Cart Table Row */
    const createCartRow = (item) => {
        return `
        <tr>

        
        <td class="modal-td" >
            <div>
                <img src="${item.image}" width="50" alt="Product Image">
            </div>
            <div style="padding-right:48px">
                <p >${item.name}</p>
            </div>
        </td>
        
            <td>${item.color[0].toUpperCase() + item.color.slice(1)}</td>
            
            <td class="model-font">${item.size}</td>
            <td class="model-font">${item.quantity}</td>
            <td class="model-font">$${(item.price * item.quantity).toFixed(2)}</td>
            
        </tr>
        `;
    }

    /** Calculate and Display Cart Total */
    const updateCartTotal = () => {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalItem = cartItems.reduce((total, item) => { return total + item.quantity }, 0);
        document.getElementById('cart-total').innerHTML = ` <div style="display: flex; justify-content: space-between; align-items: center; margin: 0; padding: 0;">
    <!-- First Section: Total -->
    <div style="flex: 3; text-align: left; padding-left: 10px;">
        <h5>Total</h5>
    </div>

    <!-- Second Section: Total Items -->
    <div style="flex: 1; text-align: right;">
        <h5>${totalItem}</h5>
    </div>

    <!-- Third Section: Total Price -->
    <div style="flex: 2; display: flex; align-items: center; justify-content: center;">
        <h2>$${total.toFixed(2)}</h2>
    </div>
</div>`;
        // document.getElementById('cart-total').innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    }

    /** Attach Event Listeners */
    const attachEventListeners = () => {
        colorOptions.forEach(option => option.addEventListener('click', handleColorSelection));
        sizeOptions.forEach(option => option.addEventListener('click', handleSizeSelection));
        decreaseBtn.addEventListener('click', () => handleQuantityChange(-1));
        increaseBtn.addEventListener('click', () => handleQuantityChange(1));
        quantityInput.addEventListener('change', handleQuantityInputChange);
        addToCartBtn.addEventListener('click', handleAddToCart);
        wishlistBtn.addEventListener('click', handleWishlistToggle);
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    /** Initialize App */
    renderModalHTML();
    initializeState();
    attachEventListeners();
});
