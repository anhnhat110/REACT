import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const FavContext = createContext();

export const FavProvider = ({ children }) => {
    const [favItems, setFavItems] = useState(() => {
      const savedFav = localStorage.getItem("favItems");
      return savedFav ? JSON.parse(savedFav) : [];
    });

    useEffect(() => {
      localStorage.setItem("favItems", JSON.stringify(favItems));
    }, [favItems]);

    const addToFav = (item) => {
      setFavItems((prevItems) => {
        const isExist = prevItems.some((i) => i.id === item.id);
        if (isExist) {
          toast.info(`${item.name} is already in your favorites`);
          return prevItems;
        }
        toast.success(`Added ${item.name} to favorites`);
        return [...prevItems, item];
      });
    };

    const removeFromFav = (id) => {
      setFavItems((prevItems) =>
        prevItems.filter((item) => item.id !== id)
      );
      toast.success(`Removed item from favorites`);
    };

    const value = {
      favItems,
      addToFav,
      removeFromFav,
    };

    return (
      <FavContext.Provider value={value}>{children}</FavContext.Provider>
    );
};