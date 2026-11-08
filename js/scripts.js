/*!
* Based on Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/

window.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scrollspy on the side nav
    if (document.querySelector('#sideNav')) {
        new bootstrap.ScrollSpy(document.body, { target: '#sideNav', rootMargin: '0px 0px -40%' });
    }

    // Collapse the mobile navbar after a link is tapped
    const toggler = document.querySelector('.navbar-toggler');
    document.querySelectorAll('#navbarResponsive .nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            if (getComputedStyle(toggler).display !== 'none') toggler.click();
        });
    });

    // Theme toggle
    const themeBtn = document.querySelector('.theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            root.setAttribute('data-theme', next);
            try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
        });
    }

    // Copy email to clipboard (falls back to mailto)
    document.querySelectorAll('.btn-copy').forEach((btn) => {
        const label = btn.querySelector('.copy-label');
        const original = label.textContent;
        btn.addEventListener('click', async () => {
            const email = btn.dataset.copy;
            try {
                await navigator.clipboard.writeText(email);
                btn.classList.add('copied');
                label.textContent = 'copied to clipboard ✓';
                setTimeout(() => { btn.classList.remove('copied'); label.textContent = original; }, 1800);
            } catch (e) {
                window.location.href = 'mailto:' + email;
            }
        });
    });

    // Experience "show more"
    document.querySelectorAll('.xp-toggle').forEach((btn) => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.xp-card');
            const open = card.classList.toggle('expanded');
            btn.setAttribute('aria-expanded', String(open));
            btn.firstChild.textContent = open ? 'Show less ' : 'Show more ';
        });
    });

    // Terminal: reveal lines one by one
    const terminal = document.querySelector('.terminal');
    if (terminal) {
        if (reduceMotion) {
            terminal.classList.add('typed');
        } else {
            terminal.querySelectorAll('.tl').forEach((line, i) => {
                line.style.animationDelay = (0.25 + i * 0.18) + 's';
            });
            requestAnimationFrame(() => terminal.classList.add('typed'));
        }
    }

    // Stats count-up
    const countUp = (el) => {
        const target = Number(el.dataset.count);
        const start = performance.now();
        const dur = 1100;
        const tick = (now) => {
            const p = Math.min((now - start) / dur, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
            if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    // Scroll reveal
    const revealTargets = document.querySelectorAll(
        '.section-title, .group-label, .tl-item, .edu-card, .skill-group, .proj-tabs, .award-grid, .stats'
    );
    if (!reduceMotion && 'IntersectionObserver' in window) {
        revealTargets.forEach((el) => el.classList.add('reveal'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('in');
                if (entry.target.classList.contains('stats')) {
                    entry.target.querySelectorAll('[data-count]').forEach(countUp);
                }
                io.unobserve(entry.target);
            });
        }, { threshold: 0.12 });
        revealTargets.forEach((el) => io.observe(el));
    }

    // Hello to fellow engineers who open DevTools
    console.log(
        '%c$ whoami%c\nSai Aravind · backend engineer @ Intuit Payroll\n\n👋 Poking around the source? Hand-built, no framework.\n→ y.saiaravind@gmail.com · github.com/aru456',
        'color:#e8855f;font:700 14px "JetBrains Mono",monospace',
        'color:inherit;font:12px "JetBrains Mono",monospace;line-height:1.6'
    );

    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
});
