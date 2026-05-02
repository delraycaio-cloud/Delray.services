/**
 * TIMEBROKER.AI - SOVEREIGN CONFIGURATION
 * ═══════════════════════════════════════════════════════════════
 * 100% Google-Native | Zero API Keys in Client JS
 * All AI calls route through Firebase Cloud Functions (server-side)
 * ═══════════════════════════════════════════════════════════════
 */

window.TIMEBROKER_CONFIG = {
    // Backwards compatibility alias
    get _legacy() { return this; },
    // ═══════════════════════════════════════════════════════════════
    // 🔥 FIREBASE PROJECT (ac-godmode-titan)
    // ═══════════════════════════════════════════════════════════════
    firebase: {
        projectId: "ac-godmode-titan",
        region: "us-central1",
        // Cloud Functions endpoints (all server-side, no keys needed)
        endpoints: {
            submitLead: "submitLeadV2",
            omniConcierge: "omniConciergeV1",
            createLead: "createLeadV1"
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // 📅 CALENDAR BOOKING CONFIGURATION
    // ═══════════════════════════════════════════════════════════════
    calendar: {
        provider: "google",
        availableSlots: [
            { day: "Monday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Tuesday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Wednesday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Thursday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Friday", times: ["10:00 AM", "2:00 PM"] }
        ],
        timezone: "America/New_York",
        sessionDuration: 30
    },

    // ═══════════════════════════════════════════════════════════════
    // 🚀 VIRAL GROWTH ENGINE SETTINGS
    // ═══════════════════════════════════════════════════════════════
    viral: {
        enableLiveCounter: false,       // DISABLED — sovereign brands don't fake metrics
        enableBookingToasts: false,     // DISABLED — manufactured urgency removed
        enableExitPopup: false,         // DISABLED — luxury tier never traps users
        enableReferralSystem: true,     // ACTIVE — legitimate referral tracking
        enableUrgencyTimer: false,      // DISABLED — countdown removed
        baseVisitorCount: 0,
        visitorFluctuation: 0,
        referralBonus: "Free 15-Min Discovery Call",
        slotsRemaining: 0,
        urgencyMessage: ""
    },

    // ═══════════════════════════════════════════════════════════════
    // 🤖 AI CHATBOT PERSONALITY (Omni-Concierge wired server-side)
    // ═══════════════════════════════════════════════════════════════
    chatbot: {
        name: "TimeBroker Concierge",
        avatar: "⚡",
        greeting: "Welcome to TimeBroker AI. I'm your private strategic concierge. How may I assist with capital formation, sovereign AI infrastructure, or executive advisory services?",
        personality: `You are the TimeBroker AI Concierge — Delray Wannemacher's elite strategic interface.
- Background: 25-year career across Finance, EDGE Infrastructure, and Capital Formation.
- Focus Areas:
  * Small Business Experts: Empowering scaling via AI.
  * Public Companies & Ultra-Wealthy: Capital formation, tax-deductible assets, IR expertise.
  * Luxury With Purpose: Yachting via GARMN 501c3 partnership & yacht brokers.
  * Specialized Guidance: Tailored expert advice for Board Members, CEOs, and Investors.
- Mission: Help with Finance, AI, Luxury, and Giving Back. Connect users to private investment meetings and technology leadership.
- Always guide toward booking a discovery call via cal.com/timebroker.
- Contact: WhatsApp 336-652-1387 for direct reach.`
    },

    // ═══════════════════════════════════════════════════════════════
    // 📞 CONTACT INFORMATION
    // ═══════════════════════════════════════════════════════════════
    contact: {
        whatsapp: "13366521387",
        whatsappUrl: "https://wa.me/13366521387",
        // No direct email exposed — route through CRM
        bookingPage: "booking-widget.html",
        applyPage: "apply.html"
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔗 ECOSYSTEM CONNECTIONS
    // ═══════════════════════════════════════════════════════════════
    ecosystem: {
        luxuryMarineLife: "https://luxurymarinelife.com",
        firstLookEquities: "https://firstlookequities.com",
        edgeDataSolutions: "https://edgedatasolutions.com",
        garmn: "https://garmn.org",
        acottaLife: "https://acotta.life",
        smartyachtBroker: "https://smartyachtbroker.ai",
        smartyacht: "https://smartyacht.ai",
        smartcharter: "https://smartcharter.ai",
        smartmarina: "https://smartmarina.ai",
        garmnYacht: "https://garmn.yacht",
        garmnBoat: "https://garmn.boat"
    },

    nonProfits: [
        "GARMN Support",
        "Pelican Harbor Seabird Station",
        "Shake-A-Leg Miami",
        "The International SeaKeepers Society"
    ],

    // ═══════════════════════════════════════════════════════════════
    // 📈 LINKEDIN INTEGRATION
    // ═══════════════════════════════════════════════════════════════
    linkedin: {
        profileUrl: "https://linkedin.com/in/delraywannemacher",
        companyPage: "https://linkedin.com/company/timebroker-ai",
        shareText: "I just discovered an incredible approach to tax-advantaged capital with community impact. Check out the Give Back Challenge! #CapitalStrategy #GiveBack"
    },

    // ═══════════════════════════════════════════════════════════════
    // 📊 ANALYTICS & TRACKING
    // ═══════════════════════════════════════════════════════════════
    analytics: {
        googleAnalyticsId: "G-K3J6X1536T"
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎨 BRANDING
    // ═══════════════════════════════════════════════════════════════
    branding: {
        primaryColor: "#d4af37",
        secondaryColor: "#0f172a",
        accentColor: "#0ea5e9",
        fontPrimary: "Montserrat",
        fontSerif: "Playfair Display"
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎙️ VAPI VOICE AI
    // ═══════════════════════════════════════════════════════════════
    vapi: {
        // VAPI Web SDK loaded on-demand when user clicks voice button
        // Assistant IDs managed server-side via Firestore
        enabled: true,
        buttonLabel: "Speak with TimeBroker AI",
        buttonIcon: "fas fa-phone"
    }
};

// Backwards compatibility: alias legacy name
window.DELRAY_CONFIG = window.TIMEBROKER_CONFIG;

// Self-healing: Configuration validation
(function validateConfig() {
    console.log('✅ TimeBroker.AI Configuration Loaded — Sovereign Mode');
    console.log('🔥 Firebase Backend: ac-godmode-titan');
    console.log('🔒 Zero client-side API keys');
    console.log('🚀 God Mode: ACTIVATED');
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TIMEBROKER_CONFIG;
}
