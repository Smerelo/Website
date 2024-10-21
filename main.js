// Add any JavaScript functionality here
console.log('SPEC Telecomunicaciones website loaded');

// Carousel functionality
document.addEventListener('DOMContentLoaded', () => {
  try {
    const carousel = document.querySelector('.carousel');
    const items = document.querySelectorAll('.carousel-item');
    const leftArrow = document.querySelector('.carousel-arrow.left');
    const rightArrow = document.querySelector('.carousel-arrow.right');

    if (!carousel || !items.length || !leftArrow || !rightArrow) {
      throw new Error('One or more carousel elements not found');
    }

    console.log('Carousel elements found:', { carousel, items, leftArrow, rightArrow });

    let currentIndex = 0;
    const totalItems = items.length;

    function showItem(index) {
      carousel.style.transform = `translateX(-${index * 100}%)`;
    }

    function nextItem() {
      currentIndex = (currentIndex + 1) % totalItems;
      showItem(currentIndex);
    }

    function prevItem() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      showItem(currentIndex);
    }

    leftArrow.addEventListener('click', prevItem);
    rightArrow.addEventListener('click', nextItem);

    // Auto-rotate carousel
    setInterval(nextItem, 5000);

    console.log('Carousel functionality set up successfully');
  } catch (error) {
    console.error('Error setting up carousel:', error);
  }
});