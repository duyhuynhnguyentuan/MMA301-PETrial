import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, SectionList, StyleSheet } from 'react-native';
// Uncomment the next line to use FlatList instead of SectionList
import { FlatList } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FavoritesContext } from '../context/FavoritesContext';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  useEffect(() => {
    axios.get('https://667a8dfbbd627f0dcc8f7e00.mockapi.io/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => console.error(error));
  }, []);

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

  const renderItem = ({ item }) => {
    const isFavorite = favorites.includes(item.id);
    const categoryName = getCategoryName(item.id);

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

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  return (
    // Use SectionList to display orchids grouped by categories
    <SectionList
      sections={categories.map(category => ({
        title: category.title,
        data: category.data,
      }))}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
    />
    // Uncomment the next lines to use FlatList instead of SectionList
    
    // <FlatList
    //   data={categories.map(category => category.data).flat()}
    //   renderItem={renderItem}
    //   keyExtractor={item => item.id.toString()}
    //   contentContainerStyle={styles.container}
    // />
    
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  sectionHeader: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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

export default HomeScreen;
