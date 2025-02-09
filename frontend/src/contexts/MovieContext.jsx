import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieContextProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error(e);
        localStorage.clear();
      }
    }
  }, []);

  // Save favorites to localStorage whenever the favorites state changes
  const updateFavorites = (favorites) => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  const addToFavorites = (movie) => {
    const newFavorites = [...favorites, movie];
    setFavorites(newFavorites);
    updateFavorites(newFavorites);
  };

  const removeFromFavorites = (movieId) => {
    const newFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(newFavorites);
    updateFavorites(newFavorites);
  };

  const isFavorite = (movieId) => {
    return favorites.some((movie) => movie.id === movieId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
