// Tab System
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active', 'bg-white', 'shadow-lg');
        btn.classList.add('text-slate-500');
    });
    
    document.getElementById(tabId).classList.add('active');
    const activeBtn = document.getElementById('btn-' + tabId);
    if (activeBtn) {
        activeBtn.classList.add('active', 'bg-white', 'shadow-lg');
        activeBtn.classList.remove('text-slate-500');
    }
}

// Navbar Scroll Effect & Scroll Progress
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const links = document.querySelectorAll('.nav-link');
    const scrollProgress = document.getElementById('scroll-progress');
    
    // Update scroll progress bar
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (scrollProgress) {
        scrollProgress.style.width = scrolled + "%";
    }

    // Navbar style change on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/90', 'backdrop-blur-xl', 'shadow-xl', 'py-4');
        navbar.classList.remove('py-6');
    } else {
        navbar.classList.remove('bg-white/90', 'backdrop-blur-xl', 'shadow-xl', 'py-4');
        navbar.classList.add('py-6');
    }

    // Active Section Highlighting
    const sections = ['home', 'philosophy', 'journey', 'expertise', 'contact'];
    sections.forEach(sec => {
        const element = document.getElementById(sec);
        if (!element) return;
        const rect = element.getBoundingClientRect();
        if (rect.top >= -300 && rect.top <= 400) {
            links.forEach(link => {
                link.classList.remove('bg-white', 'text-indigo-600', 'shadow-sm');
                if (link.getAttribute('href') === '#' + sec) {
                    link.classList.add('bg-white', 'text-indigo-600', 'shadow-sm');
                }
            });
        }
    });
});

// Intersection Observer for Entrance Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
});
