import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert, Button } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';
import Icon from 'react-native-vector-icons/Ionicons';

const TopOfTheWeek = () => {
  const [orchids, setOrchids] = useState([]);
  const [categories, setCategories] = useState([]);
  const { favorites, toggleFavorite, clearAll } = useContext(FavoritesContext);
  const navigation = useNavigation();

  useEffect(() => {
    axios.get('https://667a8dfbbd627f0dcc8f7e00.mockapi.io/categories')
      .then(response => {
        const data = response.data.map(category => category.data).flat();
        const favoriteOrchids = data.filter(item => item.isTopOfTheWeek === "true");
        const sortedOrchids = favoriteOrchids.sort((a, b) => a.price - b.price); // Sort by price in ascending order
        setOrchids(sortedOrchids);
        setCategories(response.data);
      })
      .catch(error => console.error(error));
  }, [favorites]);

  const getCategoryName = (itemId) => {
    for (let category of categories) {
      for (let item of category.data) {
        if (item.id === itemId) {
          return category.title;
        }
      }
    }
    return '';
  };

  const handleRemoveFavorite = (id) => {
    Alert.alert(
      "Remove Favorite",
      "Are you sure you want to remove this orchid from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Remove",
          onPress: () => toggleFavorite(id),
          style: "destructive"
        }
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      "Clear All Favorites",
      "Are you sure you want to remove all orchids from your favorites?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Clear All",
          onPress: () => clearAll(),
          style: "destructive"
        }
      ]
    );
  };

  const renderItem = ({ item }) => {
    const categoryName = getCategoryName(item.id);
    const isFavorite = favorites.includes(item.id);
    return (
      <TouchableOpacity onPress={() => navigation.navigate('DetailScreen', { item })}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.category}>{categoryName}</Text>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Icon name={isFavorite ? 'heart' : 'heart-outline'} size={24} color={isFavorite ? 'red' : 'gray'} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Clear All Favorites" onPress={handleClearAll} />
      {orchids.length > 0 ? (
      <FlatList
        data={orchids}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />) : (
        <Text style={{ textAlign: 'center', marginTop: 20, color: "red" }}>No favorites yet</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  listContainer: {
    paddingTop: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'space-between',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: 'gray',
  },
});

export default TopOfTheWeek;
