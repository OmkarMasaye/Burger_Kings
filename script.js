document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            const spans = hamburger.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }
    
    const addToCartButtons = document.querySelectorAll('.btn-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.closest('.menu-item').querySelector('h3').textContent;
            const originalText = this.textContent;
            
            this.textContent = '✓ Added!';
            this.style.backgroundColor = '#4caf50';
            
            alert(`${itemName} has been added to your cart!`);
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '#d32f2f';
            }, 2000);
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (name && email && subject && message) {
                formMessage.textContent = 'Thank you for contacting us! We will get back to you soon.';
                formMessage.className = 'form-message success';
                
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            } else {
                formMessage.textContent = 'Please fill in all required fields.';
                formMessage.className = 'form-message error';
            }
        });
    }
    
    const locationSearch = document.getElementById('locationSearch');
    if (locationSearch) {
        const searchButton = locationSearch.nextElementSibling;
        
        searchButton.addEventListener('click', function() {
            const location = locationSearch.value;
            
            if (location.trim() === '') {
                alert('Please enter a city or pincode');
                return;
            }
            
            alert(`Searching for outlets near ${location}...\n\nThis is a demo. In a real application, this would show nearby outlets.`);
        });
        
        locationSearch.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }
    
    const burgerCards = document.querySelectorAll('.burger-card, .menu-item, .team-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s, transform 0.5s';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    burgerCards.forEach(card => {
        observer.observe(card);
    });
    
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
        } else {
            navbar.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        }
    });
});
