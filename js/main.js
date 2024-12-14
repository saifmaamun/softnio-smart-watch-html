document.addEventListener('DOMContentLoaded', function () {
    const colorOptions = document.querySelectorAll('.color-option');
    const sizeOptions = document.querySelectorAll('.size-option');
    const quantityInput = document.getElementById('quantity');
    const decreaseBtn = document.getElementById('decrease');
    const increaseBtn = document.getElementById('increase');
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const wishlistBtn = document.querySelector('.wishlist-btn');
    const cartCount = document.getElementById('cart-count');

    let selectedColor = 'purple';
    let selectedSize = 'M';
    let quantity = 1;
    let cartItems = 0;

    function updatePrice() {
        const selectedSizeBtn = document.querySelector('.size-option.active');
        const price = selectedSizeBtn ? selectedSizeBtn.dataset.price : 79;
        document.querySelector('.discounted-price').textContent = `$${price}`;
    }

    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            colorOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedColor = this.dataset.color;
        });
    });

    sizeOptions.forEach(option => {
        option.addEventListener('click', function () {
            sizeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectedSize = this.dataset.size;
            updatePrice();
        });
    });

    decreaseBtn.addEventListener('click', function () {
        if (quantity > 1) {
            quantity--;
            quantityInput.value = quantity;
        }
    });

    increaseBtn.addEventListener('click', function () {
        quantity++;
        quantityInput.value = quantity;
    });

    quantityInput.addEventListener('change', function () {
        quantity = parseInt(this.value) || 1;
        this.value = quantity;
    });

    addToCartBtn.addEventListener('click', function () {
        cartItems += quantity;
        cartCount.textContent = cartItems;
        alert(`Added ${quantity} ${selectedColor} ${selectedSize} watch(es) to cart`);
        console.log("clicked")
        console.log(quantity)
        console.log(cartCount.textContent)
    });

    wishlistBtn.addEventListener('click', function () {
        this.textContent = this.textContent === '♡' ? '♥' : '♡';
        alert(this.textContent === '♥' ? 'Added to wishlist' : 'Removed from wishlist');
    });

    // Initialize active states
    document.querySelector('.color-option[data-color="purple"]').classList.add('active');
    document.querySelector('.size-option[data-size="M"]').classList.add('active');
    updatePrice();
});