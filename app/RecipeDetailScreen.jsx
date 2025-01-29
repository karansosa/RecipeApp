import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

const RecipeDetailScreen = ({ route }) => {
  // Check if 'route.params' or 'recipe' is undefined
  const { recipe } = route.params || {};  // Default to an empty object if route.params is undefined

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Recipe not found</Text>
      </View>
    );
  }

  // Extract ingredients from the recipe data
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(recipe[`strIngredient${i}`]);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <Text style={styles.recipeTitle}>{recipe.strMeal}</Text>
      <Text style={styles.subtitle}>Cuisine/Area: {recipe.strArea}</Text>

      <Text style={styles.subtitle}>Ingredients:</Text>
      <View style={styles.ingredientsList}>
        {ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            - {ingredient}
          </Text>
        ))}
      </View>

      <Text style={styles.subtitle}>Instructions:</Text>
      <Text style={styles.instructions}>{recipe.strInstructions}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  image: { width: '100%', height: 250, borderRadius: 8 },
  recipeTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  subtitle: { fontSize: 18, marginTop: 15, fontWeight: 'bold' },
  ingredientsList: { marginTop: 10 },
  ingredient: { fontSize: 16, marginLeft: 10 },
  instructions: { fontSize: 16, marginTop: 10 },
});

export default RecipeDetailScreen;
