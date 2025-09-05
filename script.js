// Coffee Shop Website JavaScript

// Global cart functionality
let cart = [];

// Initialize cart from localStorage
function initializeCart() {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        cart = [];
    }
}

// Cart functions
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function addToCart(name, description, price, image) {
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            name: name,
            description: description,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    showNotification('تم إضافة المنتج إلى سلة التسوق!');
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCart = document.getElementById('empty-cart');
    const cartCount = document.getElementById('cart-count');
    const totalItems = document.getElementById('total-items');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        if (emptyCart) emptyCart.classList.remove('hidden');
        if (cartCount) cartCount.textContent = '0';
        if (totalItems) totalItems.textContent = '0';
        if (subtotal) subtotal.textContent = '0 ريال';
        if (tax) tax.textContent = '0 ريال';
        if (total) total.textContent = '0 ريال';
        if (checkoutBtn) checkoutBtn.disabled = true;
        return;
    }

    if (emptyCart) emptyCart.classList.add('hidden');
    if (cartCount) cartCount.textContent = cart.length;
    
    let totalPrice = 0;
    cartItemsContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        return `
            <div class="bg-white rounded-2xl shadow-lg p-6 flex items-center space-x-6 space-x-reverse">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded-lg">
                <div class="flex-1">
                    <h4 class="text-xl font-bold text-coffee-dark mb-2">${item.name}</h4>
                    <p class="text-gray-600 mb-2">${item.description}</p>
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3 space-x-reverse">
                            <button onclick="updateQuantity(${index}, -1)" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">-</button>
                            <span class="text-lg font-semibold">${item.quantity}</span>
                            <button onclick="updateQuantity(${index}, 1)" class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors">+</button>
                        </div>
                        <div class="text-right">
                            <div class="text-lg font-bold text-coffee-dark">${itemTotal} ريال</div>
                            <div class="text-sm text-gray-500">${item.price} ريال للواحد</div>
                        </div>
                    </div>
                </div>
                <button onclick="removeItem(${index})" class="text-red-500 hover:text-red-700 transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                </button>
            </div>
        `;
    }).join('');

    const taxAmount = totalPrice * 0.15;
    const finalTotal = totalPrice + taxAmount;

    if (totalItems) totalItems.textContent = cart.length;
    if (subtotal) subtotal.textContent = `${totalPrice} ريال`;
    if (tax) tax.textContent = `${taxAmount.toFixed(2)} ريال`;
    if (total) total.textContent = `${finalTotal.toFixed(2)} ريال`;
    if (checkoutBtn) checkoutBtn.disabled = false;
}

function updateQuantity(index, change) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function displayOrderSummary() {
    const orderItemsContainer = document.getElementById('order-items');
    const totalItems = document.getElementById('total-items');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');

    if (!orderItemsContainer) return;

    if (cart.length === 0) {
        window.location.href = '/cart.html';
        return;
    }

    let totalPrice = 0;
    orderItemsContainer.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;
        
        return `
            <div class="flex items-center justify-between py-3 border-b border-gray-100">
                <div class="flex items-center space-x-3 space-x-reverse">
                    <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover rounded-lg">
                    <div>
                        <h4 class="font-semibold text-coffee-dark">${item.name}</h4>
                        <p class="text-sm text-gray-500">الكمية: ${item.quantity}</p>
                    </div>
                </div>
                <span class="font-semibold">${itemTotal} ريال</span>
            </div>
        `;
    }).join('');

    const taxAmount = totalPrice * 0.15;
    const finalTotal = totalPrice + taxAmount;

    if (totalItems) totalItems.textContent = cart.length;
    if (subtotal) subtotal.textContent = `${totalPrice} ريال`;
    if (tax) tax.textContent = `${taxAmount.toFixed(2)} ريال`;
    if (total) total.textContent = `${finalTotal.toFixed(2)} ريال`;

    return {
        items: cart,
        subtotal: totalPrice,
        tax: taxAmount,
        total: finalTotal,
        timestamp: new Date().toISOString()
    };
}

// Notification system
let currentNotification = null;

function showNotification(message, type = 'success') {
    // Remove any existing notification
    if (currentNotification) {
        currentNotification.remove();
        currentNotification = null;
    }

    const colors = {
        success: 'bg-green-500',
        warning: 'bg-yellow-500',
        error: 'bg-red-500'
    };
    
    const icons = {
        success: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>`,
        warning: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>`,
        error: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>`
    };
    
    currentNotification = document.createElement('div');
    currentNotification.className = `fixed top-20 right-4 ${colors[type]} text-white px-6 py-4 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300 flex items-center space-x-3 space-x-reverse`;
    currentNotification.innerHTML = `
        <div class="flex-shrink-0">
            ${icons[type]}
        </div>
        <div class="flex-1">
            <p class="font-medium">${message}</p>
        </div>
        <button onclick="closeNotification()" class="flex-shrink-0 ml-4">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
        </button>
    `;
    
    document.body.appendChild(currentNotification);
    
    // Show notification
    setTimeout(() => {
        currentNotification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
        closeNotification();
    }, 3000);
}

function closeNotification() {
    if (currentNotification) {
        currentNotification.classList.add('translate-x-full');
        setTimeout(() => {
            if (currentNotification && currentNotification.parentElement) {
                currentNotification.remove();
            }
            currentNotification = null;
        }, 300);
    }
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

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    initializeCart();
    updateCartCount();

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
    
    if (nav && header) {
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
    }

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

    // Checkout button functionality
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                window.location.href = '/checkout.html';
            } else {
                showNotification('السلة فارغة! أضف بعض المنتجات أولاً.', 'warning');
            }
        });
    }

    // Checkout form submission
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const customerData = {
                name: formData.get('customerName'),
                tableNumber: formData.get('tableNumber'),
                phone: formData.get('phone') || '',
                notes: formData.get('notes') || ''
            };

            // Validate form
            if (!customerData.name.trim()) {
                showNotification('يرجى إدخال الاسم الكامل', 'error');
                return;
            }

            if (!customerData.tableNumber || customerData.tableNumber < 1) {
                showNotification('يرجى إدخال رقم طاولة صحيح', 'error');
                return;
            }

            // Get order data
            const orderData = displayOrderSummary();
            orderData.customer = customerData;
            localStorage.setItem('currentOrder', JSON.stringify(orderData));
            
            // Clear cart
            localStorage.removeItem('cart');
            cart = [];
            
            // Show success modal
            const successModal = document.getElementById('success-modal');
            if (successModal) {
                successModal.classList.remove('hidden');
            }
        });
    }

    // Initialize cart display if on cart page
    if (document.getElementById('cart-items')) {
        updateCartDisplay();
    }

    // Initialize order summary if on checkout page
    if (document.getElementById('order-items')) {
        displayOrderSummary();
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
    const mainHeader = document.querySelector('header');
    
    if (mainHeader) {
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                // Scrolling down
                mainHeader.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                mainHeader.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
        
        mainHeader.style.transition = 'transform 0.3s ease';
    }

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

// Global functions for checkout page
function goToHome() {
    window.location.href = '/';
}

function viewOrder() {
    const orderData = JSON.parse(localStorage.getItem('currentOrder') || '{}');
    
    // Create order details modal
    const orderModal = document.createElement('div');
    orderModal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    orderModal.innerHTML = `
        <div class="bg-white rounded-2xl p-8 max-w-2xl mx-4 max-h-96 overflow-y-auto">
            <div class="flex justify-between items-center mb-6">
                <h3 class="text-2xl font-bold text-coffee-dark">تفاصيل الطلب</h3>
                <button onclick="this.closest('.fixed').remove()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <div class="space-y-4">
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-bold text-coffee-dark mb-2">بيانات العميل</h4>
                    <p><strong>الاسم:</strong> ${orderData.customer?.name || 'غير محدد'}</p>
                    <p><strong>رقم الطاولة:</strong> ${orderData.customer?.tableNumber || 'غير محدد'}</p>
                    ${orderData.customer?.phone ? `<p><strong>الهاتف:</strong> ${orderData.customer.phone}</p>` : ''}
                    ${orderData.customer?.notes ? `<p><strong>ملاحظات:</strong> ${orderData.customer.notes}</p>` : ''}
                </div>
                
                <div class="bg-gray-50 p-4 rounded-lg">
                    <h4 class="font-bold text-coffee-dark mb-2">المنتجات</h4>
                    ${orderData.items?.map(item => `
                        <div class="flex justify-between items-center py-2 border-b border-gray-200">
                            <div>
                                <span class="font-semibold">${item.name}</span>
                                <span class="text-gray-500 text-sm"> × ${item.quantity}</span>
                            </div>
                            <span class="font-semibold">${item.price * item.quantity} ريال</span>
                        </div>
                    `).join('') || 'لا توجد منتجات'}
                </div>
                
                <div class="bg-coffee-dark text-white p-4 rounded-lg">
                    <div class="flex justify-between">
                        <span>المجموع الفرعي:</span>
                        <span>${orderData.subtotal || 0} ريال</span>
                    </div>
                    <div class="flex justify-between">
                        <span>الضريبة (15%):</span>
                        <span>${(orderData.tax || 0).toFixed(2)} ريال</span>
                    </div>
                    <div class="flex justify-between text-xl font-bold border-t border-white pt-2 mt-2">
                        <span>المجموع الكلي:</span>
                        <span>${(orderData.total || 0).toFixed(2)} ريال</span>
                    </div>
                </div>
                
                <div class="text-center">
                    <p class="text-sm text-gray-500">وقت الطلب: ${orderData.timestamp ? new Date(orderData.timestamp).toLocaleString('ar-SA') : 'غير محدد'}</p>
                </div>
            </div>
            
            <div class="mt-6 text-center">
                <button onclick="this.closest('.fixed').remove()" class="bg-coffee-brown text-white px-6 py-2 rounded-full hover:bg-coffee-dark transition-all duration-300">
                    إغلاق
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(orderModal);
}

