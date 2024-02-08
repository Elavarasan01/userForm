const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const MONGODB_URI = 'mongodb+srv://admin:Elavarasan@elliotcluster.s9b3app.mongodb.net/elliotcluster?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Define mongoose schema and model for form data
const FormData = mongoose.model('FormData', {
    name: String,
    dob: Date,
    email: String,
    phone: String
});

// POST route for form submission
app.post('/submit-form', async (req, res) => {
    // Extract form data from request
    const { name, dob, email, phone } = req.body;

    try {
        // Validate phone number (you can use a library like libphonenumber for more advanced validation)
        if (!isValidPhoneNumber(phone)) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }

        // Save form data to MongoDB
        const formData = new FormData({
            name,
            dob,
            email,
            phone
        });
        await formData.save();

        // Send email to the form submitter
        await sendEmail(email, 'Form Submission Confirmation', 'Thank you for submitting the form.');

        // Redirect the user to a page displaying all submitted forms
        res.redirect('/submitted-forms');
    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to display all submitted forms
app.get('/submitted-forms', async (req, res) => {
    try {
        const allFormData = await FormData.find();
        res.json(allFormData);
    } catch (error) {
        console.error('Error fetching submitted forms:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Function to validate phone number
function isValidPhoneNumber(phone) {
    // Implement your validation logic here
    return true; // For demonstration, always return true
}

// Function to send email
async function sendEmail(to, subject, message) {
    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Configure transporter options (e.g., SMTP or other transport)
    });

    // Send email
    await transporter.sendMail({
        from: 'your-email@example.com',
        to,
        subject,
        text: message
    });
}
