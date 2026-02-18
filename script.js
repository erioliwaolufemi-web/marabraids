// Navigation Toggle Logic
const navSlide = () => {
    const burger = document.querySelector('#burger');
    const nav = document.querySelector('#nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
    });
}

// FORM LOGIC: Formspree + WhatsApp
document.getElementById('orderForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const btn = document.getElementById('submitBtn');
    const formData = new FormData(form);
    
    btn.innerText = "Processing...";

    // 1. Send to Formspree
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            // 2. Prepare WhatsApp Message
            const name = formData.get('name');
            const service = formData.get('service');
            const phone = "2348164120347";
            
            const whatsappMsg = `*Mara Braids Inquiry*%0A*Name:* ${name}%0A*Service:* ${service}%0A*Status:* I just sent my full details to your email!`;
            
            // 3. Open WhatsApp
            window.open(`https://wa.me/${phone}?text=${whatsappMsg}`, '_blank');
            
            form.reset();
            btn.innerText = "Submit & Chat on WhatsApp";
            alert("Success! Your order is logged and WhatsApp is opening.");
        } else {
            alert("Error sending email. Please try again.");
            btn.innerText = "Submit & Chat on WhatsApp";
        }
    }).catch(error => {
        alert("Network error. Please check your connection.");
        btn.innerText = "Submit & Chat on WhatsApp";
    });
});

navSlide();