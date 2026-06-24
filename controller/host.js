const Package = require("../models/booking-package");
const UserQuery = require("../models/user-query");

exports.postUserQuery = async (req, res, next) => {
    try {
        console.log('User query submitted:', req.body);
        const { name, email, phone, subject, message } = req.body;
        
        const userQuery = new UserQuery({
            name,
            email,
            phone,
            subject,
            message
        });
        
        await userQuery.save();
        
        // Render contact page again (with success or message context if desired)
        res.render('contact', { 
            title: 'Contact Us - Yatra', 
            stylesheets: ['/css/contact.css'], 
            activePage: 'contact' 
        });
    } catch (error) {
        console.error('Error saving user query:', error);
        next(error);
    }
};

exports.postBookedPackage = async (req, res, next) => {
    try {
        console.log('Package booking submitted:', req.body);
        const { service, duration, amount } = req.body;
        
        const packageBooking = new Package({
            service,
            duration,
            amount: Number(amount)
        });
        
        await packageBooking.save();
        
        // Render payment page
        res.render('payment', { 
            title: 'Payment - Yatra', 
            stylesheets: ['/css/payment.css'] 
        });
    } catch (error) {
        console.error('Error saving package booking:', error);
        next(error);
    }
};