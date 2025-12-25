/**
 * Eagle Harbor Chatbot Widget
 * Easy integration for existing website pages
 */

class EagleHarborChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.injectStyles();
        this.createChatbotHTML();
        this.initializeElements();
        this.initializeEventListeners();
        this.initializeKnowledgeBase();
    }

    injectStyles() {
        const styles = `
            :root {
                --eh-primary-color: #2c5aa0;
                --eh-secondary-color: #1a4480;
                --eh-accent-color: #f4a261;
                --eh-text-dark: #2c3e50;
                --eh-text-light: #6c757d;
                --eh-background-light: #f8f9fa;
                --eh-white: #ffffff;
                --eh-success-color: #28a745;
                --eh-error-color: #dc3545;
                --eh-shadow: 0 4px 20px rgba(0,0,0,0.1);
            }

            .eh-chatbot-toggle {
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: var(--eh-primary-color);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 24px;
                cursor: pointer;
                box-shadow: var(--eh-shadow);
                z-index: 10000;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Font Awesome 6 Free', sans-serif;
            }

            .eh-chatbot-toggle:hover {
                background: var(--eh-secondary-color);
                transform: scale(1.1);
            }

            .eh-chatbot-toggle.active {
                background: var(--eh-error-color);
            }

            .eh-chatbot-container {
                position: fixed;
                bottom: 90px;
                right: 20px;
                width: 380px;
                height: 500px;
                background: white;
                border-radius: 15px;
                box-shadow: var(--eh-shadow);
                z-index: 9999;
                transform: translateY(100%) scale(0.8);
                opacity: 0;
                transition: all 0.3s ease;
                overflow: hidden;
                display: flex;
                flex-direction: column;
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            }

            .eh-chatbot-container.active {
                transform: translateY(0) scale(1);
                opacity: 1;
            }

            .eh-chatbot-header {
                background: linear-gradient(135deg, var(--eh-primary-color), var(--eh-secondary-color));
                color: white;
                padding: 20px;
                text-align: center;
                position: relative;
            }

            .eh-chatbot-header h3 {
                margin: 0;
                font-size: 18px;
                font-weight: 600;
            }

            .eh-chatbot-header p {
                margin: 5px 0 0 0;
                font-size: 14px;
                opacity: 0.9;
            }

            .eh-chatbot-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                color: white;
                font-size: 20px;
                cursor: pointer;
                opacity: 0.8;
                transition: opacity 0.3s ease;
            }

            .eh-chatbot-close:hover {
                opacity: 1;
            }

            .eh-quick-actions {
                padding: 10px 20px 0;
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }

            .eh-quick-action {
                background: var(--eh-background-light);
                border: 1px solid #ddd;
                border-radius: 20px;
                padding: 8px 12px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
                color: var(--eh-text-dark);
            }

            .eh-quick-action:hover {
                background: var(--eh-primary-color);
                color: white;
                border-color: var(--eh-primary-color);
            }

            .eh-chat-messages {
                flex: 1;
                padding: 20px;
                overflow-y: auto;
                background: var(--eh-background-light);
            }

            .eh-message {
                margin-bottom: 15px;
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }

            .eh-message.user {
                flex-direction: row-reverse;
            }

            .eh-message-avatar {
                width: 35px;
                height: 35px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                flex-shrink: 0;
            }

            .eh-message.bot .eh-message-avatar {
                background: var(--eh-primary-color);
                color: white;
            }

            .eh-message.user .eh-message-avatar {
                background: var(--eh-accent-color);
                color: white;
            }

            .eh-message-content {
                max-width: 70%;
                padding: 12px 16px;
                border-radius: 18px;
                font-size: 14px;
                line-height: 1.4;
            }

            .eh-message.bot .eh-message-content {
                background: white;
                color: var(--eh-text-dark);
                border-bottom-left-radius: 5px;
            }

            .eh-message.user .eh-message-content {
                background: var(--eh-primary-color);
                color: white;
                border-bottom-right-radius: 5px;
            }

            .eh-typing-indicator {
                display: none;
                padding: 12px 16px;
                background: white;
                border-radius: 18px;
                border-bottom-left-radius: 5px;
                max-width: 70%;
            }

            .eh-typing-indicator.active {
                display: block;
            }

            .eh-typing-dots {
                display: flex;
                gap: 4px;
            }

            .eh-typing-dot {
                width: 8px;
                height: 8px;
                background: var(--eh-text-light);
                border-radius: 50%;
                animation: eh-typing 1.4s infinite ease-in-out;
            }

            .eh-typing-dot:nth-child(2) {
                animation-delay: 0.2s;
            }

            .eh-typing-dot:nth-child(3) {
                animation-delay: 0.4s;
            }

            @keyframes eh-typing {
                0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.4;
                }
                30% {
                    transform: translateY(-10px);
                    opacity: 1;
                }
            }

            .eh-chat-input-container {
                padding: 20px;
                background: white;
                border-top: 1px solid #eee;
            }

            .eh-chat-input-wrapper {
                display: flex;
                gap: 10px;
                align-items: center;
            }

            .eh-chat-input {
                flex: 1;
                padding: 12px 16px;
                border: 2px solid #eee;
                border-radius: 25px;
                font-size: 14px;
                outline: none;
                transition: border-color 0.3s ease;
            }

            .eh-chat-input:focus {
                border-color: var(--eh-primary-color);
            }

            .eh-chat-send {
                width: 40px;
                height: 40px;
                background: var(--eh-primary-color);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .eh-chat-send:hover {
                background: var(--eh-secondary-color);
                transform: scale(1.1);
            }

            .eh-chat-send:disabled {
                background: #ccc;
                cursor: not-allowed;
                transform: none;
            }

            .eh-chat-messages::-webkit-scrollbar {
                width: 6px;
            }

            .eh-chat-messages::-webkit-scrollbar-track {
                background: transparent;
            }

            .eh-chat-messages::-webkit-scrollbar-thumb {
                background: #ddd;
                border-radius: 3px;
            }

            .eh-chat-messages::-webkit-scrollbar-thumb:hover {
                background: #bbb;
            }

            @media (max-width: 480px) {
                .eh-chatbot-container {
                    width: calc(100vw - 40px);
                    height: calc(100vh - 140px);
                    right: 20px;
                    left: 20px;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <button class="eh-chatbot-toggle" id="ehChatbotToggle">
                &#xf086;
            </button>

            <div class="eh-chatbot-container" id="ehChatbotContainer">
                <div class="eh-chatbot-header">
                    <button class="eh-chatbot-close" id="ehChatbotClose">
                        &#xf00d;
                    </button>
                    <h3>Eagle Harbor Assistant</h3>
                    <p>Ask me about our community!</p>
                </div>

                <div class="eh-quick-actions">
                    <button class="eh-quick-action" data-message="What events are coming up?">Upcoming Events</button>
                    <button class="eh-quick-action" data-message="How do I contact the board?">Contact Board</button>
                    <button class="eh-quick-action" data-message="Tell me about Eagle Harbor history">Our History</button>
                    <button class="eh-quick-action" data-message="What amenities are available?">Amenities</button>
                </div>

                <div class="eh-chat-messages" id="ehChatMessages">
                    <div class="eh-message bot">
                        <div class="eh-message-avatar">
                            &#x2693;
                        </div>
                        <div class="eh-message-content">
                            Welcome to Eagle Harbor! I'm your community assistant. I can help you with information about our historic waterfront community, events, board members, and more. How can I help you today?
                        </div>
                    </div>
                </div>

                <div class="eh-message bot" id="ehTypingIndicator" style="display: none;">
                    <div class="eh-message-avatar">
                        &#x2693;
                    </div>
                    <div class="eh-typing-indicator">
                        <div class="eh-typing-dots">
                            <div class="eh-typing-dot"></div>
                            <div class="eh-typing-dot"></div>
                            <div class="eh-typing-dot"></div>
                        </div>
                    </div>
                </div>

                <div class="eh-chat-input-container">
                    <div class="eh-chat-input-wrapper">
                        <input type="text" class="eh-chat-input" id="ehChatInput" placeholder="Type your message..." maxlength="500">
                        <button class="eh-chat-send" id="ehChatSend">
                            &#xf1d8;
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    initializeElements() {
        this.toggle = document.getElementById('ehChatbotToggle');
        this.container = document.getElementById('ehChatbotContainer');
        this.closeBtn = document.getElementById('ehChatbotClose');
        this.messages = document.getElementById('ehChatMessages');
        this.input = document.getElementById('ehChatInput');
        this.sendBtn = document.getElementById('ehChatSend');
        this.typingIndicator = document.getElementById('ehTypingIndicator');
    }

    initializeEventListeners() {
        this.toggle.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        // Quick actions
        document.querySelectorAll('.eh-quick-action').forEach(btn => {
            btn.addEventListener('click', () => {
                const message = btn.getAttribute('data-message');
                this.input.value = message;
                this.sendMessage();
            });
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target) && !this.toggle.contains(e.target)) {
                this.closeChat();
            }
        });
    }

    initializeKnowledgeBase() {
        this.knowledgeBase = {
            'about|history|founded|heritage': {
                response: "Eagle Harbor is a historic African American waterfront community founded in 1929 along the Patuxent River. We're one of the few remaining communities of our kind in the United States, designated as a Sustainable Community in 2018 and recognized as a Historical Black Site in 2020.",
                followUp: ["Tell me more about our timeline", "What makes us special?", "Who are our leaders?"]
            },

            'board|leadership|president|mayor|commissioner': {
                response: "Our community has two leadership bodies:<br><br><strong>Citizens Association Board:</strong><br>• President: Janie Branson<br>• Vice President: Curtis Prince<br>• Secretary: Anthony Delaney<br>• Treasurer: Sabrina Littlejohn<br>• Sergeant of Arms: Barbara Stanard<br>• Parliamentarian: Bertha Guerra<br><br><strong>Board of Commissioners:</strong><br>• Mayor: James S. Jones<br>• Commissioners: Alton Branson, Harold Bryant II, Patricia Crews, Donnie Littlejohn",
                followUp: ["How do I contact the board?", "When are meetings held?", "How can I get involved?"]
            },

            'contact|phone|email|address|reach': {
                response: "📍 <strong>Address:</strong> 23308 Hawkins Drive, Aquasco, MD 20608-0028<br>📞 <strong>Phone:</strong> (301) 888-2410<br>📧 <strong>Email:</strong> info@eagleharborca.org<br>🌐 <strong>Website:</strong> townofeagleharborincmd.org",
                followUp: ["What are office hours?", "Who should I contact for specific issues?", "How do I join meetings?"]
            },

            'events|activities|calendar|meetings|gatherings': {
                response: "Eagle Harbor hosts regular community events throughout the year! We have town meetings, seasonal celebrations, and community gatherings. Check our events calendar on the website for the latest schedule, or contact the board for more information about upcoming activities.",
                followUp: ["How do I RSVP for events?", "Can I suggest new events?", "What's the next big celebration?"]
            },

            'amenities|facilities|waterfront|river|recreation': {
                response: "🌊 <strong>Waterfront Access:</strong> Direct access to the beautiful Patuxent River<br>🚤 <strong>Recreation:</strong> Boating, fishing, kayaking opportunities<br>🏡 <strong>Community:</strong> Close-knit neighborhood with ~70 residents<br>🌿 <strong>Environment:</strong> Sustainable community with environmental stewardship<br>📍 <strong>Location:</strong> Convenient to DC and Baltimore metro areas",
                followUp: ["Are there boat slips available?", "What fishing is allowed?", "Tell me about sustainability efforts"]
            },

            'housing|living|residents|move|property': {
                response: "Eagle Harbor is home to about 70 residents in a close-knit waterfront community. For housing availability, property information, or questions about moving to Eagle Harbor, please contact our board directly at (301) 888-2410 or info@eagleharborca.org.",
                followUp: ["What's the community like?", "Are there any restrictions?", "How do I get involved as a new resident?"]
            },

            'documents|bylaws|constitution|rules|regulations': {
                response: "Important community documents including our Constitution, Bylaws, and community guidelines are available on our website. You can also request copies by contacting the board. These documents outline community standards, procedures, and resident rights and responsibilities.",
                followUp: ["How do I access the documents?", "Can I suggest changes to bylaws?", "What are the key rules?"]
            },

            'hello|hi|hey|good morning|good afternoon|good evening': {
                response: "Hello! Welcome to Eagle Harbor! 🌊 I'm here to help you learn about our beautiful historic waterfront community. What would you like to know?",
                followUp: ["Tell me about Eagle Harbor", "Who are the board members?", "What events are coming up?", "How do I get involved?"]
            },

            'thank|thanks|appreciate': {
                response: "You're very welcome! I'm happy to help you learn more about our wonderful Eagle Harbor community. Is there anything else you'd like to know?",
                followUp: ["Tell me more about our history", "How can I get involved?", "What makes Eagle Harbor special?"]
            }
        };
    }

    toggleChat() {
        if (this.isOpen) {
            this.closeChat();
        } else {
            this.openChat();
        }
    }

    openChat() {
        this.isOpen = true;
        this.container.classList.add('active');
        this.toggle.classList.add('active');
        this.toggle.innerHTML = '&#xf00d;';
        this.input.focus();
    }

    closeChat() {
        this.isOpen = false;
        this.container.classList.remove('active');
        this.toggle.classList.remove('active');
        this.toggle.innerHTML = '&#xf086;';
    }

    async sendMessage() {
        const message = this.input.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        this.input.value = '';
        this.sendBtn.disabled = true;

        this.showTyping();

        setTimeout(() => {
            const response = this.generateResponse(message);
            this.hideTyping();
            this.addMessage(response.text, 'bot');
            
            if (response.followUp && response.followUp.length > 0) {
                this.addFollowUpButtons(response.followUp);
            }
            
            this.sendBtn.disabled = false;
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `eh-message ${sender}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'eh-message-avatar';
        avatar.innerHTML = sender === 'bot' ? '&#x2693;' : '&#xf007;';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'eh-message-content';
        messageContent.innerHTML = content;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        
        this.messages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addFollowUpButtons(followUpOptions) {
        const followUpDiv = document.createElement('div');
        followUpDiv.className = 'eh-message bot';
        followUpDiv.style.marginTop = '10px';
        
        const avatar = document.createElement('div');
        avatar.className = 'eh-message-avatar';
        avatar.innerHTML = '&#x2693;';
        
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'eh-message-content';
        buttonsContainer.style.background = 'transparent';
        buttonsContainer.style.padding = '0';
        
        const buttonsWrapper = document.createElement('div');
        buttonsWrapper.style.display = 'flex';
        buttonsWrapper.style.flexDirection = 'column';
        buttonsWrapper.style.gap = '8px';
        
        followUpOptions.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.style.cssText = `
                background: var(--eh-primary-color);
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 15px;
                font-size: 12px;
                cursor: pointer;
                transition: all 0.3s ease;
            `;
            
            button.addEventListener('click', () => {
                this.input.value = option;
                this.sendMessage();
                followUpDiv.remove();
            });
            
            button.addEventListener('mouseenter', () => {
                button.style.background = 'var(--eh-secondary-color)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'var(--eh-primary-color)';
            });
            
            buttonsWrapper.appendChild(button);
        });
        
        buttonsContainer.appendChild(buttonsWrapper);
        followUpDiv.appendChild(avatar);
        followUpDiv.appendChild(buttonsContainer);
        
        this.messages.appendChild(followUpDiv);
        this.scrollToBottom();
    }

    generateResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        for (const [keywords, data] of Object.entries(this.knowledgeBase)) {
            const keywordList = keywords.split('|');
            if (keywordList.some(keyword => lowerMessage.includes(keyword))) {
                return {
                    text: data.response,
                    followUp: data.followUp || []
                };
            }
        }
        
        return {
            text: "I'd be happy to help you with information about Eagle Harbor! I can tell you about our history, board members, events, amenities, and community life. You can also contact our board directly at (301) 888-2410 or info@eagleharborca.org for specific questions.",
            followUp: ["Tell me about Eagle Harbor history", "Who are the board members?", "What amenities are available?", "How do I contact the board?"]
        };
    }

    showTyping() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.typingIndicator.querySelector('.eh-typing-indicator').classList.add('active');
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
        this.typingIndicator.querySelector('.eh-typing-indicator').classList.remove('active');
    }

    scrollToBottom() {
        setTimeout(() => {
            this.messages.scrollTop = this.messages.scrollHeight;
        }, 100);
    }
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new EagleHarborChatbot();
    });
} else {
    new EagleHarborChatbot();
}