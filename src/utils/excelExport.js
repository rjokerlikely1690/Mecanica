import * as XLSX from 'xlsx';

/**
 * Función para formatear fechas en formato legible
 */
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CL', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit' 
  });
};

/**
 * Exportar citas a Excel
 */
export const exportAppointmentsToExcel = () => {
  const appointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
  
  if (appointments.length === 0) {
    alert('⚠️ No hay citas para exportar');
    return;
  }

  // Preparar datos para Excel
  const data = appointments.map((apt, index) => ({
    'N°': index + 1,
    'Cliente': apt.customer?.name || 'N/A',
    'Email': apt.customer?.email || 'N/A',
    'Teléfono': apt.customer?.phone || 'N/A',
    'Servicio': apt.service || 'N/A',
    'Fecha': apt.date || 'N/A',
    'Hora': apt.time || 'N/A',
    'Precio': apt.price ? `$${apt.price.toLocaleString('es-CL')}` : 'N/A',
    'Estado': apt.status || 'Programada',
    'Comentarios': apt.comments || '',
    'Fecha Creación': formatDate(apt.createdAt)
  }));

  // Crear libro de Excel
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Citas');

  // Ajustar ancho de columnas
  const colWidths = [
    { wch: 5 },  // N°
    { wch: 20 }, // Cliente
    { wch: 25 }, // Email
    { wch: 15 }, // Teléfono
    { wch: 25 }, // Servicio
    { wch: 12 }, // Fecha
    { wch: 10 }, // Hora
    { wch: 12 }, // Precio
    { wch: 12 }, // Estado
    { wch: 30 }, // Comentarios
    { wch: 15 }  // Fecha Creación
  ];
  ws['!cols'] = colWidths;

  // Generar archivo
  const fileName = `AutoMax_Citas_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  
  alert(`✅ Archivo exportado: ${fileName}\n${appointments.length} citas exportadas`);
};

/**
 * Exportar carrito actual a Excel
 */
export const exportCartToExcel = () => {
  const cart = JSON.parse(localStorage.getItem('automax-cart') || '[]');
  
  if (cart.length === 0) {
    alert('⚠️ El carrito está vacío');
    return;
  }

  const data = cart.map((item, index) => ({
    'N°': index + 1,
    'Servicio/Producto': item.title || 'N/A',
    'Tipo': item.type || 'N/A',
    'Precio Unitario': `$${item.price.toLocaleString('es-CL')}`,
    'Cantidad': item.quantity,
    'Subtotal': `$${(item.price * item.quantity).toLocaleString('es-CL')}`,
    'Duración': item.duration || 'N/A'
  }));

  // Calcular total
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Agregar fila de total
  data.push({
    'N°': '',
    'Servicio/Producto': '',
    'Tipo': '',
    'Precio Unitario': '',
    'Cantidad': 'TOTAL:',
    'Subtotal': `$${total.toLocaleString('es-CL')}`,
    'Duración': ''
  });

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Carrito');

  const colWidths = [
    { wch: 5 },  // N°
    { wch: 30 }, // Servicio/Producto
    { wch: 12 }, // Tipo
    { wch: 15 }, // Precio Unitario
    { wch: 10 }, // Cantidad
    { wch: 15 }, // Subtotal
    { wch: 12 }  // Duración
  ];
  ws['!cols'] = colWidths;

  const fileName = `AutoMax_Carrito_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  
  alert(`✅ Carrito exportado: ${fileName}`);
};

/**
 * Exportar órdenes del módulo WorkOrders
 */
export const exportWorkOrdersToExcel = () => {
  const orders = JSON.parse(localStorage.getItem('automax-workorders') || '[]');
  
  if (orders.length === 0) {
    alert('⚠️ No hay órdenes de trabajo para exportar');
    return;
  }

  const data = orders.map((order, index) => ({
    'N°': index + 1,
    'Orden #': order.orderNumber || 'N/A',
    'Cliente': order.customer || 'N/A',
    'Vehículo': order.vehicle || 'N/A',
    'Servicio': order.service || 'N/A',
    'Mecánico': order.mechanic || 'N/A',
    'Fecha Inicio': order.date || 'N/A',
    'Estado': order.status || 'N/A',
    'Total': order.total ? `$${order.total.toLocaleString('es-CL')}` : 'N/A',
    'Notas': order.notes || ''
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Órdenes de Trabajo');

  const colWidths = [
    { wch: 5 },  // N°
    { wch: 12 }, // Orden #
    { wch: 20 }, // Cliente
    { wch: 20 }, // Vehículo
    { wch: 25 }, // Servicio
    { wch: 20 }, // Mecánico
    { wch: 12 }, // Fecha
    { wch: 12 }, // Estado
    { wch: 15 }, // Total
    { wch: 30 }  // Notas
  ];
  ws['!cols'] = colWidths;

  const fileName = `AutoMax_Ordenes_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  
  alert(`✅ Órdenes exportadas: ${fileName}\n${orders.length} órdenes exportadas`);
};

/**
 * Exportar TODO a un solo archivo Excel con múltiples hojas
 */
export const exportAllDataToExcel = () => {
  const appointments = JSON.parse(localStorage.getItem('automax-appointments') || '[]');
  const cart = JSON.parse(localStorage.getItem('automax-cart') || '[]');
  const orders = JSON.parse(localStorage.getItem('automax-workorders') || '[]');

  const wb = XLSX.utils.book_new();
  let sheetsAdded = 0;

  // Hoja 1: Citas
  if (appointments.length > 0) {
    const appointmentsData = appointments.map((apt, index) => ({
      'N°': index + 1,
      'Cliente': apt.customer?.name || 'N/A',
      'Email': apt.customer?.email || 'N/A',
      'Teléfono': apt.customer?.phone || 'N/A',
      'Servicio': apt.service || 'N/A',
      'Fecha': apt.date || 'N/A',
      'Hora': apt.time || 'N/A',
      'Precio': apt.price ? `$${apt.price.toLocaleString('es-CL')}` : 'N/A',
      'Estado': apt.status || 'Programada',
      'Comentarios': apt.comments || ''
    }));
    const wsAppointments = XLSX.utils.json_to_sheet(appointmentsData);
    XLSX.utils.book_append_sheet(wb, wsAppointments, 'Citas');
    sheetsAdded++;
  }

  // Hoja 2: Carrito
  if (cart.length > 0) {
    const cartData = cart.map((item, index) => ({
      'N°': index + 1,
      'Servicio/Producto': item.title || 'N/A',
      'Tipo': item.type || 'N/A',
      'Precio Unitario': `$${item.price.toLocaleString('es-CL')}`,
      'Cantidad': item.quantity,
      'Subtotal': `$${(item.price * item.quantity).toLocaleString('es-CL')}`
    }));
    const wsCart = XLSX.utils.json_to_sheet(cartData);
    XLSX.utils.book_append_sheet(wb, wsCart, 'Carrito');
    sheetsAdded++;
  }

  // Hoja 3: Órdenes de Trabajo
  if (orders.length > 0) {
    const ordersData = orders.map((order, index) => ({
      'N°': index + 1,
      'Orden #': order.orderNumber || 'N/A',
      'Cliente': order.customer || 'N/A',
      'Vehículo': order.vehicle || 'N/A',
      'Servicio': order.service || 'N/A',
      'Estado': order.status || 'N/A',
      'Total': order.total ? `$${order.total.toLocaleString('es-CL')}` : 'N/A'
    }));
    const wsOrders = XLSX.utils.json_to_sheet(ordersData);
    XLSX.utils.book_append_sheet(wb, wsOrders, 'Órdenes');
    sheetsAdded++;
  }

  // Hoja 4: Resumen
  const summary = [
    { 'Módulo': 'Citas Programadas', 'Cantidad': appointments.length },
    { 'Módulo': 'Items en Carrito', 'Cantidad': cart.length },
    { 'Módulo': 'Órdenes de Trabajo', 'Cantidad': orders.length },
    { 'Módulo': '', 'Cantidad': '' },
    { 'Módulo': 'Fecha de Exportación', 'Cantidad': new Date().toLocaleString('es-CL') }
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summary);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Resumen');
  sheetsAdded++;

  if (sheetsAdded === 1) { // Solo resumen
    alert('⚠️ No hay datos para exportar');
    return;
  }

  const fileName = `AutoMax_Backup_Completo_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(wb, fileName);
  
  alert(`✅ Backup completo exportado: ${fileName}\n\nContenido:\n- ${appointments.length} citas\n- ${cart.length} items en carrito\n- ${orders.length} órdenes`);
};

