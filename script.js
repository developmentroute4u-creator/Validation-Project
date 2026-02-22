/* =====================================================
   THE VERDICT ENGINE — INTERACTIVE SCRIPT v3
   ===================================================== */

/* =========================================
   1. INTERACTIVE GLASS ORB
   ========================================= */
function initGlassOrb() {
    const orb = document.getElementById('orb');
    if (!orb) return;

    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 25;
        const y = (e.clientY - window.innerHeight / 2) / 25;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}

/* =========================================
   2. COMPETITION TABS
   ========================================= */
function initCompTabs() {
    const tabs = document.querySelectorAll('.comp-tab');
    const panels = document.querySelectorAll('.comp-panel');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));
            tab.classList.add('active');
            const panel = document.getElementById('tab-' + target);
            if (panel) {
                panel.classList.add('active');
                panel.querySelectorAll('.reveal:not(.visible)').forEach((el, i) => {
                    setTimeout(() => el.classList.add('visible'), i * 80);
                });
            }
        });
    });
}

/* =========================================
   3. ACCORDION (DELIVERABLES)
   ========================================= */
function initAccordion() {
    document.querySelectorAll('.accord-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accord-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.accord-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });
}

/* =========================================
   4. SCROLL REVEAL
   ========================================= */
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const siblings = [...entry.target.parentElement.children]
                .filter(c => c.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), idx * 90);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
    document.querySelectorAll('.section-title, .section-subtitle, .section-eyebrow').forEach(el => {
        if (!el.classList.contains('reveal')) { el.classList.add('reveal'); obs.observe(el); }
    });
}

/* =========================================
   5. SOURCE TOOLTIPS
   ========================================= */
function initTooltips() {
    const tip = document.getElementById('sourceTooltip');
    if (!tip) return;
    const show = e => {
        tip.textContent = '📄 ' + e.currentTarget.dataset.source;
        tip.classList.add('visible'); move(e);
    };
    const move = e => {
        tip.style.left = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 10) + 'px';
        tip.style.top = Math.max(e.clientY - 48, 8) + 'px';
    };
    const hide = () => tip.classList.remove('visible');
    document.querySelectorAll('[data-source]').forEach(el => {
        el.addEventListener('mouseenter', show);
        el.addEventListener('mousemove', move);
        el.addEventListener('mouseleave', hide);
    });
}

/* =========================================
   6. ACTIVE NAV HIGHLIGHT
   ========================================= */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const links = document.querySelectorAll('.nav-link');
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting)
                links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
        });
    }, { threshold: 0.35 });
    sections.forEach(s => obs.observe(s));
}

/* =========================================
   7. NAV SCROLL EFFECTS
   ========================================= */
function initNavScroll() {
    const nav = document.getElementById('navbar');
    if (!nav) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* =========================================
   8. SMOOTH SCROLL (with nav offset)
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (!t) return;
            e.preventDefault();
            const top = t.getBoundingClientRect().top + window.scrollY - 76;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });
}

/* =========================================
   9. SCROLL-TO-TOP
   ========================================= */
function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('show', scrollY > 600), { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =========================================
   10. MOBILE MENU (light-theme colours)
   ========================================= */
function initMobileMenu() {
    const menu = document.getElementById('navMenu');
    if (!menu || window.innerWidth > 768) return;
    const container = document.querySelector('.nav-container');
    const toggle = document.createElement('button');
    toggle.innerHTML = '☰';
    toggle.style.cssText = 'background:none;border:1px solid rgba(0,0,0,.15);color:#141210;font-size:1.1rem;cursor:pointer;padding:.35rem .65rem;border-radius:4px;margin-left:auto';
    let open = false;
    toggle.addEventListener('click', () => {
        open = !open;
        toggle.innerHTML = open ? '✕' : '☰';
        menu.style.cssText = open
            ? 'display:flex;flex-direction:column;position:absolute;top:100%;left:0;right:0;background:rgba(247,246,243,.98);padding:1.5rem 2rem;gap:1.1rem;border-bottom:1px solid rgba(0,0,0,.08);z-index:999'
            : '';
    });
    container.insertBefore(toggle, container.querySelector('.nav-cta'));
}

/* =========================================
   11. STAT COUNTER ANIMATION
   ========================================= */
function initStatCounters() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (!e.isIntersecting) return;
            const numEl = e.target.querySelector('.stat-number');
            if (!numEl || numEl.dataset.animated) return;
            numEl.dataset.animated = '1';
            const raw = numEl.textContent.trim();
            const suffix = raw.replace(/[\d,]+/, '');
            const base = parseInt(raw.replace(/[^0-9]/g, ''));
            if (isNaN(base)) return;
            let start = 0;
            const step = ts => {
                if (!start) start = ts;
                const p = Math.min((ts - start) / 1400, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                numEl.textContent = Math.floor(base * ease).toLocaleString('en-IN') + suffix;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            obs.unobserve(e.target);
        });
    }, { threshold: 0.4 });
    document.querySelectorAll('.stat-card').forEach(c => obs.observe(c));
}

/* =========================================
   12. CUSTOM PREMIUM CURSOR (GPU Accelerated)
   ========================================= */
function initCursorGlow() {
    const dot = document.getElementById('cursorDot');
    const glow = document.getElementById('cursorGlow');
    if (!dot || !glow) return;

    let mouseX = -100, mouseY = -100;
    let dotX = -100, dotY = -100;
    let glowX = -100, glowY = -100;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        dot.classList.add('active');
        glow.classList.add('active');
    });

    const animate = () => {
        // Dot tracking (high precision)
        dotX += (mouseX - dotX) * 0.3;
        dotY += (mouseY - dotY) * 0.3;
        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;

        // Glow tracking (fluid lag)
        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;
        glow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;

        requestAnimationFrame(animate);
    };
    animate();

    document.addEventListener('mouseleave', () => {
        dot.classList.remove('active');
        glow.classList.remove('active');
    });
}

/* =========================================
   INIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    initGlassOrb();
    initCompTabs();
    initAccordion();
    initScrollReveal();
    initTooltips();
    initNavHighlight();
    initNavScroll();
    initSmoothScroll();
    initScrollTop();
    initMobileMenu();
    initStatCounters();
    initCursorGlow();
    console.log('✓ Verdict Engine v3.1 | Premium Cursor Active');
});
