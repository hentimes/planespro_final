/**
 * HERO SECTION - Content Data
 * Consulted: GROW (Messaging & Copy)
 * 
 * Single source of truth for Hero section content.
 * Used by both desktop and mobile versions.
 */

export const heroContent = {
    // Main messaging
    title: "Optimiza tu 7%",
    subtitle: "Te ayudamos a encontrar el plan de Isapre perfecto para ti. Asesoría experta, 100% gratuita y sin compromiso.",

    // Call to Action
    cta: {
        text: "Solicitar Análisis Gratuito",
        href: "#contacto"
    },

    // Trust pills (GROW: Build trust first)
    trustPills: [
        {
            icon: "✓",
            text: "Asesoría 100% Gratuita"
        },
        {
            icon: "✓",
            text: "Sin Compromiso"
        },
        {
            icon: "✓",
            text: "Expertos Certificados"
        }
    ],

    // Hero image
    image: {
        desktop: "assets/images/hero-person.png",
        mobile: "assets/images/hero-person.png", // TODO: crear versión mobile optimizada
        alt: "Mujer sonriente mostrando documento de salud con símbolo médico"
    }
};
