import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from "react-native";

const RecipesScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Recipes</Text>
      {recipes && recipes.length === 0 ? (
        <Text>No recipes found</Text>
      ) : (
        <FlatList data={recipes} keyExtractor={(item) => item.idMeal.toString()} renderItem={({ item }) => 
            (<TouchableOpacity style={styles.recipeCard} onPress={() => {
                // Navigate to RecipeDetailScreen with the selected recipe data
                navigation.navigate('RecipeDetail', { recipe: item });
              }}
            >
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.recipeTitle}>{item.strMeal}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  recipeCard: { padding: 10, marginBottom: 10, backgroundColor: "#f8f8f8", borderRadius: 8 },
  image: { width: "100%", height: 150, borderRadius: 8 },
  recipeTitle: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
});

export default RecipesScreen;
