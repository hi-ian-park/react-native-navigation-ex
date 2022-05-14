import React from "react";
import { Text, TouchableOpacity } from "react-native";

const Movie = ({ route, navigation: { navigate } }) => {
  return (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <Text style={{ fontSize: 80 }}>Movie</Text>
    </TouchableOpacity>
  );
};

export default Movie;
