// =================================== 
// Datos para el Selector de Perfiles (Advisor 2.0)
// ===================================

export const planesData = [
    {
        id: "joven",
        label: "Joven",
        icon: "fa-rocket",
        tagline: "El Despegue",
        validation: {
            title: "Tu 7% ya no genera excedentes. Úsalo bien.",
            description: "Eres joven y sano. Como la ley eliminó los excedentes, tu meta es un plan que cueste exactamente tu 7% y te cubra donde realmente vas.",
            bullets: [
                "Tu plan calza con tu 7% legal.",
                "Sin pagar de más por coberturas que no usas.",
                "Foco: Consultas, Exámenes y Accidentes."
            ],
            extraBenefits: [
                {
                    id: "dental",
                    icon: "fa-tooth",
                    label: "Dental",
                    text: "Accede a 60% de cobertura inmediata en toda la red Integramédica. Incluye prestaciones de ortodoncia, limpieza dental profunda y urgencias sin tope anual."
                },
                {
                    id: "telemed",
                    icon: "fa-mobile-alt",
                    label: "Telemedicina",
                    text: "Atención médica ilimitada 24/7 a través de videollamada. Resuelve dudas generales y obtén recetas o licencias simples sin moverte de casa (Copago $0)."
                },
                {
                    id: "pharma",
                    icon: "fa-pills",
                    label: "Farmacia",
                    text: "Descuentos exclusivos en Farmacias Salcobrand. Hasta 40% en medicamentos genéricos y 20% en marcas seleccionadas, presentando tu rut en caja."
                }
            ]
        },
        recommendedPlan: {
            tag: "TU 7% EXACTO",
            tagClass: "tag-popular",
            name: "Cruz Blanca - Campus Bupa",
            isapreLogo: "assets/logos_isapre/cruzblanca.png",
            price: "2.64 UF",
            priceCLP: "$105.600",
            keyCoverage: "Plan Cerrado Inteligente",
            // NEW: Structured Data for Dense Card Grid
            denseMetrics: [
                { icon: "fa-hospital", label: "Hospitalario", value: "90%", sub: "Clínica Bupa" },
                { icon: "fa-user-md", label: "Ambulatorio", value: "80%", sub: "Integramédica" },
                { icon: "fa-ambulance", label: "Urgencia", value: "0.90 UF", sub: "Copago Fijo" },
                { icon: "fa-file-invoice-dollar", label: "Tope General", value: "1.500 UF", sub: "Por Beneficiario" }
            ],
            ctaText: "Solicitar este Plan",
            // NEW: Fonasa Comparison Data (Versus Mode)
            fonasaComparison: [
                { icon: "fa-bed", label: "Día Cama", fonasa: "Alto Costo ($250k+)", plan: "90% Cubierto" },
                { icon: "fa-clock", label: "Lista Espera", fonasa: "1 a 3 Años", plan: "Inmediata (0 días)" },
                { icon: "fa-ambulance", label: "Urgencia", fonasa: "Variable ($50k+)", plan: "0.90 UF Fijo" },
                { icon: "fa-hospital", label: "Hospitalario", fonasa: "Cobertura Baja", plan: "90% Sin Tope" },
                { icon: "fa-shield-alt", label: "Tope Deuda", fonasa: "Sin Límite (Riesgo)", plan: "1.500 UF (Blindado)" }
            ]
        }
    },
    {
        id: "maternidad",
        label: "Maternidad",
        icon: "fa-baby-carriage",
        tagline: "Futura Mamá",
        validation: {
            title: "Cero sorpresas en el parto.",
            description: "El parto es un evento financiero mayor. Esta recomendación te blinda contra facturas millonarias inesperadas.",
            bullets: [
                "Embarazo en 12-24 meses.",
                "Valor parto conocido hoy.",
                "Cobertura R.N. desde día 1."
            ]
        },
        recommendedPlan: {
            tag: "MATERNIDAD SEGURA",
            tagClass: "tag-maternity",
            name: "Mamá Full Cobertura",
            isapreLogo: "assets/logos_isapre/colmena.png",
            price: "3.50 UF",
            priceCLP: "$134.750",
            keyCoverage: "Parto Costo Cero o Libre Elección.",
            benefits: [
                "Parto Integral",
                "Sin topes días cama",
                "Neonatología Cubierta"
            ],
            ctaText: "Ver Opciones Maternales"
        }
    },
    {
        id: "familia",
        recommended: true, /* Trigger 'featured' class */
        label: "Familia",
        icon: "fa-users",
        tagline: "Con Hijos",
        validation: {
            title: "Escudo Familiar: Urgencias $0.",
            description: "Urgencias inevitables con hijos. Necesitas una Isapre que responda rápido y con cobertura pediátrica sólida.",
            bullets: [
                "Hijos pequeños o escolares.",
                "Urgencia preferente ($0).",
                "Clínicas cercanas a casa."
            ]
        },
        recommendedPlan: {
            tag: "PROTECCIÓN TOTAL",
            tagClass: "tag-family",
            name: "Familia Blindada",
            isapreLogo: "assets/logos_isapre/consalud.png",
            price: "4.50 UF",
            priceCLP: "$173.250",
            keyCoverage: "100% Hosp. Preferente + Urgencia $0.",
            benefits: [
                "Urgencia Escolar",
                "Alta Cobertura Pediátrica",
                "Red UC / Alemana"
            ],
            ctaText: "Proteger a mi Familia"
        }
    },
    {
        id: "compensado",
        label: "Compensado",
        icon: "fa-heart",
        tagline: "Compensados",
        validation: {
            title: "Unan fuerzas y beneficios.",
            description: "¿Uno gana más? Al 'compensar' (unir sus 7%), acceden a un plan Premium impagable por separado.",
            bullets: [
                "Casados o Acuerdo Unión Civil.",
                "Rentas dispares (uno gana +).",
                "Atención en misma clínica."
            ]
        },
        recommendedPlan: {
            tag: "EFICIENCIA FAMILIAR",
            tagClass: "tag-couple",
            name: "Duo Pack Compensado",
            isapreLogo: "assets/logos_isapre/banmedica.png",
            price: "5.80 UF",
            priceCLP: "$223.300",
            keyCoverage: "Subsidio cruzado para mejor plan.",
            benefits: [
                "Acceso a Clínicas VIP",
                "Sin pago adicional (solo 7%)",
                "Protección desempleo"
            ],
            ctaText: "Simular Compensación"
        }
    },
    {
        id: "independiente",
        label: "Freelance",
        icon: "fa-laptop",
        tagline: "Con Boleta",
        validation: {
            title: "Tu salud, tu respaldo.",
            description: "Si no trabajas, no facturas. Necesitas pago ágil de licencias y flexibilidad ante ingresos variables.",
            bullets: [
                "Eres independiente / boleteas.",
                "Pago ágil licencias médicas.",
                "Valor flexible según renta."
            ]
        },
        recommendedPlan: {
            tag: "TU 7% EXACTO",
            tagClass: "tag-popular",
            name: "Cruz Blanca", // Simplified
            isapreLogo: "assets/logos_isapre/cruzblanca.png",
            price: "2.20 UF",
            priceCLP: "$84.700",
            keyCoverage: "Libre Elección ágil en licencias.",
            benefits: [
                "Licencia Digital",
                "Cobertura Dental",
                "Ajustable por Renta"
            ],
            ctaText: "Ver Planes Freelance"
        }
    },
    {
        id: "voluntario",
        label: "Voluntario",
        icon: "fa-hand-holding-heart",
        tagline: "Sin Contrato",
        validation: {
            title: "Salud privada sin jefe.",
            description: "Sin contrato laboral. Estudiantes, jubilados o dueños de casa: afíliate pagando directamente.",
            bullets: [
                "Sin liquidaciones ni boletas.",
                "Ingresos pasivos o terceros.",
                "Salir de FONASA."
            ]
        },
        recommendedPlan: {
            tag: "ACCESO DIRECTO",
            tagClass: "tag-voluntary",
            name: "Protección Voluntaria",
            isapreLogo: "assets/logos_isapre/consalud.png",
            price: "1.80 UF",
            priceCLP: "$69.300",
            keyCoverage: "Planes pago fijo UF (cupón).",
            benefits: [
                "Sin requisito empleador",
                "Hospitalario Fuerte",
                "Acreditación simple"
            ],
            ctaText: "Ver Pago Directo"
        }
    }
];
