# 🔧 AutoMax - Taller Mecánico Website

Una aplicación web moderna y responsiva para un taller mecánico construida con React y Bootstrap.

## 🚀 Características

### 📱 Diseño Responsivo
- Completamente adaptado para móviles, tablets y escritorio
- Utiliza Bootstrap 5 para un diseño moderno y profesional
- Navegación intuitiva con menú colapsable

### 🛠️ Componentes Principales

#### 1. **Navegación (Navbar)**
- Menú responsive con logo del taller
- Navegación entre secciones
- Enlaces a registro y contacto

#### 2. **Página de Inicio (Home)**
- Sección hero atractiva
- Estadísticas del taller
- Características destacadas
- Llamadas a la acción

#### 3. **Servicios (Services)**
- Catálogo completo de servicios mecánicos
- Precios y duración de cada servicio
- Modal para solicitar servicios
- Formulario de contacto integrado

#### 4. **Inventario (Inventory)**
- Gestión de repuestos y accesorios
- Filtros por categoría
- Búsqueda de productos
- Control de stock

#### 5. **Citas (Appointments)**
- Sistema de gestión de citas
- Formulario para nuevas citas
- Tabla de citas existentes
- Estados de citas (Confirmada, Pendiente, Completada)

#### 6. **Registro de Clientes (CustomerRegistration)**
- Formulario completo de registro
- Información del vehículo
- Contacto de emergencia
- Validación de datos

#### 7. **Contacto (Contact)**
- Formulario de contacto
- Información del taller
- Mapa y ubicación
- Horarios de atención

## 🛠️ Tecnologías Utilizadas

- **React 18** - Biblioteca de JavaScript para interfaces de usuario
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **React Bootstrap** - Componentes Bootstrap para React
- **CSS3** - Estilos personalizados
- **JavaScript ES6+** - Funcionalidades interactivas

## 📋 Requisitos del Sistema

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

## 🚀 Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [url-del-repositorio]
   cd mecanica-website
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Instalar Bootstrap y React Bootstrap:**
   ```bash
   npm install react-bootstrap bootstrap
   ```

4. **Ejecutar la aplicación:**
   ```bash
   npm start
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
mecanica-website/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── Navbar.js          # Navegación principal
│   │   ├── Home.js            # Página de inicio
│   │   ├── Services.js        # Servicios mecánicos
│   │   ├── Inventory.js       # Inventario de repuestos
│   │   ├── Appointments.js    # Sistema de citas
│   │   ├── CustomerRegistration.js # Registro de clientes
│   │   └── Contact.js         # Información de contacto
│   ├── App.js                 # Componente principal
│   ├── App.css               # Estilos personalizados
│   ├── index.js              # Punto de entrada
│   └── index.css             # Estilos globales
├── package.json
└── README.md
```

## 🎨 Características de Diseño

### Paleta de Colores
- **Azul Principal:** #007bff (Bootstrap primary)
- **Azul Oscuro:** #0056b3 (Hover states)
- **Gris Claro:** #f8f9fa (Background)
- **Blanco:** #ffffff (Cards y contenido)

### Tipografía
- **Fuente Principal:** Bootstrap default (system fonts)
- **Tamaños:** Responsive typography
- **Pesos:** Regular (400), Semi-bold (600), Bold (700)

### Componentes
- **Cards:** Bordes redondeados, sombras sutiles
- **Botones:** Estados hover y focus
- **Formularios:** Validación visual
- **Modales:** Overlay y animaciones

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Tablet:** 768px - 991px
- **Desktop:** > 992px

### Adaptaciones Móviles
- Menú colapsable
- Cards apiladas
- Botones de tamaño táctil
- Texto optimizado para lectura

## 🔧 Funcionalidades JavaScript

### Estado de la Aplicación
- Gestión de secciones activas
- Formularios con validación
- Modales interactivos
- Filtros y búsquedas

### Interactividad
- Navegación entre secciones
- Formularios dinámicos
- Filtros de inventario
- Gestión de citas

## 🚀 Despliegue

### Para Producción
```bash
npm run build
```

### En AWS EC2 (según documentación)
1. Configurar servidor EC2
2. Instalar Node.js y npm
3. Clonar repositorio
4. Instalar dependencias
5. Ejecutar `npm start` con puerto 3000

## 📞 Contacto del Taller

- **Nombre:** Taller Mecánico AutoMax
- **Dirección:** Carrera 15 # 45-67, Centro, Bogotá
- **Teléfono:** (601) 234-5678
- **Email:** info@automax.com
- **Horarios:** Lunes a Viernes 8:00 AM - 6:00 PM

## 📝 Notas de Desarrollo

Este proyecto fue desarrollado siguiendo las mejores prácticas de:
- **HTML5** semántico
- **CSS3** moderno con Flexbox y Grid
- **JavaScript ES6+** con React Hooks
- **Bootstrap 5** para diseño responsivo
- **React Bootstrap** para componentes

## 🔮 Futuras Mejoras

- [ ] Integración con base de datos
- [ ] Sistema de autenticación
- [ ] Panel de administración
- [ ] Notificaciones en tiempo real
- [ ] Integración con sistemas de pago
- [ ] App móvil nativa

---

**Desarrollado con ❤️ para el Taller Mecánico AutoMax**