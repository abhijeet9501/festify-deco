document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const buyModal = document.getElementById('buy-modal');
    const closeModalButton = document.getElementById('close-modal');
    const orderForm = document.getElementById('order-form');
    const loadingIndicator = document.getElementById('loading-indicator');

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');

            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.productImage}" alt="${item.productName}" class="cart-item-image" />
                    <p class="cart-item-name">${item.productName}</p>
                    <p class="cart-item-price">₹${item.productPrice}</p>
                    <p class="cart-item-quantity">x ${item.quantity}</p>
                </div>
                <button class="remove-from-cart" onclick="removeFromCart('${item.productId}')">Remove</button>
            `;

            cartItemsContainer.appendChild(cartItem);
        });
    }

    document.getElementById('checkout-btn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        buyModal.style.display = 'flex'; 
    });

    closeModalButton.addEventListener('click', () => {
        buyModal.style.display = 'none'; 
    });

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;

        if (!name || !phone || !address) {
            alert("Please fill in all required fields.");
            return;
        }

        const orderDetails = {
            name,
            phone,
            address,
            paymentMethod,
            cart, 
        };

        loadingIndicator.style.display = 'block'; 

        fetch('http://127.0.0.1:3000/send-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                localStorage.removeItem('cart');
                buyModal.style.display = 'none';
                loadingIndicator.style.display = 'none';
                window.location.href = '/index.html'; 
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to place order. Please try again.");
                loadingIndicator.style.display = 'none';
            });
    });
});

function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.productId !== productId);

    localStorage.setItem('cart', JSON.stringify(updatedCart));

    location.reload();
}
