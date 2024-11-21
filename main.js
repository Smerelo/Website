import './tailwind.css'; // Adjust the path if necessary
   import './style.css'; 
document.addEventListener("DOMContentLoaded", function() {
  const carousel = document.querySelector('.carousel');
  const items = document.querySelectorAll('.carousel-item');
  const leftArrow = document.querySelector('.carousel-arrow.left');
  const rightArrow = document.querySelector('.carousel-arrow.right');

  let currentIndex = 1; // Start at the first item (index 0)
  let isTransitioning = false; // Flag to prevent multiple clicks during transition

  function updateCarousel(isGoingRight) {
    if (isTransitioning) return; // Prevent transitions if already transitioning
    isTransitioning = true;
    let looped = false;

    // Apply the transform to move the carousel
    carousel.style.transform = `translateX(-${currentIndex * 500}px)`; // Adjust 455px based on your item width
    carousel.style.transition = 'transform 0.5s ease'; // Ensure smooth transition

    // Wait for the transition to complete before allowing another transition
    carousel.addEventListener('transitionend', function handleTransitionEnd() {
      // If we reach the last item, quickly reset to the first item without animation
      if (currentIndex >= items.length - 3 && isGoingRight) {
        currentIndex = 1; // Jump to the first item
        carousel.style.transition = 'none'; // Disable transition for instant jump
        carousel.style.transform = `translateX(-${currentIndex * 500}px)`; // Apply the new transform immediately
        looped = true;
      }
      // If we reach the first item and move backward, we can go to the last item
      if (currentIndex === 0) {
        currentIndex = items.length - 4; // Jump to the last item
        carousel.style.transition = 'none'; // Disable transition for instant jump
        carousel.style.transform = `translateX(-${currentIndex * 500}px)`; // Apply the new transform immediately
        looped = true;
      }
      if(looped){
        items.forEach(item => item.classList.remove('activeInstant'));
        items.forEach(item => item.classList.remove('active'));
        items[currentIndex + 1].classList.add('activeInstant');
      }

      // Re-enable the transition for smooth scrolling after the jump
      setTimeout(() => {
        carousel.style.transition = 'transform 0.5s ease';
        isTransitioning = false;
      }, 0);

      // Remove event listener after handling the transition
      carousel.removeEventListener('transitionend', handleTransitionEnd);
    });
      items.forEach(item => item.classList.remove('active'));
      items.forEach(item => item.classList.remove('activeInstant'));
      items[currentIndex + 1].classList.add('active');
  }

  // Move to the previous item (looping backward)
  leftArrow.addEventListener('click', function() {
    if (isTransitioning) return; // Prevent actions if already transitioning
    currentIndex--;
    updateCarousel(false);
  });

  // Move to the next item (looping forward)
  rightArrow.addEventListener('click', function() {
    if (isTransitioning) return; // Prevent actions if already transitioning
    currentIndex++;
    updateCarousel(true);
  });

  // Initialize the carousel
  updateCarousel(true);
});
