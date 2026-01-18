// =================================== 
// Datos para el Selector de Perfiles

export const perfilesData = [
    {
        id: "joven",
        label: "Joven Profesional",
        shortLabel: "Joven",
        icon: "fa-rocket",
        tagline: "El Despegue",
        badgeText: "MAX RENTABILIDAD",
        theme: "blue", /* New theme property */
        validation: {
            title: "Paga lo justo y evita sobrecostos en tu plan.",
            description: "<em>Eres sano y tu 7% es oro. No lo desperdicies en coberturas que no usarás.</em><br><br>Tu estrategia: Plan ajustado a tu 7% y foco en consultas y urgencias.",
            bullets: [
                "Tu 7% cubre el costo mensual del plan.",
                "No quieres pagar por coberturas que no usas.",
                "Tu foco es consultas, exámenes y urgencias."
            ],
            trustBadge: "<strong>+1.200 diagnósticos realizados.</strong> Ejecutivos certificados por la Superintendencia.", /* Quantified Proof */
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
            tag: "Tu 7% Legal", /* Reverted to short punchy version */
            tagClass: "tag-popular",
            price: "2.64 UF",
            priceCLP: "$105.600",
            keyCoverage: "Plan Recomendado", /* Updated from Plan Cerrado */
            // Removed cardSubtitle (redundant)
            // Removed savings (unverifiable claim)
            // NEW: Structured Data for Dense Card Grid
            denseMetrics: [
                { icon: "fa-hospital", label: "Hospitalario", value: "50%", sub: "Clínica Privada" },
                { icon: "fa-user-md", label: "Ambulatorio", value: "70%", sub: "Centro Médico" },
                { icon: "fa-ambulance", label: "Urgencia", value: "0.90 UF", sub: "Copago Fijo" },
                { icon: "fa-file-invoice-dollar", label: "Tope General", value: "1.500 UF", sub: "Por Beneficiario" }
            ],
            ctaText: "Ver recomendación", /* Updated from Ver más */
            ctaSub: "Te contactamos por WhatsApp en menos de 5 min.", /* New Field */
            // NEW: Fonasa Comparison Data (Versus Mode)
            fonasaComparison: [
                { icon: "fa-bed", label: "Día Cama", fonasa: "Alto Costo ($250k+)", plan: "90% Cubierto" },
                { icon: "fa-clock", label: "Lista Espera", fonasa: "1 a 3 Años", plan: "Inmediata (0 días)" },
                { icon: "fa-ambulance", label: "Urgencia", fonasa: "Variable ($50k+)", plan: "0.90 UF Fijo" },
                { icon: "fa-hospital", label: "Hospitalario", fonasa: "Cobertura Baja", plan: "90% Sin Tope" },
                { icon: "fa-shield-alt", label: "Tope Deuda", fonasa: "1.500 UF (Blindado)", plan: "1.500 UF (Blindado)" }
            ]
        }
    },
    {
        id: "maternidad",
        label: "Planificación Maternal",
        shortLabel: "Maternidad",
        icon: "fa-baby-carriage",
        tagline: "Futura Mamá",
        badgeText: "BLINDAJE TOTAL",
        theme: "purple", /* New theme property */
        validation: {
            title: "Cero sorpresas en el parto.",
            description: "<em>Un parto sin cobertura adecuada puede costar millones.</em><br><br>Tu estrategia: Cobertura al 100% y acceso a las mejores clínicas sin sorpresas.",
            bullets: [
                "Embarazo en 12-24 meses.",
                "Valor parto conocido hoy.",
                "Cobertura R.N. desde día 1."
            ]
        },
        recommendedPlan: {
            tag: "MATERNIDAD SEGURA",
            tagClass: "tag-maternity",
            price: "3.50 UF",
            priceCLP: "$134.750",
            keyCoverage: "Parto Costo Cero",
            benefits: [
                "Parto Integral",
                "Sin topes días cama",
                "Neonatología Cubierta"
            ],
            ctaText: "Ver más"
        }
    },
    {
        id: "familia",
        recommended: true, /* Trigger 'featured' class */
        label: "Núcleo Familiar",
        shortLabel: "Familia",
        icon: "fa-users",
        tagline: "Con Hijos",
        badgeText: "URGENCIA RÁPIDA",
        theme: "green", /* New theme property */
        validation: {
            title: "Escudo Familiar: Urgencias $0.",
            description: "<em>Con hijos, la velocidad es vital.</em><br><br>Tu estrategia: Reducción de burocracia, urgencias preferentes y pediatría de alto nivel.",
            bullets: [
                "Hijos pequeños o escolares.",
                "Urgencia preferente ($0).",
                "Clínicas cercanas a casa."
            ]
        },
        recommendedPlan: {
            tag: "PROTECCIÓN TOTAL",
            tagClass: "tag-family",
            price: "4.50 UF",
            priceCLP: "$173.250",
            keyCoverage: "Plan Familiar",
            benefits: [
                "Urgencia Escolar",
                "Alta Cobertura Pediátrica",
                "Red UC / Alemana"
            ],
            ctaText: "Ver más"
        }
    },
    {
        id: "compensado",
        label: "Compensación de Pareja",
        shortLabel: "Compensado",
        icon: "fa-heart",
        tagline: "Compensados",
        badgeText: "ACCESO VIP",
        theme: "red", /* New theme property */
        validation: {
            title: "Unan fuerzas y beneficios.",
            description: "<em>Al unir cotizaciones, el poder de compra se multiplica.</em><br><br>Tu estrategia: Acceder a un Plan Premium que sería impagable individualmente.",
            bullets: [
                "Casados o Acuerdo Unión Civil.",
                "Rentas dispares (uno gana +).",
                "Atención en misma clínica."
            ]
        },
        recommendedPlan: {
            tag: "EFICIENCIA FAMILIAR",
            tagClass: "tag-couple",
            price: "5.80 UF",
            priceCLP: "$223.300",
            keyCoverage: "Plan Optimizado",
            benefits: [
                "Acceso a Clínicas VIP",
                "Sin pago adicional (solo 7%)",
                "Protección desempleo"
            ],
            ctaText: "Ver más"
        }
    },
    {
        id: "freelance",
        label: "Freelance / Independiente",
        shortLabel: "Freelance",
        icon: "fa-briefcase",
        tagline: "Con Boleta",
        badgeText: "INGRESOS SEGUROS",
        theme: "yellow", /* New theme property */
        validation: {
            title: "Tu salud, tu respaldo.",
            description: "<em>Si te enfermas, no facturas.</em><br><br>Tu estrategia: Asegurar el pago íntegro de licencias médicas y flexibilidad ante ingresos variables.",
            bullets: [
                "Eres independiente / boleteas.",
                "Pago ágil licencias médicas.",
                "Valor flexible según renta."
            ]
        },
        recommendedPlan: {
            tag: "TU 7% EXACTO",
            tagClass: "tag-popular",
            price: "2.20 UF",
            priceCLP: "$84.700",
            keyCoverage: "Libre Elección",
            benefits: [
                "Licencia Digital",
                "Cobertura Dental",
                "Ajustable por Renta"
            ],
            ctaText: "Ver más"
        }
    },
    {
        id: "voluntario",
        label: "Voluntario / Estudiante",
        shortLabel: "Voluntario",
        icon: "fa-hand-holding-heart",
        tagline: "Sin Contrato",
        badgeText: "CONTROL TOTAL",
        theme: "brown", /* New theme property */
        validation: {
            title: "Salud privada sin jefe.",
            description: "<em>Ideal para dueños de casa, jubilados o estudiantes.</em><br><br>Tu estrategia: Sin intermediarios, pagando directamente para mantener tu cobertura activa.",
            bullets: [
                "Sin liquidaciones ni boletas.",
                "Ingresos pasivos o terceros.",
                "Salir de FONASA."
            ]
        },
        recommendedPlan: {
            tag: "ACCESO DIRECTO",
            tagClass: "tag-voluntary",
            price: "1.80 UF",
            priceCLP: "$69.300",
            keyCoverage: "Pago Directo",
            benefits: [
                "Sin requisito empleador",
                "Hospitalario Fuerte",
                "Acreditación simple"
            ],
            ctaText: "Ver más"
        }
    }
];
