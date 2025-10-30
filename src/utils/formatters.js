/**
 * Utilidades para formateo de datos
 * Centraliza funciones de formateo reutilizables
 */

/**
 * Formatea un número como precio en pesos chilenos
 * @param {number} price - Precio a formatear
 * @returns {string} Precio formateado (ej: "$25.000")
 */
export const formatPrice = (price) => {
  if (typeof price !== 'number') return '$0';
  return `$${price.toLocaleString('es-CL')}`;
};

/**
 * Formatea una fecha a formato local
 * @param {Date|string} date - Fecha a formatear
 * @returns {string} Fecha formateada
 */
export const formatDate = (date) => {
  if (!date) return '';
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('es-CL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Formatea una hora
 * @param {Date|string} time - Hora a formatear
 * @returns {string} Hora formateada (ej: "14:30")
 */
export const formatTime = (time) => {
  if (!time) return '';
  const timeObj = typeof time === 'string' ? new Date(time) : time;
  return timeObj.toLocaleTimeString('es-CL', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Genera un número de orden único
 * @returns {string} Número de orden (ej: "ORD-20251030-1234")
 */
export const generateOrderNumber = () => {
  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000);
  return `ORD-${año}${mes}${dia}-${random}`;
};

/**
 * Trunca un texto a cierta longitud
 * @param {string} text - Texto a truncar
 * @param {number} maxLength - Longitud máxima
 * @returns {string} Texto truncado
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
};

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} true si es válido
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida un teléfono chileno
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} true si es válido
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+?56)?[2-9]\d{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Capitaliza la primera letra de cada palabra
 * @param {string} text - Texto a capitalizar
 * @returns {string} Texto capitalizado
 */
export const capitalizeWords = (text) => {
  if (!text) return '';
  return text.toLowerCase().replace(/\b\w/g, char => char.toUpperCase());
};

