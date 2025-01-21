const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

// MongoDB connection string
const mongoURI = "mongodb+srv://jeevi2004:jeevi2004@cluster0.bhwi6.mongodb.net/?retryWrites=true&w=majority";

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
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSchema);

// API route to handle form submissions
app.post("/submit", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save form data to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving message: ", error);
    res.status(500).json({ message: "Failed to send message. Please try again later." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
