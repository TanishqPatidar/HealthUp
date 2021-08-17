document.getElementById('login').addEventListener('click' , function() {
    document.querySelector('.floating-part').style.display ='flex';
});
document.querySelector('.close').addEventListener('click', function() {
    document.querySelector('.floating-part').style.display = 'none';
});

const menuIcon = document.querySelector('.burger');
const navbar = document.querySelector('.header-section')
menuIcon.addEventListener("click", () => {
navbar.classList.toggle("change");
} );