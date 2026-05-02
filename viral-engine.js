/**
 * TIMEBROKER.AI - ENGAGEMENT ENGINE (SOVEREIGN)
 * ═══════════════════════════════════════════════════════════════
 * Referral Tracking • Social Sharing • Analytics
 * Fake social proof widgets REMOVED — sovereign brands earn trust.
 * ═══════════════════════════════════════════════════════════════
 */

class EngagementEngine {
    constructor(config) {
        this.config = config || (typeof TIMEBROKER_CONFIG !== 'undefined' ? TIMEBROKER_CONFIG.viral : {});
        this.init();
    }

    init() {
        if (this.config.enableReferralSystem) this.initReferralSystem();
        console.log('⚡ TimeBroker Engagement Engine: ACTIVATED');
    }

    // ═══════════════════════════════════════════════════════════════
    // REFERRAL SYSTEM (Legitimate tracking — NOT fake social proof)
    // ═══════════════════════════════════════════════════════════════
    initReferralSystem() {
        // Track inbound referral codes
        const urlParams = new URLSearchParams(window.location.search);
        const refCode = urlParams.get('ref');

        if (refCode) {
            sessionStorage.setItem('referralCode', refCode);
            console.log('📊 Referral tracked:', refCode);
        }

        // Social share buttons (right sidebar, desktop only)
        this.addShareButtons();
    }

    addShareButtons() {
        const shareContainer = document.createElement('div');
        shareContainer.id = 'engagement-share-buttons';
        shareContainer.innerHTML = `
            <div class="share-label">Share</div>
            <div class="share-buttons">
                <button onclick="engagementEngine.shareLinkedIn()" class="share-btn linkedin" aria-label="Share on LinkedIn">
                    <i class="fab fa-linkedin"></i>
                </button>
                <button onclick="engagementEngine.shareTwitter()" class="share-btn twitter" aria-label="Share on X">
                    <i class="fab fa-twitter"></i>
                </button>
                <button onclick="engagementEngine.copyLink()" class="share-btn copy" aria-label="Copy link">
                    <i class="fas fa-link"></i>
                </button>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            #engagement-share-buttons {
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
            @media (max-width: 768px) { #engagement-share-buttons { display: none; } }
        `;
        document.head.appendChild(style);
        document.body.appendChild(shareContainer);
    }

    generateRefCode() {
        return 'TB' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }

    shareLinkedIn() {
        const refCode = this.generateRefCode();
        const url = encodeURIComponent(window.location.origin + '?ref=' + refCode);
        const shareText = (typeof TIMEBROKER_CONFIG !== 'undefined' && TIMEBROKER_CONFIG.linkedin?.shareText) ||
            'Discover sovereign AI infrastructure and capital strategy.';
        this.trackEvent('EngagementShare', { platform: 'LinkedIn', code: refCode });
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }

    shareTwitter() {
        const refCode = this.generateRefCode();
        const url = encodeURIComponent(window.location.origin + '?ref=' + refCode);
        const text = encodeURIComponent('Sovereign AI infrastructure meets capital strategy. The future is being built. 🚀');
        this.trackEvent('EngagementShare', { platform: 'Twitter', code: refCode });
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    copyLink() {
        const refCode = this.generateRefCode();
        const url = window.location.origin + '?ref=' + refCode;
        navigator.clipboard.writeText(url);
        this.trackEvent('EngagementCopy', { platform: 'Direct', code: refCode });

        // Subtle confirmation toast
        const notification = document.createElement('div');
        notification.textContent = '✓ Link copied';
        notification.style.cssText = `
            position: fixed; top: 20px; right: 20px; z-index: 99999;
            background: rgba(16, 185, 129, 0.95); color: white;
            padding: 12px 24px; border-radius: 8px; font-weight: 600;
            font-family: 'Montserrat', sans-serif; font-size: 14px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            backdrop-filter: blur(10px);
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 2500);
    }

    trackEvent(name, data) {
        console.log(`📊 Tracking: ${name}`, data);
        if (typeof gtag !== 'undefined') {
            gtag('event', name, data);
        }
    }
}

// Auto-initialize when DOM is ready
let engagementEngine;

// Backwards compatibility: expose as viralEngine too
let viralEngine;

document.addEventListener('DOMContentLoaded', () => {
    const config = typeof TIMEBROKER_CONFIG !== 'undefined' ? TIMEBROKER_CONFIG.viral :
                   typeof DELRAY_CONFIG !== 'undefined' ? DELRAY_CONFIG.viral : null;
    engagementEngine = new EngagementEngine(config);
    viralEngine = engagementEngine; // Legacy alias
});
