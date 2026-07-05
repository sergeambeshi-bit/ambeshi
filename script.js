document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const contactForm = document.getElementById('contact-form');
    let _submitFallbackTimer = null;

    const openMobileMenu = () => {
        if (!mobileMenu || !mobileMenuBtn) return;
        mobileMenu.classList.remove('-translate-x-full');
        mobileMenu.classList.add('translate-x-0', 'active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    };

    const closeMobileMenu = () => {
        if (!mobileMenu || !mobileMenuBtn) return;
        mobileMenu.classList.add('-translate-x-full');
        mobileMenu.classList.remove('translate-x-0', 'active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    };
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = mobileMenu.classList.contains('translate-x-0');
            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
        
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMobileMenu();
            });
        });
        
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                closeMobileMenu();
            }
        });
    }
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    if (contactForm) {
        const nextField = contactForm.querySelector('input[name="_next"]');
        contactForm.addEventListener('submit', (e) => {
            if (nextField) {
                const nextUrl = new URL(window.location.href);
                nextUrl.search = '?sent=1';
                nextUrl.hash = '#contact';
                nextField.value = nextUrl.toString();
            }

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Sending...';
                submitBtn.classList.add('opacity-70');
                // Fallback: re-enable the button after 10s in case external form handler fails
                if (_submitFallbackTimer) clearTimeout(_submitFallbackTimer);
                _submitFallbackTimer = setTimeout(() => {
                    if (submitBtn.disabled) {
                        submitBtn.disabled = false;
                        submitBtn.textContent = 'Schedule Free Consultation';
                        submitBtn.classList.remove('opacity-70');
                    }
                }, 10000);
            }
        });
    }
    
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
        const toast = document.createElement('div');
        toast.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
        toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-full shadow-2xl z-50 text-sm';
        // Accessibility: announce to screen readers
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.setAttribute('aria-atomic', 'true');
        toast.setAttribute('tabindex', '-1');
        document.body.appendChild(toast);
        // focus briefly so screen readers announce it (will not disrupt tab order)
        toast.focus();
        setTimeout(() => toast.remove(), 5000);
        history.replaceState({}, '', `${window.location.pathname}#contact`);
    }
    
    const sections = document.querySelectorAll('section');
    const canAnimateSections = 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (canAnimateSections) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });
    }
    
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (!nav) return;
        if (window.scrollY > 50) {
            nav.classList.add('bg-slate-950/95');
        } else {
            nav.classList.remove('bg-slate-950/95');
        }
    });
});