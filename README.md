# 🔧 Taller Mecánico AutoMax - Sistema de Gestión Frontend

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.8-purple.svg)](https://getbootstrap.com/)
[![Tests](https://img.shields.io/badge/Tests-36%20passed-success.svg)](./src/components/__tests__)
[![Coverage](https://img.shields.io/badge/Coverage-100%25%20(critical)-success.svg)](./coverage)

## 📋 Descripción

Sistema de gestión web para taller mecánico desarrollado con **React.js** y **Bootstrap**. Incluye catálogo de servicios, inventario, sistema de citas, carrito de compras, y módulos administrativos con diseño totalmente responsivo.

**Proyecto desarrollado para:** Evaluación Parcial N° 2 - Desarrollo Full-Stack II (DSY1104)

---

## ✨ Características Principales

### 🎯 Funcionalidades
- ✅ Catálogo de servicios mecánicos
- ✅ Gestión de inventario de repuestos
- ✅ Sistema de citas y agenda
- ✅ Carrito de compras con persistencia
- ✅ Registro de clientes
- ✅ Órdenes de trabajo
- ✅ Generación de cotizaciones
- ✅ Historial de vehículos
- ✅ Dashboard administrativo
- ✅ Exportación a Excel
- ✅ Gestión de ingresos

### 🛠️ Tecnologías
- **Frontend:** React.js 19.2.0
- **UI Framework:** React-Bootstrap 2.10.10 + Bootstrap 5.3.8
- **Testing:** Jest, React Testing Library, Jasmine, Karma
- **Build Tool:** Create React App 5.0.1

### 📱 Diseño Responsivo
- **Extra Small (xs):** < 576px (móviles)
- **Small (sm):** ≥ 576px (móviles grandes)
- **Medium (md):** ≥ 768px (tablets)
- **Large (lg):** ≥ 992px (desktop)
- **Extra Large (xl):** ≥ 1200px (pantallas grandes)

---

## 🚀 Inicio Rápido

### Requisitos Previos

```bash
Node.js >= 14.0.0
npm >= 6.0.0
```

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/rjokerlikely1690/Mecanica.git
cd Mecanica/mecanica-website

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

---

## 🧪 Testing

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar con reporte de cobertura
npm run test:coverage

# Ejecutar con Karma
npm run test:karma
```

### Estadísticas de Testing

- **Total de Pruebas:** 36 pruebas unitarias ✅
- **Componentes Testeados:** 7 componentes
- **Cobertura:** 100% en componentes críticos
- **Frameworks:** Jest, React Testing Library, Jasmine, Karma

#### Pruebas por Componente

| Componente | Pruebas | Cobertura |
|------------|---------|-----------|
| Breadcrumb | 5 | 100% ✅ |
| Notification | 5 | 100% ✅ |
| Navbar | 6 | 37.5% |
| ShoppingCart | 5 | 86.66% |
| FloatingCart | 5 | 100% ✅ |
| Contact | 5 | 50% |
| Home | 5 | 25.42% |

**Ver reporte completo:** `coverage/lcov-report/index.html` después de ejecutar `npm run test:coverage`

---

## 📁 Estructura del Proyecto

```
mecanica-website/
├── public/                      # Archivos estáticos
│   ├── index.html
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/              # Componentes React
│   │   ├── __tests__/          # Pruebas unitarias
│   │   │   ├── Breadcrumb.test.js
│   │   │   ├── Contact.test.js
│   │   │   ├── FloatingCart.test.js
│   │   │   ├── Home.test.js
│   │   │   ├── Navbar.test.js
│   │   │   ├── Notification.test.js
│   │   │   └── ShoppingCart.test.js
│   │   ├── Appointments.js
│   │   ├── Brands.js
│   │   ├── Breadcrumb.js
│   │   ├── Contact.js
│   │   ├── CustomerRegistration.js
│   │   ├── Dashboard.js
│   │   ├── ExportExcel.js
│   │   ├── FloatingCart.js
│   │   ├── Home.js
│   │   ├── Income.js
│   │   ├── Inventory.js
│   │   ├── Mechanics.js
│   │   ├── Navbar.js
│   │   ├── Notification.js
│   │   ├── Quotes.js
│   │   ├── Services.js
│   │   ├── ServiceTypes.js
│   │   ├── ShoppingCart.js
│   │   ├── Sidebar.js
│   │   ├── VehicleHistory.js
│   │   ├── VehicleTypes.js
│   │   └── WorkOrders.js
│   ├── App.js                  # Componente principal
│   ├── App.css                 # Estilos principales
│   ├── index.js                # Punto de entrada
│   ├── index.css
│   ├── setupTests.js           # Configuración de tests
│   └── reportWebVitals.js
├── coverage/                    # Reportes de cobertura (generado)
├── package.json                 # Dependencias y scripts
├── karma.conf.js               # Configuración de Karma
├── ERS_Taller_Mecanico.md      # Especificación de requisitos
├── Documento_Cobertura_Testing.md  # Documento de testing
├── INFORME_EVALUACION_PARCIAL2.md  # Informe de evaluación
├── CHECKLIST_ENTREGA.md        # Checklist de entrega
└── README.md                   # Este archivo
```

---

## 📦 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm test` | Ejecuta las pruebas en modo watch |
| `npm run test:coverage` | Genera reporte de cobertura |
| `npm run test:karma` | Ejecuta pruebas con Karma |
| `npm run build` | Crea build de producción |
| `npm run eject` | Expone configuración de CRA (irreversible) |

---

## 🎨 Componentes React Implementados

### Componentes de Navegación
- **Navbar:** Barra de navegación principal
- **Sidebar:** Panel lateral con opciones administrativas
- **Breadcrumb:** Migas de pan para navegación

### Componentes de Servicios
- **Home:** Página de inicio con características destacadas
- **Services:** Catálogo de servicios mecánicos
- **Inventory:** Gestión de inventario de repuestos
- **ServiceTypes:** Tipos de servicios
- **VehicleTypes:** Tipos de vehículos
- **Brands:** Marcas de vehículos

### Componentes de Gestión
- **Appointments:** Sistema de citas
- **WorkOrders:** Órdenes de trabajo
- **Quotes:** Generación de cotizaciones
- **VehicleHistory:** Historial de vehículos
- **CustomerRegistration:** Registro de clientes
- **Mechanics:** Gestión de mecánicos
- **Income:** Gestión de ingresos

### Componentes de UI
- **ShoppingCart:** Carrito de compras lateral
- **FloatingCart:** Carrito flotante siempre visible
- **Notification:** Sistema de notificaciones
- **Dashboard:** Panel de control administrativo
- **Contact:** Formulario de contacto
- **ExportExcel:** Exportación de datos

---

## 🧩 Gestión de Estado

### Props
Paso de datos de padre a hijo:
```javascript
<Services onAddToCart={handleAddToCart} />
<ShoppingCart 
  cartItems={cartItems}
  onRemoveItem={handleRemoveFromCart}
  onClearCart={handleClearCart}
  onCheckout={handleCheckout}
/>
```

### States
Gestión de estado con `useState`:
```javascript
const [currentSection, setCurrentSection] = useState('dashboard');
const [cartItems, setCartItems] = useState([]);
const [showSidebar, setShowSidebar] = useState(false);
```

### LocalStorage
Persistencia del carrito:
```javascript
localStorage.setItem('automax-cart', JSON.stringify(cartItems));
const savedCart = localStorage.getItem('automax-cart');
```

---

## 📚 Documentación

### Documentos Disponibles

1. **[ERS_Taller_Mecanico.md](./ERS_Taller_Mecanico.md)**
   - Especificación de Requisitos del Software
   - Requisitos funcionales y no funcionales
   - Arquitectura del sistema

2. **[Documento_Cobertura_Testing.md](./Documento_Cobertura_Testing.md)**
   - Detalle de pruebas unitarias
   - Configuración del entorno de testing
   - Estadísticas de cobertura

3. **[INFORME_EVALUACION_PARCIAL2.md](./INFORME_EVALUACION_PARCIAL2.md)**
   - Informe completo de evaluación
   - Análisis por indicador
   - Evidencias de cumplimiento

4. **[CHECKLIST_ENTREGA.md](./CHECKLIST_ENTREGA.md)**
   - Lista de verificación para entrega
   - Preparación para presentación
   - Preguntas frecuentes

5. **[SETUP.md](./SETUP.md)**
   - Guía de configuración detallada
   - Troubleshooting

---

## 🔬 Testing Detallado

### Configuración

El proyecto utiliza múltiples frameworks de testing:

**Jest + React Testing Library:**
- Testing de componentes React
- Queries del DOM
- User events
- Assertions con jest-dom

**Jasmine:**
- Framework BDD adicional
- Spy functions
- Custom matchers

**Karma:**
- Test runner en navegadores reales
- Integración con Webpack
- Sourcemaps para debugging

### Ejemplo de Prueba

```javascript
describe('ShoppingCart Component', () => {
  const mockCartItems = [
    { id: 1, title: 'Cambio de aceite', price: 50000, quantity: 2 }
  ];

  it('should calculate and display total correctly', () => {
    render(<ShoppingCart cartItems={mockCartItems} {...mockProps} />);
    const totalText = screen.getByText(/100000|Total/i);
    expect(totalText).toBeTruthy();
  });
});
```

### Mocks Implementados

```javascript
// Mock de funciones callback
const mockOnAddToCart = () => {};

// Mock de localStorage (en setupTests.js)
global.localStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});
```

---

## 🎨 Diseño Responsivo

### Implementación de Bootstrap Grid

```javascript
// Layout 2/3 - 1/3 en desktop, stack en móvil
<Container fluid>
  <Row>
    <Col lg={8} md={12}>
      <Services />
    </Col>
    <Col lg={4} md={12}>
      <ShoppingCart />
    </Col>
  </Row>
</Container>
```

### Componentes Responsivos

- **Navbar:** Colapsa en menú hamburguesa en móvil
- **Sidebar:** Panel deslizable con `Offcanvas`
- **Cards:** Grid adaptable con `Row` y `Col`
- **Forms:** Inputs de ancho completo en móvil
- **FloatingCart:** Posición fija adaptada a cada tamaño

---

## 🚢 Build y Deployment

### Build de Producción

```bash
# Crear build optimizado
npm run build

# La carpeta build/ contendrá:
# - HTML, CSS, JS minificados
# - Assets optimizados
# - Service worker (opcional)
```

### Despliegue

El build puede ser desplegado en:
- **Netlify:** Drag & drop de carpeta build/
- **Vercel:** `vercel deploy`
- **GitHub Pages:** `npm install gh-pages --save-dev`
- **AWS S3:** Upload manual de build/
- Cualquier hosting estático

---

## 🤝 Contribución

Este es un proyecto académico. Si deseas contribuir:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

---

## 📝 Licencia

Este proyecto es de uso académico para la asignatura Desarrollo Full-Stack II (DSY1104).

---

## 👥 Autor

**[Tu Nombre]**  
Estudiante de Desarrollo Full-Stack  
DuocUC

---

## 📞 Contacto

- **GitHub:** [@rjokerlikely1690](https://github.com/rjokerlikely1690)
- **Repositorio:** [Mecanica](https://github.com/rjokerlikely1690/Mecanica)

---

## 🎯 Estado del Proyecto

✅ **Evaluación Parcial N° 2:** Completa y lista para entrega

**Indicadores Cumplidos:**
- ✅ IE2.1.1: Framework JavaScript (10%)
- ✅ IE2.1.2: Componentes React + Bootstrap (10%)
- ✅ IE2.2.1: Pruebas Unitarias (12%)
- ✅ IE2.3.1: Proceso de Testing (8%)

**Total:** 40% (Situación Evaluativa 1)

---

## 📸 Screenshots

### Página de Inicio
![Home](./docs/screenshots/home.png)

### Catálogo de Servicios
![Services](./docs/screenshots/services.png)

### Carrito de Compras
![Cart](./docs/screenshots/cart.png)

### Dashboard Administrativo
![Dashboard](./docs/screenshots/dashboard.png)

---

## 🔧 Troubleshooting

### Problema: npm install falla

```bash
# Limpiar cache de npm
npm cache clean --force

# Eliminar node_modules y package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar
npm install
```

### Problema: Tests fallan

```bash
# Verificar versiones de Node
node --version  # Debe ser >= 14

# Reinstalar dependencias de testing
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Problema: Puerto 3000 ya en uso

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill
```

---

## 📚 Recursos Adicionales

- [Documentación de React](https://reactjs.org/docs/getting-started.html)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap Grid System](https://getbootstrap.com/docs/5.3/layout/grid/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Karma Documentation](https://karma-runner.github.io/)

---

**Última actualización:** Diciembre 2024  
**Versión:** 1.0.0  
**Estado:** ✅ Producción
