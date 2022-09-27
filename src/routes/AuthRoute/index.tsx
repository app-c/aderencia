import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../pages/Home";
import { Relatorio } from "../../pages/Relatoria";

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthRoute() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen component={Home} name="Home" />

      <Screen component={Relatorio} name="Relatorio" />
    </Navigator>
  );
}
