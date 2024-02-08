# React User Form Application

This is a simple React application that allows users to submit their details through a form. The application collects information such as name, date of birth, email, and phone number from the user and stores it in a MongoDB database. Upon successful submission, the user receives a confirmation email.

## Prerequisites

Before running this application, ensure that you have the following installed on your machine:

- Node.js and npm (Node Package Manager)
- MongoDB (for storing form data)
- SMTP server details (for sending confirmation emails)

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/Elavarasan01/userForm

2. Navigate to the project directory:   
 cd userformd

3.Install dependencies: 
 npm install

 ## usage
 npm start

## Configuration

Before running the application, make sure to configure the following:

MongoDB connection string in .env file.
SMTP server details in app.js for sending confirmation emails.