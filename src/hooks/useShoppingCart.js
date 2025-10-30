import { useState, useEffect } from 'react';

/**
 * Custom Hook para manejar el carrito de compras
 * @returns {Object} Funciones y estado del carrito
 */
export const useShoppingCart = () => {
  // Estado del carrito con persistencia en localStorage
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('automax-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Guardar en localStorage cada vez que cambia el carrito
  useEffect(() => {
    localStorage.setItem('automax-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Agregar un item al carrito
   * Si ya existe, incrementa la cantidad
   */
  const addToCart = (service) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.id === service.id && item.type === service.type
      );

      if (existingItem) {
        // Incrementar cantidad si ya existe
        return prevItems.map(item =>
          item.id === service.id && item.type === service.type
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Agregar nuevo item
        return [...prevItems, { ...service, quantity: 1 }];
      }
    });
  };

  /**
   * Eliminar un item específico del carrito
   */
  const removeFromCart = (itemId) => {
    setCartItems(prevItems => 
      prevItems.filter(item => item.id !== itemId)
    );
  };

  /**
   * Vaciar todo el carrito
   */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('automax-cart');
  };

  /**
   * Calcular el total del carrito
   */
  const getTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  };

  /**
   * Obtener cantidad total de items
   */
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => 
      total + item.quantity, 0
    );
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotal,
    getTotalItems
  };
};

export default useShoppingCart;

