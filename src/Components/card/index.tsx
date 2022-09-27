import React from "react";
import { Box, Center, Checkbox, HStack, Text, VStack } from "native-base";
import { Dimensions, TouchableOpacity } from "react-native";

interface Props {
  text: string;
  pres: () => void;
  check: boolean;
}

export function Card({ text, pres, check }: Props) {
  const w = Dimensions.get("window").width;

  return (
    <Box mt="2" p="2" borderRadius={10} bg={check ? "success.400" : "dark.600"}>
      <Text>{text}</Text>

      <Center w={w * 0.2} mt="5" borderRadius={5} px="1" bg="dark.300">
        <TouchableOpacity onPress={pres}>
          <Text color={check ? "success.200" : "dark.900"}>
            {check ? "uncheck" : "check"}
          </Text>
        </TouchableOpacity>
      </Center>
    </Box>
  );
}
