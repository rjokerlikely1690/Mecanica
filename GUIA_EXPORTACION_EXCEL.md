# 📊 Guía de Exportación a Excel

## 🎯 Funcionalidad Implementada

Se ha agregado la capacidad de **exportar datos a archivos Excel (.xlsx)** en el sistema de gestión del Taller Mecánico AutoMax.

---

## 📦 Librería Instalada

- **xlsx** (v0.18.5+): Librería JavaScript para crear y manipular archivos Excel

---

## 🗂️ Archivos Creados

### `src/utils/excelExport.js`
Contiene todas las funciones de exportación:

#### **Funciones Disponibles:**

1. **`exportAppointmentsToExcel()`**
   - Exporta todas las citas programadas
   - **Ubicación**: Módulo "Citas"
   - **Columnas**: N°, Cliente, Email, Teléfono, Servicio, Fecha, Hora, Precio, Estado, Comentarios, Fecha Creación
   - **Nombre archivo**: `AutoMax_Citas_YYYY-MM-DD.xlsx`

2. **`exportCartToExcel()`**
   - Exporta el contenido actual del carrito
   - **Ubicación**: Vista del carrito flotante
   - **Columnas**: N°, Servicio/Producto, Tipo, Precio Unitario, Cantidad, Subtotal, Duración
   - **Nombre archivo**: `AutoMax_Carrito_YYYY-MM-DD.xlsx`
   - **Extras**: Incluye fila de TOTAL al final

3. **`exportWorkOrdersToExcel()`**
   - Exporta todas las órdenes de trabajo
   - **Ubicación**: Módulo "Órdenes de Trabajo"
   - **Columnas**: N°, Orden #, Cliente, Vehículo, Servicio, Mecánico, Fecha Inicio, Estado, Total, Notas
   - **Nombre archivo**: `AutoMax_Ordenes_YYYY-MM-DD.xlsx`

4. **`exportAllDataToExcel()`** ⭐ **MÁS IMPORTANTE**
   - Exporta TODO el sistema en un solo archivo
   - **Ubicación**: Dashboard (Botón verde "Exportar Todo")
   - **Contenido**: Múltiples hojas (Citas, Carrito, Órdenes, Resumen)
   - **Nombre archivo**: `AutoMax_Backup_Completo_YYYY-MM-DD.xlsx`
   - **Extras**: Incluye hoja de resumen con estadísticas

---

## 🎨 Ubicación de Botones

### **Vista Administrativa (Sidebar/Dashboard)**

#### 1. **Dashboard Principal**
```
┌─────────────────────────────────────────┐
│ Dashboard                               │
│                        [📊 Exportar Todo]│ ← Botón verde
└─────────────────────────────────────────┘
```
- **Botón**: "📊 Exportar Todo"
- **Color**: Verde (success)
- **Acción**: Exporta todo el sistema (citas, carrito, órdenes)

---

#### 2. **Módulo de Citas**
```
┌─────────────────────────────────────────────────────┐
│ Gestión de Citas                                     │
│                    [📥 Exportar Citas] [📅 Nueva Cita]│
└─────────────────────────────────────────────────────┘
```
- **Botón**: "📥 Exportar Citas"
- **Color**: Verde (success)
- **Acción**: Exporta solo las citas programadas

---

#### 3. **Módulo de Órdenes de Trabajo**
```
┌─────────────────────────────────────────────────────┐
│ Órdenes de Trabajo                                   │
│              [📥 Exportar Órdenes] [➕ Nueva Orden]│
└─────────────────────────────────────────────────────┘
```
- **Botón**: "📥 Exportar Órdenes"
- **Color**: Verde (success)
- **Acción**: Exporta todas las órdenes de trabajo

---

#### 4. **Carrito de Compras (FloatingCart)**
```
┌─────────────────────────────────┐
│ Carrito de Compra        [3]     │
├─────────────────────────────────┤
│ Items...                         │
├─────────────────────────────────┤
│ Total: $180.000                  │
│                                   │
│ [💳 Proceder al Pago]            │
│ [📥 Exportar Carrito a Excel]   │ ← Nuevo botón
│ [🗑️ Limpiar Carrito]             │
└─────────────────────────────────┘
```
- **Botón**: "📥 Exportar Carrito a Excel"
- **Color**: Azul (info)
- **Acción**: Exporta el contenido actual del carrito

---

## 💡 Cómo Usar

### **Para Administradores:**

1. **Exportar todo el sistema (Backup completo)**:
   - Ir al Dashboard
   - Clic en "📊 Exportar Todo" (botón verde)
   - Se descarga: `AutoMax_Backup_Completo_YYYY-MM-DD.xlsx`

2. **Exportar solo citas**:
   - Ir a "Citas" en el sidebar
   - Clic en "📥 Exportar Citas"
   - Se descarga: `AutoMax_Citas_YYYY-MM-DD.xlsx`

3. **Exportar solo órdenes**:
   - Ir a "Órdenes de Trabajo" en el sidebar
   - Clic en "📥 Exportar Órdenes"
   - Se descarga: `AutoMax_Ordenes_YYYY-MM-DD.xlsx`

### **Para Clientes:**

1. **Exportar carrito actual**:
   - Agregar servicios/productos al carrito
   - Abrir el carrito flotante
   - Clic en "📥 Exportar Carrito a Excel"
   - Se descarga: `AutoMax_Carrito_YYYY-MM-DD.xlsx`

---

## 📋 Estructura de los Archivos Excel

### **Backup Completo (4 hojas)**

#### **Hoja 1: Citas**
| N° | Cliente | Email | Teléfono | Servicio | Fecha | Hora | Precio | Estado | Comentarios |
|----|---------|-------|----------|----------|-------|------|--------|--------|-------------|
| 1  | Juan P. | ... | ... | ... | ... | ... | $50.000 | Confirmada | ... |

#### **Hoja 2: Carrito**
| N° | Servicio/Producto | Tipo | Precio Unitario | Cantidad | Subtotal |
|----|-------------------|------|-----------------|----------|----------|
| 1  | Cambio de Aceite | servicio | $25.000 | 2 | $50.000 |

#### **Hoja 3: Órdenes**
| N° | Orden # | Cliente | Vehículo | Servicio | Estado | Total |
|----|---------|---------|----------|----------|--------|-------|
| 1  | WO-001 | Juan P. | Toyota | ... | Completada | $120.000 |

#### **Hoja 4: Resumen**
| Módulo | Cantidad |
|--------|----------|
| Citas Programadas | 12 |
| Items en Carrito | 3 |
| Órdenes de Trabajo | 8 |
| Fecha de Exportación | 30/10/2025, 14:35:00 |

---

## ✅ Características Especiales

### **Formato Profesional**
- ✓ Columnas con anchos ajustados automáticamente
- ✓ Numeración automática (N°)
- ✓ Precios formateados en pesos chilenos ($XX.XXX)
- ✓ Fechas en formato chileno (DD/MM/YYYY)
- ✓ Alertas informativas antes de exportar

### **Validaciones**
- ⚠️ Si no hay datos, muestra alerta: "No hay datos para exportar"
- ✅ Al exportar exitosamente, muestra resumen: "X items exportados"

### **Persistencia**
- 💾 Los datos se leen desde **localStorage**:
  - `automax-appointments` → Citas
  - `automax-cart` → Carrito
  - `automax-workorders` → Órdenes

---

## 🔧 Modificaciones Realizadas

### **Componentes Actualizados:**

1. ✅ **`Dashboard.js`**
   - Import: `exportAllDataToExcel`
   - Botón: "Exportar Todo" conectado a función

2. ✅ **`Appointments.js`**
   - Import: `exportAppointmentsToExcel`
   - Botón: "Exportar Citas" agregado

3. ✅ **`WorkOrders.js`**
   - Import: `exportWorkOrdersToExcel`
   - Botón: "Exportar Órdenes" agregado

4. ✅ **`ShoppingCart.js`**
   - Import: `exportCartToExcel`
   - Botón: "Exportar Carrito a Excel" agregado

---

## 🎯 Casos de Uso

### **Administrador del Taller:**
- 📊 **Backup diario**: Exportar todo al final del día
- 📈 **Reportes mensuales**: Exportar citas/órdenes para análisis
- 💼 **Presentaciones**: Usar datos en Excel para gráficos

### **Cliente:**
- 🛒 **Cotización personal**: Exportar carrito para comparar precios
- 📧 **Enviar presupuesto**: Adjuntar Excel en email
- 💾 **Guardar historial**: Mantener registro de servicios solicitados

### **Contador/Finanzas:**
- 💰 **Control de ingresos**: Analizar precios y totales
- 📉 **Auditorías**: Verificar órdenes completadas
- 📊 **Informes fiscales**: Datos listos para procesamiento

---

## 🚀 Próximas Mejoras (Opcional)

- [ ] Agregar filtros por fecha antes de exportar
- [ ] Permitir exportar a formato PDF
- [ ] Enviar archivo por email directamente
- [ ] Programar exportaciones automáticas
- [ ] Agregar gráficos dentro del Excel
- [ ] Exportar inventario y repuestos

---

## 🐛 Solución de Problemas

### **"No hay datos para exportar"**
- **Causa**: La tabla está vacía en localStorage
- **Solución**: Primero agrega citas, órdenes o items al carrito

### **"El archivo no se descarga"**
- **Causa**: Bloqueador de pop-ups o descargas
- **Solución**: Permite descargas desde `localhost:3000`

### **"El archivo está corrupto"**
- **Causa**: Librería xlsx no cargada correctamente
- **Solución**: Ejecutar `npm install xlsx` nuevamente

---

## 📞 Soporte

Si tienes problemas con la exportación:
1. Verifica la consola del navegador (F12)
2. Comprueba que los datos existan en localStorage
3. Prueba con un solo item primero
4. Revisa que el navegador permita descargas

---

**Desarrollado para Taller Mecánico AutoMax** 🔧
*Versión 1.0 - Octubre 2025*

