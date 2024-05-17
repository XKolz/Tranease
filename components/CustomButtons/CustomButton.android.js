import React from "react";
import { Pressable, Text } from "react-native";

const CustomButton = ({ onPress, title }) => (
  <Pressable
    onPress={onPress}
    style={{
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#6d32a8",
      borderRadius: 5,
      padding: 10,
      marginBottom: 20,
    }}
  >
    <Text style={{ color: "white", fontSize: 18 }}>{title}</Text>
  </Pressable>
);

export default CustomButton;
