# 🔧 AutoMax - Sistema de Gestión de Taller Mecánico

![AutoMax Logo](https://img.shields.io/badge/AutoMax-Taller%20Mecánico-blue?style=for-the-badge&logo=wrench)
![React](https://img.shields.io/badge/React-18.2.0-blue?style=flat-square&logo=react)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.0-purple?style=flat-square&logo=bootstrap)
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-6.4.0-orange?style=flat-square&logo=font-awesome)

## 📋 Descripción

**AutoMax** es un sistema integral de gestión diseñado específicamente para talleres mecánicos. Proporciona una solución completa para administrar todos los aspectos del negocio, desde la gestión de servicios y inventario hasta el control de ingresos y generación de cotizaciones.

## ✨ Características Principales

### 🏠 **Dashboard Principal**
- Vista general del negocio
- Estadísticas en tiempo real
- Acceso rápido a funciones principales

### 🔧 **Gestión de Servicios**
- Catálogo completo de servicios
- Tipos de servicio personalizables
- Gestión de precios y duración
- Sistema de categorización

### 🚗 **Gestión de Vehículos**
- Tipos de vehículos configurables
- Marcas y modelos
- Historial de servicios por vehículo
- Especificaciones técnicas

### 👨‍🔧 **Gestión de Personal**
- Registro de mecánicos
- Especialidades y experiencia
- Tarifas por hora
- Control de disponibilidad

### 📦 **Inventario y Repuestos**
- Control de stock
- Gestión de proveedores
- Alertas de inventario bajo
- Sistema de códigos

### 💰 **Sistema Financiero**
- Reportes de ingresos
- Análisis de rentabilidad
- Control de costos (mano de obra vs repuestos)
- Exportación a Excel

### 📋 **Cotizaciones**
- Generación de cotizaciones profesionales
- Múltiples servicios por cotización
- Control de validez
- Estados: Pendiente, Aprobada, Rechazada, Vencida

### 🛒 **Carrito de Compras**
- Sistema unificado de carrito
- Agregar servicios y repuestos
- Persistencia en localStorage
- Integración con sistema de citas

### 📊 **Reportes y Análisis**
- Exportación a múltiples formatos (Excel, CSV, PDF)
- Filtros avanzados por fecha y tipo
- Estadísticas de rendimiento
- Análisis de tendencias

## 🚀 Tecnologías Utilizadas

- **Frontend**: React 18.2.0
- **UI Framework**: React Bootstrap 5.3.0
- **Iconos**: Font Awesome 6.4.0
- **Estilos**: CSS3 con variables personalizadas
- **Almacenamiento**: LocalStorage
- **Gestión de Estado**: React Hooks (useState)

## 📦 Instalación

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/rjokerlikely1690/Mecanica.git
   cd Mecanica/mecanica-website
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar el proyecto**
   ```bash
   npm start
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 🏗️ Estructura del Proyecto

```
mecanica-website/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Appointments.js      # Gestión de citas
│   │   ├── Brands.js           # Gestión de marcas
│   │   ├── Breadcrumb.js       # Navegación breadcrumb
│   │   ├── Contact.js          # Información de contacto
│   │   ├── CustomerRegistration.js # Registro de clientes
│   │   ├── Dashboard.js        # Panel principal
│   │   ├── ExportExcel.js      # Exportación de datos
│   │   ├── FloatingCart.js     # Carrito flotante
│   │   ├── Home.js             # Página de inicio
│   │   ├── Income.js           # Reportes de ingresos
│   │   ├── Inventory.js        # Gestión de inventario
│   │   ├── Mechanics.js        # Gestión de mecánicos
│   │   ├── Navbar.js           # Barra de navegación
│   │   ├── Notification.js     # Sistema de notificaciones
│   │   ├── Quotes.js           # Gestión de cotizaciones
│   │   ├── ServiceTypes.js     # Tipos de servicio
│   │   ├── Services.js         # Servicios disponibles
│   │   ├── ShoppingCart.js     # Carrito de compras
│   │   ├── Sidebar.js          # Barra lateral
│   │   ├── VehicleHistory.js   # Historial de vehículos
│   │   ├── VehicleTypes.js     # Tipos de vehículos
│   │   └── WorkOrders.js       # Órdenes de trabajo
│   ├── App.js                  # Componente principal
│   ├── App.css                 # Estilos principales
│   ├── index.js                # Punto de entrada
│   └── index.css               # Estilos globales
├── package.json
├── package-lock.json
└── README.md
```

## 🎯 Funcionalidades por Módulo

### 🔧 Tipos de Servicio
- ✅ CRUD completo (Crear, Leer, Actualizar, Eliminar)
- ✅ Categorización por tipo
- ✅ Gestión de precios y duración
- ✅ Control de estado (Activo/Inactivo)

### 🚗 Tipos de Vehículos
- ✅ Configuración de especificaciones
- ✅ Iconos personalizados
- ✅ Categorización por peso
- ✅ Gestión de capacidades

### 🏷️ Marcas
- ✅ Registro de marcas automotrices
- ✅ Información de país de origen
- ✅ Asociación con tipos de vehículos
- ✅ Control de estado

### 👨‍🔧 Mecánicos
- ✅ Registro completo del personal
- ✅ Especialidades técnicas
- ✅ Control de experiencia y tarifas
- ✅ Estadísticas del personal

### 💰 Reportes de Ingresos
- ✅ Análisis financiero completo
- ✅ Filtros por fecha y tipo
- ✅ Separación de costos (mano de obra vs repuestos)
- ✅ Exportación de datos

### 📊 Exportación de Datos
- ✅ Múltiples formatos (Excel, CSV, PDF)
- ✅ Filtros personalizables
- ✅ Vista previa antes de exportar
- ✅ Estadísticas de uso

### 📋 Cotizaciones
- ✅ Generación profesional
- ✅ Múltiples servicios
- ✅ Control de validez
- ✅ Estados de seguimiento

## 🎨 Características de Diseño

- **Diseño Responsive**: Optimizado para móviles, tablets y desktop
- **Iconos Profesionales**: Font Awesome para una apariencia corporativa
- **Paleta de Colores**: Azul corporativo con acentos profesionales
- **Tipografía**: Inter font para mejor legibilidad
- **Animaciones**: Transiciones suaves y efectos hover
- **Navegación**: Sidebar deslizable y breadcrumbs

## 📱 Responsive Design

El sistema está completamente optimizado para:
- 📱 **Móviles** (320px+)
- 📱 **Tablets** (768px+)
- 💻 **Desktop** (1024px+)
- 🖥️ **Pantallas grandes** (1200px+)

## 🔒 Características de Seguridad

- Validación de formularios
- Sanitización de datos de entrada
- Control de estados de componentes
- Persistencia segura en localStorage

## 🚀 Próximas Características

- [ ] Autenticación de usuarios
- [ ] Base de datos backend
- [ ] Sistema de roles y permisos
- [ ] Notificaciones push
- [ ] Integración con sistemas de pago
- [ ] App móvil (React Native)
- [ ] Dashboard con gráficos avanzados
- [ ] Sistema de backup automático

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**rjokerlikely1690**
- GitHub: [@rjokerlikely1690](https://github.com/rjokerlikely1690)

## 📞 Soporte

Si tienes alguna pregunta o necesitas soporte, puedes:
- Abrir un [Issue](https://github.com/rjokerlikely1690/Mecanica/issues)
- Contactar por email
- Revisar la documentación

## 🙏 Agradecimientos

- React Bootstrap por el framework UI
- Font Awesome por los iconos
- La comunidad de React por el soporte

---

⭐ **¡Si este proyecto te resulta útil, no olvides darle una estrella!** ⭐