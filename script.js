// Improved Carousel Functionality with Auto-Slide (Next Image Still)
document.addEventListener('DOMContentLoaded', () => {
    let carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        let images = carousel.querySelectorAll('.carousel-images img');
        let currentIndex = 0;
        let indicators = document.createElement('div');
        indicators.className = 'carousel-indicators';

        images.forEach((_, index) => {
            let dot = document.createElement('span');
            dot.className = 'dot';
            dot.dataset.index = index;
            dot.addEventListener('click', () => showImage(carousel, index));
            indicators.appendChild(dot);
        });

        carousel.appendChild(indicators);
        updateCarousel(carousel);

        carousel.querySelector('.prev-btn').addEventListener('click', () => changeImage(carousel, -1, false));
        carousel.querySelector('.next-btn').addEventListener('click', () => changeImage(carousel, 1, false));

        // Set up auto-slide interval
        let autoSlideInterval;
        function startAutoSlide() {
            clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => changeImage(carousel, 1, true), 5000); // Auto-change every 5 seconds
        }
        startAutoSlide();

        // Reset auto-slide interval on manual change
        carousel.addEventListener('click', () => startAutoSlide());
    });

    function changeImage(carousel, step, autoSlide) {
        let images = carousel.querySelectorAll('.carousel-images img');
        let currentIndex = [...images].findIndex(img => img.classList.contains('active'));
        currentIndex = (currentIndex + step + images.length) % images.length;
        showImage(carousel, currentIndex, autoSlide);
    }

    function showImage(carousel, index, autoSlide) {
        let images = carousel.querySelectorAll('.carousel-images img');
        let dots = carousel.querySelectorAll('.dot');

        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        images[index].classList.add('active');
        dots[index].classList.add('active');

        if (autoSlide) {
            images[index].style.transition = 'none'; // Keep next image still on auto-slide
        } else {
            images[index].style.transition = 'opacity 0.5s ease-in-out';
        }
    }

    function updateCarousel(carousel) {
        let images = carousel.querySelectorAll('.carousel-images img');
        let dots = carousel.querySelectorAll('.dot');

        images[0].classList.add('active');
        dots[0].classList.add('active');
    }
});