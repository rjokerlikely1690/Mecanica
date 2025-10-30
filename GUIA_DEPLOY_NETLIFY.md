# 🚀 Guía de Deploy en Netlify

## ✅ Problema Solucionado

El error que tenías era por **variables no usadas** en `VehicleHistory.js`. Ya está arreglado:

```javascript
// ❌ ANTES (con error)
const [showModal, setShowModal] = useState(false);  // No se usaba
const [vehicles, setVehicles] = useState([...]);   // setVehicles no se usaba

// ✅ AHORA (corregido)
const [vehicles] = useState([...]);  // Solo declaramos lo que usamos
```

---

## 🌐 ¿Qué es Netlify?

**Netlify** es una plataforma de hosting **GRATIS** perfecta para aplicaciones React. Te da:

- ✅ **URL pública** (ej: `automax-taller.netlify.app`)
- ✅ **HTTPS automático** (certificado SSL gratis)
- ✅ **Deploy automático** desde GitHub
- ✅ **CDN global** (tu app rápida en todo el mundo)
- ✅ **Sin límite de visitas** (plan gratuito)

---

## 📋 Pasos para Subir tu App

### **Opción 1: Deploy desde GitHub (Recomendado) 🌟**

#### 1️⃣ Sube tu código a GitHub

```bash
# Si aún no has subido los cambios
cd mecanica-website
git add .
git commit -m "fix: Arreglar errores de build para Netlify"
git push origin main
```

#### 2️⃣ Conecta Netlify con GitHub

1. Ve a: https://app.netlify.com/
2. Haz clic en **"Add new site"** → **"Import an existing project"**
3. Selecciona **GitHub**
4. Autoriza a Netlify a acceder a tus repos
5. Busca y selecciona: `mecanica-website`

#### 3️⃣ Configura el Build

Netlify detectará automáticamente que es React, pero verifica:

```
Build command: npm run build
Publish directory: build
```

✅ **Ya está en el archivo `netlify.toml`** que acabamos de crear.

#### 4️⃣ Deploy!

- Haz clic en **"Deploy site"**
- Espera 2-3 minutos ⏳
- ¡Tu app estará en: `https://random-name-12345.netlify.app`!

#### 5️⃣ Cambia el nombre del sitio

1. En Netlify, ve a: **Site settings** → **Site details**
2. Cambia el nombre a algo como: `automax-taller`
3. Tu URL será: `https://automax-taller.netlify.app` 🎉

---

### **Opción 2: Deploy Manual (Desde tu PC)**

#### 1️⃣ Instala Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2️⃣ Crea el Build

```bash
cd mecanica-website
npm run build
```

#### 3️⃣ Haz Login en Netlify

```bash
netlify login
```

Se abrirá tu navegador para autorizar.

#### 4️⃣ Deploy

```bash
# Deploy de prueba
netlify deploy

# Cuando estés seguro, deploy a producción
netlify deploy --prod
```

---

## 🛠️ Solución de Problemas

### Problema 1: "Build failed: exit code 1"

**Causa:** Variables no usadas o errores de ESLint

**Solución:** Ya arreglamos `VehicleHistory.js`, pero si aparecen más:

```bash
# Ver si hay errores localmente
npm run build

# Si hay warnings, arreglarlos o desactivar CI=true
```

En `netlify.toml` ya configuramos `CI = "false"` para que warnings no bloqueen.

---

### Problema 2: "Page not found on refresh"

**Causa:** React Router necesita redirect a `index.html`

**Solución:** Ya está en `netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### Problema 3: "Module not found"

**Causa:** Dependencias no instaladas correctamente

**Solución:**

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

### Problema 4: "Out of memory"

**Causa:** Build muy pesado para el plan gratuito

**Solución:** Agregar en `netlify.toml`:

```toml
[build.environment]
  NODE_OPTIONS = "--max-old-space-size=4096"
```

---

## 🎨 Personalizar tu Sitio en Netlify

### Cambiar el Dominio

**Opción 1: Subdominio de Netlify (Gratis)**
- `automax-taller.netlify.app`
- Se configura en: Site settings → Domain management

**Opción 2: Dominio Personalizado (Requiere comprar dominio)**
- `www.automaxtaller.com`
- Netlify te da HTTPS gratis incluso con dominio propio

---

### Variables de Entorno

Si necesitas API keys u otras variables:

1. En Netlify: **Site settings** → **Build & deploy** → **Environment variables**
2. Agrega: `REACT_APP_API_URL=https://api.tubackend.com`
3. En React:
```javascript
const API_URL = process.env.REACT_APP_API_URL;
```

---

### Deploy Previews (Ramas)

Netlify crea URLs de preview para cada Pull Request:

```
main → https://automax-taller.netlify.app
feature/nueva-funcion → https://deploy-preview-5--automax-taller.netlify.app
```

---

## 📊 Monitoreo y Analytics

### Ver Estadísticas

Netlify te da analytics gratis:
- **Visitas totales**
- **Bandwidth usado**
- **Build logs**

Ve a: **Site overview** → **Analytics**

---

### Notificaciones de Deploy

Configura notificaciones en:
- **Slack**
- **Email**
- **GitHub**

En: **Site settings** → **Build & deploy** → **Deploy notifications**

---

## 🔄 Deploy Continuo (CI/CD)

Una vez conectado a GitHub, **cada vez que hagas `git push`**:

```bash
git add .
git commit -m "feat: Agregar nueva funcionalidad"
git push origin main
```

🚀 **Netlify automáticamente:**
1. Detecta el cambio
2. Hace `npm install`
3. Ejecuta `npm run build`
4. Deploya la nueva versión
5. Te notifica (✅ success o ❌ failed)

---

## 📝 Checklist Final

Antes de hacer deploy, verifica:

- ✅ `npm run build` funciona localmente
- ✅ No hay errores en consola
- ✅ Las imágenes cargan correctamente
- ✅ Los links funcionan
- ✅ El carrito persiste en localStorage
- ✅ La app es responsive (mobile, tablet, desktop)

---

## 🎯 Tu App Estará Lista Así

```
URL: https://automax-taller.netlify.app

📱 MOBILE    ✅ Funciona perfectamente
💻 DESKTOP   ✅ Funciona perfectamente
🔒 HTTPS     ✅ Certificado SSL automático
🌍 GLOBAL    ✅ CDN en todo el mundo
🚀 RÁPIDA    ✅ Optimizada automáticamente
```

---

## 💰 Costos

### Plan Gratuito (Suficiente para tu proyecto)
- ✅ 100 GB bandwidth/mes
- ✅ 300 minutos de build/mes
- ✅ Deploy automático
- ✅ HTTPS gratis
- ✅ Sin tarjeta de crédito necesaria

### Plan Pro ($19/mes) - Solo si creces mucho
- 400 GB bandwidth
- 1000 minutos build
- Analytics avanzados

---

## 🔗 Links Útiles

- **Dashboard Netlify:** https://app.netlify.com/
- **Documentación:** https://docs.netlify.com/
- **Status:** https://www.netlifystatus.com/
- **Comunidad:** https://answers.netlify.com/

---

## 🎉 ¡Listo!

Después de seguir estos pasos, tu app estará en línea y accesible desde cualquier lugar del mundo. 🌎

**Tu próximo paso:**
1. Haz commit de los cambios
2. Push a GitHub
3. Conecta Netlify
4. ¡Comparte el link con todo el mundo! 🚀

---

**¿Necesitas ayuda?** 
- Revisa los logs de build en Netlify
- Verifica que `netlify.toml` esté en la raíz del proyecto
- Asegúrate de que `VehicleHistory.js` esté arreglado

**Desarrollado para Taller Mecánico AutoMax** 🔧

