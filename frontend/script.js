// Smooth Scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetElement = document.querySelector(this.getAttribute('href'));
      window.scrollTo({
        top: targetElement.offsetTop - document.querySelector('header').offsetHeight, // Adjust scroll position dynamically based on header
        behavior: 'smooth'
      });
    });
  });
  