document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const notification = document.getElementById('cart-notification');

    updateCartCount();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();

            const productId = e.target.getAttribute('data-product-id');
            const productName = e.target.getAttribute('data-product-name');
            const productPrice = e.target.getAttribute('data-product-price');
            const productImage = e.target.getAttribute('data-product-image'); 
            const quantity = 1; 

            const product = {
                productId,
                productName,
                productPrice,
                productImage, 
                quantity
            };

            let cart = JSON.parse(localStorage.getItem('cart')) || [];

            const existingProductIndex = cart.findIndex(item => item.productId === productId);

            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));

            updateCartCount();

            showNotification('Product added to cart!');
        });
    });

   
    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0); 
        document.getElementById('cart-count-navbar').textContent = cartCount; 
    }

    function showNotification(message) {
        notification.textContent = message; 
        notification.classList.add('show');   

        setTimeout(() => {
            notification.classList.remove('show');  
        }, 500); 
    }
});
