/**
 * Constantes de Servicios del Taller
 * Centraliza la información de todos los servicios disponibles
 */

export const SERVICES = [
  {
    id: 1,
    title: "Cambio de Aceite",
    description: "Cambio completo de aceite y filtros para mantener el motor en óptimas condiciones.",
    price: 25000,
    duration: "30 min",
    icon: "fas fa-droplet",
    displayPrice: "$25.000",
    image: "https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=600&q=80",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    category: "mantenimiento"
  },
  {
    id: 2,
    title: "Revisión Técnica",
    description: "Inspección completa del vehículo para detectar problemas y mantener la seguridad.",
    price: 45000,
    duration: "1 hora",
    icon: "fas fa-magnifying-glass",
    displayPrice: "$45.000",
    image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    category: "diagnostico"
  },
  {
    id: 3,
    title: "Frenos",
    description: "Revisión y reparación del sistema de frenos para garantizar la seguridad.",
    price: 80000,
    duration: "2 horas",
    icon: "fas fa-circle-stop",
    displayPrice: "$80.000",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80",
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    category: "reparacion"
  },
  {
    id: 4,
    title: "Motor",
    description: "Diagnóstico y reparación de problemas del motor y sistemas relacionados.",
    price: 120000,
    duration: "Variable",
    icon: "fas fa-gear",
    displayPrice: "Desde $120.000",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    category: "reparacion"
  },
  {
    id: 5,
    title: "Suspensión",
    description: "Revisión y reparación del sistema de suspensión para una conducción suave.",
    price: 90000,
    duration: "1.5 horas",
    icon: "fas fa-car-side",
    displayPrice: "$90.000",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80",
    gradient: "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
    category: "reparacion"
  },
  {
    id: 6,
    title: "Aire Acondicionado",
    description: "Mantenimiento y reparación del sistema de aire acondicionado.",
    price: 60000,
    duration: "1 hora",
    icon: "fas fa-wind",
    displayPrice: "$60.000",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    category: "mantenimiento"
  }
];

/**
 * Obtener servicio por ID
 */
export const getServiceById = (id) => {
  return SERVICES.find(service => service.id === id);
};

/**
 * Obtener servicios por categoría
 */
export const getServicesByCategory = (category) => {
  return SERVICES.filter(service => service.category === category);
};

/**
 * Categorías de servicios
 */
export const SERVICE_CATEGORIES = {
  MANTENIMIENTO: 'mantenimiento',
  DIAGNOSTICO: 'diagnostico',
  REPARACION: 'reparacion'
};

