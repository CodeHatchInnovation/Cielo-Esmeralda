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
        // Elimina 'active' de todos los enlaces primero
        link.classList.remove('active');
        // Si la URL del enlace contiene 'eventos-promociones.html' Y estamos en esa página
        if (link.getAttribute('href').includes('eventos-promociones.html') && window.location.pathname.includes('eventos-promociones.html')) {
            link.parentElement.classList.add('active-page'); // Aplica a <li>
        }
    });

    // Ajustar los enlaces del header y footer para que apunten a index.html cuando sea necesario
    document.querySelectorAll('.main-header .nav-links a, .main-footer .footer-column ul li a, .main-footer .logo-footer a').forEach(link => {
        // Asegurar que los enlaces a secciones de la página principal usen index.html
        if (link.getAttribute('href').startsWith('#') && !link.getAttribute('href').includes('eventos-promociones')) {
            link.setAttribute('href', 'index.html' + link.getAttribute('href'));
        }
        // Asegurar que el logo en esta página siempre regrese al inicio de index.html
        if (link.classList.contains('logo-footer') || link.parentElement.classList.contains('logo')) {
            link.setAttribute('href', 'index.html#inicio');
        }
    });

    // Lógica para el formulario de suscripción
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletter-email');
    const newsletterMessage = document.getElementById('newsletter-message');

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita el envío del formulario por defecto

        const email = newsletterEmailInput.value;
        // Aquí podrías enviar el email a un servidor (usando fetch/XMLHttpRequest)
        // Por ahora, solo mostraremos un mensaje de éxito/error simulado.

        if (email && email.includes('@') && email.includes('.')) {
            newsletterMessage.textContent = '¡Gracias por suscribirte! Recibirás nuestras promociones pronto.';
            newsletterMessage.className = 'success';
            newsletterMessage.style.display = 'block';
            newsletterEmailInput.value = ''; // Limpiar el campo
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
});
