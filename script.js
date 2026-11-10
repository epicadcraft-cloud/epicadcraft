// Initialize Studio Interactions
document.addEventListener('DOMContentLoaded', () => {
    init3DHeroCanvas();
    initHomeArticles();
    if (window.lucide) {
        lucide.createIcons();
    }
    initMobileMenu();
    initContactForm();
    initArticleReader();
});

// Render the 3 latest articles on Home
async function initHomeArticles() {
    const container = document.getElementById('homeArticlesContainer');
    if (!container || typeof getLatestArticles !== 'function') return;

    try {
        const latest = await getLatestArticles(3);
        container.innerHTML = latest.map(article => renderBlogCardHTML(article)).join('');
        if (window.lucide) {
            lucide.createIcons();
        }
    } catch (e) {
        console.error("Error loading home articles:", e);
    }
}

// Mobile Navigation
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });

    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}

// Navbar scroll subtle border
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (window.scrollY > 30) {
        navbar.classList.add('shadow-lg', 'bg-studio-base/95');
        navbar.classList.remove('bg-studio-base/80');
    } else {
        navbar.classList.remove('shadow-lg', 'bg-studio-base/95');
        navbar.classList.add('bg-studio-base/80');
    }
});

// Full Articles Database
const articlesData = {
    1: {
        category: "Brand Strategy",
        date: "October 2026",
        readTime: "5 min read",
        author: "Elbinmon Edavazhickal",
        title: "The Anatomy of an Enduring Brand: Why Visual Polish Isn't Enough.",
        body: `
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
        `
    },
    2: {
        category: "Performance Media",
        date: "September 2026",
        readTime: "4 min read",
        author: "Growth Strategy Team",
        title: "Beyond Vanity Clicks: Fixing the Leaky Digital Ad Funnel.",
        body: `
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
        `
    },
    3: {
        category: "Creative Direction",
        date: "August 2026",
        readTime: "6 min read",
        author: "Motion & Animation Studio",
        title: "The Rise of 3D Motion in Capturing Short-Form Consumer Attention.",
        body: `
            <p>We live in a world where consumers consume thousands of media frames per hour. In this relentless stream, standard 2D flyers and static photo ads blend into background noise.</p>

            <p>3D motion and cinematic animation give brands a superpower: the ability to defy physical reality. A bottle can deconstruct into its organic botanical components; an architectural blueprint can assemble itself in floating light; a luxury watch can showcase its inner mechanical heartbeat.</p>

            <blockquote class="p-6 rounded-2xl bg-studio-card border-l-4 border-studio-purple my-6 font-serif text-xl sm:text-2xl text-white italic">
                "Motion isn't just decoration; it is psychological hypnosis that anchors memory."
            </blockquote>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">Why 3D Drives Measurable Sales</h3>
            <p>Consumers hesitate to purchase online when they cannot touch or feel the product. High-fidelity 3D rendering provides tactile realism that photographs often fail to capture. It highlights build quality, textures, craftsmanship, and scale.</p>

            <h3 class="font-serif text-2xl text-white mt-8 mb-3">Elevating Perception Over Competitors</h3>
            <p>When your brand deploys world-class visual animation, your market positioning immediately shifts. You stop competing with local low-cost alternatives and enter the psychological realm of international category leaders.</p>
        `
    }
};

// Article Reader Modal Logic
function initArticleReader() {
    const modal = document.getElementById('articleModal');
    const cards = document.querySelectorAll('.article-card');
    const closeBtn = document.getElementById('closeArticleBtn');
    const closeBtnIcon = document.getElementById('closeArticleBtnIcon');
    const ctaBtn = document.getElementById('articleCtaBtn');

    if (!modal || !cards.length) return;

    function openArticle(id) {
        const data = articlesData[id];
        if (!data) return;

        document.getElementById('articleCategory').textContent = data.category;
        document.getElementById('articleDate').textContent = data.date;
        document.getElementById('articleReadTime').textContent = data.readTime;
        document.getElementById('articleAuthor').textContent = data.author;
        document.getElementById('articleTitle').textContent = data.title;
        document.getElementById('articleBody').innerHTML = data.body;

        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        if (window.lucide) {
            lucide.createIcons();
        }

        modal.scrollTo({ top: 0, behavior: 'instant' });
    }

    function closeArticle() {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const id = card.getAttribute('data-article-id');
            openArticle(id);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeArticle);
    if (closeBtnIcon) closeBtnIcon.addEventListener('click', closeArticle);

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeArticle();
        }
    });

    // Close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeArticle();
        }
    });

    // CTA in modal scrolls to contact
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            closeArticle();
        });
    }
}

// Contact Form Handler
function initContactForm() {
    const form = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form || !success) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        success.classList.remove('hidden');
        form.reset();
        setTimeout(() => {
            success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 150);
    });
}


// Interactive 3D Kinetic Hero Canvas
function init3DHeroCanvas() {
    const canvas = document.getElementById('hero3DCanvas');
    const stage = document.getElementById('hero3DStage');
    if (!canvas || !stage) return;

    const ctx = canvas.getContext('2d');
    let width, height;

    function resize() {
        const rect = stage.getBoundingClientRect();
        width = canvas.width = rect.width * (window.devicePixelRatio || 1);
        height = canvas.height = rect.height * (window.devicePixelRatio || 1);
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    }
    resize();
    window.addEventListener('resize', resize);

    // Generate 3D sphere points (Fibonacci sphere distribution)
    const numPoints = 72;
    const points = [];
    const radius = 125;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < numPoints; i++) {
        const y = 1 - (i / (numPoints - 1)) * 2;
        const radiusAtY = Math.sqrt(1 - y * y);
        const theta = phi * i;
        const x = Math.cos(theta) * radiusAtY;
        const z = Math.sin(theta) * radiusAtY;
        points.push({ x: x * radius, y: y * radius, z: z * radius });
    }

    let angleX = 0;
    let angleY = 0;
    let targetSpeedX = 0.003;
    let targetSpeedY = 0.007;

    // Smooth 3D mouse parallax tilt
    stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const normX = (e.clientX - rect.left) / rect.width - 0.5;
        const normY = (e.clientY - rect.top) / rect.height - 0.5;
        stage.style.transform = `perspective(1000px) rotateX(${normY * -14}deg) rotateY(${normX * 14}deg) scale3d(1.02, 1.02, 1.02)`;
        targetSpeedX = normY * 0.015;
        targetSpeedY = normX * 0.018;
    });

    stage.addEventListener('mouseleave', () => {
        stage.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        targetSpeedX = 0.003;
        targetSpeedY = 0.007;
    });

    function render() {
        const displayW = width / (window.devicePixelRatio || 1);
        const displayH = height / (window.devicePixelRatio || 1);
        ctx.clearRect(0, 0, displayW, displayH);

        angleX += targetSpeedX;
        angleY += targetSpeedY;

        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);

        const projected = [];
        const fov = 340;
        const centerX = displayW / 2;
        const centerY = displayH / 2;

        for (let i = 0; i < points.length; i++) {
            const p = points[i];

            // Rotate around Y
            const x1 = p.x * cosY + p.z * sinY;
            const z1 = -p.x * sinY + p.z * cosY;

            // Rotate around X
            const y2 = p.y * cosX - z1 * sinX;
            const z2 = p.y * sinX + z1 * cosX;

            // 3D Perspective projection
            const scale = fov / (fov + z2 + 180);
            const px = centerX + x1 * scale;
            const py = centerY + y2 * scale;
            const alpha = Math.max(0.12, Math.min(1, (z2 + radius) / (radius * 2)));

            projected.push({ x: px, y: py, z: z2, alpha, scale });
        }

        // Draw connections
        ctx.lineWidth = 0.8;
        for (let i = 0; i < projected.length; i++) {
            for (let j = i + 1; j < projected.length; j++) {
                const dx = projected[i].x - projected[j].x;
                const dy = projected[i].y - projected[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 46) {
                    const avgAlpha = (projected[i].alpha + projected[j].alpha) * 0.22;
                    ctx.strokeStyle = `rgba(168, 85, 247, ${avgAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(projected[i].x, projected[i].y);
                    ctx.lineTo(projected[j].x, projected[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw luminous 3D vertices
        for (let i = 0; i < projected.length; i++) {
            const pt = projected[i];
            const size = Math.max(1.2, pt.scale * 3.2);
            ctx.fillStyle = `rgba(216, 180, 254, ${pt.alpha})`;
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, size, 0, Math.PI * 2);
            ctx.fill();

            // Glow for closer points
            if (pt.z > 35) {
                ctx.fillStyle = `rgba(192, 132, 252, ${pt.alpha * 0.4})`;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, size * 2.2, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        requestAnimationFrame(render);
    }

    render();
}
