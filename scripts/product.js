document.addEventListener('DOMContentLoaded', () => {

    const closeModalButton = document.getElementById('close-modal');
    const buyModal = document.getElementById('buy-modal');

    closeModalButton.addEventListener('click', () => {
        buyModal.style.display = 'none';
    });

    document.getElementById('buy-now-btn').addEventListener('click', () => {
        buyModal.style.display = 'flex';
    });

    const products = {
        1: {
            name: "",
            description: "",
            price: "",
            images: [""]
        },
        2: {
            name: "",
            description: "",
            price: "",
            images: [""]
        },
    };

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId'); 

    if (products[productId]) {
        const product = products[productId];
        document.getElementById('product-name').textContent = product.name;
        document.getElementById('product-description').textContent = product.description;
        document.getElementById('product-price').textContent = product.price;

        const imageSlider = document.getElementById('image-slider');
        product.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = product.name;
            imageSlider.appendChild(img);
        });

        const images = document.querySelectorAll('#image-slider img');
        let currentIndex = 0;

        const updateSlider = () => {
            const offset = -currentIndex * 100;
            imageSlider.style.transform = `translateX(${offset}%)`;
        };

        document.getElementById('prev-btn').addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            updateSlider();
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        let touchStartX = 0;
        let touchEndX = 0;

        const handleSwipe = () => {
            if (touchEndX < touchStartX) {
                currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
            } else if (touchEndX > touchStartX) {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
            }
            updateSlider();
        };

        imageSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        imageSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    } else {
        document.body.innerHTML = "<p>Product not found!</p>";
    }

    document.getElementById('buy-now-btn').addEventListener('click', () => {
        document.getElementById('buy-modal').style.display = 'flex';
    });

    document.getElementById('increase-quantity').addEventListener('click', () => {
        let quantity = parseInt(document.getElementById('quantity').value, 10);
        if (quantity < 10) {
            document.getElementById('quantity').value = quantity + 1;
        }
    });

    document.getElementById('decrease-quantity').addEventListener('click', () => {
        let quantity = parseInt(document.getElementById('quantity').value, 10);
        if (quantity > 1) {
            document.getElementById('quantity').value = quantity - 1;
        }
    });

    document.getElementById('order-form').addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const paymentMethod = document.getElementById('payment-method').value;
        const quantity = document.getElementById('quantity').value;  
        const orderButton = document.getElementById('submit-order-btn'); 

        if (!name || !phone || !address || !quantity || quantity < 1 || quantity > 10) {
            alert("Please fill in all the fields and ensure quantity is between 1 and 10.");
            return;
        }

        document.getElementById('loading-indicator').style.display = 'block';
        orderButton.disabled = true;

        const orderDetails = {
            cart: [{ productId, quantity: parseInt(quantity, 10) }],
            name,
            phone,
            address,
            paymentMethod,
        };
          
        fetch('http://127.0.0.1:3000/send-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderDetails),
        })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                orderButton.disabled = false;
                document.getElementById('loading-indicator').style.display = 'none';
                document.getElementById('buy-modal').style.display = 'none';
            })
            .catch(error => {
                alert('Failed to place order.');
                document.getElementById('loading-indicator').style.display = 'none';
                document.getElementById('buy-modal').style.display = 'none';
                orderButton.disabled = false;
                console.error('Error:', error);
            });  
    });
});


const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('#navbar');

hamburger.addEventListener('click', () => {
    navbar.classList.toggle('active');
    hamburger.classList.toggle('active');
});
