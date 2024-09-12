
let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');
let unAcceppClick;
let autoSlideInterval;


const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';
    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if (type === 'next') {
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    } else {
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(() => {
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 20);
};

nextButton.onclick = function() {
    showSlider('next');
    restartAutoSlide();
};

prevButton.onclick = function() {
    showSlider('prev');
    restartAutoSlide();
};

const startAutoSlide = () => {
    autoSlideInterval = setInterval(() => {
        showSlider('next');
    }, 5000); 
};

const restartAutoSlide = () => {
    clearInterval(autoSlideInterval);
    startAutoSlide();
};

seeMoreButtons.forEach((button) => {
    button.onclick = function() {
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});

backButton.onclick = function() {
    carousel.classList.remove('showDetail');
};

startAutoSlide();

