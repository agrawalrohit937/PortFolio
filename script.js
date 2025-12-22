// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    navbar.style.display = navbar.style.display === 'flex' ? 'none' : 'flex';
    if(navbar.style.display === 'flex') {
        navbar.style.flexDirection = 'column';
        navbar.style.position = 'absolute';
        navbar.style.top = '70px';
        navbar.style.left = '0';
        navbar.style.width = '100%';
        navbar.style.background = 'white';
        navbar.style.padding = '20px';
        navbar.style.boxShadow = '0 5px 10px rgba(0,0,0,0.1)';
    }
});