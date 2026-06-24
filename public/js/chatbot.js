// Chatbot Functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatbox = document.getElementById('chatbox');
    const minimizeChat = document.getElementById('minimizeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessage = document.getElementById('sendMessage');

    if (!chatToggle || !chatbox) return;

    // Toggle chat widget
    chatToggle.addEventListener('click', (e) => {
        e.preventDefault();
        chatbox.classList.add('active');
        chatToggle.classList.add('hidden');
    });

    if (minimizeChat) {
        minimizeChat.addEventListener('click', () => {
            chatbox.classList.remove('active');
            chatToggle.classList.remove('hidden');
        });
    }

    // Send message function
    function sendUserMessage() {
        if (!userInput) return;
        const message = userInput.value.trim();
        if (message) {
            addMessage('user', message);
            userInput.value = '';
            processUserMessage(message);
        }
    }

    // Event listeners for sending messages
    if (sendMessage) {
        sendMessage.addEventListener('click', sendUserMessage);
    }
    if (userInput) {
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendUserMessage();
            }
        });
    }

    // Add message to chat
    function addMessage(type, content) {
        if (!chatMessages) return;
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        if (type === 'bot') {
            messageDiv.innerHTML = `
                <i class="fas fa-robot bot-icon"></i>
                <div class="message-content">${content}</div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">${content}</div>
                <i class="fas fa-user user-icon"></i>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Process user message and generate response
    function processUserMessage(message) {
        if (!chatMessages) return;
        // Simulate typing indicator
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message typing';
        typingDiv.innerHTML = `
            <i class="fas fa-robot bot-icon"></i>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate AI processing time
        setTimeout(() => {
            if (chatMessages.contains(typingDiv)) {
                chatMessages.removeChild(typingDiv);
            }
            const response = generateBotResponse(message.toLowerCase());
            addMessage('bot', response);
        }, 1500);
    }

    // Generate bot response based on user input
    function generateBotResponse(message) {
        const responses = {
            'plan a trip': `I can help you plan your trip! Here's what you need to consider:
                <ul>
                    <li>Choose your destination and travel dates</li>
                    <li>Book transportation (flights, trains, or buses)</li>
                    <li>Find suitable accommodation</li>
                    <li>Plan your itinerary</li>
                    <li>Consider travel insurance</li>
                </ul>
                What would you like to know more about?`,
            
            'find accommodations': `I can help you find the perfect place to stay! Consider these options:
                <ul>
                    <li>Hotels and resorts</li>
                    <li>Homestays and guesthouses</li>
                    <li>Service apartments</li>
                    <li>Hostels for budget travel</li>
                </ul>
                What type of accommodation are you looking for?`,
            
            'transportation options': `Here are the main transportation options available:
                <ul>
                    <li>Flights - Quick but more expensive</li>
                    <li>Trains - Comfortable for long distances</li>
                    <li>Buses - Economical option</li>
                    <li>Car rentals - Flexibility to explore</li>
                </ul>
                Which mode of transport would you prefer?`,
            
            'local attractions': `I can suggest popular attractions based on your interests:
                <ul>
                    <li>Historical monuments</li>
                    <li>Natural landscapes</li>
                    <li>Cultural sites</li>
                    <li>Adventure activities</li>
                    <li>Local experiences</li>
                </ul>
                What type of attractions interest you?`,
            
            'travel tips': `Here are some essential travel tips:
                <ul>
                    <li>Check weather conditions before traveling</li>
                    <li>Keep emergency contacts handy</li>
                    <li>Carry necessary medications</li>
                    <li>Research local customs and etiquette</li>
                    <li>Keep important documents safe</li>
                </ul>
                Need any specific travel advice?`
        };

        // Check for exact matches first
        if (responses[message]) {
            return responses[message];
        }

        // Check for keywords in the message
        if (message.includes('hotel') || message.includes('stay') || message.includes('room')) {
            return responses['find accommodations'];
        }
        if (message.includes('transport') || message.includes('travel') || message.includes('how to reach')) {
            return responses['transportation options'];
        }
        if (message.includes('attraction') || message.includes('place') || message.includes('visit')) {
            return responses['local attractions'];
        }
        if (message.includes('tip') || message.includes('advice') || message.includes('suggest')) {
            return responses['travel tips'];
        }
        if (message.includes('plan') || message.includes('trip') || message.includes('holiday')) {
            return responses['plan a trip'];
        }

        // Default response
        return `I can help you with planning trips, finding accommodations, transportation options, local attractions, and travel tips. 
                Please choose one of these topics or ask a specific question about your travel needs.`;
    }

    // Expose askBot to window so inline onclick handlers work
    window.askBot = function(topic) {
        addMessage('user', topic);
        processUserMessage(topic);
    };
});
