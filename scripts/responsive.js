document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.querySelector(".hamburger");
    const navbar = document.querySelector("#navbar");
    const navLinks = document.querySelectorAll("#navbar li a");

    hamburger.addEventListener("click", function(e) {
        e.stopPropagation();
        navbar.classList.toggle("active");
        hamburger.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", function() {
            navbar.classList.remove("active");
            hamburger.classList.remove("active");
        });
    });

    document.addEventListener("click", function(e) {
        if (!navbar.contains(e.target) && !hamburger.contains(e.target)) {
            navbar.classList.remove("active");
            hamburger.classList.remove("active");
        }
    });
});



