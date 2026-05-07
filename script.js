document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const header = document.querySelector('header');

    // 1. Mobile Menu Logic
    menuBtn.addEventListener('click', () => {
        mobileDrawer.classList.toggle('hidden');
    });

    // Close drawer when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileDrawer.classList.add('hidden');
        });
    });

    // 2. Scroll Animation for Header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-slate-950', 'py-2');
            header.classList.remove('bg-slate-950/80', 'py-4');
        } else {
            header.classList.remove('bg-slate-950', 'py-2');
            header.classList.add('bg-slate-950/80', 'py-4');
        }
    });

    // 3. Form Submission Feedback
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', () => {
            const btn = document.getElementById('submit-btn');
            btn.innerHTML = 'SENDING...';
            btn.disabled = true;
            btn.classList.add('opacity-50');
        });
    }
});