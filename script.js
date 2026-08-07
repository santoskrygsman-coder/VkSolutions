document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Header Scroll Effect & Active Link ---
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('#navbar a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- 2. Mobile Menu Toggle ---
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('ph-list');
                icon.classList.add('ph-x');
            } else {
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('ph-x');
                icon.classList.add('ph-list');
            }
        });
    });

    // --- 3. Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));

    // --- 4. Budget Simulator WhatsApp Integration ---
    const budgetForm = document.getElementById('budget-form');
    
    if (budgetForm) {
        budgetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('client-name').value;
            const company = document.getElementById('client-company').value;
            const phone = document.getElementById('client-phone').value;
            const email = document.getElementById('client-email').value;
            const projectType = document.getElementById('project-type').value;
            const projectDesc = document.getElementById('project-desc').value;
            const deadline = document.getElementById('project-deadline').value;
            
            const whatsappNumber = '5573998646188';
            
            let message = `Olá!\n\nGostaria de solicitar um orçamento.\n\n*Nome:* ${name}\n*Telefone:* ${phone}\n*Projeto:* ${projectType}\n*Descrição:* ${projectDesc}`;
            
            if (company) message += `\n*Empresa:* ${company}`;
            if (email) message += `\n*E-mail:* ${email}`;
            if (deadline) message += `\n*Prazo:* ${deadline}`;
            
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // --- 5. Gallery Modal Logic ---
    const modal = document.getElementById('gallery-modal');
    const btnOpenGallery = document.getElementById('btn-open-gallery');
    const spanClose = document.querySelector('.close-modal');
    const galleryImage = document.getElementById('gallery-image');
    const btnPrev = document.querySelector('.prev-btn');
    const btnNext = document.querySelector('.next-btn');
    const counterCurrent = document.getElementById('gallery-current');
    const counterTotal = document.getElementById('gallery-total');

    const images = [
        'assets/mei-print-1.png',
        'assets/mei-print-2.png'
    ];
    let currentIndex = 0;

    function updateGallery() {
        if(galleryImage) {
            galleryImage.src = images[currentIndex];
            counterCurrent.innerText = currentIndex + 1;
            counterTotal.innerText = images.length;
        }
    }

    if (btnOpenGallery && modal) {
        btnOpenGallery.addEventListener('click', () => {
            modal.style.display = 'block';
            updateGallery();
        });

        const previewImg = document.querySelector('.project-preview img');
        if(previewImg) {
            previewImg.addEventListener('click', () => {
                modal.style.display = 'block';
                updateGallery();
            });
        }
    }

    if (spanClose) {
        spanClose.addEventListener('click', () => {
            modal.style.display = 'none';
        });
    }

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    if (btnNext) {
        btnNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % images.length;
            updateGallery();
        });
    }

    if (btnPrev) {
        btnPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            updateGallery();
        });
    }

    // --- 6. FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const answer = item.querySelector('.faq-answer');
            
            // Toggle current item
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                // Optional: Close others
                // document.querySelectorAll('.faq-item').forEach(other => {
                //     other.classList.remove('active');
                //     other.querySelector('.faq-answer').style.maxHeight = null;
                // });
                
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
