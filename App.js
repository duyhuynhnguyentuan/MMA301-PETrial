import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import FavoriteScreen from './src/screens/FavoriteScreen';
import TopOfTheWeek from './src/screens/TopOfTheWeekScreen';
import DetailScreen from './src/screens/DetailScreen';
import { FavoritesProvider } from './src/context/FavoritesContext';


const HomeStack = createStackNavigator();
const FavoriteStack = createStackNavigator();
const TopOfTheWeekStack = createStackNavigator();


function HomeStackScreen(){
  return(
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <HomeStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </HomeStack.Navigator>
  )
}

function FavoriteStackScreen(){
  return(
  <FavoriteStack.Navigator>
    <FavoriteStack.Screen
      name="FavoriteScreen"
      component={FavoriteScreen}
      options={{headerShown: false}}
    />
    <FavoriteStack.Screen
      name="DetailScreen"
      component={DetailScreen}
      options={{headerShown: false}}
    />
  </FavoriteStack.Navigator>
  )
}
function TopOfTheDamnWeekStackScreen(){
  return(
    <TopOfTheWeekStack.Navigator>
      <TopOfTheWeekStack.Screen
        name="TopOfTheWeek"
        component={TopOfTheWeek}
        options={{headerShown: false}}
      />
      <TopOfTheWeekStack.Screen
        name="DetailScreen"
        component={DetailScreen}
        options={{headerShown: false}}
      />
    </TopOfTheWeekStack.Navigator>
  )
}
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <FavoritesProvider>
    <NavigationContainer>
              <Tab.Navigator
               //icon theo từng route
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                      iconName = 'home';
                    } else if (route.name === 'Favorites') {
                      iconName = 'heart';
                    } else if (route.name === 'TopOfTheDamnWeek') {
                      iconName = 'list';
                    } 
                    return <Icon name={iconName} size={size} color={color} />;
                  },
                })}
              >
                <Tab.Screen
                  name="Home" 
                  component={HomeStackScreen} 
                />
                <Tab.Screen 
                  name="Favorites" 
                  component={FavoriteStackScreen} 
                />
                <Tab.Screen 
                  name="TopOfTheDamnWeek" 
                  component={TopOfTheDamnWeekStackScreen} 
                />
              </Tab.Navigator>
            </NavigationContainer>
            </FavoritesProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
