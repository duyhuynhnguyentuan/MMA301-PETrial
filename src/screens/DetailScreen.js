// DetailScreen.js
import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FavoritesContext } from '../context/FavoritesContext';

const DetailScreen = ({ route }) => {
  const { item } = route.params;
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const isFavorite = favorites.includes(item.id);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.detail}>Weight: {item.weight}</Text>
          <Text style={styles.detail}>Price: ${item.price}</Text>
          <Text style={styles.detail}>Rating: {item.rating} / 5</Text>
          <Text style={styles.detail}>Color: {item.color}</Text> 
          <Text style={styles.detail}>Bonus: {item.bonus}</Text>
           <Text style={styles.detail}>Origin: {item.origin}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => toggleFavorite(item.id)}
        style={[styles.favoriteButton, { backgroundColor: isFavorite ? 'red' : 'green' }]}
      >
        <Text style={styles.favoriteButtonText}>
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  info: {
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  favoriteButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  favoriteButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DetailScreen;
