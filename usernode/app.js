// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to MongoDB (Assuming you have MongoDB installed locally or provided a connection URI)
mongoose.connect('mongodb://localhost:27017/my_database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World! This is the backend server.');
});

// Example API endpoint to handle user form submission
app.post('/api/user', (req, res) => {
    // Retrieve form data from request body
    const { name, email, password, dob } = req.body;

    // Perform operations with the form data (e.g., save to database)

    // For demonstration purposes, simply send back the received data
    res.json({ name, email, dob });
});

// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
