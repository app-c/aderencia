import React from "react";
import { ActivityIndicator } from "react-native";
import { useAuth } from "../hooks/AuthContext";
import { SingIn } from "../pages/signIn";
import { AuthRoute } from "./AuthRoute";

export function Route() {
  const { user, loading } = useAuth();
  if (loading) {
    return <ActivityIndicator />;
  }

  return user ? <AuthRoute /> : <SingIn />;
}
