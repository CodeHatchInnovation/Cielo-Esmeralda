// Global variables for Firebase (initialized in HTML)
let db;
let auth;
let currentUserId;
let isAuthReady;
let firebaseAddDoc;
let firebaseCollection;

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Assign global Firebase variables after they're available from the inline script
    db = window.firestoreDb;
    auth = window.firebaseAuth;
    currentUserId = window.getFirebaseUserId(); // Function to get current user ID
    isAuthReady = window.isFirebaseAuthReady; // Function to check auth readiness
    firebaseAddDoc = window.firebaseAddDoc;
    firebaseCollection = window.firebaseCollection;

    // --- Smooth Scroll ---
    document.querySelectorAll('.smooth-scroll').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    document.getElementById('menu-toggle').querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });

        // Close mobile menu when a link is clicked
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // --- Hero Slider Logic ---
    const slidesContainer = document.querySelector('.slides-container');
    const slideImages = document.querySelectorAll('.slide-img');
    const slideTexts = document.querySelectorAll('.slide-text');
    const sliderIndicators = document.querySelectorAll('.slider-indicator');
    const totalSlides = slideImages.length;
    let currentSlide = 0;
    let slideInterval;

    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Update text overlay visibility
        slideTexts.forEach((text, index) => {
            if (index === currentSlide) {
                text.classList.remove('hidden');
            } else {
                text.classList.add('hidden');
            }
        });

        // Update indicators
        sliderIndicators.forEach((indicator, index) => {
            if (index === currentSlide) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    window.nextSlide = function () {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
        pauseSlider();
        startSlider();
    };

    window.prevSlide = function () {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
        pauseSlider();
        startSlider();
    };

    window.startSlider = function () {
        slideInterval = setInterval(window.nextSlide, 5000); // Change slide every 5 seconds
    };

    window.pauseSlider = function () {
        clearInterval(slideInterval);
    };

    // Initialize slider
    updateSlider(); // Set initial state
    startSlider(); // Start auto-play

    // --- Chatbot Logic ---
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotCloseBtn = document.getElementById('chatbot-close');
    const chatMessagesContainer = document.getElementById('chat-messages');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');

    const appendMessage = (sender, text) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('flex', sender === 'user' ? 'justify-end' : 'justify-start');

        const bubbleDiv = document.createElement('div');
        bubbleDiv.classList.add('p-2', 'rounded-lg', 'max-w-[80%]');
        bubbleDiv.classList.add(sender === 'user' ? 'bg-custom-light-green' : 'bg-gray-200'); // Custom color for user message
        bubbleDiv.classList.add(sender === 'user' ? 'text-right' : 'text-left');
        bubbleDiv.textContent = text;

        messageDiv.appendChild(bubbleDiv);
        chatMessagesContainer.appendChild(messageDiv);
        chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight; // Scroll to bottom
    };

    const handleChatbotResponse = (message) => {
        const lowerCaseMessage = message.toLowerCase();
        let botResponse = 'Lo siento, no entendí tu pregunta. Por favor, intenta de nuevo o sé más específico.';

        if (lowerCaseMessage.includes('horario') || lowerCaseMessage.includes('abren') || lowerCaseMessage.includes('cierran')) {
            botResponse = 'Nuestro horario general es de Lunes a Domingo de 08:00 AM a 06:00 PM. Ten en cuenta que esto puede variar por sucursal o días festivos.';
        } else if (lowerCaseMessage.includes('direccion') || lowerCaseMessage.includes('ubicacion') || lowerCaseMessage.includes('sucursal')) {
            botResponse = 'Tenemos varias sucursales. ¿De cuál te gustaría saber la dirección? Por ejemplo: Aeropuerto, Chiluca o Lomas Verdes.';
            if (lowerCaseMessage.includes('aeropuerto')) {
                botResponse = 'Nuestra sucursal Aeropuerto se encuentra en: Aeródromo Mexiquense, Valle Escondido, 52930 Cdad. López Mateos, Méx.';
            } else if (lowerCaseMessage.includes('chiluca')) {
                botResponse = 'Nuestra sucursal Chiluca se encuentra en: Manzana 033, Residencial Chiluca, 52930 Cdad. López Mateos, Méx.';
            } else if (lowerCaseMessage.includes('lomas verdes')) {
                botResponse = 'Nuestra sucursal Lomas Verdes se encuentra en: Blvd. de la Sta. Cruz 142, Sta Cruz Acatlán, 53150 Naucalpan de Juárez, Méx.';
            }
        } else if (lowerCaseMessage.includes('menu') || lowerCaseMessage.includes('carta')) {
            botResponse = 'Puedes ver nuestro menú digital escaneando los códigos QR en la sección de Menú, o descargarlo en PDF.';
        } else if (lowerCaseMessage.includes('reservar') || lowerCaseMessage.includes('reservacion') || lowerCaseMessage.includes('mesa')) {
            botResponse = 'Sí, puedes reservar una mesa directamente en nuestra sección de Reservaciones.';
        } else if (lowerCaseMessage.includes('hola') || lowerCaseMessage.includes('saludos')) {
            botResponse = '¡Hola! ¿En qué puedo ayudarte?';
        } else if (lowerCaseMessage.includes('gracias')) {
            botResponse = 'De nada, ¡estoy para servirte!';
        } else if (lowerCaseMessage.includes('ayuda')) {
            botResponse = 'Estoy aquí para responder preguntas sobre horarios, ubicaciones, menú y reservaciones. ¿Cómo te puedo ayudar?';
        }
        setTimeout(() => appendMessage('bot', botResponse), 500); // Simulate typing delay
    };

    if (chatbotToggle && chatbotWindow && chatForm) {
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('hidden');
            if (!chatbotWindow.classList.contains('hidden')) {
                // Initial welcome message
                if (chatMessagesContainer.children.length === 0) {
                    appendMessage('bot', '¡Hola! Soy tu asistente virtual de Cielo Esmeralda. ¿En qué puedo ayudarte hoy?');
                }
                chatInput.focus();
            }
        });

        chatbotCloseBtn.addEventListener('click', () => {
            chatbotWindow.classList.add('hidden');
        });

        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const userMessage = chatInput.value.trim();
            if (userMessage) {
                appendMessage('user', userMessage);
                handleChatbotResponse(userMessage);
                chatInput.value = '';
            }
        });
    }

    // --- Voice Navigation Logic ---
    const voiceNavBtn = document.getElementById('voice-nav-btn');
    const mobileVoiceNavBtn = document.getElementById('mobile-voice-nav-btn');
    let recognition;

    const initializeSpeechRecognition = () => {
        if (!('webkitSpeechRecognition' in window)) {
            console.warn('Tu navegador no soporta el reconocimiento de voz. Por favor, usa Google Chrome para esta función.');
            // Display a message to the user if needed
            return null;
        }

        const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
        const newRecognition = new SpeechRecognition();
        newRecognition.lang = 'es-ES'; // Set language to Spanish
        newRecognition.interimResults = false;
        newRecognition.maxAlternatives = 1;
        newRecognition.continuous = false; // Listen for a single phrase

        newRecognition.onstart = () => {
            console.log('Voice recognition started. Speak now...');
            // Optional: Add visual feedback for active listening
        };

        newRecognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript.toLowerCase();
            console.log('Speech result:', speechResult);

            let sectionToScroll = null;
            if (speechResult.includes('inicio') || speechResult.includes('casa')) {
                sectionToScroll = 'inicio';
            } else if (speechResult.includes('nosotros') || speechResult.includes('historia')) {
                sectionToScroll = 'nosotros';
            } else if (speechResult.includes('menú') || speechResult.includes('carta')) {
                sectionToScroll = 'menu';
            } else if (speechResult.includes('sucursales') || speechResult.includes('direcciones')) {
                sectionToScroll = 'sucursales';
            } else if (speechResult.includes('reservaciones') || speechResult.includes('reservar')) {
                sectionToScroll = 'reservaciones';
            } else if (speechResult.includes('contacto') || speechResult.includes('contactanos')) {
                sectionToScroll = 'contacto';
            }

            if (sectionToScroll) {
                const targetElement = document.getElementById(sectionToScroll);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    // Close mobile menu if open
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (mobileMenu && mobileMenu.classList.contains('active')) {
                        mobileMenu.classList.remove('active');
                        document.getElementById('menu-toggle').querySelector('i').classList.replace('fa-times', 'fa-bars');
                    }
                }
            } else {
                console.log(`Comando no reconocido: "${speechResult}". Intenta con "llévame a inicio", "ir a menú", "reservar", etc.`);
                // You could add a temporary message on the UI for this
            }
        };

        newRecognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            console.log(`Error en el reconocimiento de voz: ${event.error}. Asegúrate de que el micrófono esté conectado y de que hayas dado permiso.`);
            // You could add a temporary message on the UI for this
        };

        newRecognition.onend = () => {
            console.log('Voice recognition ended.');
            // Optional: Remove visual feedback
        };

        return newRecognition;
    };

    const startVoiceRecognition = () => {
        if (!recognition) {
            recognition = initializeSpeechRecognition();
        }
        if (recognition) {
            recognition.start();
        }
    };

    if (voiceNavBtn) {
        voiceNavBtn.addEventListener('click', startVoiceRecognition);
    }
    if (mobileVoiceNavBtn) {
        mobileVoiceNavBtn.addEventListener('click', startVoiceRecognition);
    }


    // --- Form Submissions (Reservation & Contact) ---
    const reservationForm = document.getElementById('reservation-form');
    const reservationMessage = document.getElementById('reservation-message');
    const contactForm = document.getElementById('contact-form');
    const contactMessage = document.getElementById('contact-message');

    // Set min date for reservation form to today
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('date');
    if (dateInput) {
        dateInput.setAttribute('min', today);
    }

    if (reservationForm) {
        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(reservationForm);
            const reservationData = {};
            for (let [key, value] of formData.entries()) {
                reservationData[key] = value;
            }

            // Basic validation
            if (!reservationData.fullName || !reservationData.phone || !reservationData.email || !reservationData.date || !reservationData.time || !reservationData.diners) {
                reservationMessage.textContent = 'Por favor, completa todos los campos obligatorios.';
                reservationMessage.classList.remove('hidden', 'text-green-600');
                reservationMessage.classList.add('text-red-600');
                return;
            }
            if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(reservationData.email)) {
                reservationMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
                reservationMessage.classList.remove('hidden', 'text-green-600');
                reservationMessage.classList.add('text-red-600');
                return;
            }

            try {
                if (db && isAuthReady()) {
                    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                    await firebaseAddDoc(firebaseCollection(db, `artifacts/${appId}/users/${currentUserId}/reservations`), {
                        ...reservationData,
                        timestamp: new Date(),
                        userId: currentUserId
                    });
                    reservationMessage.textContent = '¡Tu reserva ha sido enviada con éxito!';
                    reservationMessage.classList.remove('hidden', 'text-red-600');
                    reservationMessage.classList.add('text-green-600');
                    reservationForm.reset();
                    setTimeout(() => reservationMessage.classList.add('hidden'), 5000);
                } else {
                    console.warn("Firestore no está inicializado o la autenticación no está lista. Los datos de la reserva no se persistirán.");
                    reservationMessage.textContent = '¡Reserva recibida! (No guardada en base de datos - Firebase no inicializado)';
                    reservationMessage.classList.remove('hidden', 'text-red-600');
                    reservationMessage.classList.add('text-green-600');
                    reservationForm.reset();
                    setTimeout(() => reservationMessage.classList.add('hidden'), 5000);
                }
            } catch (error) {
                console.error("Error al enviar la reserva:", error);
                reservationMessage.textContent = 'Hubo un error al procesar tu reserva. Por favor, inténtalo de nuevo.';
                reservationMessage.classList.remove('hidden', 'text-green-600');
                reservationMessage.classList.add('text-red-600');
                setTimeout(() => reservationMessage.classList.add('hidden'), 5000);
            }
        });
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const contactData = {};
            for (let [key, value] of formData.entries()) {
                contactData[key] = value;
            }

            // Basic validation
            if (!contactData.contactFullName || !contactData.contactEmail || !contactData.message) {
                contactMessage.textContent = 'Por favor, completa todos los campos obligatorios.';
                contactMessage.classList.remove('hidden', 'text-green-600');
                contactMessage.classList.add('text-red-600');
                return;
            }
            if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactData.contactEmail)) {
                contactMessage.textContent = 'Por favor, ingresa un correo electrónico válido.';
                contactMessage.classList.remove('hidden', 'text-green-600');
                contactMessage.classList.add('text-red-600');
                return;
            }

            try {
                if (db && isAuthReady()) {
                    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                    await firebaseAddDoc(firebaseCollection(db, `artifacts/${appId}/users/${currentUserId}/contact_messages`), {
                        ...contactData,
                        timestamp: new Date(),
                        userId: currentUserId
                    });
                    contactMessage.textContent = '¡Tu mensaje ha sido enviado con éxito!';
                    contactMessage.classList.remove('hidden', 'text-red-600');
                    contactMessage.classList.add('text-green-600');
                    contactForm.reset();
                    setTimeout(() => contactMessage.classList.add('hidden'), 5000);
                } else {
                    console.warn("Firestore no está inicializado o la autenticación no está lista. El mensaje de contacto no se persistirá.");
                    contactMessage.textContent = '¡Mensaje recibido! (No guardado en base de datos - Firebase no inicializado)';
                    contactMessage.classList.remove('hidden', 'text-red-600');
                    contactMessage.classList.add('text-green-600');
                    contactForm.reset();
                    setTimeout(() => contactMessage.classList.add('hidden'), 5000);
                }
            } catch (error) {
                console.error("Error al enviar el mensaje de contacto:", error);
                contactMessage.textContent = 'Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.';
                contactMessage.classList.remove('hidden', 'text-green-600');
                contactMessage.classList.add('text-red-600');
                setTimeout(() => contactMessage.classList.add('hidden'), 5000);
            }
        });
    }
}); // End DOMContentLoaded
