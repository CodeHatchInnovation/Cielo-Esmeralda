/* Definición de las nuevas variables de color */
:root {
    /* Colores base */
    --primary-background: #F3F0EC;          /* Fondo principal (crema muy claro y cálido) */
    --text-primary: #524D4A;                 /* Gris oscuro para todo el texto general */
    --card-form-background: #EEEBE5;         /* Crema ligeramente más oscuro que el fondo (para tarjetas y formularios) */
    --popover-background: #EAE5DD;           /* Fondo de Elementos Emergentes (Popovers) */
    --button-primary: #248F83;               /* Verde azulado oscuro (Botones principales, enlaces importantes) */
    --text-on-button-primary: #F7F5F2;       /* Un crema muy claro, casi blanco (Texto sobre el Color Primario) */
    --section-secondary-background: #E6F2EB; /* Verde muy pálido (Fondo de secciones como Menú y Contacto) */
    --text-on-section-secondary: #265940;    /* Verde oscuro (Texto sobre el Color Secundario) */
    --header-footer-background: #014B43;     /* Verde azulado muy oscuro y saturado (Fondo del encabezado/barra de navegación y footer) */
    --text-on-header-footer: #F7F5F2;        /* Un crema muy claro, casi blanco (Texto sobre el Color de Acento) */
    --subtle-elements-background: #E7E3DE;   /* Crema desaturado (Elementos Apagados / fondos sutiles) */
    --text-secondary: #8A8582;               /* Gris medio (Texto Apagado / texto secundario, descripciones) */
    --error-color: #D92828;                  /* Rojo estándar (Color para Errores) */
    --text-on-error: #FAFAFA;                /* Blanco (Texto sobre el Color para Errores) */
    --border-elements: #DBD8D3;              /* Un gris/crema muy sutil (Bordes de elementos) */
    --input-background: #EAE5DD;             /* Fondo de campos de formulario (Inputs) */
    --focus-ring-color: #2EAD9D;             /* Verde azulado brillante (Anillo de Foco al seleccionar un input) */

    /* Variables de espaciado y tamaño */
    --spacing-large: 60px;
    --spacing-medium: 40px;
    --spacing-small: 25px;
    --padding-section: 80px;
    --padding-card: 40px;
    --border-radius-default: 10px;
    --box-shadow-default: 0 4px 15px rgba(0, 0, 0, 0.08); /* Sombra suave */

    /* Tipografías (ya incrustadas con Google Fonts en el HTML) */
    --font-serif: 'Playfair Display', serif;
    --font-sans-serif: 'Montserrat', sans-serif;
}

/* Estilos generales para el body */
body {
    font-family: var(--font-sans-serif);
    margin: 0;
    padding: 0;
    background-color: var(--primary-background);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden; /* Evitar scroll horizontal por animaciones */
}

h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-serif);
    color: var(--text-primary); /* Por defecto, el marrón oscuro */
    margin-bottom: 0.5em;
}

/* Estilos generales para secciones con animación de aparición */
.animated-section {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.animated-section.is-visible {
    opacity: 1;
    transform: translateY(0);
}

/* Contenedor general para centrar contenido */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Utilidades */
.text-center { text-align: center; }
.mt-spacing-small { margin-top: var(--spacing-small); }
.mt-spacing-medium { margin-top: var(--spacing-medium); }
.mb-spacing-small { margin-bottom: var(--spacing-small); }
.mb-spacing-medium { margin-bottom: var(--spacing-medium); }
.flex-center { display: flex; justify-content: center; align-items: center; }
.section-common { padding: var(--padding-section) 0; background-color: var(--primary-background); }
.section-secondary-bg { background-color: var(--section-secondary-background); }

/* Estilos de títulos de sección */
.section-header {
    margin-bottom: var(--spacing-large);
}
.section-header.center {
    text-align: center;
}
.section-header .section-icon {
    font-size: 3em;
    color: var(--text-on-section-secondary); /* Verde oscuro para íconos de sección */
    margin-bottom: 10px;
    display: block;
}
.section-header h2 {
    font-size: 2.5em;
    color: var(--text-primary); /* Marrón oscuro */
    margin-bottom: 10px;
}
.section-header p {
    font-size: 1.1em;
    color: var(--text-primary);
    max-width: 800px;
    margin: 0 auto;
}
.elegant-title {
    font-family: var(--font-serif);
    color: var(--button-primary); /* Verde azulado para títulos elegantes */
}
h3.elegant-title {
    font-size: 1.8em;
    margin-bottom: 15px;
}


/* --- Header / Navbar --- */
.main-header {
    background-color: var(--header-footer-background);
    color: var(--text-on-header-footer);
    padding: 15px var(--spacing-medium);
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1000;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo a {
    color: var(--text-on-header-footer);
    font-family: var(--font-serif);
    font-size: 1.8em;
    text-decoration: none;
    font-weight: bold;
}

.nav-links {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--spacing-medium);
}

.nav-links a {
    color: var(--text-on-header-footer);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 5px 0;
    position: relative;
}

.nav-links a::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: var(--text-on-header-footer);
    transition: width 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.active::after {
    width: 100%;
}

.nav-actions {
    display: flex;
    align-items: center;
    gap: 15px;
}

.voice-command-button,
.reserve-button {
    background-color: transparent;
    color: var(--text-on-header-footer);
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 1.2em;
    display: flex;
    align-items: center;
    gap: 5px;
    transition: color 0.3s ease;
}

.voice-command-button:hover,
.voice-command-button.listening {
    color: var(--button-primary); /* Cambia de color cuando escucha */
}

.reserve-button {
    background-color: var(--button-primary);
    color: var(--text-on-button-primary);
    padding: 10px 20px;
    border-radius: var(--border-radius-default);
    font-weight: bold;
    text-decoration: none;
    font-size: 1em;
    transition: background-color 0.3s ease;
}

.reserve-button:hover {
    background-color: #1F7C70; /* Un tono ligeramente más oscuro del primary-color */
}

.menu-toggle {
    display: none; /* Oculto en desktop */
    flex-direction: column;
    cursor: pointer;
    gap: 5px;
}

.menu-toggle span {
    width: 25px;
    height: 3px;
    background-color: var(--text-on-header-footer);
    transition: all 0.3s ease;
}

/* --- Hero Section --- */
.hero-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--padding-section) 0;
    background-color: var(--primary-background);
    text-align: center;
}

.hero-content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--spacing-large);
    text-align: left;
    padding: 0 var(--spacing-medium);
}

.hero-text {
    flex: 1;
    padding-right: var(--spacing-medium);
}

.hero-text h1 {
    font-size: 3.5em;
    margin-bottom: 15px;
    line-height: 1.1;
    color: var(--text-primary);
}

.hero-text h1 span {
    color: var(--button-primary); /* Color de acento para "Cielo Esmeralda" */
}

.hero-text p {
    font-size: 1.15em;
    color: var(--text-primary);
    margin-bottom: var(--spacing-medium);
}

.hero-buttons {
    display: flex;
    gap: var(--spacing-medium);
    flex-wrap: wrap;
}

.hero-buttons .button {
    padding: 12px 25px;
    border-radius: var(--border-radius-default);
    font-weight: bold;
    text-decoration: none;
    font-size: 1em;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.3s ease;
}

.hero-buttons .button-primary {
    background-color: var(--button-primary);
    color: var(--text-on-button-primary);
    border: 2px solid var(--button-primary);
}

.hero-buttons .button-primary:hover {
    background-color: #1F7C70; /* Tono más oscuro */
    border-color: #1F7C70;
}

.hero-buttons .button-secondary {
    background-color: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-elements);
}

.hero-buttons .button-secondary:hover {
    background-color: var(--subtle-elements-background);
    border-color: var(--subtle-elements-background);
}

.hero-image-carousel {
    flex: 1;
    min-width: 300px; /* Asegura un tamaño mínimo */
    max-width: 500px; /* Limita el tamaño máximo */
    position: relative;
    box-shadow: var(--box-shadow-default);
    border-radius: var(--border-radius-default);
    overflow: hidden;
    background-color: #fff; /* Fondo blanco para las imágenes del carrusel */
}

.carousel-slide {
    display: flex;
    transition: transform 0.5s ease-in-out;
    border-radius: var(--border-radius-default);
}

.carousel-slide img {
    width: 100%;
    display: block;
    border-radius: var(--border-radius-default); /* Las imágenes dentro también redondeadas */
    object-fit: cover;
}

.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.4);
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    font-size: 1.5em;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background-color 0.3s ease;
    z-index: 5;
}

.carousel-btn:hover {
    background-color: rgba(0, 0, 0, 0.6);
}

.prev-btn {
    left: 10px;
}

.next-btn {
    right: 10px;
}

/* --- Nuestra Historia / Filosofía --- */
.content-two-columns {
    display: flex;
    gap: var(--spacing-large);
    align-items: flex-start; /* Alinea el inicio del contenido */
    flex-wrap: wrap; /* Permite que las columnas se envuelvan en pantallas pequeñas */
}

.text-content {
    flex: 2; /* Ocupa más espacio */
    min-width: 300px;
}

.image-gallery {
    flex: 1; /* Ocupa menos espacio */
    display: flex;
    flex-direction: column;
    gap: var(--spacing-medium);
    min-width: 250px;
}

.image-gallery .rounded-image {
    width: 100%;
    height: auto;
    border-radius: var(--border-radius-default);
    box-shadow: var(--box-shadow-default);
    object-fit: cover;
}

/* --- Menú Digital / QR --- */
.card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: var(--spacing-medium);
    justify-content: center;
    margin-top: var(--spacing-large);
}

.card {
    background-color: var(--card-form-background); /* Crema ligeramente oscuro */
    padding: var(--padding-card);
    border-radius: var(--border-radius-default);
    box-shadow: var(--box-shadow-default);
    text-align: center;
}

.qr-card img {
    max-width: 180px;
    height: auto;
    margin: 20px auto;
    display: block;
}

.text-link {
    color: var(--button-primary);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}
.text-link:hover {
    text-decoration: underline;
}

/* --- Nuestras Sucursales --- */
.branches-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: var(--spacing-medium);
    margin-top: var(--spacing-large);
}

.branch-card {
    background-color: var(--card-form-background);
    padding: var(--padding-card);
    border-radius: var(--border-radius-default);
    box-shadow: var(--box-shadow-default);
}

.branch-card p {
    color: var(--text-primary);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 10px;
}
.branch-card p i {
    color: var(--button-primary); /* Íconos en color primario */
    font-size: 1.1em;
}
.branch-card .map-link {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    margin-top: 10px;
    color: var(--text-primary); /* Gris oscuro para el enlace del mapa */
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
}
.branch-card .map-link:hover {
    color: var(--button-primary);
    text-decoration: underline;
}

/* --- Reservaciones / Formulario --- */
.reservation-form-container {
    background-color: var(--card-form-background);
    padding: var(--padding-card);
    border-radius: var(--border-radius-default);
    box-shadow: var(--box-shadow-default);
    max-width: 700px;
    margin: var(--spacing-large) auto 0;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: var(--text-primary);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
}
.form-group label i {
    color: var(--button-primary);
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="date"],
.form-group input[type="time"],
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 1
