document.getElementById('contactForm').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      message: document.getElementById('message').value
  };

  try {
      const response = await fetch('http://localhost:5001/api/contact/submit', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.message);
      document.getElementById('contactForm').reset();
  } catch (error) {
      console.error('Error:', error);
      alert('Message sent succesfully');
  }
});