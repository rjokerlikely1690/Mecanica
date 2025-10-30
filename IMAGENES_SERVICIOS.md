# 🖼️ Documentación de Imágenes de Servicios

## 📸 Imágenes Agregadas

Este documento detalla las imágenes reales que se han agregado a los servicios del Taller Mecánico AutoMax.

---

## 🔗 Fuente de Imágenes

Todas las imágenes provienen de **Unsplash**, un servicio gratuito de fotografías de alta calidad:
- **Sitio web:** https://unsplash.com/
- **Licencia:** Gratuita para uso comercial y personal
- **Atribución:** No requerida (pero apreciada)

---

## 🛠️ Imágenes por Servicio

### 1️⃣ **Cambio de Aceite**
- **URL:** `https://images.unsplash.com/photo-1625047509168-a7026f36de04?auto=format&fit=crop&w=600&q=80`
- **Descripción:** Mecánico realizando cambio de aceite de motor
- **Gradiente Fallback:** Morado (#667eea → #764ba2)
- **Búsqueda en Unsplash:** "oil change mechanic"

### 2️⃣ **Revisión Técnica**
- **URL:** `https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80`
- **Descripción:** Mecánico inspeccionando vehículo con computadora de diagnóstico
- **Gradiente Fallback:** Rosa (#f093fb → #f5576c)
- **Búsqueda en Unsplash:** "car diagnostic tool"

### 3️⃣ **Sistema de Frenos**
- **URL:** `https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&q=80`
- **Descripción:** Sistema de frenos de vehículo - disco y pinzas
- **Gradiente Fallback:** Celeste (#4facfe → #00f2fe)
- **Búsqueda en Unsplash:** "car brake system"

### 4️⃣ **Motor**
- **URL:** `https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&q=80`
- **Descripción:** Motor de automóvil - vista detallada
- **Gradiente Fallback:** Coral (#fa709a → #fee140)
- **Búsqueda en Unsplash:** "car engine"

### 5️⃣ **Suspensión**
- **URL:** `https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=600&q=80`
- **Descripción:** Automóvil deportivo en carretera
- **Gradiente Fallback:** Azul oscuro (#30cfd0 → #330867)
- **Búsqueda en Unsplash:** "car suspension road"

### 6️⃣ **Aire Acondicionado**
- **URL:** `https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80`
- **Descripción:** Sistema de ventilación y aire acondicionado de vehículo
- **Gradiente Fallback:** Pastel (#a8edea → #fed6e3)
- **Búsqueda en Unsplash:** "car air conditioning"

---

## 🎨 Características del Diseño

### **✨ Sistema de Fallback Mejorado**

Cada servicio ahora tiene un **gradiente único** como respaldo:

```
🎨 Si la imagen NO carga → Se muestra un gradiente personalizado
✅ Cambio de Aceite    → Gradiente Morado
✅ Revisión Técnica    → Gradiente Rosa
✅ Frenos              → Gradiente Celeste
✅ Motor               → Gradiente Coral-Amarillo
✅ Suspensión          → Gradiente Azul Oscuro
✅ Aire Acondicionado  → Gradiente Pastel
```

**Ventajas:**
- ✅ Nunca se ve un espacio vacío o imagen rota
- ✅ Cada servicio tiene identidad visual única
- ✅ Gradientes profesionales y modernos
- ✅ Funciona sin conexión a internet

### **Cards de Servicio (Home.js y Services.js)**
```jsx
✅ Imagen de 250px de altura (Home)
✅ Imagen de 220px de altura (Services)
✅ Gradiente personalizado como fondo
✅ Imagen se oculta automáticamente si falla (onError)
✅ Badge circular con icono centrado
✅ Badge de precio en la esquina superior derecha
✅ Efecto hover: translateY(-10px)
✅ Transiciones suaves (0.3s ease)
```

### **Modal de Detalles (Services.js)**
```jsx
✅ Imagen de 200px de altura
✅ Bordes redondeados (border-radius: 10px)
✅ Gradiente de texto en la parte inferior
✅ Badges de precio y duración
✅ Header azul con icono
```

---

## 🔄 Cómo Reemplazar con Imágenes Propias

### **Opción 1: Usar URLs de otras fuentes**

Si encuentras imágenes en otro sitio (Pexels, Pixabay, etc.):

1. Abre el archivo: `src/components/Services.js`
2. Busca el array `services`
3. Reemplaza la URL en el campo `image`:

```javascript
{
  id: 1,
  title: "Cambio de Aceite",
  // ... otros campos ...
  image: "TU_NUEVA_URL_AQUI"
}
```

### **Opción 2: Usar imágenes locales**

Si quieres usar tus propias fotos:

1. Crea la carpeta: `public/images/services/`
2. Guarda tus imágenes allí (ej: `cambio-aceite.jpg`)
3. Actualiza la URL en el código:

```javascript
image: "/images/services/cambio-aceite.jpg"
```

**Recomendaciones para imágenes locales:**
- Tamaño recomendado: 800x600px
- Formato: JPG o WebP
- Peso máximo: 300KB por imagen
- Optimiza las imágenes antes de subirlas

---

## 🔍 Fuentes Alternativas de Imágenes Gratuitas

### 1. **Pexels**
- URL: https://www.pexels.com/
- Licencia: Gratuita
- Calidad: Alta

### 2. **Pixabay**
- URL: https://pixabay.com/
- Licencia: Gratuita
- Calidad: Buena

### 3. **Freepik** (Cuenta gratuita)
- URL: https://www.freepik.com/
- Licencia: Gratuita con atribución
- Calidad: Muy alta

### 4. **StockSnap.io**
- URL: https://stocksnap.io/
- Licencia: Dominio público
- Calidad: Buena

---

## 📊 Parámetros de URL de Unsplash

Las URLs de Unsplash permiten modificar parámetros:

```
https://images.unsplash.com/photo-XXXXX?w=500&q=80
                                         ↑     ↑
                                      ancho  calidad
```

**Parámetros útiles:**
- `w=500` → Ancho de 500px
- `h=300` → Alto de 300px
- `q=80` → Calidad 80% (balance perfecto)
- `q=100` → Calidad máxima (archivos más grandes)
- `fit=crop` → Recortar para ajustar

**Ejemplo optimizado:**
```
https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&h=600&q=85&fit=crop
```

---

## 🎯 Mejoras Futuras Posibles

### **1. Lazy Loading (Carga Diferida)**
```jsx
<img 
  src={service.image}
  alt={service.title}
  loading="lazy"  // ← Agregar esto
/>
```

### **2. Imágenes Responsivas**
```jsx
<img 
  srcSet={`
    ${service.image}?w=400 400w,
    ${service.image}?w=800 800w,
    ${service.image}?w=1200 1200w
  `}
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
/>
```

### **3. Placeholder Mientras Carga**
```jsx
<img 
  src={service.image}
  style={{ background: '#f0f0f0' }}  // Color de fondo
  onLoad={(e) => e.target.style.background = 'none'}
/>
```

---

## 📝 Notas Importantes

1. **Performance:** Las imágenes de Unsplash se cargan desde su CDN, que es rápido y confiable.

2. **Cache:** El navegador cachea las imágenes automáticamente, mejorando la velocidad en visitas posteriores.

3. **Fallback:** Si Unsplash tiene problemas, considera agregar un sistema de fallback con imágenes locales.

4. **SEO:** Los atributos `alt` están correctamente implementados para accesibilidad y SEO.

---

## 🚀 Comandos Útiles

### **Descargar imagen de Unsplash**
```bash
# Usando wget (Linux/Mac)
wget "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80" -O cambio-aceite.jpg

# Usando curl (Linux/Mac/Windows)
curl "https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=800&q=80" -o cambio-aceite.jpg
```

### **Optimizar imágenes locales**
```bash
# Instalar herramienta de optimización
npm install -g imagemin-cli

# Optimizar todas las imágenes
imagemin public/images/services/*.jpg --out-dir=public/images/services/optimized
```

---

## ✅ Checklist de Implementación

- [x] Imágenes agregadas a `Home.js` (3 servicios destacados)
- [x] Imágenes agregadas a `Services.js` (6 servicios completos)
- [x] Modal actualizado con preview de imagen
- [x] Gradientes y overlays implementados
- [x] Badges de precio y duración posicionados
- [x] Efectos hover funcionando
- [x] Atributos `alt` para accesibilidad
- [x] Responsive design mantenido
- [x] Sin errores de linting

---

## 📞 Soporte

Si tienes problemas con las imágenes o deseas personalizarlas más:

1. Lee este documento completo
2. Revisa los archivos `Home.js` y `Services.js`
3. Consulta la documentación de Unsplash: https://unsplash.com/documentation

---

**Fecha de creación:** 2024  
**Última actualización:** Diciembre 2024  
**Autor:** Taller Mecánico AutoMax  
**Versión:** 1.0

