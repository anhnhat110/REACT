// // import React, { createContext, useState } from "react";

// // export const CartContext = createContext();

// // export const CartProvider = ({ children }) => {
// //   const [cartItems, setCartItems] = useState([]);

// //   const addToCart = (item) => {
// //     setCartItems((prevItems) => {
// //       const existingItemIndex = prevItems.findIndex(
// //         (i) => i.id === item.id && i.size === item.size
// //       );
// //       if (existingItemIndex >= 0) {
// //         const updatedItems = [...prevItems];
// //         updatedItems[existingItemIndex].quantity += item.quantity;
// //         return updatedItems;
// //       }
// //       return [...prevItems, item];
// //     });
// //   };

// //   const removeFromCart = (id, size) => {
// //     setCartItems((prevItems) =>
// //       prevItems.filter((item) => !(item.id === id && item.size === size))
// //     );
// //   };

// //   const value = {
// //     cartItems,
// //     addToCart,
// //     removeFromCart,
// //   };

// //   return (
// //     <CartContext.Provider value={value}>{children}</CartContext.Provider>
// //   );
// // };
// import { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState(() => {
//     // Load initial state from localStorage if available
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   useEffect(() => {
//     // Save cart items to localStorage whenever they change
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   const addToCart = (item) => {
//     setCartItems((prevItems) => {
//       const existingItemIndex = prevItems.findIndex(
//         (i) => i.id === item.id && i.size === item.size
//       );
//       if (existingItemIndex >= 0) {
//         const updatedItems = [...prevItems];
//         updatedItems[existingItemIndex].quantity += item.quantity;
//         return updatedItems;
//       }
//       return [...prevItems, item];
//     });
//   };

//   const removeFromCart = (id, size) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => !(item.id === id && item.size === size))
//     );
//   };

//   const updatedCart = (id, size, quantity) => {
//     setCartItems((prevItems) => {
//       return prevItems.map((item) =>
//         item.id === id && item.size === size
//           ? { ...item, quantity }
//           : item
//       );
//     });
//   };

//   const value = {
//     cartItems,
//     addToCart,
//     removeFromCart,
//     updatedCart,
//   };

//   return (
//     <CartContext.Provider value={value}>{children}</CartContext.Provider>
//   );
// };
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (i) => i.id === item.id && i.size === item.size
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        toast.success(`Updated quantity of ${item.name}`);
        return updatedItems;
      }
      toast.success(`Added ${item.name} to cart`);
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const updatedCart = (id, size, quantity) => {
    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      );
    });
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updatedCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

