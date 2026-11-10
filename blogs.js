// Epic Adcraft — Central Blog Data & Cloud Management Engine (Firebase + Local Fallback)

// Embedded Firebase Configuration (Optional: Paste keys here or configure via Admin Portal)
window.FIREBASE_CONFIG = window.FIREBASE_CONFIG || {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const DEFAULT_ARTICLES = [
    {
        id: "1",
        title: "The Anatomy of an Enduring Brand: Why Visual Polish Isn't Enough.",
        category: "Brand Strategy",
        date: "Oct 24, 2026",
        readTime: "5 min read",
        author: "Elbinmon Edavazhickal",
        authorRole: "Founder & CEO, Epic Adcraft",
        excerpt: "A logo won't rescue an unfocused positioning. Here is how ambitious businesses build authentic brand gravity that commands lasting customer loyalty.",
        content: `
            <p>Too many businesses believe that rebranding begins and ends with choosing a new typeface, updating a logo mark, and launching a fresh color palette. While visual craft is indispensable, visual polish on top of a vague positioning is like building a penthouse on unstable ground.</p>
            
            <p>An enduring brand is not an ornament; it is an operating system. It defines how a customer feels at every single touchpoint—from their first 3-second glance at an Instagram video to the unboxing experience or post-sales customer communication.</p>
            
            <blockquote class="p-6 rounded-2xl bg-studio-card border-l-4 border-studio-purple my-6 font-serif text-xl sm:text-2xl text-white italic">
                "A logo doesn't create loyalty; consistent integrity and unmistakable character do."
            </blockquote>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">1. The Principle of Singular Focus</h3>
            <p>When you ask most business owners what makes them unique, they list six different things: quality, speed, pricing, heritage, customer service, and innovation. When you try to claim everything, you stand for nothing in the customer's mind. The most valuable brands in Kerala and internationally dominate a single core association.</p>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">2. Emotional Certainty</h3>
            <p>People don't buy products purely through logic. Logic justifies, but emotion decides. If your brand does not evoke a visceral sense of trust, status, or ease, your sales cycles will always be prolonged, and you will forever compete on discounting.</p>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">3. Craft in Every Micro-Interaction</h3>
            <p>True luxury and prestige are felt in the details—how intuitive your digital checkout is, the weight of your packaging paper, and the tone of voice in your customer emails. At Epic Adcraft, our mission is to ensure every micro-moment speaks with absolute authority.</p>
        `,
        createdAt: 1729750000000
    },
    {
        id: "2",
        title: "Beyond Vanity Clicks: Fixing the Leaky Digital Ad Funnel.",
        category: "Performance Media",
        date: "Sep 18, 2026",
        readTime: "4 min read",
        author: "Growth Strategy Team",
        authorRole: "Lead Media Buyer",
        excerpt: "Why driving ad traffic without high-converting UX architecture burns your ad spend — and how to engineer landing pages that turn clicks into clients.",
        content: `
            <p>Digital advertising in 2026 is brutally transparent. Running generic boost posts or automated campaigns without tailored creative and high-speed landing pages is essentially lighting your marketing budget on fire.</p>

            <p>Most agencies report vanity metrics—impressions, video reach, raw click volume. But a million impressions mean nothing if your bank balance doesn't reflect actual qualified sales appointments or closed contracts.</p>

            <blockquote class="p-6 rounded-2xl bg-studio-card border-l-4 border-studio-purple my-6 font-serif text-xl sm:text-2xl text-white italic">
                "Traffic is a commodity. Conversion architecture is where profits are generated."
            </blockquote>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">The Common Pitfall: Disconnect Between Ad and Destination</h3>
            <p>When a prospect clicks a compelling ad about a premium bespoke service, and is dumped onto a generic, slow-loading homepage with 15 menu items, they bounce within four seconds. Every paid campaign must lead to a dedicated, distraction-free narrative designed to answer one question: <em>Why should I trust you with my business right now?</em></p>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">Our Three-Tier Lead Architecture</h3>
            <ul class="space-y-3 pl-4 border-l border-studio-border my-4 text-sm text-studio-sand">
                <li><strong class="text-white">Attention Hook:</strong> High-production creative addressing an urgent, specific pain point.</li>
                <li><strong class="text-white">Proof Demonstration:</strong> Verifiable social proof, client case outcomes, and clear methodology.</li>
                <li><strong class="text-white">Frictionless Action:</strong> Direct WhatsApp or short-form inquiry with instant automated follow-up.</li>
            </ul>
        `,
        createdAt: 1726650000000
    },
    {
        id: "3",
        title: "The Rise of 3D Motion in Capturing Short-Form Consumer Attention.",
        category: "Creative Direction",
        date: "Aug 30, 2026",
        readTime: "6 min read",
        author: "Motion Studio",
        authorRole: "Animation Lead",
        excerpt: "In an overstimulated social timeline, static posts get scrolled past. How cinematic motion art and 3D product stories hook users and elevate perception.",
        content: `
            <p>We live in a world where consumers consume thousands of media frames per hour. In this relentless stream, standard 2D flyers and static photo ads blend into background noise.</p>

            <p>3D motion and cinematic animation give brands a superpower: the ability to defy physical reality. A bottle can deconstruct into its organic botanical components; an architectural blueprint can assemble itself in floating light; a luxury watch can showcase its inner mechanical heartbeat.</p>

            <blockquote class="p-6 rounded-2xl bg-studio-card border-l-4 border-studio-purple my-6 font-serif text-xl sm:text-2xl text-white italic">
                "Motion isn't just decoration; it is psychological hypnosis that anchors memory."
            </blockquote>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">Why 3D Drives Measurable Sales</h3>
            <p>Consumers hesitate to purchase online when they cannot touch or feel the product. High-fidelity 3D rendering provides tactile realism that photographs often fail to capture. It highlights build quality, textures, craftsmanship, and scale.</p>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">Elevating Perception Over Competitors</h3>
            <p>When your brand deploys world-class visual animation, your market positioning immediately shifts. You stop competing with local low-cost alternatives and enter the psychological realm of international category leaders.</p>
        `,
        createdAt: 1725000000000
    }
];

const STORAGE_KEY = 'epic_adcraft_blogs';
const FIREBASE_CONFIG_KEY = 'epic_adcraft_firebase_config';

// Global Firestore handle
let firestoreDb = null;

// Initialize Firebase if credentials exist
function initFirebaseDatabase() {
    if (typeof firebase === 'undefined') return null;

    let config = window.FIREBASE_CONFIG;
    try {
        const saved = localStorage.getItem(FIREBASE_CONFIG_KEY);
        if (saved) {
            config = JSON.parse(saved);
        }
    } catch (e) {}

    if (config && config.projectId && config.apiKey) {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(config);
            }
            firestoreDb = firebase.firestore();
            console.log("Firebase Firestore connected successfully.");
            return firestoreDb;
        } catch (err) {
            console.warn("Firebase initialization error:", err);
            return null;
        }
    }
    return null;
}

// Try auto-initialization immediately
initFirebaseDatabase();

// Check if Firebase is currently active
function isCloudDatabaseActive() {
    return firestoreDb !== null;
}

// Get all articles (from Cloud Firestore or local cache)
async function getAllArticles() {
    // 1. Try Firebase Cloud Firestore
    if (firestoreDb) {
        try {
            const snapshot = await firestoreDb.collection("articles").get();
            if (!snapshot.empty) {
                const articles = [];
                snapshot.forEach(doc => {
                    articles.push(doc.data());
                });
                articles.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
                return articles;
            } else {
                // If cloud collection is currently empty, seed with default articles
                for (const def of DEFAULT_ARTICLES) {
                    await firestoreDb.collection("articles").doc(def.id).set(def);
                }
                return DEFAULT_ARTICLES;
            }
        } catch (err) {
            console.warn("Could not fetch from Firestore, falling back to local cache:", err);
        }
    }

    // 2. Fallback to localStorage or defaults
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_ARTICLES));
        return DEFAULT_ARTICLES;
    }
    try {
        return JSON.parse(stored);
    } catch (e) {
        return DEFAULT_ARTICLES;
    }
}

// Get latest N articles
async function getLatestArticles(limit = 3) {
    const all = await getAllArticles();
    return all.slice(0, limit);
}

// Get article by ID
async function getArticleById(id) {
    if (firestoreDb) {
        try {
            const doc = await firestoreDb.collection("articles").doc(String(id)).get();
            if (doc.exists) {
                return doc.data();
            }
        } catch (err) {
            console.warn("Firestore getArticleById error:", err);
        }
    }
    const all = await getAllArticles();
    return all.find(a => String(a.id) === String(id)) || null;
}

// Publish new article (saves to Cloud Firestore & local cache)
async function publishNewArticle(data) {
    const newArticle = {
        id: String(Date.now()),
        title: data.title || "Untitled Article",
        category: data.category || "Design & Growth",
        date: data.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        readTime: data.readTime || "4 min read",
        author: data.author || "Elbinmon Edavazhickal",
        authorRole: data.authorRole || "Founder & CEO, Epic Adcraft",
        excerpt: data.excerpt || "",
        image: data.image || "",
        content: data.content || "",
        createdAt: Date.now()
    };

    // 1. Save to Cloud Firestore
    if (firestoreDb) {
        try {
            await firestoreDb.collection("articles").doc(newArticle.id).set(newArticle);
            console.log("Article saved to Firebase Cloud:", newArticle.id);
        } catch (err) {
            console.error("Failed to write to Cloud Firestore:", err);
        }
    }

    // 2. Always update local storage cache
    let all = [];
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        all = stored ? JSON.parse(stored) : DEFAULT_ARTICLES.slice();
    } catch (e) {
        all = DEFAULT_ARTICLES.slice();
    }
    all.unshift(newArticle);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));

    return newArticle;
}

// Delete article by ID
async function deleteArticleById(id) {
    if (firestoreDb) {
        try {
            await firestoreDb.collection("articles").doc(String(id)).delete();
            console.log("Article deleted from Cloud Firestore:", id);
        } catch (err) {
            console.error("Failed to delete from Cloud Firestore:", err);
        }
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            let all = JSON.parse(stored);
            all = all.filter(a => String(a.id) !== String(id));
            localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
        } catch (e) {}
    }
}

// Render an individual blog card HTML
function renderBlogCardHTML(article) {
    return `
        <article class="p-8 rounded-2xl bg-studio-card border border-studio-border hover:border-studio-primary/40 hover:-translate-y-1 transition-all flex flex-col justify-between group overflow-hidden">
            <div>
                ${article.image ? `
                    <div class="w-full h-48 rounded-xl overflow-hidden mb-6 border border-studio-border relative bg-studio-surface">
                        <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                    </div>
                ` : ''}
                <div class="flex items-center justify-between text-xs uppercase tracking-widest text-studio-muted mb-4">
                    <span class="text-studio-accent font-medium">${article.category}</span>
                    <span>${article.date}</span>
                </div>
                <a href="article.html?id=${article.id}" class="block">
                    <h3 class="font-display text-2xl text-white group-hover:text-studio-primary transition-colors leading-snug mb-3">
                        ${article.title}
                    </h3>
                </a>
                <p class="text-studio-muted text-sm font-light leading-relaxed mb-6 line-clamp-3">
                    ${article.excerpt}
                </p>
            </div>
            <div class="pt-6 border-t border-studio-border flex items-center justify-between text-xs text-studio-muted">
                <span class="font-medium text-white">${article.author}</span>
                <a href="article.html?id=${article.id}" class="flex items-center gap-1.5 text-studio-light hover:text-white transition-colors group-hover:translate-x-1 transition-transform">
                    <span>Read Article</span>
                    <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </a>
            </div>
        </article>
    `;
}
