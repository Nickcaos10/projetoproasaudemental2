const toggle = document.querySelector('.menu-hamburguer');
const nav = document.querySelector('header nav');

toggle?.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Fecha o menu 
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});






