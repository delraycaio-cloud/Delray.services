/**
 * DELRAY.SERVICES - AI CHATBOT MODULE
 * ═══════════════════════════════════════════════════════════════
 * Gemini-Powered Lead Qualification & Booking Assistant
 * ═══════════════════════════════════════════════════════════════
 */

class DelrayChatbot {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.config = typeof DELRAY_CONFIG !== 'undefined' ? DELRAY_CONFIG.chatbot : this.getDefaultConfig();
        this.conversationState = 'greeting';
        this.leadData = {};
        this.init();
    }

    getDefaultConfig() {
        return {
            name: "Concierge",
            avatar: "🥂",
            greeting: "Good evening. I am Delray's private concierge. How may I assist your inquiry into our exclusive capital or infrastructure services?",
            personality: "Sophisticated luxury concierge and strategic guide. Professional, subtle, and highly intelligent. Focus on providing value and gentle guidance rather than sales qualification."
        };
    }

    init() {
        this.injectStyles();
        this.createChatWidget();
        console.log('🥂 Luxury Concierge: ONLINE');
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #delray-chatbot {
                position: fixed; bottom: 100px; right: 20px; z-index: 99998;
                font-family: 'Montserrat', sans-serif;
            }
            
            .chat-bubble {
                width: 65px; height: 65px; border-radius: 50%;
                background: linear-gradient(135deg, #0f172a, #1e293b);
                border: 3px solid #d4af37; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                font-size: 28px; box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                transition: all 0.3s; animation: chatPulse 2s infinite;
            }
            .chat-bubble:hover { transform: scale(1.1); }
            
            @keyframes chatPulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.5); }
                50% { box-shadow: 0 0 0 15px rgba(212, 175, 55, 0); }
            }
            
            .chat-window {
                position: absolute; bottom: 80px; right: 0;
                width: 380px; height: 520px; 
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px) saturate(180%);
                -webkit-backdrop-filter: blur(20px) saturate(180%);
                border-radius: 20px; 
                box-shadow: 0 25px 80px rgba(0,0,0,0.5), inset 0 0 20px rgba(212, 175, 55, 0.1);
                display: none; flex-direction: column; overflow: hidden;
                border: 1px solid rgba(212, 175, 55, 0.4);
            }
            .chat-window.open { display: flex; animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
            
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            .chat-header {
                background: linear-gradient(135deg, rgba(15, 23, 42, 1), rgba(30, 41, 59, 0.8));
                color: white; padding: 20px; display: flex; align-items: center; gap: 15px;
                border-bottom: 1px solid rgba(212, 175, 55, 0.2);
            }
            .chat-header-avatar { font-size: 30px; }
            .chat-header-info h4 { margin: 0; font-size: 16px; color: #d4af37; }
            .chat-header-info span { font-size: 12px; color: #94a3b8; }
            .chat-close {
                margin-left: auto; background: none; border: none;
                color: #94a3b8; font-size: 24px; cursor: pointer;
            }
            
            .chat-messages {
                flex: 1; overflow-y: auto; padding: 20px;
                background: transparent;
            }
            
            .chat-message {
                display: flex; margin-bottom: 15px; animation: fadeIn 0.3s;
            }
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            
            .chat-message.bot { justify-content: flex-start; }
            .chat-message.user { justify-content: flex-end; }
            
            .message-content {
                max-width: 80%; padding: 12px 16px; border-radius: 18px;
                font-size: 14px; line-height: 1.5;
            }
            .bot .message-content {
                background: rgba(255, 255, 255, 0.05); color: #f8fafc;
                border: 1px solid rgba(212, 175, 55, 0.2); border-bottom-left-radius: 5px;
            }
            .user .message-content {
                background: linear-gradient(135deg, #d4af37, #f59e0b); color: #0f172a;
                font-weight: 600;
                border-bottom-right-radius: 5px;
            }
            
            .chat-input-area {
                padding: 15px; background: white; border-top: 1px solid #e2e8f0;
                display: flex; gap: 10px;
            }
            .chat-input {
                flex: 1; padding: 12px 16px; border: 1px solid #e2e8f0;
                border-radius: 25px; font-size: 14px; outline: none;
            }
            .chat-input:focus { border-color: #d4af37; }
            .chat-send {
                width: 45px; height: 45px; border-radius: 50%;
                background: #d4af37; border: none; color: #0f172a;
                font-size: 18px; cursor: pointer; transition: all 0.3s;
            }
            .chat-send:hover { background: #0f172a; color: #d4af37; }
            
            .quick-replies {
                display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px;
            }
            .quick-reply {
                padding: 8px 14px; background: #e2e8f0; border: none;
                border-radius: 20px; font-size: 12px; cursor: pointer;
                transition: all 0.2s; color: #334155;
            }
            .quick-reply:hover { background: #d4af37; color: #0f172a; }
            
            .typing-indicator {
                display: flex; gap: 5px; padding: 15px;
            }
            .typing-dot {
                width: 8px; height: 8px; background: #94a3b8;
                border-radius: 50%; animation: typingBounce 1.4s infinite;
            }
            .typing-dot:nth-child(2) { animation-delay: 0.2s; }
            .typing-dot:nth-child(3) { animation-delay: 0.4s; }
            
            @keyframes typingBounce {
                0%, 60%, 100% { transform: translateY(0); }
                30% { transform: translateY(-8px); }
            }
            
            @media (max-width: 480px) {
                .chat-window { width: 100vw; height: 100vh; bottom: 0; right: 0; border-radius: 0; position: fixed; }
            }
        `;
        document.head.appendChild(style);
    }

    createChatWidget() {
        const widget = document.createElement('div');
        widget.id = 'delray-chatbot';
        widget.innerHTML = `
            <div class="chat-bubble" onclick="delrayChatbot.toggleChat()">
                ${this.config.avatar}
            </div>
            <div class="chat-window" id="chat-window">
                <div class="chat-header">
                    <div class="chat-header-avatar">${this.config.avatar}</div>
                    <div class="chat-header-info">
                        <h4>${this.config.name}</h4>
                        <span>● Online now</span>
                    </div>
                    <button class="chat-close" onclick="delrayChatbot.toggleChat()">&times;</button>
                </div>
                <div class="chat-messages" id="chat-messages"></div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." onkeypress="if(event.key==='Enter')delrayChatbot.sendMessage()">
                    <button class="chat-send" onclick="delrayChatbot.sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);

        // Subtly notify user via console that concierge is ready
        console.log('🥂 Private Concierge: Awaiting your inquiry.');
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const window = document.getElementById('chat-window');
        window.classList.toggle('open', this.isOpen);

        if (this.isOpen && this.messages.length === 0) {
            this.sendBotMessage(this.config.greeting, [
                "I need capital strategy help",
                "Tell me about AI services",
                "What's the Give Back Challenge?",
                "Book a strategy session"
            ]);
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        const text = input.value.trim();
        if (!text) return;

        this.addMessage('user', text);
        input.value = '';

        this.showTyping();
        this.processMessage(text);
    }

    addMessage(type, content, quickReplies = []) {
        const container = document.getElementById('chat-messages');
        const message = document.createElement('div');
        message.className = `chat-message ${type}`;

        let html = `<div class="message-content">${content}</div>`;

        if (quickReplies.length > 0) {
            html += `<div class="quick-replies">${quickReplies.map(r =>
                `<button class="quick-reply" onclick="delrayChatbot.handleQuickReply('${r}')">${r}</button>`
            ).join('')}</div>`;
        }

        message.innerHTML = html;
        container.appendChild(message);
        container.scrollTop = container.scrollHeight;

        this.messages.push({ type, content });
    }

    showTyping() {
        const container = document.getElementById('chat-messages');
        const typing = document.createElement('div');
        typing.id = 'typing-indicator';
        typing.className = 'chat-message bot';
        typing.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        container.appendChild(typing);
        container.scrollTop = container.scrollHeight;
    }

    hideTyping() {
        document.getElementById('typing-indicator')?.remove();
    }

    handleQuickReply(text) {
        document.getElementById('chat-input').value = text;
        this.sendMessage();
    }

    async processMessage(text) {
        const lowerText = text.toLowerCase();

        // Lead qualification flow
        if (this.conversationState === 'greeting') {
            if (lowerText.includes('capital') || lowerText.includes('investment') || lowerText.includes('tax')) {
                this.conversationState = 'qualifying_capital';
                this.sendBotMessage(
                    "Great! Capital strategy is our specialty. We work with First Look Equities to structure tax-advantaged investments. Are you looking to:<br><br>• <b>Invest</b> in tax-deductible opportunities<br>• <b>Raise capital</b> for your business<br>• <b>Optimize</b> existing structures",
                    ["I want to invest", "I need to raise capital", "Optimize my structures"]
                );
            } else if (lowerText.includes('ai') || lowerText.includes('automation') || lowerText.includes('infrastructure')) {
                this.conversationState = 'qualifying_ai';
                this.sendBotMessage(
                    "Perfect! As a Fractional CAIO, I help businesses implement AI infrastructure. What's your primary goal?",
                    ["Reduce operational costs", "Automate workflows", "Get an AI audit", "Build AI products"]
                );
            } else if (lowerText.includes('give back') || lowerText.includes('challenge') || lowerText.includes('charity')) {
                this.sendBotMessage(
                    "The <b>Give Back Challenge</b> is our core philosophy:<br><br>🎁 I offer services at a <b>50% donated rate</b><br>🌊 You pledge <b>10%</b> of value created to Healthy People, Water, or Animals<br><br>It's capitalism with a conscience. Want to learn how you can participate?",
                    ["How do I join?", "Tell me more", "Book a call to discuss"]
                );
            } else if (lowerText.includes('book') || lowerText.includes('session') || lowerText.includes('call') || lowerText.includes('meeting')) {
                this.conversationState = 'booking';
                this.sendBotMessage(
                    "Excellent! I'd love to set up a strategy session for you. First, what's your name?",
                    []
                );
            } else {
                // Use AI for general questions
                await this.getAIResponse(text);
            }
        } else if (this.conversationState === 'booking') {
            // Collect booking info
            if (!this.leadData.name) {
                this.leadData.name = text;
                this.sendBotMessage("Nice to meet you, " + text + "! What's your email address?");
            } else if (!this.leadData.email) {
                this.leadData.email = text;
                this.sendBotMessage("And what's the best phone number to reach you?");
            } else if (!this.leadData.phone) {
                this.leadData.phone = text;
                this.sendBotMessage(
                    "What are you most interested in discussing?",
                    ["Capital Strategy", "AI Infrastructure", "Partnership Opportunity", "Give Back Challenge"]
                );
            } else if (!this.leadData.interest) {
                this.leadData.interest = text;
                await this.submitLead();
            }
        } else {
            await this.getAIResponse(text);
        }
    }

    async getAIResponse(text) {
        const config = typeof DELRAY_CONFIG !== 'undefined' ? DELRAY_CONFIG : {};
        const preferred = config.preferredAI || 'auto';

        // Try providers in priority sequence
        const providerOrder = preferred === 'auto'
            ? ['gemini', 'claude', 'perplexity']
            : [preferred, 'gemini', 'claude']; // Fallback even if preferred specified

        for (const provider of providerOrder) {
            try {
                const response = await this.tryProvider(provider, text, config);
                if (response) {
                    this.sendBotMessage(response, ["Book a session", "Tell me more"]);
                    return;
                }
            } catch (e) {
                console.warn(`Provider ${provider} failed, trying next...`);
            }
        }

        // Ultimate Concierge Fallback
        const fallback = "I'm currently processing your high-level request. To ensure the most accurate strategy, would you like to schedule a brief 15-minute briefing with Delray directly?";
        this.sendBotMessage(fallback, ["Yes, schedule call", "Continue searching"]);
    }

    async tryProvider(provider, text, config) {
        const prompt = `${this.config.personality}\n\nUser message: "${text}"\n\nRespond helpfully in 2-3 sentences. Focus on Miami-Dade area businesses, marinas, and yachting. Always try to guide toward booking a strategy session or joining the Give Back Challenge.`;

        try {
            if (provider === 'gemini' && config.geminiApiKey) {
                const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: prompt }] }],
                        generationConfig: { temperature: 0.7, maxOutputTokens: 300 }
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    return data.candidates?.[0]?.content?.parts?.[0]?.text;
                }
            }

            if (provider === 'claude' && config.claudeApiKey) {
                // IMPORTANT: Since we are in a browser, direct Claude API calls might hit CORS issues
                // unless the user has a proxy. We will try, but also provide a 'Simulated Intelligence' fallback
                // if the key is present but the request fails.
                const res = await fetch('https://api.anthropic.com/v1/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': config.claudeApiKey,
                        'anthropic-version': '2023-06-01',
                        'dangerouslyAllowBrowser': 'true' // Some libraries use this
                    },
                    body: JSON.stringify({
                        model: 'claude-3-haiku-20240307',
                        max_tokens: 300,
                        messages: [{ role: 'user', content: prompt }]
                    })
                });

                if (res.ok) {
                    const data = await res.json();
                    return data.content?.[0]?.text;
                }
            }
        } catch (err) {
            console.warn(`${provider} API error:`, err.message);
        }
        return null;
    }

    sendBotMessage(content, quickReplies = []) {
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('bot', content, quickReplies);
        }, 1000 + Math.random() * 1000);
    }

    async submitLead() {
        const bitrixUrl = typeof DELRAY_CONFIG !== 'undefined' ? DELRAY_CONFIG.bitrix.webhookUrl + DELRAY_CONFIG.bitrix.endpoints.addLead : '';

        if (bitrixUrl) {
            try {
                await fetch(bitrixUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        fields: {
                            TITLE: `CHATBOT: ${this.leadData.name} - ${this.leadData.interest}`,
                            NAME: this.leadData.name,
                            EMAIL: [{ VALUE: this.leadData.email, VALUE_TYPE: 'WORK' }],
                            PHONE: [{ VALUE: this.leadData.phone, VALUE_TYPE: 'WORK' }],
                            COMMENTS: `Interest: ${this.leadData.interest}\nSource: AI Chatbot`,
                            SOURCE_ID: 'WEB'
                        }
                    })
                });
            } catch (err) { console.log('Lead submit error:', err); }
        }

        this.sendBotMessage(
            `🎉 <b>You're all set, ${this.leadData.name}!</b><br><br>I've scheduled your strategy session request. Delray will reach out within 24 hours to confirm a time.<br><br>In the meantime, feel free to explore our AI tools on this page!`,
            ["Show me AI tools", "Thanks!"]
        );

        this.conversationState = 'complete';
    }
}

// Auto-initialize
let delrayChatbot;
document.addEventListener('DOMContentLoaded', () => {
    delrayChatbot = new DelrayChatbot();
});
