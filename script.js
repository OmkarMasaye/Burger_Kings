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
    
    // Authentication functionality
    const authTabs = document.querySelectorAll('.auth-tab');
    const loginFormContainer = document.getElementById('loginForm');
    const registerFormContainer = document.getElementById('registerForm');
    
    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            authTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            if (targetTab === 'login') {
                loginFormContainer.classList.remove('hidden');
                registerFormContainer.classList.add('hidden');
            } else {
                loginFormContainer.classList.add('hidden');
                registerFormContainer.classList.remove('hidden');
            }
        });
    });
    
    // Register functionality
    const registerForm = document.getElementById('register');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('registerName').value;
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            const messageDiv = document.getElementById('registerMessage');
            
            if (password !== confirmPassword) {
                messageDiv.textContent = 'Passwords do not match!';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            const users = JSON.parse(localStorage.getItem('jumboKingUsers')) || [];
            
            const userExists = users.find(user => user.email === email);
            if (userExists) {
                messageDiv.textContent = 'Email already registered!';
                messageDiv.className = 'auth-message error';
                return;
            }
            
            users.push({ name, email, password });
            localStorage.setItem('jumboKingUsers', JSON.stringify(users));
            
            messageDiv.textContent = 'Registration successful! You can now login.';
            messageDiv.className = 'auth-message success';
            
            registerForm.reset();
            
            setTimeout(() => {
                authTabs[0].click();
            }, 1500);
        });
    }
    
    // Login functionality
    const loginForm = document.getElementById('login');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            const messageDiv = document.getElementById('loginMessage');
            
            const users = JSON.parse(localStorage.getItem('jumboKingUsers')) || [];
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                localStorage.setItem('jumboKingCurrentUser', JSON.stringify({ name: user.name, email: user.email }));
                messageDiv.textContent = 'Login successful! Redirecting...';
                messageDiv.className = 'auth-message success';
                
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } else {
                messageDiv.textContent = 'Invalid email or password!';
                messageDiv.className = 'auth-message error';
            }
        });
    }
    
    // Check login status and update navigation
    function updateNavigation() {
        const currentUser = JSON.parse(localStorage.getItem('jumboKingCurrentUser'));
        const navMenu = document.querySelector('.nav-menu');
        
        const existingAuthItem = navMenu.querySelector('.auth-nav-item');
        if (existingAuthItem) {
            existingAuthItem.remove();
        }
        
        const authItem = document.createElement('li');
        authItem.className = 'auth-nav-item';
        
        if (currentUser) {
            authItem.innerHTML = `
                <div class="user-info">
                    <span class="user-name">👤 ${currentUser.name}</span>
                    <button class="btn-logout">Logout</button>
                </div>
            `;
            
            const logoutBtn = authItem.querySelector('.btn-logout');
            logoutBtn.addEventListener('click', function() {
                localStorage.removeItem('jumboKingCurrentUser');
                window.location.reload();
            });
        } else {
            authItem.innerHTML = '<a href="auth.html" class="btn-login">Login</a>';
        }
        
        navMenu.appendChild(authItem);
    }
    
    updateNavigation();
});
