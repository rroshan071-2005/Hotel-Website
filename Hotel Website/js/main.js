document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Date Input Validation
    const checkInDate = document.querySelector('input[type="date"]:nth-of-type(1)');
    const checkOutDate = document.querySelector('input[type="date"]:nth-of-type(2)');

    if (checkInDate && checkOutDate) {
        // Set min date as today for check-in
        const today = new Date().toISOString().split('T')[0];
        checkInDate.min = today;

        checkInDate.addEventListener('change', function() {
            // Set min date for check-out as check-in date
            checkOutDate.min = this.value;
            
            // Clear check-out date if it's before check-in date
            if (checkOutDate.value && checkOutDate.value < this.value) {
                checkOutDate.value = '';
            }
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    // Form Submission
    const bookingForm = document.querySelector('.booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                destination: this.querySelector('input[placeholder="Destination"]').value,
                checkIn: this.querySelector('input[type="date"]:nth-of-type(1)').value,
                checkOut: this.querySelector('input[type="date"]:nth-of-type(2)').value,
                guests: this.querySelector('select').value
            };

            // Validate form data
            if (!formData.destination || !formData.checkIn || !formData.checkOut) {
                alert('Please fill in all required fields');
                return;
            }

            // Here you would typically send the data to a server
            console.log('Booking details:', formData);
            alert('Thank you for your booking request! We will contact you shortly.');
        });
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature, .offer-card, .testimonial').forEach(el => {
    observer.observe(el);
});
