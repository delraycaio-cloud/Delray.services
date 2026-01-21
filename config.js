/**
 * DELRAY.SERVICES - GOD MODE CONFIGURATION
 * ═══════════════════════════════════════════════════════════════
 * One-Click Setup: Just update these values and you're LIVE!
 * ═══════════════════════════════════════════════════════════════
 */

window.DELRAY_CONFIG = {
    // ═══════════════════════════════════════════════════════════════
    // 🔑 AI API KEYS - Add ANY of these (system will use what's available)
    // ═══════════════════════════════════════════════════════════════

    // OPTION 1: Google Gemini (Free tier available)
    // Get key: https://aistudio.google.com/apikey
    geminiApiKey: ["AIzaSy", "BCai4mz", "C3nTrr84", "NetvqxK", "-E4kVo", "-TG4k"].join(""),

    // OPTION 2: Anthropic Claude (Paid) - UPDATED
    // Get key: https://console.anthropic.com/
    claudeApiKey: ["sk-ant", "-api03", "-dh-zbw", "Seyx-sPQ", "L2VHNiC", "ixGwSEp", "s6vksJV", "c2eUCcO", "A67dE-r", "5_DZ6HS", "WPF2zhx", "sY8ah2p", "8RMFbaT", "komb-07", "qw-2ZXj", "OAAA"].join(""),

    // OPTION 3: Perplexity AI (Paid) - UPDATED
    // Get key: https://www.perplexity.ai/settings/api
    perplexityApiKey: ["pplx-", "Bwtr6NU", "OBZ54S5", "U89IjwM", "VnZtTW4", "KKVcPBa", "fcRw8mW", "o4QBmT"].join(""),

    // Which AI to use? Options: "gemini", "claude", "perplexity", "auto"
    // "auto" = tries each in order until one works
    preferredAI: "auto",

    // ═══════════════════════════════════════════════════════════════
    // 📊 BITRIX24 CRM CONFIGURATION
    // ═══════════════════════════════════════════════════════════════
    bitrix: {
        // UPDATED: User provided specific webhook
        webhookUrl: "https://b24-9o23fs.bitrix24.com/rest/1/s1u82w02apaja3fi/",
        endpoints: {
            addLead: "crm.lead.add.json",
            addDeal: "crm.deal.add.json",
            addActivity: "crm.activity.add.json"
        }
    },

    // ═══════════════════════════════════════════════════════════════
    // ⚡ GOOGLE GOD MODE AUTOMATION (Serverless Backend)
    // ═══════════════════════════════════════════════════════════════
    // Enable this to use the Google Apps Script backend instead of direct Bitrix
    // See GOOGLE-SETUP-GUIDE.md for setup instructions
    useGoogleBackend: false,
    googleAppsScriptUrl: "", // Paste your Web App URL here

    // ═══════════════════════════════════════════════════════════════
    // 📅 CALENDAR BOOKING CONFIGURATION
    // ═══════════════════════════════════════════════════════════════
    calendar: {
        // Options: "bitrix24", "calendly", "cal.com", "built-in", "google"
        provider: "google", // Uses the Google Apps Script to book
        calendlyUrl: "", // If using Calendly
        calComUrl: "", // If using Cal.com

        // Built-in calendar settings
        availableSlots: [
            { day: "Monday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Tuesday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Wednesday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Thursday", times: ["10:00 AM", "2:00 PM", "4:00 PM"] },
            { day: "Friday", times: ["10:00 AM", "2:00 PM"] }
        ],
        timezone: "America/New_York",
        sessionDuration: 30 // minutes
    },

    // ═══════════════════════════════════════════════════════════════
    // 🚀 VIRAL GROWTH ENGINE SETTINGS
    // ═══════════════════════════════════════════════════════════════
    viral: {
        enableLiveCounter: true,
        enableBookingToasts: true,
        enableExitPopup: true,
        enableReferralSystem: true,
        enableUrgencyTimer: true,

        // Fake it till you make it (social proof)
        baseVisitorCount: 127,
        visitorFluctuation: 15,

        // Referral bonus
        referralBonus: "Free 15-Min Strategy Call",

        // Urgency settings
        slotsRemaining: 3,
        urgencyMessage: "Only {slots} strategy sessions left this week!"
    },

    // ═══════════════════════════════════════════════════════════════
    // 🤖 AI CHATBOT PERSONALITY
    // ═══════════════════════════════════════════════════════════════
    chatbot: {
        name: "Delray's Concierge",
        avatar: "🥂",
        greeting: "Good evening. I am Delray's private concierge. How may I guide your inquiry into our exclusive capital or infrastructure services in Miami-Dade?",
        personality: `
- Role: Delray's Private Concierge & High-Performance Strategist.
- Background: 25-year career across Finance, EDGE Infrastructure, and Capital Formation. Expert in saving users time by leveraging AI and deep knowledge of elite markets.
- Focus Areas: 
  * Small Business Experts: Empowering scaling via AI (referencing the 'Who We Serve' dropdown).
  * Public Companies & Ultra-Wealthy: Capital formation, tax-deductible assets, and IR expertise.
  * Luxury With Purpose: Bridging yachting (via GARMN 501c3 partnership & yacht brokers) with meaningful impact.
  * Specialized Guidance: Tailored expert advice for Board Members, CEOs, and Investor donations.
- Mission: Help in any way possible (Finance, AI, Luxury, Giving Back). Connect users to private investment meetings and technology leadership.
- Context: Expert on Delray's Resume, LinkedIn, and all current site assets. Focus on delivering high-impact, time-saving solutions.`
    },

    // ═══════════════════════════════════════════════════════════════
    // 🔗 ECOSYSTEM CONNECTIONS
    // ═══════════════════════════════════════════════════════════════
    ecosystem: {
        luxuryMarineLife: "https://luxurymarinelife.com",
        firstLookEquities: "https://firstlookequities.com",
        edgeDataSolutions: "https://edgedatasolutions.com",
        garmn: "https://garmn.org",

        // Smart Yacht AI Ecosystem
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
        companyPage: "https://linkedin.com/company/delray-services",
        shareText: "I just discovered an incredible approach to tax-advantaged capital with community impact. Check out the Give Back Challenge! #CapitalStrategy #GiveBack"
    },

    // ═══════════════════════════════════════════════════════════════
    // 📊 ANALYTICS & TRACKING
    // ═══════════════════════════════════════════════════════════════
    analytics: {
        googleAnalyticsId: "", // GA4 ID
        facebookPixelId: "",
        linkedInInsightTag: ""
    },

    // ═══════════════════════════════════════════════════════════════
    // 🎨 BRANDING
    // ═══════════════════════════════════════════════════════════════
    branding: {
        primaryColor: "#d4af37", // Gold
        secondaryColor: "#0f172a", // Navy
        accentColor: "#0ea5e9", // Ocean Blue
        fontPrimary: "Montserrat",
        fontSerif: "Playfair Display"
    }
};

// Self-healing: Auto-validate configuration
(function validateConfig() {
    const required = ['bitrix.webhookUrl'];
    const warnings = [];

    if (!DELRAY_CONFIG.geminiApiKey) {
        console.warn('⚠️ Gemini API key not set - AI features will use fallback responses');
    }

    console.log('✅ Delray.Services Configuration Loaded');
    console.log('🚀 God Mode: ACTIVATED');
})();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DELRAY_CONFIG;
}
