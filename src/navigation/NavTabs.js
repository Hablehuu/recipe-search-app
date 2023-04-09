import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RecipeScreen from '../components/RecipeScreen'
import HomeScreen from '../components/Home'
import SearchScreen from '../components/Ingredients'
const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator();

function NavTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen}/> 
      <Tab.Screen name="Search" component={SearchScreen} />
    </Tab.Navigator>
  )
}


function RecipeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="navtabs" component={NavTabs} options={{ headerShown: false }} />
      <Stack.Screen name="recipeScreen" component={RecipeScreen} />
      {/* <Stack.Screen name="Home" component={HomeScreen}/> */}
      
    </Stack.Navigator>
  );
}

export default RecipeStack;