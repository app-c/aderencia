import React from "react";
import { Box, Button, FlatList, HStack, Text } from "native-base";
import Async from "@react-native-async-storage/async-storage";
import { ActivityIndicator, Dimensions } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { Header } from "../../Components/header";
import { Relat } from "../../Components/realat";
import { pdf } from "../../utils/pdf";
import { useAuth } from "../../hooks/AuthContext";
import ht from "../../../pdf.html";

interface PropsAderenceia {
  descricao: string;
  nota: string;
  id: string;
  check: boolean;
}

export function Relatorio() {
  const { user } = useAuth();
  const w = Dimensions.get("window").width;
  const [data, setData] = React.useState<PropsAderenceia[]>([]);
  const [load, setLoad] = React.useState(true);

  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const loadData = React.useCallback(async () => {
    await Async.getItem("ad")
      .then((h) => {
        const response = h ? JSON.parse(h) : [];

        setData(response);
      })
      .catch((h) => console.log(h))
      .finally(() => setLoad(false));
  }, []);

  React.useEffect(() => {
    loadData();
  }, [loadData]);

  //! ! PDF
  const html = ``;

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  const print = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url, // iOS only
    });
  };

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({ html });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  if (load) {
    return <ActivityIndicator />;
  }

  return (
    <Box>
      <Header name="GERAR RELATÓRIO" />
      <Box p="5">
        <HStack justifyContent="space-between">
          <Text>item</Text>
          <Text>descricao</Text>
          <Text>situcao</Text>
        </HStack>

        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          style={{ height: w * 1.4 }}
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={(h) => h.id}
          renderItem={({ item: h }) => (
            <Box>
              <Relat
                item={h.id}
                descricao={h.descricao}
                situacao={h.check ? "FEITO" : "NÃO FEZ"}
              />
            </Box>
          )}
        />
      </Box>
      <Button onPress={print}>GERAR</Button>
    </Box>
  );
}
