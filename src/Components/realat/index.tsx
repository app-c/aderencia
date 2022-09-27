import React from "react";
import { Box, Center, HStack, Text } from "native-base";
import { Dimensions, View } from "react-native";

interface Props {
  item: string;
  descricao: string;
  situacao: string;
}

export function Relat({ item, descricao, situacao }: Props) {
  const w = Dimensions.get("window").width;
  return (
    <Box>
      <HStack mt="5">
        <Center>
          <Text>{item}</Text>
        </Center>

        <Box ml={w * 0.1} w={230}>
          <Text textAlign="left">{descricao}</Text>
        </Box>

        <Center ml={w * 0.03}>
          <Text>{situacao}</Text>
        </Center>
      </HStack>

      <Box mt="1" w="100%" h="1" backgroundColor="dark.100" />
    </Box>
  );
}
