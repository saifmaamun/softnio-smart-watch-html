document.addEventListener('DOMContentLoaded', function () {
    // Selectors

    const productName = document.getElementById('product-name');
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
    function initializeState() {
        document.querySelector('[data-color="purple"]').classList.add('active');
        document.querySelector('[data-size="M"]').classList.add('active');
        updatePrice();
    }

    /** Update Price Based on Size */
    function updatePrice() {
        const selectedSizeBtn = document.querySelector('.size-option.active');
        const price = selectedSizeBtn ? selectedSizeBtn.dataset.price : 79;
        document.querySelector('.discounted-price').textContent = `$${price}`;
    }

    /** Handle Color Selection */
    function handleColorSelection(event) {
        colorOptions.forEach(option => option.classList.remove('active'));
        event.currentTarget.classList.add('active');
        selectedColor = event.currentTarget.dataset.color;
    }

    /** Handle Size Selection */
    function handleSizeSelection(event) {
        sizeOptions.forEach(option => option.classList.remove('active'));
        event.currentTarget.classList.add('active');
        selectedSize = event.currentTarget.dataset.size;
        updatePrice();
    }

    /** Handle Quantity Change */
    function handleQuantityChange(change) {
        quantity = Math.max(1, quantity + change);
        quantityInput.value = quantity;
    }

    /** Handle Quantity Input Change */
    function handleQuantityInputChange(event) {
        quantity = parseInt(event.target.value) || 1;
        event.target.value = quantity;
    }

    /** Handle Add to Cart */
    function handleAddToCart() {
        const item = {
            image: './assets/main-watch.png',
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
        console.log(productName.innerHTML)
    }

    /** Handle Wishlist Toggle */
    function handleWishlistToggle() {
        const isWishlist = wishlistBtn.dataset.wishlist === 'true';
        wishlistBtn.dataset.wishlist = isWishlist ? 'false' : 'true';
        wishlistBtn.textContent = isWishlist ? '♡' : '♥';
        alert(isWishlist ? 'Removed from wishlist' : 'Added to wishlist');
    }

    /** Handle Checkout */
    function handleCheckout() {
        openModal();
    }

    /** Render Modal HTML */
    function renderModalHTML() {
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
    function openModal() {
        updateModalCart();
        document.getElementById('cart-modal').classList.add('show');
    }

    /** Close Modal */
    function closeModal() {
        document.getElementById('cart-modal').classList.remove('show');
    }

    /** Update Modal Cart Content */
    function updateModalCart() {
        const cartTableBody = document.querySelector('#cart-items tbody');
        cartTableBody.innerHTML = ''; // Clear previous content

        cartItems.forEach(item => {
            const rowHTML = createCartRow(item);
            cartTableBody.insertAdjacentHTML('beforeend', rowHTML);
        });

        updateCartTotal();
    }

    /** Create Cart Table Row */
    function createCartRow(item) {
        return `
        <tr>

        
        <td class="modal-td" >
            <div>
                <img src="${item.image}" width="50" alt="Product Image">
            </div>
            <div style="padding-right:48px">
                <h3 >${item.name}</h3>
            </div>
        </td>
        
            <td>${item.color}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        </tr>
        `;
    }

    /** Calculate and Display Cart Total */
    function updateCartTotal() {
        const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.getElementById('cart-total').innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    }

    /** Attach Event Listeners */
    function attachEventListeners() {
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
