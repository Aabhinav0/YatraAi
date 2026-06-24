const express = require('express');
const userrouter =  express.Router();
const axios = require('axios');
require('dotenv').config();

userrouter.get("/",(req,res,next) =>{
   res.render('home', { activePage: 'home' });
})
userrouter.get("/contact",(req,res,next) =>{
  res.render('contact', { title: 'Contact Us - Yatra', activePage: 'contact', stylesheets: ['/css/contact.css'] });
})
userrouter.get("/destinations",(req,res,next) =>{
  res.render('destinations', { title: 'Explore Destinations - Yatra', activePage: 'destinations' });
})
userrouter.get("/packages",(req,res,next) =>{
  res.render('packages', { title: 'Travel Packages - Yatra', activePage: 'packages' });
})
userrouter.get("/services",(req,res,next) =>{
  res.render('services', { title: 'Services - Yatra', activePage: 'services' });
})

userrouter.get("/about",(req,res,next) =>{
  res.render('info/about', { title: 'About Us - Yatra', activePage: 'about' });
})

userrouter.get("/terms",(req,res,next) =>{
  res.render('info/terms', { title: 'Terms & Conditions - Yatra' });
})

userrouter.get("/privacy",(req,res,next) =>{
  res.render('info/privacy', { title: 'Privacy Policy - Yatra' });
})

userrouter.get("/faq",(req,res,next) =>{
  res.render('info/faq', { title: 'FAQs - Yatra', stylesheets: ['/css/faq.css'] });
})

userrouter.get("/login",(req,res,next) =>{
  res.render('login', { title: 'Login - Yatra' });
})

userrouter.get("/payment",(req,res,next) =>{
    res.render('payment', { title: 'Payment - Yatra', stylesheets: ['/css/payment.css'] });
  })

userrouter.get("/booking-confirmation",(req,res,next) =>{
    res.render('booking-confirmation', { title: 'Booking Confirmed - Yatra' });
  })

userrouter.get("/signup",(req,res,next) =>{
  res.render('signup', { title: 'Sign Up - Yatra' });
})

userrouter.get("/Hotel-Booking",(req,res,next) =>{
    res.render('hotelbooking', { title: 'Hotel Booking - Yatra', stylesheets: ['/css/hotelbooking.css'] });
  })

  userrouter.get("/Flight-Booking",(req,res,next) =>{
    res.render('flightbooking', { title: 'Flight Booking - Yatra', stylesheets: ['/css/flightbooking.css'] });
  })

  userrouter.get("/Car-Rentel",(req,res,next) =>{
    res.render('carrental', { title: 'Car Rental - Yatra', stylesheets: ['/css/carrental.css'] });
  })
  
  userrouter.get("/Tour-Packages",(req,res,next) =>{
    res.render('tourpackages', { title: 'Tour Packages - Yatra', stylesheets: ['/css/tourpackages.css'] });
  })

userrouter.get("/search", async (req, res) => {
    try {
        const query = req.query.query;
        if (!query) {
            return res.status(400).json({ error: 'Search query is required' });
        }

        const baseRand = Math.floor(Math.random() * 10000);
        const cleanQuery = query.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean).join(',') || 'travel';

        // First try to get monuments and attractions from Wikipedia
        try {
            // Get monuments and landmarks
            const monumentsResponse = await axios.get(
                `https://en.wikipedia.org/w/api.php`, {
                headers: {
                    'User-Agent': 'YatraTravelApp/1.0 (https://github.com/Captain-jack42/Yatra; yatra-app@example.com) axios/1.8.4'
                },
                params: {
                    action: 'query',
                    format: 'json',
                    prop: 'extracts|pageimages|coordinates',
                    generator: 'search',
                    gsrsearch: `tourist attractions in ${query}`,
                    gsrlimit: 15,
                    exintro: 1,
                    explaintext: 1,
                    piprop: 'original',
                    pithumbsize: 1000,
                    origin: '*'
                }
            });

            if (monumentsResponse.data.query && monumentsResponse.data.query.pages) {
                const pages = monumentsResponse.data.query.pages;
                const results = await Promise.all(Object.values(pages).map(async (page, index) => {
                    const sentences = page.extract?.split(/[.?!](?=\s|$)/).map(s => s.trim()).filter(s => s.length > 0) || [];
                    
                    // Extract the first sentence for the short description
                    const firstSentence = sentences[0] ? (/[.?!]$/.test(sentences[0]) ? sentences[0] : sentences[0] + '.') : '';
                    // Get remaining text for detailed description
                    const remainingText = sentences.slice(1).map(s => /[.?!]$/.test(s) ? s : s + '.').join(' ');

                    // Extract important points (first 3 sentences)
                    const impPoints = sentences.length > 0 ? 
                        sentences.slice(0, 3).map(s => /[.?!]$/.test(s) ? s : s + '.') : 
                        ['Explore monuments and attractions.', 'Discover local culture.', 'Plan your perfect journey.'];

                    // Get a single image for the location from Wikipedia thumbnail or loremflickr
                    const cleanTitle = page.title.replace(/[^a-zA-Z0-9\s]/g, '').trim().split(/\s+/).filter(Boolean).join(',') || 'travel';
                    const imageUrl = (page.thumbnail && page.thumbnail.source) 
                        ? page.thumbnail.source 
                        : `https://loremflickr.com/800/600/${encodeURIComponent(cleanTitle)}?lock=${baseRand + index * 3 + 1}`;

                    return {
                        title: page.title,
                        shortDescription: firstSentence,
                        fullDescription: remainingText,
                        impPoints: impPoints,
                        image: imageUrl,
                        url: `https://en.wikipedia.org/wiki/${encodeURIComponent(page.title)}`,
                        coordinates: page.coordinates || null,
                        type: 'monument'
                    };
                }));

                // Take the first 3 results without filtering as requested
                const finalResults = results.slice(0, 3);

                return res.json({ results: finalResults });
            }
        } catch (wikiError) {
            console.error('Wikipedia API error:', wikiError);
        }

        // Fallback results if Wikipedia fails
        const fallbackAttractions = [
            {
                title: `Historical Monuments in ${query}`,
                shortDescription: `Explore the rich historical heritage and monuments of ${query}.`,
                fullDescription: `Discover ancient architecture, historical significance, and cultural importance of monuments in ${query}.`,
                impPoints: [
                    `Explore the rich historical heritage and monuments of ${query}.`,
                    `Discover ancient architecture and deep cultural history.`,
                    `Plan a visit to witness spectacular historical sights.`
                ],
                image: `https://loremflickr.com/800/600/${encodeURIComponent(cleanQuery)}?lock=${baseRand + 1}`,
                url: `https://www.google.com/search?q=${encodeURIComponent(query + ' historical monuments')}`,
                type: 'monument'
            },
            {
                title: `Famous Landmarks in ${query}`,
                shortDescription: `Visit the most iconic landmarks and tourist spots in ${query}.`,
                fullDescription: `Popular tourist attractions, viewing points, and must-visit locations that make ${query} famous.`,
                impPoints: [
                    `Visit the most iconic landmarks and tourist spots in ${query}.`,
                    `Explore scenic view points and popular tour attractions.`,
                    `Experience the landmark highlights of the region.`
                ],
                image: `https://loremflickr.com/800/600/landmark?lock=${baseRand + 2}`,
                url: `https://www.google.com/search?q=${encodeURIComponent(query + ' famous landmarks')}`,
                type: 'landmark'
            },
            {
                title: `Cultural Heritage of ${query}`,
                shortDescription: `Experience the rich cultural heritage sites in ${query}.`,
                fullDescription: `Museums, art galleries, traditional architecture, and cultural centers that showcase the heritage of ${query}.`,
                impPoints: [
                    `Experience the rich cultural heritage sites in ${query}.`,
                    `Visit local museums, art galleries, and traditional centers.`,
                    `Immerse yourself in regional traditions and architecture.`
                ],
                image: `https://loremflickr.com/800/600/travel?lock=${baseRand + 3}`,
                url: `https://www.google.com/search?q=${encodeURIComponent(query + ' cultural heritage sites')}`,
                type: 'culture'
            }
        ];

        res.json({ results: fallbackAttractions });

    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            results: [{
                title: `Monuments in ${query}`,
                shortDescription: `Discover historical monuments and attractions in ${query}.`,
                fullDescription: `Explore the rich cultural heritage, historical monuments, and tourist attractions that make ${query} unique.`,
                impPoints: [
                    `Discover historical monuments and attractions in ${query}.`,
                    `Explore the rich cultural heritage and tourist spots.`,
                    `Enjoy the local sightseeing and travel highlights.`
                ],
                image: `https://loremflickr.com/800/600/${encodeURIComponent(cleanQuery)}?lock=${baseRand + 1}`,
                url: `https://www.google.com/search?q=${encodeURIComponent(query + ' monuments tourist attractions')}`,
                type: 'general'
            }]
        });
    }
});

module.exports = userrouter;