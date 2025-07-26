document.addEventListener('DOMContentLoaded', () => {
    const chatBubble = document.getElementById('chatBubble');
    const chatPanel = document.getElementById('chatPanel');
    const closeChatBtn = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendChatBtn = document.getElementById('sendChatBtn');

    // Open/Close Chat Panel
    chatBubble.addEventListener('click', () => {
        chatPanel.classList.add('open');
        chatBubble.style.display = 'none'; // Hide bubble when panel is open
    });

    closeChatBtn.addEventListener('click', () => {
        chatPanel.classList.remove('open');
        chatBubble.style.display = 'flex'; // Show bubble when panel is closed
    });

    // Send Message
    sendChatBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        appendMessage(userText, 'user-message');
        chatInput.value = ''; // Clear input

        processCutieResponse(userText.toLowerCase());
    }

    function appendMessage(text, type) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', type);
        // Convert URLs in text to clickable links
        const linkPattern = /(https?:\/\/[^\s]+)/g;
        msgDiv.innerHTML = text.replace(linkPattern, '<a href="$1" target="_blank" style="color: #fff; text-decoration: underline;">$1</a>');
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
    }

    function processCutieResponse(text) {
        let response = '';
        const qrCommandMatch = text.match(/^qr\s+(.+)/);

        if (qrCommandMatch) {
            const link = qrCommandMatch[1];
            // Basic URL validation
            if (!link.startsWith('http://') && !link.startsWith('https://')) {
                response = "Oops! That doesn't look like a valid link, hun. Make sure it starts with `http://` or `https://`! 😉";
            } else {
                const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(link)}&size=200x200&color=255-94-168`; // Neon Accent color
                response = `Here’s your super fab QR for that link, darling! ✨ <img src="${qrApiUrl}" alt="Your QR Code" style="max-width: 100%; height: auto; display: block; margin-top: 10px; border-radius: 10px;"> Go on, make it viral!`;
            }
        } else if (text.includes('hello') || text.includes('hi')) {
            response = "Hey there, gorgeous! What's crackin'? ✨";
        } else if (text.includes('how are you')) {
            response = "Feeling sparkly and ready to make some QRs! How about you, sweetie? 💖";
        } else if (text.includes('tell me a joke')) {
            response = "Why did the QR code break up with the barcode? Because it felt too 2D! 😂 lol!";
        } else if (text.includes('vibe')) {
            response = "Your vibe. Your code. That's what we're all about! Keep shining! 🌟";
        } else if (text.includes('thank you') || text.includes('thanks')) {
            response = "You're totally welcome, cutie pie! Anything else I can sparkle up for you? 💅";
        } else if (text.includes('love you')) {
            response = "Aww, sending you virtual hugs and glitter! Right back at ya, babe! 🥰";
        }
        else {
            const genericResponses = [
                "Hmm, that's a new one! What kind of QR magic are you dreaming of today? ✨",
                "Cutie's still learning, but I'm here to vibe! Try 'qr [your link]' to get started!",
                "Spill the tea! Or, like, tell me a link you wanna turn into a QR! 💅",
                "My circuits are buzzing with excitement! What's on your mind, hottie? 💖",
                "I'm all ears... or, well, sensors! What can Cutie do for you?",
                "Not sure how to answer that, but I bet we can make a stunning QR code out of it! 😉",
                "Let's get this glow-up going! What's next?"
            ];
            response = genericResponses[Math.floor(Math.random() * genericResponses.length)];
        }

        setTimeout(() => {
            appendMessage(response, 'cutie-message');
        }, 800); // Simulate typing delay
    }
});
