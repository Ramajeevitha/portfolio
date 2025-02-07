// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute('href'));
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - document.querySelector('header').offsetHeight,
        behavior: 'smooth',
      });
    }
  });
});

// Form Submission Logic
const form = document.getElementById('contactForm'); // Ensure the form ID is correct

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/submit', { // Update the port number here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Message sent successfully!');
        form.reset(); // Clear the form fields
      } else {
        alert(result.error || 'Failed to send the message. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message. Please try again later.');
    }
  });
} else {
  console.warn('Contact form not found. Check the form ID in your HTML.');
}