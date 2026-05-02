/**
 * TIMEBROKER.AI - AI CONCIERGE MODULE (SOVEREIGN)
 * ═══════════════════════════════════════════════════════════════
 * Firebase Cloud Function Powered | Zero Client-Side API Keys
 * Routes through omniConciergeV1 for RAG-backed responses
 * Routes leads through submitLeadV2 for Firestore CRM
 * ═══════════════════════════════════════════════════════════════
 */

class TimeBrokerConcierge {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.config = typeof TIMEBROKER_CONFIG !== 'undefined' ? TIMEBROKER_CONFIG.chatbot :
                      typeof DELRAY_CONFIG !== 'undefined' ? DELRAY_CONFIG.chatbot : this.getDefaultConfig();
        this.conversationState = 'greeting';
        this.leadData = {};
        this.firebaseReady = false;
        this.init();
    }

    getDefaultConfig() {
        return {
            name: "TimeBroker Concierge",
            avatar: "⚡",
            greeting: "Welcome to TimeBroker AI. I'm your strategic concierge. How may I assist with capital formation, AI infrastructure, or executive advisory?",
            personality: "Sophisticated luxury concierge and strategic guide. Professional, subtle, and highly intelligent."
        };
    }

    init() {
        this.injectStyles();
        this.createChatWidget();

        // Wait for Firebase to be ready
        if (window._firebase) {
            this.firebaseReady = true;
        } else {
            window.addEventListener('firebase-ready', () => {
                this.firebaseReady = true;
                console.log('⚡ Concierge: Firebase CRM connected');
            });
        }

        console.log('⚡ TimeBroker Concierge: ONLINE (Sovereign Mode)');
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #timebroker-chatbot {
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
        widget.id = 'timebroker-chatbot';
        widget.innerHTML = `
            <div class="chat-bubble" onclick="tbConcierge.toggleChat()">
                ${this.config.avatar}
            </div>
            <div class="chat-window" id="chat-window">
                <div class="chat-header">
                    <div class="chat-header-avatar">${this.config.avatar}</div>
                    <div class="chat-header-info">
                        <h4>${this.config.name}</h4>
                        <span>● Online now</span>
                    </div>
                    <button class="chat-close" onclick="tbConcierge.toggleChat()">&times;</button>
                </div>
                <div class="chat-messages" id="chat-messages"></div>
                <div class="chat-input-area">
                    <input type="text" class="chat-input" id="chat-input" placeholder="Type your message..." onkeypress="if(event.key==='Enter')tbConcierge.sendMessage()">
                    <button class="chat-send" onclick="tbConcierge.sendMessage()">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(widget);
        console.log('⚡ TimeBroker Concierge: Awaiting your inquiry.');
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.toggle('open', this.isOpen);

        if (this.isOpen && this.messages.length === 0) {
            this.sendBotMessage(this.config.greeting, [
                "Capital strategy",
                "AI infrastructure",
                "Give Back Challenge",
                "Book a discovery call"
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
                `<button class="quick-reply" onclick="tbConcierge.handleQuickReply('${r.replace(/'/g, "\\'")}')">${r}</button>`
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
                // Use Omni-Concierge for general questions
                await this.getAIResponse(text);
            }
        } else if (this.conversationState === 'booking') {
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
        try {
            if (!this.firebaseReady || !window._firebase) {
                throw new Error('Firebase not ready');
            }

            const { functions, httpsCallable } = window._firebase;
            const omniConcierge = httpsCallable(functions, 'omniConciergeV1');

            const result = await omniConcierge({
                message: text,
                persona: 'ORACLE',
                context: 'timebroker-consulting',
                conversationHistory: this.messages.slice(-6).map(m => ({
                    role: m.type === 'user' ? 'user' : 'model',
                    content: m.content
                }))
            });

            const response = result.data?.response || result.data?.message || 
                "I'd be happy to help with that. Would you like to schedule a discovery call to discuss in detail?";
            
            this.sendBotMessage(response, ["Book a session", "Tell me more", "Chat on WhatsApp"]);

        } catch (err) {
            console.warn('Omni-Concierge call failed:', err.message);
            // Intelligent fallback
            const fallbackResponses = [
                "That's a great question. Want me to set up a complimentary discovery call so we can give you a personalized answer?",
                "I can connect you directly to discuss this in depth. Would you prefer a <a href='https://wa.me/13366521387' target='_blank' style='color:#d4af37'>WhatsApp chat</a> or a scheduled call?",
                "Let me arrange a deeper dive into that topic. Shall I book a complimentary discovery call?"
            ];
            const fallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
            this.sendBotMessage(fallback, ["Yes, schedule call", "WhatsApp instead"]);
        }
    }

    sendBotMessage(content, quickReplies = []) {
        setTimeout(() => {
            this.hideTyping();
            this.addMessage('bot', content, quickReplies);
        }, 1000 + Math.random() * 1000);
    }

    async submitLead() {
        try {
            if (!this.firebaseReady || !window._firebase) {
                throw new Error('Firebase not ready');
            }

            const { db, collection, addDoc, serverTimestamp } = window._firebase;

            // Write directly to Firestore leads_v2 collection
            await addDoc(collection(db, 'leads_v2'), {
                name: this.leadData.name,
                email: this.leadData.email,
                phone: this.leadData.phone,
                interest: this.leadData.interest,
                source: 'timebroker-ai-concierge',
                property: 'timebroker.ai',
                status: 'new',
                crmStatus: 'new',
                priority: 'high',
                notes: `Concierge lead from TimeBroker.AI. Interest: ${this.leadData.interest}`,
                createdAt: serverTimestamp(),
                assignedTo: 'delray'
            });

            console.log('🔥 Lead saved to Firestore leads_v2');

            // Track in GA4
            if (typeof gtag !== 'undefined') {
                gtag('event', 'lead_captured', {
                    source: 'chatbot',
                    interest: this.leadData.interest,
                    property: 'timebroker.ai'
                });
            }

        } catch (err) {
            console.warn('Firestore lead save failed, logging locally:', err.message);
            // LocalStorage fallback
            try {
                const leads = JSON.parse(localStorage.getItem('TB_LEADS') || '[]');
                leads.unshift({ ...this.leadData, source: 'timebroker-concierge', status: 'pending_sync', timestamp: new Date().toISOString() });
                localStorage.setItem('TB_LEADS', JSON.stringify(leads));
            } catch (e) { /* silent */ }
        }

        this.sendBotMessage(
            `🎉 <b>You're all set, ${this.leadData.name}!</b><br><br>Your inquiry has been logged and our team will reach out within 24 hours to confirm a time.<br><br>Need immediate help? <a href="https://wa.me/13366521387" target="_blank" style="color:#d4af37">Chat on WhatsApp →</a>`,
            ["Explore AI services", "Thanks!"]
        );

        this.conversationState = 'complete';
    }
}

// Auto-initialize
let tbConcierge;
let delrayChatbot; // Backwards compatibility alias
document.addEventListener('DOMContentLoaded', () => {
    tbConcierge = new TimeBrokerConcierge();
    delrayChatbot = tbConcierge; // Legacy alias
});
