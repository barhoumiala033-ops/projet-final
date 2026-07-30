let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    if (index >= slides.length) currentSlide = 0;
    if (index < 0) currentSlide = slides.length - 1;
    slides.forEach(s => s.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

if(slides.length > 0) {
    document.querySelector('.next-btn').addEventListener('click', () => { currentSlide++; showSlide(currentSlide); });
    document.querySelector('.prev-btn').addEventListener('click', () => { currentSlide--; showSlide(currentSlide); });
    
    setInterval(() => { currentSlide++; showSlide(currentSlide); }, 4000);
}