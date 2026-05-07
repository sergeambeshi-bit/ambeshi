document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            mobileMenu.classList.toggle('transform');
            mobileMenu.classList.toggle('translate-x-0');
        });
        
        // Close menu when a link is clicked
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('transform');
                mobileMenu.classList.remove('translate-x-0');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenu.classList.add('transform');
                mobileMenu.classList.remove('translate-x-0');
            }
        });
    }
    
    // 2. Smooth scroll for navigation links
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
    
    // 3. Contact Form — loading state before FormSubmit.co POST
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            submitBtn.classList.add('opacity-70');
            // Form will POST natively to FormSubmit.co and redirect
        });
    }
    
    // Show success toast if redirected back after submission
    const params = new URLSearchParams(window.location.search);
    if (params.get('sent') === '1') {
        const toast = document.createElement('div');
        toast.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
        toast.className = 'fixed bottom-8 left-1/2 -translate-x-1/2 bg-emerald-500 text-white font-bold px-8 py-4 rounded-full shadow-2xl z-50 text-sm';
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 5000);
        // Clean URL
        history.replaceState({}, '', window.location.pathname);
    }
    
    // 4. Add scroll animation for sections
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
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
    
    // 5. Header scroll effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            nav.classList.add('bg-slate-950/95');
        } else {
            nav.classList.remove('bg-slate-950/95');
        }
    });
    
    // 6. Parallax effect on hero section
    window.addEventListener('scroll', () => {
        const heroSection = document.querySelector('section:first-of-type');
        if (heroSection) {
            const scrollY = window.scrollY;
            heroSection.style.transform = `translateY(${scrollY * 0.5}px)`;
        }
    });
});