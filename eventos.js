// events.js

document.addEventListener('DOMContentLoaded', () => {
    // Función para activar animaciones al scroll (Intersection Observer)
    const animateOnScroll = () => {
        const animatedSections = document.querySelectorAll('.animated-section');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Porcentaje de visibilidad para activar
        };
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        animatedSections.forEach(section => {
            sectionObserver.observe(section);
        });
    };

    animateOnScroll(); // Llama a la función al cargar la página

    // Activar la clase 'active-page' para el enlace de "Eventos/Promociones"
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes('eventos-promociones.html') && window.location.pathname.includes('eventos-promociones.html')) {
            link.parentElement.classList.add('active-page');
        }
    });

    // Ajustar los enlaces del header y footer para que apunten a index.html cuando sea necesario
    document.querySelectorAll('.main-header .nav-links a, .main-footer .footer-column ul li a, .main-footer .logo-footer a').forEach(link => {
        if (link.getAttribute('href').startsWith('#') && !link.getAttribute('href').includes('eventos-promociones')) {
            link.setAttribute('href', 'index.html' + link.getAttribute('href'));
        }
        if (link.classList.contains('logo-footer') || link.parentElement.classList.contains('logo')) {
            link.setAttribute('href', 'index.html#inicio');
        }
    });

    // --- LÓGICA DEL POP-UP DE NEWSLETTER ---
    const newsletterPopupOverlay = document.getElementById('newsletter-popup-overlay');
    const closePopupBtn = document.getElementById('close-popup-btn');
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    const showNewsletterPopup = () => {
        const popupShown = sessionStorage.getItem('newsletterPopupShown');
        const userSubscribed = localStorage.getItem('newsletterUserSubscribed');

        // Solo mostrar si no se ha mostrado en esta sesión y el usuario no está suscrito
        if (!popupShown && !userSubscribed) {
            newsletterPopupOverlay.classList.add('active');
            sessionStorage.setItem('newsletterPopupShown', 'true'); // Marca que ya se mostró en esta sesión
        }
    };

    const hideNewsletterPopup = () => {
        newsletterPopupOverlay.classList.remove('active');
    };

    // Mostrar el pop-up con un pequeño retraso al cargar la página
    setTimeout(showNewsletterPopup, 1500); // Aparece 1.5 segundos después de cargar

    // Event listeners para cerrar el pop-up
    closePopupBtn.addEventListener('click', hideNewsletterPopup);
    newsletterPopupOverlay.addEventListener('click', (e) => {
        // Cierra el pop-up si se hace clic en el overlay (no en el contenido)
        if (e.target === newsletterPopupOverlay) {
            hideNewsletterPopup();
        }
    });

    // Lógica para el formulario de suscripción
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío del formulario por defecto

        const email = newsletterEmailInput.value;
        if (email && email.includes('@') && email.includes('.')) {
            newsletterMessage.textContent = '¡Gracias por suscribirte! Recibirás nuestras promociones pronto.';
            newsletterMessage.className = 'success';
            newsletterMessage.style.display = 'block';
            newsletterEmailInput.value = ''; // Limpiar el campo
            
            // Marcar que el usuario se ha suscrito (para no mostrar más el pop-up)
            localStorage.setItem('newsletterUserSubscribed', 'true');
            // Ocultar el pop-up después de la suscripción exitosa
            setTimeout(hideNewsletterPopup, 2000); 

        } else {
            newsletterMessage.textContent = 'Por favor, introduce un correo electrónico válido.';
            newsletterMessage.className = 'error';
            newsletterMessage.style.display = 'block';
        }

        // Ocultar el mensaje después de unos segundos
        setTimeout(() => {
            newsletterMessage.style.display = 'none';
        }, 5000);
    });

    // *** LÓGICA DE CHATBOT Y COMANDOS DE VOZ ELIMINADA DE AQUÍ ***
    // (Ya no se inicializa ni se maneja el chatbot/voz en esta página)
});
