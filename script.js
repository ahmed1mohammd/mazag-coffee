// Coffee Shop Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.className = 'md:hidden text-white text-2xl';
    mobileMenuButton.id = 'mobile-menu-button';
    
    const nav = document.querySelector('nav');
    const header = document.querySelector('header .container');
    
    // Insert mobile menu button
    header.appendChild(mobileMenuButton);
    
    // Create mobile menu
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden bg-coffee-dark absolute top-full left-0 right-0 z-50 hidden';
    mobileMenu.id = 'mobile-menu';
    
    const mobileNavLinks = nav.cloneNode(true);
    mobileNavLinks.className = 'flex flex-col space-y-4 p-4';
    mobileMenu.appendChild(mobileNavLinks);
    
    header.parentElement.appendChild(mobileMenu);
    
    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    mobileMenu.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            mobileMenu.classList.add('hidden');
        }
    });

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('button:contains("أضف للسلة")');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Simple cart notification
            showNotification('تم إضافة المنتج إلى السلة!');
        });
    });

    // Order now buttons
    const orderButtons = document.querySelectorAll('button:contains("اطلب الآن"), button:contains("اكتشف قهوتنا المميزة")');
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('سيتم توجيهك إلى صفحة الطلب قريباً!');
        });
    });

    // Rewards program button
    const rewardsButton = document.querySelector('button:contains("اشترك في برنامج المكافآت")');
    if (rewardsButton) {
        rewardsButton.addEventListener('click', function() {
            showNotification('سيتم توجيهك إلى صفحة التسجيل في برنامج المكافآت!');
        });
    }

    // Scroll animations
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

    // Observe sections for animations
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Product hover effects
    const productCards = document.querySelectorAll('.bg-white.rounded-lg.shadow-lg');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    header.style.transition = 'transform 0.3s ease';

    // QR Code interaction
    const qrCode = document.querySelector('.w-64.h-64.bg-white');
    if (qrCode) {
        qrCode.addEventListener('click', function() {
            showNotification('سيتم توجيهك إلى متجر التطبيقات لتحميل التطبيق!');
        });
        
        qrCode.style.cursor = 'pointer';
        qrCode.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        qrCode.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});

// Utility function to show notifications
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-gold text-coffee-dark px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Helper function to find elements by text content
function findElementsByText(text) {
    const elements = [];
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    let node;
    while (node = walker.nextNode()) {
        if (node.textContent.includes(text)) {
            elements.push(node.parentElement);
        }
    }
    
    return elements;
}

// Update the button selection to work with Arabic text
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart buttons
    const addToCartButtons = findElementsByText('أضف للسلة');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('تم إضافة المنتج إلى السلة!');
        });
    });

    // Order buttons
    const orderButtons = [
        ...findElementsByText('اطلب الآن'),
        ...findElementsByText('اكتشف قهوتنا المميزة')
    ];
    orderButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('سيتم توجيهك إلى صفحة الطلب قريباً!');
        });
    });

    // Rewards button
    const rewardsButtons = findElementsByText('اشترك في برنامج المكافآت');
    rewardsButtons.forEach(button => {
        button.addEventListener('click', function() {
            showNotification('سيتم توجيهك إلى صفحة التسجيل في برنامج المكافآت!');
        });
    });
});

