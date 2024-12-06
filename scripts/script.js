var swiper = new Swiper(".mySwiper", {
    slidesPerView: 5,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
        1024: { 
            slidesPerView: 5,
        },
        768: { 
            slidesPerView: 3,
        },
        0: { 
            spaceBetween: 15,
            slidesPerView: 2,
        },
    },
});

var swiper = new Swiper(".mySwiper2", {
    slidesPerView: 0,
    spaceBetween: 0,
    freeMode: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
        1024: { 
            slidesPerView: 0,
        },
        768: { 
            slidesPerView: 0,
        },
        0: { 
            spaceBetween: 0,
            slidesPerView: 2,
        },
    },
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        const navbarHeight = document.getElementById('header').offsetHeight;

        window.scrollTo({
            top: targetElement.offsetTop - navbarHeight - 10,
            behavior: 'smooth'
        });
        
    });
});
