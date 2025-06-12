// Header scroll transformation
document.addEventListener('DOMContentLoaded', function() {
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class when user scrolls down more than 50px
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.code-sample, .why-ringa, .team-description, .contact-info, .product-item');
    
    interactiveElements.forEach(element => {
        // Add subtle scale effect on hover
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
        });
    });
    
    // Add click effect for interactive elements
    interactiveElements.forEach(element => {
        element.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(1px) scale(0.99)';
        });
        
        element.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.01)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0px) scale(1)';
        });
    });
    
    
    // Add fade-in animation for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections for fade-in animation
    const sections = document.querySelectorAll('.products-section, .about-section, .team-section, .contact-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(section);
    });
    
    // Add typing effect to code sample
    const codeElement = document.querySelector('.code-sample pre');
    if (codeElement) {
        const originalText = codeElement.innerHTML;
        let isTyping = false;
        
        codeElement.addEventListener('click', function() {
            if (!isTyping) {
                isTyping = true;
                this.innerHTML = '';
                
                // Type out the code with realistic timing
                let i = 0;
                const typeSpeed = 30; // milliseconds per character
                
                function typeCharacter() {
                    if (i < originalText.length) {
                        codeElement.innerHTML += originalText.charAt(i);
                        i++;
                        setTimeout(typeCharacter, typeSpeed);
                    } else {
                        isTyping = false;
                    }
                }
                
                typeCharacter();
            }
        });
    }
    
    // Add smooth reveal for team member cards
    const teamMembers = document.querySelectorAll('.team-member');
    teamMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(50px)';
        member.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        
        const memberObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.3 });
        
        memberObserver.observe(member);
    });
    
    // Add dynamic header text color based on scroll position
    function updateHeaderTextColor() {
        const heroSection = document.querySelector('.hero-section');
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;
        const scrollTop = window.pageYOffset;
        
        if (scrollTop < heroHeight - 100) {
            // Over hero section - white text
            header.classList.add('over-hero');
        } else {
            // Over other sections - ensure proper contrast
            header.classList.remove('over-hero');
        }
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                updateHeaderTextColor();
                ticking = false;
            });
            ticking = true;
        }
    });


    // Journey Animation
    function initJourneyAnimation() {
        const journeyPath = document.querySelector('.journey-path .path');
        const journeyMarker = document.querySelector('.journey-marker');
        const sections = document.querySelectorAll('.products-section, .about-section, .team-section, .contact-section');
        
        // Create section indicators
        sections.forEach((section, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'section-indicator';
            document.querySelector('.journey-container').appendChild(indicator);
            
            // Position indicators along the path
            gsap.set(indicator, {
                motionPath: {
                    path: journeyPath,
                    align: journeyPath,
                    alignOrigin: [0.5, 0.5],
                    start: index * 0.25,
                    end: index * 0.25
                }
            });
        });

        // Set up the scroll animation timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                markers: false // Set to true for debugging
            }
        });

        // Animate the path drawing
        tl.fromTo(journeyPath, 
            { strokeDashoffset: 1000 },
            { strokeDashoffset: 0, duration: 1 },
            0
        );

        // Animate the marker along the path
        tl.to(journeyMarker, {
            motionPath: {
                path: journeyPath,
                align: journeyPath,
                alignOrigin: [0.5, 0.5]
            },
            ease: "none"
        }, 0);

        // Section animations
        sections.forEach(section => {
            const heading = section.querySelector('h1, h2, h3, .products-title, .team-title, .contact-title, .about-content');
            
            if (heading) {
                // Split heading into characters for animation
                const text = heading.textContent;
                heading.innerHTML = '';
                
                for (let i = 0; i < text.length; i++) {
                    const char = document.createElement('span');
                    char.className = 'char';
                    char.textContent = text[i];
                    heading.appendChild(char);
                }
                
                // Animate when section comes into view
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 70%",
                    onEnter: () => {
                        gsap.to(section.querySelectorAll('.char'), {
                            y: 0,
                            opacity: 1,
                            duration: 0.3,
                            stagger: 0.05,
                            ease: "back.out"
                        });
                        
                        // Pulse the corresponding indicator
                        const indicatorIndex = Array.from(sections).indexOf(section);
                        const indicator = document.querySelectorAll('.section-indicator')[indicatorIndex];
                        gsap.to(indicator, {
                            scale: 1.5,
                            duration: 0.5,
                            yoyo: true,
                            repeat: 1
                        });
                    },
                    onLeaveBack: () => {
                        gsap.set(section.querySelectorAll('.char'), {
                            y: 20,
                            opacity: 0
                        });
                    }
                });
            }
        });
    }

    // Call this function at the end of your DOMContentLoaded event listener
    initJourneyAnimation();
    
    // Initial call to set proper header state
    updateHeaderTextColor();
});