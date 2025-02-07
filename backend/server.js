const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5001; // Change the port number here

app.use(cors());
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    // Handle the form data, e.g., save it to a database or send an email
    console.log('Form data received:', { name, email, message });

    // Send a response back to the client
    res.json({ message: 'Message sent successfully!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});