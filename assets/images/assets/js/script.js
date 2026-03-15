document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Scroll reveal animation
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Product Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    if (filterBtns.length > 0 && productItems.length > 0) {
        const filterProducts = (category) => {
            filterBtns.forEach(btn => {
                if (btn.getAttribute('data-filter') === category) {
                    btn.classList.add('border-black', 'text-black');
                    btn.classList.remove('border-transparent', 'text-gray-500');
                } else {
                    btn.classList.remove('border-black', 'text-black');
                    btn.classList.add('border-transparent', 'text-gray-500');
                }
            });

            productItems.forEach(item => {
                if (category === 'all' || item.getAttribute('data-category') === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        };

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-filter');
                filterProducts(category);
                
                // Update URL parameter to hash instead of search for local file support
                if (category === 'all') {
                    history.pushState('', document.title, window.location.pathname + window.location.search);
                } else {
                    window.location.hash = category;
                }
            });
        });

        // Initialize from hash if present
        const defaultCategory = window.location.hash ? window.location.hash.substring(1) : null;
        if (defaultCategory) {
            filterProducts(defaultCategory);
        }

        // Handle hash changes on the same page
        window.addEventListener('hashchange', () => {
            const newCategory = window.location.hash ? window.location.hash.substring(1) : 'all';
            filterProducts(newCategory);
        });
    }

    // Simple cart alert function
    window.addToCart = function(productName) {
        alert(`${productName} added to your stylish cart!`);
    }
});
