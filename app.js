const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// MongoDB connection string
const mongoURI = "mongodb+srv://jeevi2004:jeevi2004@cluster0.bhwi6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("Error connecting to MongoDB: ", err));

// Define the schema and model for form submissions
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const Contact = mongoose.model("Contact", contactSchema);

// Root route
app.get("/", (req, res) => {
  res.send("<h1>Welcome to the Portfolio Backend</h1><p>Use the '/submit' endpoint to send form data.</p>");
});

// Route to handle form submission
app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving to MongoDB: ", error);
    res.status(500).json({ message: "Error submitting the form." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
