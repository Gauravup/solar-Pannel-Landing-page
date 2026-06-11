document.addEventListener('DOMContentLoaded', () => {

    // -------------------------------------------------------------
    // 1. Header Scroll Effect
    // -------------------------------------------------------------
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Initial check on load
    handleScroll();

    // -------------------------------------------------------------
    // 2. Mobile Navigation Toggle
    // -------------------------------------------------------------
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('open');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('open');
            mobileMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // -------------------------------------------------------------
    // 3. Hero Carousel (Circle Expand Reveal Transition)
    // -------------------------------------------------------------
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const progressBar = document.querySelector('.progress-bar');
    
    let currentSlide = 0;
    const slideDuration = 7000; // 7 seconds per slide
    let slideTimer;

    const resetProgressBar = () => {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        // Force reflow
        void progressBar.offsetWidth;
        progressBar.style.transition = `width ${slideDuration}ms linear`;
        progressBar.style.width = '100%';
    };

    const showSlide = (index) => {
        // Handle index boundaries
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;
        
        currentSlide = index;

        // Reset active slide classes
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activate new slide and corresponding dot
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        resetProgressBar();
        startTimer();
    };

    const startTimer = () => {
        clearInterval(slideTimer);
        slideTimer = setInterval(() => {
            showSlide(currentSlide + 1);
        }, slideDuration);
    };

    // Nav Arrows
    nextArrow.addEventListener('click', () => {
        showSlide(currentSlide + 1);
    });

    prevArrow.addEventListener('click', () => {
        showSlide(currentSlide - 1);
    });

    // Dots indicator clicks
    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIdx = parseInt(e.target.getAttribute('data-slide'));
            showSlide(slideIdx);
        });
    });

    // Initialize first slide progress
    showSlide(0);

    // -------------------------------------------------------------
    // 4. Numerical Stats Count-up Animation
    // -------------------------------------------------------------
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    const formatNumber = (num, hasCommas) => {
        if (hasCommas) {
            return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return num;
    };

    const runCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const isCommaFormatted = stat.getAttribute('data-format') === 'comma';
            const duration = 2000; // 2 seconds
            const stepTime = 30; // 30ms interval
            const totalSteps = duration / stepTime;
            const increment = target / totalSteps;
            
            let currentCount = 0;
            let currentStep = 0;

            const counterInterval = setInterval(() => {
                currentCount += increment;
                currentStep++;

                if (currentStep >= totalSteps) {
                    stat.textContent = formatNumber(target, isCommaFormatted);
                    clearInterval(counterInterval);
                } else {
                    stat.textContent = formatNumber(Math.floor(currentCount), isCommaFormatted);
                }
            }, stepTime);
        });
    };

    // IntersectionObserver for Stats Section
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersStarted) {
                    countersStarted = true;
                    runCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.25 });

        statsObserver.observe(statsSection);
    }

    // -------------------------------------------------------------
    // 5. General Page Scroll-Reveal Animation
    // -------------------------------------------------------------
    const revealElements = document.querySelectorAll('.animate-on-scroll');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Optionally stop observing once revealed
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // -------------------------------------------------------------
    // 6. Testimonials Deck Slider
    // -------------------------------------------------------------
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const tDots = document.querySelectorAll('.t-dot');
    const tPrev = document.querySelector('.t-prev');
    const tNext = document.querySelector('.t-next');
    
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
        if (index >= testimonialCards.length) index = 0;
        if (index < 0) index = testimonialCards.length - 1;
        
        currentTestimonial = index;

        testimonialCards.forEach(card => card.classList.remove('active'));
        tDots.forEach(dot => dot.classList.remove('active'));

        testimonialCards[currentTestimonial].classList.add('active');
        tDots[currentTestimonial].classList.add('active');
    };

    tNext.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
    });

    tPrev.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
    });

    tDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-t-slide'));
            showTestimonial(index);
        });
    });

    // Auto rotate testimonials every 6s
    let testimonialTimer = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
    }, 6000);

    const resetTestimonialTimer = () => {
        clearInterval(testimonialTimer);
        testimonialTimer = setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 6000);
    };

    // Reset timer on user click
    [tNext, tPrev].forEach(btn => btn.addEventListener('click', resetTestimonialTimer));
    tDots.forEach(dot => dot.addEventListener('click', resetTestimonialTimer));

    // -------------------------------------------------------------
    // 7. Active Nav Link Tracking on Scroll
    // -------------------------------------------------------------
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const highlightNavLink = () => {
        let scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            // Check scroll position is within section boundaries (-150px offset for headers)
            const sectionTop = section.offsetTop - 150;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightNavLink);

});
