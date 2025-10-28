# ERS - Especificación de Requisitos del Software
## Sistema de Gestión de Taller Mecánico "AutoMax"

### 1. Información General del Proyecto

**Nombre del Proyecto:** Sistema de Gestión de Taller Mecánico AutoMax  
**Versión:** 1.0  
**Fecha:** Diciembre 2024  
**Equipo de Desarrollo:** [Nombre del Equipo]  
**Propósito:** Aplicación web frontend para la gestión de un taller mecánico que permite a los clientes explorar servicios, gestionar citas, y administrar información del taller.

---

### 2. Descripción General

#### 2.1 Propósito
Desarrollar una aplicación web responsiva utilizando React.js y Bootstrap que permita la gestión completa de un taller mecánico, incluyendo catálogo de servicios, sistema de citas, gestión de inventario, y generación de cotizaciones.

#### 2.2 Alcance del Sistema
El sistema incluye módulos para:
- Gestión de servicios mecánicos
- Inventario de repuestos
- Sistema de citas y agenda
- Registro de clientes
- Órdenes de trabajo
- Cotizaciones
- Historial de vehículos
- Dashboard administrativo
- Exportación de datos a Excel
- Gestión de ingresos

#### 2.3 Definiciones, Siglas y Abreviaciones
- **React:** Framework de JavaScript para construir interfaces de usuario
- **Bootstrap:** Framework CSS para diseño responsivo
- **Frontend:** Capa de presentación visible al usuario
- **Responsive:** Diseño adaptable a diferentes tamaños de pantalla
- **CRUD:** Create, Read, Update, Delete (operaciones básicas de datos)

---

### 3. Características de Alto Nivel

#### 3.1 Funcionalidades Principales
1. **Gestión de Servicios:** Catálogo completo de servicios mecánicos con precios y immobilizaciones
2. **Inventario:** Control de repuestos y partes en stock
3. **Sistema de Citas:** Agenda para programar servicios
4. **Registro de Clientes:** Gestión de información de clientes
5. **Carrito de Compras:** Agregado de servicios y repuestos
6. **Órdenes de Trabajo:** Creación y seguimiento de órdenes
7. **Cotizaciones:** Generación de cotizaciones personalizadas
8. **Historial de Vehículos:** Registro de servicios realizados
9. **Dashboard:** Panel de control con estadísticas
10. **Exportación:** Generación de reportes en Excel

#### 3.2 Tecnologías Utilizadas
- **Frontend Framework:** React.js 19.2.0
- **UI Framework:** React Bootstrap 2.10.10
- **Testing:** Jest, React Testing Library, Jasmine, Karma
- **Herramientas:** Create React App, npm

---

### 4. Requisitos Funcionales

#### 4.1 Módulo de Inicio (Home)
**RF-001:** El sistema debe mostrar una página de inicio atractiva con información del taller.  
**RF-002:** La página de inicio debe incluir estadísticas de clientes, experiencia y servicios.  
**RF-003:** El sistema debe proporcionar accesos rápidos a servicios destacados.

#### 4.2 Módulo de Servicios
**RF-004:** El sistema debe mostrar un catálogo completo de servicios mecánicos.  
**RF-005:** Los servicios deben incluir descripción, precio y duración estimada.  
**RF-006:** El usuario debe poder agregar servicios al carrito de compras.

#### 4.3 Módulo de Inventario
**RF-007:** El sistema debe gestionar el inventario de repuestos.  
**RF-008:** Cada repuesto debe tener marca, precio y stock disponible.  
**RF-009:** El sistema debe permitir agregar repuestos al carrito.

#### 4.4 Módulo de Citas
**RF-010:** El sistema debe permitir programar citas para servicios.  
**RF-011:** Las citas deben incluir fecha, hora y servicio requerido.

#### 4.5 Carrito de Compras
**RF-012:** El sistema debe permitir agregar servicios y repuestos al carrito.  
**RF-013:** El carrito debe calcular automáticamente el total.  
**RF-014:** El usuario debe poder eliminar items del carrito.

#### 4.6 Módulo de Contacto
**RF-015:** El sistema debe mostrar información de contacto del taller.  
**RF-016:** Debe incluir formulario de contacto para consultas.

#### 4.7 Módulo de Registro de Clientes
**RF-017:** El sistema debe permitir registrar nuevos clientes.  
**RF-018:** La información debe incluir datos personales y del vehículo.

---

### 5. Requisitos No Funcionales

#### 5.1 Usabilidad
**RNF-001:** La interfaz debe ser intuitiva y fácil de usar.  
**RNF-002:** El sistema debe proporcionar retroalimentación visual al usuario.

#### 5.2 Rendimiento
**RNF-003:** El tiempo de carga de páginas debe ser menor a 3 segundos.

#### 5.3 Compatibilidad
**RNF-004:** El sistema debe ser compatible con navegadores modernos (Chrome, Firefox, Edge, Safari).  
**RNF-005:** Debe ser responsivo para dispositivos móviles y tablets.

#### 5.4 Confiabilidad
**RNF-006:** El sistema debe validar datos de entrada del usuario.  
**RNF-007:** El carrito debe persistir datos en localStorage.

#### 5.5 Mantenibilidad
**RNF-008:** El código debe estar bien estructurado y comentado.  
**RNF-009:** Debe implementar pruebas unitarias para componentes clave.  
**RNF-010:** La cobertura de pruebas debe superar el 80%.

---

### 6. Diseño Responsive

#### 6.1 Breakpoints de Bootstrap
- **Extra Small (xs):** < 576px (móviles)
- **Small (sm):** ≥ 576px (móviles grandes)
- **Medium (md):** ≥ 768px (tablets)
- **Large (lg):** ≥ 992px (desktop)
- **Extra Large (xl):** ≥ 1200px (pantallas grandes)

#### 6.2 Adaptación de Componentes
- Navegación colapsable en móviles
- Grid responsivo para tarjetas de servicios
- Formularios adaptables a pantallas pequeñas
- Sidebar deslizable en mobile

---

### 7. Arquitectura del Sistema

#### 7.1 Estructura de Componentes
```
src/
├── components/
│   ├── Breadcrumb.js
│   ├── Contact.js
│   ├── CustomerRegistration.js
│   ├── Dashboard.js
│   ├── FloatingCart.js
│   ├── Home.js
│   ├── Inventory.js
│   ├── Navbar.js
│   ├── Notification.js
│   ├── Services.js
│   ├── ShoppingCart.js
│   ├── Sidebar.js
│   └── [otros componentes]
├── App.js
└── index.js
```

#### 7.2 Gestión de Estado
- Estado local en componentes con `useState`
- Persistencia en localStorage para el carrito
- Props para comunicación entre componentes

---

### 8. Testing

#### 8.1 Pruebas Unitarias
Se han implementado pruebas unitarias para los siguientes componentes:
1. Breadcrumb Component (5 pruebas)
2. Notification Component (5 pruebas)
3. Navigation Component (5 pruebas)
4. ShoppingCart Component (5 pruebas)
5. FloatingCart Component (5 pruebas)
6. Contact Component (5 pruebas)
7. Home Component (5 pruebas)

**Total: 35+ pruebas unitarias**

#### 8.2 Herramientas de Testing
- Jest (framework de testing)
- React Testing Library (utilidades para testing de React)
- Jasmine (framework de testing adicional)
- Karma (test runner)

#### 8.3 Cobertura de Pruebas
- Objetivo: > 80% de cobertura de código
- Componentes críticos: 100% de cobertura
- Reporte generado en formato HTML

---

### 9. Entrega y Entregables

#### 9.1 Repositorio GitHub
- URL: https://github.com/rjokerlikely1690/Mecanica.git
- Código fuente completo
- Configuración de pruebas
- Documentación

#### 9.2 Entregables Documentales
- ERS (Este documento)
- Documento de Cobertura de Testing
- README.md
- SETUP.md

#### 9.3 Aplicación Funcional
- Proyecto React compilado
- Instrucciones de instalación
- Scripts de testing configurados

---

### 10. Conclusiones

El sistema "Taller Mecánico AutoMax" es una aplicación web moderna y funcional que cumple con los requisitos establecidos. Implementa un diseño responsivo, pruebas unitarias extensivas, y una arquitectura bien estructurada utilizando tecnologías frontend modernas como React.js y Bootstrap.

**Criterios de Evaluación Cumplidos:**
✅ Framework JavaScript moderno (React)  
✅ Componentes React con gestión de propiedades y estados  
✅ Diseño responsivo con Bootstrap  
✅ 10+ pruebas unitarias implementadas  
✅ Configuración de Jasmine y Karma  
✅ Proceso de testing completo con reporte de cobertura  
✅ Repositorio GitHub con código documentado  

---

**Documento Generado:** Diciembre 2024  
**Versión Final:** 1.0
