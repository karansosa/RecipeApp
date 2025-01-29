import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import RecipesScreen from "./RecipesScreen";
import RecipeDetailScreen from "./RecipeDetailScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Recipes" component={RecipesScreen} />
        <Tab.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      </Tab.Navigator>
  );
}


// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator(); // Create a Stack Navigator

// // Stack navigator for RecipesScreen and RecipeDetailScreen
// const RecipesStack = () => (
//   <Stack.Navigator>
//     <Stack.Screen name="Recipes" component={RecipesScreen} />
//     <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
//   </Stack.Navigator>
// );

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator>
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Recipes" component={RecipesStack} /> {/* This now handles both Recipes and RecipeDetail screens */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }




