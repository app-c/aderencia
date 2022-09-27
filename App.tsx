import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider } from "native-base";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppProvider from "./src/hooks";
import { Route } from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Box flex="1">
          <AppProvider>
            <Route />
          </AppProvider>
        </Box>
        <StatusBar />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
