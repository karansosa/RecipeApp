import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView 
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const [recipes, setRecipes] = useState([]);
  const cuisines = [
    { name: "Italian", image: "https://www.themealdb.com/images/category/pasta.png" },
    { name: "Indian", image: "https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg" },
    { name: "Mexican", image: "https://www.themealdb.com/images/category/side.png" },
    { name: "Chinese", image: "https://www.themealdb.com/images/category/starter.png" },
  ];

  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data.meals.slice(0, 5)); // Show only 5 featured recipes
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>Welcome to Recipe World</Text>
      <Text style={styles.description}>
        Discover delicious recipes from around the world and explore different cuisines.
      </Text>

      {/* Recipe Carousel */}
      <Text style={styles.sectionTitle}>Featured Recipes</Text>
      <FlatList
        data={recipes}
        horizontal
        keyExtractor={(item) => item.idMeal.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.carouselCard} 
            onPress={() => navigation.navigate("RecipeDetail", { recipe: item })}
          >
            <Image source={{ uri: item.strMealThumb }} style={styles.carouselImage} />
            <Text style={styles.carouselText}>{item.strMeal}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Cuisine Categories */}
      <Text style={styles.sectionTitle}>Explore Cuisines</Text>
      <View style={styles.cuisineContainer}>
        {cuisines.map((cuisine, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.cuisineCard} 
          >
            <Image source={{ uri: cuisine.image }} style={styles.cuisineImage} />
            <Text style={styles.cuisineText}>{cuisine.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  description: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#555" },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10, marginTop: 20 },
  
  // Carousel styles
  carouselCard: { marginRight: 15, width: 200 },
  carouselImage: { width: "100%", height: 130, borderRadius: 8 },
  carouselText: { fontSize: 16, fontWeight: "bold", marginTop: 5 },

  // Cuisine styles
  cuisineContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  cuisineCard: { width: "48%", padding: 10, backgroundColor: "#f8f8f8", borderRadius: 8, alignItems: "center", marginBottom: 10 },
  cuisineImage: { width: 80, height: 80, borderRadius: 40 },
  cuisineText: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
});

export default HomeScreen;
