import React, { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Image, StyleSheet } from "react-native";

// Replace with Axios if you want
// import axios from "axios";

const HomeScreen = () => {
  const [search, setSearch] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);  // Store all recipes from the API

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Fetch the meals from TheMealDB API
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data to see the structure
        setAllRecipes(data.meals); // Set the meals data from the API
        setFilteredRecipes(data.meals); // Initially, show all recipes
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  useEffect(() => {
    // Filter recipes based on the search input
    const results = allRecipes.filter((recipe) =>
      recipe.strMeal.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredRecipes(results); // Update the filtered recipes
  }, [search, allRecipes]); // Re-run when search or allRecipes changes

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipe App</Text>
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
          keyExtractor={(item) => item.idMeal.toString()} // Use idMeal as unique key
          renderItem={({ item }) => (
            <View style={styles.recipeCard}>
              <Image source={{ uri: item.strMealThumb }} style={styles.image} />
              <Text style={styles.recipeTitle}>{item.strMeal}</Text>
            </View>
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
  recipeTitle: { fontSize: 18, fontWeight: "bold", marginTop: 5 }
});

export default HomeScreen;
