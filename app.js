const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.set('views','views');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// Import routers
const authRouter = require('./Router/auth-router');
const userRouter = require('./Router/user-router');
const hostRouter = require('./Router/host-router');
const bookingsRouter = require('./routes/bookings');

// Routes
app.use(authRouter);
app.use(userRouter);
app.use(hostRouter);
app.use(bookingsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

const port = process.env.PORT || 3000;
const mongoUrl = 'mongodb+srv://pankajkansal1808:5OCKCWY34QnuGSae@cluster0.9e60e.mongodb.net/yatra?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoUrl)
    .then(() => {
        console.log('Connected to MongoDB via Mongoose');
        app.listen(port, () => {
            console.log(`Server started at: http://localhost:${port}`);
        });
    })
    .catch(err => {
        console.error('Database connection error:', err);
    });