import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from "react-native";

const RecipesScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals);
        setFilteredRecipes(data.meals); // Initialize filtered recipes with all recipes
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    // Filter recipes based on the search input
    const results = recipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(results); // Update the filtered recipes
  }, [search, recipes]); // Re-run when search or recipes changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>All Recipes</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search recipes..."
        value={search}
        onChangeText={setSearch}
      />
      {filteredRecipes.length === 0 ? (
        <Text>No recipes found</Text>
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.idMeal.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recipeCard}
              onPress={() => {
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
  searchBar: { borderWidth: 1, padding: 10, borderRadius: 8, marginBottom: 10 },
  recipeCard: { padding: 10, marginBottom: 10, backgroundColor: "#f8f8f8", borderRadius: 8 },
  image: { width: "100%", height: 150, borderRadius: 8 },
  recipeTitle: { fontSize: 18, fontWeight: "bold", marginTop: 5 },
});

export default RecipesScreen;
