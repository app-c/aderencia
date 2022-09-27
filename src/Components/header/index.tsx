import React from "react";
import { Box, Center, HStack, Text } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";
import { useAuth } from "../../hooks/AuthContext";

interface Props {
  name: string;
}

export function Header({ name }: Props) {
  const { signOut } = useAuth();
  const w = Dimensions.get("window").width;
  return (
    <Box bg="dark.200" h={w * 0.25}>
      <Center top={w * 0.13}>
        <HStack space={w * 0.3}>
          <Text fontSize={18} color="dark.900">
            {name}
          </Text>
          <TouchableOpacity onPress={() => signOut()}>
            <Box px="5" borderRadius={5} bg="danger.400">
              <Text color="dark.900">sair</Text>
            </Box>
          </TouchableOpacity>
        </HStack>
      </Center>
    </Box>
  );
}
