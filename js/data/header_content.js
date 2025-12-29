/**
 * HEADER - Content Data
 * Single source of truth for header navigation
 */

export const headerContent = {
    brand: {
        name: "PlanesPro.cl",
        logo: "assets/logos_pp/logo-planespro.png",
        href: "index.html"
    },
    nav: [
        { text: "Inicio", href: "index.html", active: true },
        { text: "Nosotros", href: "nosotros.html", active: false },
        { text: "Noticias", href: "noticias.html", active: false },
        { text: "Asesores", href: "asesores.html", active: false },
        { text: "Simular Plan", href: "#contacto", active: false }
    ],
    cta: {
        text: "Analizar Mi Plan",
        href: "#contacto"
    }
};
