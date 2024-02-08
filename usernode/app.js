const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

const FormData = mongoose.model('FormData', {
    name: String,
    dob: Date,
    email: String,
    phone: String
});

// POST route for form submission
app.post('/submit-form', async (req, res) => {
    const { name, dob, email, phone } = req.body;

    try {
        if (!isValidPhoneNumber(phone)) {
            return res.status(400).json({ error: 'Invalid phone number' });
        }

        const formData = new FormData({
            name,
            dob,
            email,
            phone
        });
        await formData.save();

        await sendEmail(email, 'Form Submission Confirmation', 'Thank you for submitting the form.');

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

function isValidPhoneNumber(phone) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
}

// Function to send email
async function sendEmail(to, subject, message) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Update with your SMTP server details
        port: 587,
        secure: false,
        auth: {
            user: 'your-email@example.com', // Update with your email credentials
            pass: 'your-email-password' // Update with your email password or app password
        }
    });

    await transporter.sendMail({
        from: 'your-email@example.com',
        to,
        subject,
        text: message
    });
}
