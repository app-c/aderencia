import React from "react";
import { Box, Button, Center, HStack, Input, Text, VStack } from "native-base";
import fire from "@react-native-firebase/auth";
import { useAuth } from "../../hooks/AuthContext";

export function SingIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = React.useState();
  const [senha, setSenha] = React.useState();

  const submit = React.useCallback(() => {
    signIn({
      email,
      senha,
    });
  }, [email, senha, signIn]);

  return (
    <Center bg="dark.200" p="10" flex="1">
      <Text color="dark.900">ENTRE COM SUA CONTA</Text>

      <VStack mt="10" space={5} w="100%">
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          color="dark.900"
          placeholder="ENTRE COM SEU EMAI"
          w="100%"
          onChangeText={setEmail}
        />

        <Input
          onChangeText={setSenha}
          color="dark.900"
          placeholder="ENTRE COM SUA SENHA"
        />
      </VStack>

      <Button onPress={submit} mt="10" w="200">
        ENTRAR
      </Button>
    </Center>
  );
}
