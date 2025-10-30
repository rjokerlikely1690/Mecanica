# 📝 Ejemplos de Uso - Exportación a Excel

## 🎯 Casos de Uso Prácticos

### 1. **Backup Diario del Sistema**

**Escenario:** El administrador quiere hacer un respaldo de todos los datos al final del día.

**Pasos:**
1. Ir al Dashboard
2. Hacer clic en el botón verde "📊 Exportar Todo"
3. Se descarga: `AutoMax_Backup_Completo_2025-10-30.xlsx`

**Resultado:**
```
📄 AutoMax_Backup_Completo_2025-10-30.xlsx
├── 📋 Hoja 1: Citas (12 registros)
├── 🛒 Hoja 2: Carrito (3 items)
├── 📝 Hoja 3: Órdenes (8 órdenes)
└── 📊 Hoja 4: Resumen
```

---

### 2. **Reporte Mensual de Citas**

**Escenario:** El gerente necesita un informe de todas las citas del mes para revisar con el equipo.

**Pasos:**
1. Ir a la sección "Citas" desde el sidebar
2. Hacer clic en "📥 Exportar Citas"
3. Se descarga: `AutoMax_Citas_2025-10-30.xlsx`

**Contenido del Excel:**
| N° | Cliente | Email | Teléfono | Servicio | Fecha | Hora | Precio | Estado |
|----|---------|-------|----------|----------|-------|------|--------|--------|
| 1  | Juan Pérez | juan@mail.com | +56912345678 | Cambio de Aceite | 2025-10-31 | 09:00 AM | $25.000 | Confirmada |
| 2  | María López | maria@mail.com | +56987654321 | Revisión Técnica | 2025-11-01 | 10:30 AM | $45.000 | Pendiente |

---

### 3. **Cotización para Cliente**

**Escenario:** Un cliente quiere llevar una cotización por escrito de los servicios que agregó al carrito.

**Pasos:**
1. Cliente agrega servicios al carrito:
   - Cambio de Aceite (x1)
   - Revisión Técnica (x1)
   - Frenos (x1)
2. Abrir carrito flotante
3. Hacer clic en "📥 Exportar Carrito a Excel"
4. Se descarga: `AutoMax_Carrito_2025-10-30.xlsx`

**Contenido del Excel:**
| N° | Servicio/Producto | Tipo | Precio Unitario | Cantidad | Subtotal |
|----|-------------------|------|-----------------|----------|----------|
| 1  | Cambio de Aceite | servicio | $25.000 | 1 | $25.000 |
| 2  | Revisión Técnica | servicio | $45.000 | 1 | $45.000 |
| 3  | Frenos | servicio | $80.000 | 1 | $80.000 |
| **-** | **-** | **-** | **-** | **TOTAL:** | **$150.000** |

---

### 4. **Análisis de Órdenes de Trabajo**

**Escenario:** El supervisor quiere analizar todas las órdenes completadas para revisar productividad.

**Pasos:**
1. Ir a "Órdenes de Trabajo" desde el sidebar
2. Hacer clic en "📥 Exportar Órdenes"
3. Se descarga: `AutoMax_Ordenes_2025-10-30.xlsx`
4. Abrir en Excel y aplicar filtros por "Estado = Completada"

**Contenido del Excel:**
| N° | Orden # | Cliente | Vehículo | Servicio | Mecánico | Estado | Total |
|----|---------|---------|----------|----------|----------|--------|-------|
| 1  | WO-001 | Juan Pérez | Toyota Corolla | Cambio de aceite | Carlos López | Completada | $85.000 |
| 2  | WO-002 | María García | Honda Civic | Sistema de frenos | Ana Martínez | Pendiente | $150.000 |

---

## 🔧 Personalización de Exportaciones

### Modificar Columnas Exportadas

Si necesitas agregar o quitar columnas en las exportaciones:

```javascript
// Editar: src/utils/excelExport.js

// Ejemplo: Agregar columna "RUT" a las citas
export const exportAppointmentsToExcel = () => {
  const appointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
  
  const data = appointments.map((apt, index) => ({
    'N°': index + 1,
    'Cliente': apt.customer?.name || 'N/A',
    'RUT': apt.customer?.rut || 'N/A', // ← Nueva columna
    'Email': apt.customer?.email || 'N/A',
    // ... resto de columnas
  }));
  
  // ... resto del código
};
```

---

### Cambiar Formato de Precios

```javascript
// Ejemplo: Cambiar de pesos chilenos a dólares
'Precio': apt.price ? `$${(apt.price / 1000).toFixed(2)} USD` : 'N/A'
```

---

### Agregar Logo o Encabezado

```javascript
import * as XLSX from 'xlsx';

// Agregar fila de encabezado personalizada
const headerData = [
  ['TALLER MECÁNICO AUTOMAX'],
  ['Av. La Bajada #456, Chillán'],
  ['Reporte de Citas - ' + new Date().toLocaleDateString()],
  [] // Fila vacía
];

const ws = XLSX.utils.aoa_to_sheet(headerData);
XLSX.utils.sheet_add_json(ws, data, { origin: -1 });
```

---

## 📧 Enviar Excel por Email

### Integración con Email (Ejemplo con mailto)

```javascript
export const shareExcelByEmail = () => {
  const fileName = 'AutoMax_Citas_2025-10-30.xlsx';
  const subject = 'Reporte de Citas - Taller AutoMax';
  const body = `Adjunto encontrarás el reporte de citas del día.`;
  
  const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailtoLink;
  
  // Nota: El archivo debe adjuntarse manualmente
  alert('📧 Abre tu cliente de email y adjunta el archivo descargado');
};
```

---

## 🎨 Formato Avanzado de Excel

### Agregar Colores a Celdas

```javascript
import * as XLSX from 'xlsx';

// Crear workbook con estilos
const ws = XLSX.utils.json_to_sheet(data);

// Aplicar estilo a encabezados (requiere xlsx-style)
const range = XLSX.utils.decode_range(ws['!ref']);
for (let C = range.s.c; C <= range.e.c; ++C) {
  const address = XLSX.utils.encode_col(C) + "1";
  if (!ws[address]) continue;
  ws[address].s = {
    fill: { fgColor: { rgb: "007BFF" } },
    font: { color: { rgb: "FFFFFF" }, bold: true }
  };
}
```

---

## 🚨 Manejo de Errores

### Validar Datos Antes de Exportar

```javascript
export const exportAppointmentsToExcel = () => {
  const appointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
  
  // Validación 1: Sin datos
  if (appointments.length === 0) {
    alert('⚠️ No hay citas para exportar');
    return;
  }
  
  // Validación 2: Datos incompletos
  const validAppointments = appointments.filter(apt => 
    apt.customer && apt.customer.name && apt.service
  );
  
  if (validAppointments.length === 0) {
    alert('⚠️ Las citas no tienen información completa');
    return;
  }
  
  // Continuar con exportación...
};
```

---

## 📊 Integración con Google Sheets

### Subir Automáticamente a Google Sheets

```javascript
// Requiere Google Sheets API

import { google } from 'googleapis';

export const exportToGoogleSheets = async (data) => {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  
  const sheets = google.sheets({ version: 'v4', auth });
  
  await sheets.spreadsheets.values.append({
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    range: 'Sheet1!A1',
    valueInputOption: 'RAW',
    resource: {
      values: data
    }
  });
  
  alert('✅ Datos exportados a Google Sheets');
};
```

---

## 📈 Análisis de Datos Exportados

### Importar en Python para Análisis

```python
import pandas as pd
import matplotlib.pyplot as plt

# Leer archivo Excel
df = pd.read_excel('AutoMax_Citas_2025-10-30.xlsx')

# Análisis básico
print(df.describe())
print(df['Estado'].value_counts())

# Gráfico de citas por servicio
df['Servicio'].value_counts().plot(kind='bar')
plt.title('Citas por Servicio')
plt.show()

# Ingresos totales
df['Precio_Num'] = df['Precio'].str.replace('$', '').str.replace('.', '').astype(int)
total_ingresos = df['Precio_Num'].sum()
print(f'Ingresos Totales: ${total_ingresos:,}')
```

---

## 💡 Tips y Mejores Prácticas

### 1. **Nombrar Archivos Descriptivamente**
```javascript
// ❌ Malo
const fileName = 'export.xlsx';

// ✅ Bueno
const fileName = `AutoMax_Citas_${new Date().toISOString().split('T')[0]}.xlsx`;
```

### 2. **Agregar Metadatos**
```javascript
const wb = XLSX.utils.book_new();
wb.Props = {
  Title: "Reporte de Citas - AutoMax",
  Subject: "Gestión de Taller",
  Author: "Sistema AutoMax",
  CreatedDate: new Date()
};
```

### 3. **Limitar Tamaño de Exportaciones**
```javascript
// Exportar solo últimos 100 registros si hay muchos
const recentAppointments = appointments.slice(-100);
```

### 4. **Confirmar Antes de Exportar**
```javascript
if (appointments.length > 1000) {
  if (!window.confirm('⚠️ Hay más de 1000 registros. ¿Continuar?')) {
    return;
  }
}
```

---

## 🆘 Solución de Problemas Comunes

### Problema 1: "El archivo no se descarga"

**Solución:**
```javascript
// Verificar que el navegador permita descargas
if (typeof window.navigator.msSaveBlob !== 'undefined') {
  // Internet Explorer
  window.navigator.msSaveBlob(blob, fileName);
} else {
  // Otros navegadores
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}
```

### Problema 2: "El Excel está vacío"

**Solución:**
```javascript
// Verificar localStorage en consola
console.log(localStorage.getItem('automax-appointments'));

// Agregar datos de prueba
const testData = [{
  customer: { name: 'Test', email: 'test@test.com' },
  service: 'Test Service'
}];
localStorage.setItem('automax-appointments', JSON.stringify(testData));
```

### Problema 3: "Caracteres especiales no se muestran bien"

**Solución:**
```javascript
// Asegurar encoding UTF-8
const ws = XLSX.utils.json_to_sheet(data);
const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, 'Datos');
XLSX.writeFile(wb, fileName, { bookType: 'xlsx', type: 'binary', charset: 'UTF-8' });
```

---

## 📚 Recursos Adicionales

- **Documentación xlsx:** https://docs.sheetjs.com/
- **Ejemplos avanzados:** https://github.com/SheetJS/sheetjs
- **Excel Formula Support:** https://www.npmjs.com/package/xlsx-formula

---

**Desarrollado para Taller Mecánico AutoMax** 🔧
*Última actualización: Octubre 2025*

