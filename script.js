/* Enhanced Global Interactions */
document.addEventListener('DOMContentLoaded', () => {
    // Custom Cursor
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, .btn, .card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });

    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Magnetic Buttons & Interactions
    const setupInteractions = () => {
        const triggers = document.querySelectorAll('.btn, .premium-image-container');
        triggers.forEach(el => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const factor = el.classList.contains('btn') ? 0.2 : 0.08;
                el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
                el.style.transition = 'transform 0.1s ease-out';
            });

            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0px, 0px)';
            });
        });
    };

    setupInteractions();

    // Staggered Reveal Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    const reveals = document.querySelectorAll('.card, .section-title, .hero-content, .premium-image-wrapper, .timeline-item');
    reveals.forEach((el, index) => {
        el.classList.add('reveal');
        // Add staggering based on index within parent containers
        const parent = el.parentElement;
        const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal') || c.tagName === el.tagName);
        const relativeIndex = siblings.indexOf(el);
        el.style.setProperty('--delay', relativeIndex);
        el.classList.add('stagger');
        observer.observe(el);
    });

    // Reveal logic ends here

    // Social Media Carousel
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');

    if (slides.length > 0) {
        let currentSlide = 0;
        let slideInterval;

        const showSlide = (index) => {
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            currentSlide = (index + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => showSlide(currentSlide + 1);
        const prevSlide = () => showSlide(currentSlide - 1);

        const startAutoRotate = () => {
            slideInterval = setInterval(nextSlide, 2000);
        };

        const stopAutoRotate = () => {
            clearInterval(slideInterval);
        };

        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoRotate();
            startAutoRotate();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoRotate();
            startAutoRotate();
        });

        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                showSlide(idx);
                stopAutoRotate();
                startAutoRotate();
            });
        });

        startAutoRotate();
    }

    // Fast Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const words = ["Entrepreneur", "Motivational Speaker", "Corporate Trainer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 50;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 40;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 60;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1000;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 200;
            }
            setTimeout(type, typeSpeed);
        }
        type();
    }
});
