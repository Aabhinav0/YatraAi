# Yatra Web App

Yatra is a full-stack travel assistant platform that allows users to book flights, hotels, car rentals, and tour packages—all in one place. It integrates immersive AR/VR experiences, Google Maps routing, and Wikipedia API data to provide travelers with a pre-visit overview of monuments and destinations. With AI-powered recommendations, Yatra makes trip planning smarter and more engaging.

# Live Demo: [Yatra Web App](https://null-3.onrender.com/)

# Features


Flight Booking – Search and book flights with ease.

Hotel Booking – Explore hotels with filters for price, location, and amenities.

Tour Packages – Curated packages for popular destinations.

Car Rentals – Book cars for local and long-distance travel.

Google Maps Integration – Real-time routing and exact path visualization.

AR/VR Implementation – Immersive previews of monuments and attractions before visiting.

Wikipedia API Integration – Fetch detailed information about monuments, landmarks, and locations.

AI Chatbot (Google Gemini) – Personalized travel recommendations.

User Authentication – Secure login and session management with Passport.js..

Searchable Destinations – Filter by location, price, and activities.

Unified Dashboard – Manage bookings and preferences in one place.

# Tech Stack


Layer	Technologies Used
Frontend	HTML, CSS, JavaScript
Backend	Node.js, Express.js
Database	MongoDB, Mongoose
Authentication	JWT, Session Management, Passport.js
APIs	Google Maps API, Wikipedia API, Google Gemini
AR/VR	WebXR / Three.js
Templating	EJS
Deployment	Render, Docker, CI/CD pipelines
Email Service	Nodemailer


# Dependencies


json
"axios": "^1.8.4",
"body-parser": "^1.20.3",
"cors": "^2.8.5",
"dotenv": "^16.4.7",
"ejs": "^3.1.10",
"express": "^4.21.2",
"mongodb": "^6.15.0",
"mongoose": "^8.12.2",
"node-fetch": "^2.7.0",
"nodemailer": "^6.10.0"


#  Getting Started
Prerequisites


Node.js  (v16+ recommended)

MongoDB (local or cloud instance)

API keys for Google Maps, Wikipedia, and Google Gemini

# Installation


bash
# Clone the repository
git clone https://github.com/your-username/yatra-web-app.git

# Navigate to project directory
cd yatra-web-app

# Install dependencies
npm install

# Create a .env file and add your environment variables
MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
GOOGLE_MAPS_API_KEY=your_api_key
WIKIPEDIA_API_KEY=your_api_key
GEMINI_API_KEY=your_api_key

# Start the server
npm start
📌 Usage
Register/Login to access booking features.

Search destinations with filters for price, location, and activities.

View routes on Google Maps with exact path and navigation.

Explore monuments in AR/VR for immersive previews.

Read detailed information fetched via Wikipedia API.

Get AI-powered recommendations via Google Gemini chatbot.

Book and manage itineraries from the dashboard.
#  Future Enhancements
Integration with payment gateways.

Multi-language support for global users.

AI-powered dynamic pricing models.

Mobile app version with offline support.

# Contributing
Contributions are welcome!

Fork the repo

Create a new branch (feature/your-feature)

Commit changes

Submit a pull request
