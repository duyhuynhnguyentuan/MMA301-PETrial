// src/context/FavoritesContext.js
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Create context to use to save state across component trees
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  // Save as id
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      // Retrieve data from AsyncStorage and set it to state (getItem)
      const storedFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
      setFavorites(storedFavorites);
    };
    fetchFavorites();
  }, []);

  const toggleFavorite = async (id) => {
    // Retrieve data from AsyncStorage and update it (setItem)
    const currentFavorites = JSON.parse(await AsyncStorage.getItem('favorites')) || [];
    let updatedFavorites;
    // Search in the list of favorites; if the id exists, filter it out, otherwise add it
    if (currentFavorites.includes(id)) {
      updatedFavorites = currentFavorites.filter(favId => favId !== id);
    } else {
      updatedFavorites = [...currentFavorites, id];
    }
    // Set the updated favorites list in AsyncStorage
    await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  const clearAll = async () => {
    // Clear all favorites from AsyncStorage and state
    await AsyncStorage.removeItem('favorites');
    setFavorites([]);
  };

  return (
    // Set favorites and toggleFavorite to update state when there are changes between components
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, clearAll }}>
      {children}
    </FavoritesContext.Provider>
  );
};
