/* =====================================================
   THE VERDICT ENGINE — INTERACTIVE SCRIPT
   ===================================================== */

/* =========================================
   1. REAL-TIME STARTUP FAILURE CLOCK
   ========================================= */
function startFailureClock() {
    const el = document.getElementById('failureClock');
    if (!el) return;
    const startIST = new Date('2025-01-01T00:00:00+05:30');
    const yearMs = 365 * 24 * 60 * 60 * 1000;
    const ratePerMs = 11223 / yearMs;

    function tick() {
        const count = Math.floor(Math.max(0, (Date.now() - startIST) * ratePerMs));
        el.textContent = count.toLocaleString('en-IN');
    }
    tick();
    setInterval(tick, 1000);
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
                // Re-trigger reveals inside the newly shown panel
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

            // Close all
            document.querySelectorAll('.accord-item').forEach(i => i.classList.remove('open'));

            // Toggle current
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
            const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
            const idx = siblings.indexOf(entry.target);
            setTimeout(() => entry.target.classList.add('visible'), idx * 90);
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // Section headings
    document.querySelectorAll('.section-title, .section-subtitle, .section-eyebrow').forEach(el => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
            obs.observe(el);
        }
    });
}

/* =========================================
   5. SOURCE TOOLTIPS
   ========================================= */
function initTooltips() {
    const tip = document.getElementById('sourceTooltip');
    if (!tip) return;

    function show(e) {
        tip.textContent = '📄 ' + e.currentTarget.dataset.source;
        tip.classList.add('visible');
        move(e);
    }
    function move(e) {
        const x = Math.min(e.clientX + 14, window.innerWidth - tip.offsetWidth - 10);
        const y = Math.max(e.clientY - 48, 8);
        tip.style.left = x + 'px';
        tip.style.top = y + 'px';
    }
    function hide() { tip.classList.remove('visible'); }

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
            if (e.isIntersecting) {
                links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(s => obs.observe(s));
}

/* =========================================
   7. NAV SHADOW ON SCROLL
   ========================================= */
function initNavShadow() {
    const nav = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        nav.style.boxShadow = scrollY > 50 ? '0 2px 32px rgba(0,0,0,.6)' : 'none';
    }, { passive: true });
}

/* =========================================
   8. SMOOTH SCROLL
   ========================================= */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const t = document.querySelector(a.getAttribute('href'));
            if (!t) return;
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Offset for fixed nav
            setTimeout(() => window.scrollBy(0, -72), 50);
        });
    });
}

/* =========================================
   9. SCROLL-TO-TOP BUTTON
   ========================================= */
function initScrollTop() {
    const btn = document.getElementById('scrollTopBtn');
    if (!btn) return;
    window.addEventListener('scroll', () => {
        btn.classList.toggle('show', scrollY > 600);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* =========================================
   10. MOBILE MENU
   ========================================= */
function initMobileMenu() {
    const menu = document.getElementById('navMenu');
    if (!menu) return;
    if (window.innerWidth > 768) return;

    const container = document.querySelector('.nav-container');
    const toggle = document.createElement('button');
    toggle.innerHTML = '☰';
    toggle.style.cssText = [
        'background:none', 'border:1px solid rgba(255,255,255,.15)',
        'color:#F2F0EE', 'font-size:1.1rem', 'cursor:pointer',
        'padding:.35rem .65rem', 'border-radius:4px', 'margin-left:auto'
    ].join(';');

    let open = false;
    toggle.addEventListener('click', () => {
        open = !open;
        toggle.innerHTML = open ? '✕' : '☰';
        menu.style.cssText = open ? [
            'display:flex', 'flex-direction:column',
            'position:absolute', 'top:100%', 'left:0', 'right:0',
            'background:rgba(5,5,5,.97)', 'padding:1.5rem 2rem',
            'gap:1.1rem', 'border-bottom:1px solid rgba(255,255,255,.07)',
            'z-index:999'
        ].join(';') : '';
    });

    container.insertBefore(toggle, container.querySelector('.nav-cta'));
}

/* =========================================
   11. STAT COUNTER ANIMATION (on reveal)
   ========================================= */
function initStatCounters() {
    const cards = document.querySelectorAll('.stat-card');
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
            const dur = 1400;
            const step = timestamp => {
                if (!start) start = timestamp;
                const p = Math.min((timestamp - start) / dur, 1);
                const ease = 1 - Math.pow(1 - p, 3);
                numEl.textContent = Math.floor(base * ease).toLocaleString('en-IN') + suffix;
                if (p < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);

            obs.unobserve(e.target);
        });
    }, { threshold: 0.4 });

    cards.forEach(c => obs.observe(c));
}

/* =========================================
   INIT
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    startFailureClock();
    initCompTabs();
    initAccordion();
    initScrollReveal();
    initTooltips();
    initNavHighlight();
    initNavShadow();
    initSmoothScroll();
    initScrollTop();
    initMobileMenu();
    initStatCounters();
    console.log('✓ The Verdict Engine loaded');
});
