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
            name: "Simple Hall Decoration",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, modi id error cumque recusandae ipsum quia reprehenderit facilis suscipit ex.",
            price: "₹1499",
            images: ["https://www.7eventzz.com/productsicon/b37e3729ccb3a1b55f8b9ad638b4c28c1715159480.webp", "https://www.7eventzz.com/productsicon/cf8ef30062800bb955a75778d436066b1715159547.jpg"]
        },
        2: {
            name: "Simple Decoration for Birthday",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, modi id error cumque recusandae ipsum quia reprehenderit facilis suscipit ex.",
            price: "₹2199",
            images: ["https://www.7eventzz.com/productsicon/e9180dc77cdebf4fc7c5c9eab6c715801715168007.jpg"]
        },
        3: {
            name: "Rose Gold Decoration",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, modi id error cumque recusandae ipsum quia reprehenderit facilis suscipit ex.",
            price: "₹2499",
            images: ["https://www.7eventzz.com/productsicon/106ab3cad94d81cb2553876fbe21a7cd1715418984.jpg", "https://www.7eventzz.com/productsicon/106ab3cad94d81cb2553876fbe21a7cd1715418984.jpg"]
        },
        4: {
            name: "Better Together Decoration",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, modi id error cumque recusandae ipsum quia reprehenderit facilis suscipit ex.",
            price: "₹4999",
            images: ["https://www.7eventzz.com/productsicon/a0519cba56fbfc7adac9c0a3d313b27d1715596895.jpg", "https://www.7eventzz.com/productsicon/c4c991c9060046f09535273ef0f126fd1715596895.jpg"]
        },
        5: {
            name: "Mixed Flower Backdrop Decoration",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, modi id error cumque recusandae ipsum quia reprehenderit facilis suscipit ex.",
            price: "₹17999",
            images: ["https://www.7eventzz.com/productsicon/4cb811134b9d39fc3104bd06ce75abad1716970737.jpg"]
        },
        6: {
            name: "Unique Floral Ring Tray",
            description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, modi id error cumque recusandae ipsum quia reprehenderit facilis suscipit ex.",
            price: "₹2799",
            images: ["https://www.7eventzz.com/giftitemicon/4451968692a5e17185fb5b6894ea4f671719583529.jpg"]
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
