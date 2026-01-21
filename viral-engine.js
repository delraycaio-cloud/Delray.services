/**
 * DELRAY.SERVICES - VIRAL GROWTH ENGINE
 * ═══════════════════════════════════════════════════════════════
 * Social Proof • Urgency • Referrals • Exit Intent
 * ═══════════════════════════════════════════════════════════════
 */

class ViralEngine {
    constructor(config) {
        this.config = config || DELRAY_CONFIG?.viral || {};
        this.init();
    }

    init() {
        if (this.config.enableLiveCounter) this.initLiveCounter();
        if (this.config.enableBookingToasts) this.initBookingToasts();
        if (this.config.enableExitPopup) this.initExitPopup();
        if (this.config.enableReferralSystem) this.initReferralSystem();
        if (this.config.enableUrgencyTimer) this.initUrgencyTimer();

        console.log('🔥 Viral Engine: ACTIVATED');
    }

    // ═══════════════════════════════════════════════════════════════
    // LIVE VISITOR COUNTER
    // ═══════════════════════════════════════════════════════════════
    initLiveCounter() {
        const counter = document.createElement('div');
        counter.id = 'viral-live-counter';
        counter.innerHTML = `
            <div class="live-counter-badge">
                <span class="pulse-dot"></span>
                <span class="counter-text"><strong id="visitor-count">0</strong> people viewing now</span>
            </div>
        `;
        counter.style.cssText = `
            position: fixed; bottom: 20px; left: 20px; z-index: 9999;
            background: rgba(15, 23, 42, 0.95); backdrop-filter: blur(10px);
            color: white; padding: 12px 20px; border-radius: 50px;
            font-size: 13px; font-family: 'Montserrat', sans-serif;
            border: 1px solid rgba(212, 175, 55, 0.3);
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            display: flex; align-items: center; gap: 10px;
        `;
        document.body.appendChild(counter);

        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            .pulse-dot {
                width: 10px; height: 10px; background: #10b981;
                border-radius: 50%; display: inline-block;
                animation: pulse-live 1.5s infinite;
            }
            @keyframes pulse-live {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.5; transform: scale(1.2); }
            }
        `;
        document.head.appendChild(style);

        // Fluctuate counter
        const base = this.config.baseVisitorCount || 127;
        const fluctuation = this.config.visitorFluctuation || 15;

        const updateCounter = () => {
            const count = base + Math.floor(Math.random() * fluctuation) - Math.floor(fluctuation / 2);
            document.getElementById('visitor-count').textContent = count;
        };

        updateCounter();
        setInterval(updateCounter, 5000 + Math.random() * 5000);
    }

    // ═══════════════════════════════════════════════════════════════
    // BOOKING NOTIFICATION TOASTS
    // ═══════════════════════════════════════════════════════════════
    initBookingToasts() {
        const names = [
            { name: "Julian", city: "Coral Gables", service: "Investment Charter" },
            { name: "Elena", city: "Miami Beach", service: "Private VIP Roadmap" },
            { name: "Marcus", city: "Fort Lauderdale", service: "AI Infrastructure" },
            { name: "Sofia", city: "Key Biscayne", service: "Impact Strategy" },
            { name: "Ricardo", city: "Boca Raton", service: "Territory Application" },
            { name: "Angelina", city: "Miami", service: "Immersive Learning" },
            { name: "Xavier", city: "Aventura", service: "CAIO Consultation" },
            { name: "Isabella", city: "Pinecrest", service: "Strategy Session" },
            { name: "Mateo", city: "Coconut Grove", service: "Marina Partnership" },
            { name: "Valentina", city: "Fisher Island", service: "Capital Audit" }
        ];

        const showToast = () => {
            const booking = names[Math.floor(Math.random() * names.length)];
            const minutes = Math.floor(Math.random() * 15) + 1;

            const toast = document.createElement('div');
            toast.className = 'booking-toast';
            toast.innerHTML = `
                <div class="toast-icon">✨</div>
                <div class="toast-content">
                    <strong>${booking.name}</strong> from ${booking.city}
                    <div class="toast-detail">just booked a ${booking.service} • ${minutes}m ago</div>
                </div>
            `;
            toast.style.cssText = `
                position: fixed; bottom: 80px; left: 20px; z-index: 9998;
                background: white; color: #0f172a; padding: 16px 20px;
                border-radius: 12px; font-size: 14px; font-family: 'Montserrat', sans-serif;
                box-shadow: 0 10px 40px rgba(0,0,0,0.15); display: flex; align-items: center; gap: 12px;
                transform: translateX(-120%); transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                max-width: 320px; border-left: 4px solid #d4af37;
            `;

            document.body.appendChild(toast);

            setTimeout(() => toast.style.transform = 'translateX(0)', 100);
            setTimeout(() => {
                toast.style.transform = 'translateX(-120%)';
                setTimeout(() => toast.remove(), 500);
            }, 5000);
        };

        // Add toast styles
        const style = document.createElement('style');
        style.textContent = `
            .toast-detail { font-size: 12px; color: #64748b; margin-top: 4px; }
            .toast-icon { font-size: 24px; }
        `;
        document.head.appendChild(style);

        // Show first toast after 20 seconds, then every 1-3 minutes (very subtle)
        setTimeout(showToast, 20000);
        setInterval(() => {
            if (Math.random() > 0.4) showToast();
        }, 60000 + Math.random() * 120000);
    }

    // ═══════════════════════════════════════════════════════════════
    // EXIT INTENT POPUP
    // ═══════════════════════════════════════════════════════════════
    initExitPopup() {
        // Disabled for high-end luxury feel. We don't want to trap users.
        console.log('Exit Intent: DEACTIVATED for Luxury Tier');
    }

    // ═══════════════════════════════════════════════════════════════
    // REFERRAL SYSTEM
    // ═══════════════════════════════════════════════════════════════
    initReferralSystem() {
        // Check for referral code in URL
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');

        if (refCode) {
            sessionStorage.setItem('referralCode', refCode);
            console.log('Referral tracked:', refCode);
        }

        // Add share buttons to page
        this.addShareButtons();
    }

    addShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.id = 'viral-share-buttons';
        shareContainer.innerHTML = `
            <div class="share-label">Share & Earn a Free Session</div>
            <div class="share-buttons">
                <button onclick="viralEngine.shareLinkedIn()" class="share-btn linkedin">
                    <i class="fab fa-linkedin"></i>
                </button>
                <button onclick="viralEngine.shareTwitter()" class="share-btn twitter">
                    <i class="fab fa-twitter"></i>
                </button>
                <button onclick="viralEngine.copyLink()" class="share-btn copy">
                    <i class="fas fa-link"></i>
                </button>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #viral-share-buttons {
                position: fixed; right: 20px; top: 50%; transform: translateY(-50%);
                z-index: 9997; text-align: center;
            }
            .share-label {
                writing-mode: vertical-rl; text-orientation: mixed;
                font-size: 10px; color: #64748b; margin-bottom: 10px;
                text-transform: uppercase; letter-spacing: 2px;
            }
            .share-buttons { display: flex; flex-direction: column; gap: 10px; }
            .share-btn {
                width: 45px; height: 45px; border-radius: 50%; border: none;
                cursor: pointer; font-size: 18px; transition: all 0.3s;
                display: flex; align-items: center; justify-content: center;
            }
            .share-btn.linkedin { background: #0077b5; color: white; }
            .share-btn.twitter { background: #1da1f2; color: white; }
            .share-btn.copy { background: #d4af37; color: #0f172a; }
            .share-btn:hover { transform: scale(1.15); box-shadow: 0 5px 20px rgba(0,0,0,0.3); }
            @media (max-width: 768px) { #viral-share-buttons { display: none; } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(shareContainer);
    }

    generateRefCode() {
        return 'DW' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    shareLinkedIn() {
        const refCode = this.generateRefCode();
        const url = encodeURIComponent(window.location.origin + '?ref=' + refCode);
        const text = encodeURIComponent(DELRAY_CONFIG?.linkedin?.shareText || 'Check out this amazing opportunity!');
        this.trackEvent('ViralShare', { platform: 'LinkedIn', code: refCode });
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }

    shareTwitter() {
        const refCode = this.generateRefCode();
        const url = encodeURIComponent(window.location.origin + '?ref=' + refCode);
        const text = encodeURIComponent('Discovered an incredible approach to capital strategy with community impact. Give Back Challenge! 🚀');
        this.trackEvent('ViralShare', { platform: 'Twitter', code: refCode });
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    shareCalendar() {
        const title = encodeURIComponent("Delray.Services Strategy Session");
        const details = encodeURIComponent("Discussing Capital Strategy & AI Infrastructure.");
        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
        this.trackEvent('CalendarInvite', { action: 'Google' });
        window.open(url, '_blank');
    }

    copyLink() {
        const refCode = this.generateRefCode();
        const url = window.location.origin + '?ref=' + refCode;
        navigator.clipboard.writeText(url);
        this.trackEvent('ViralCopy', { platform: 'Direct', code: refCode });

        // Show copied notification
        const notification = document.createElement('div');
        notification.textContent = '✓ Link copied with your referral code!';
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 99999;
            background: #10b981; color: white; padding: 15px 25px;
            border-radius: 10px; font-weight: bold; animation: slideIn 0.3s;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    trackEvent(name, data) {
        console.log(`📊 Tracking: ${name}`, data);
        if (typeof gtag !== 'undefined') {
            gtag('event', name, data);
        }
    }

    // ═══════════════════════════════════════════════════════════════
    // URGENCY TIMER
    // ═══════════════════════════════════════════════════════════════
    initUrgencyTimer() {
        const urgencyBar = document.createElement('div');
        urgencyBar.id = 'urgency-bar';
        urgencyBar.innerHTML = `
            <div class="urgency-content">
                <span class="urgency-icon">⚡</span>
                <span class="urgency-text">Only <strong>${this.config.slotsRemaining || 3}</strong> strategy sessions available this week</span>
                <span class="urgency-timer" id="countdown-timer"></span>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #urgency-bar {
                background: linear-gradient(90deg, #d4af37, #f59e0b);
                color: #0f172a; padding: 12px 20px; text-align: center;
                font-size: 14px; font-weight: 600; position: relative;
            }
            .urgency-content { display: flex; align-items: center; justify-content: center; gap: 15px; flex-wrap: wrap; }
            .urgency-icon { font-size: 18px; }
            .urgency-timer { background: #0f172a; color: #d4af37; padding: 5px 12px; border-radius: 5px; font-family: monospace; }
        `;
        document.head.appendChild(style);

        // Insert at top of page
        document.body.insertBefore(urgencyBar, document.body.firstChild);

        // Countdown to end of week
        this.updateCountdown();
        setInterval(() => this.updateCountdown(), 1000);
    }

    updateCountdown() {
        const now = new Date();
        const endOfWeek = new Date(now);
        endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
        endOfWeek.setHours(17, 0, 0, 0);

        const diff = endOfWeek - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const timer = document.getElementById('countdown-timer');
        if (timer) {
            timer.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        }
    }
}

// Auto-initialize when DOM is ready
let viralEngine;
document.addEventListener('DOMContentLoaded', () => {
    viralEngine = new ViralEngine(typeof DELRAY_CONFIG !== 'undefined' ? DELRAY_CONFIG.viral : null);
});
