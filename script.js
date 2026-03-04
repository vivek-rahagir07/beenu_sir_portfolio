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
    }, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' });

    const reveals = document.querySelectorAll('.card:not(.about-portrait-card), .flip-card, .section-title, .hero-content, .timeline-item, .programme-grid, .programme-card, .vision-pillar, .impact-card, .future-vision-panel, .carousel-container, .stagger-reveal');
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

    // --- Gallery Lightbox Logic ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const closeBtn = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const prevBtnL = lightbox ? lightbox.querySelector('.lightbox-btn.prev') : null;
    const nextBtnL = lightbox ? lightbox.querySelector('.lightbox-btn.next') : null;
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;

    if (lightbox && galleryItems.length > 0) {
        const updateLightbox = (index) => {
            const item = galleryItems[index];
            const img = item.querySelector('img');
            const h3 = item.querySelector('h3');
            const p = item.querySelector('p');

            if (lightboxImg && img) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
            if (lightboxTitle) lightboxTitle.textContent = h3 ? h3.textContent : "";
            if (lightboxDesc) lightboxDesc.textContent = p ? p.textContent : "";
            currentIndex = index;
        };

        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                updateLightbox(index);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });

            // Magnetic effect for gallery items
            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const img = item.querySelector('img');
                if (img) img.style.transform = `scale(1.05) translate(${x * 0.02}px, ${y * 0.02}px)`;
            });

            item.addEventListener('mouseleave', () => {
                const img = item.querySelector('img');
                if (img) img.style.transform = `scale(1) translate(0, 0)`;
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });
        }

        if (prevBtnL) prevBtnL.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightbox(currentIndex);
        });

        if (nextBtnL) nextBtnL.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightbox(currentIndex);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft' && prevBtnL) prevBtnL.click();
            if (e.key === 'ArrowRight' && nextBtnL) nextBtnL.click();
        });
    }
});
