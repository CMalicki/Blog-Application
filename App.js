import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./app/screens/Home";
import Post from "./app/components/Post";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Main screen", headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            title: "",
            headerBackVisible: true,
            headerTransparent: true,
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
