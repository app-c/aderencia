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

  const ponts = data
    .filter((h) => h.check === true)
    .reduce((ac, i) => {
      return ac + Number(i.nota);
    }, 0);

  console.log(ponts);
  //! ! PDF
  const html = `
  <html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <div>

        <h1 style="font-size: 40px; font-family: Helvetica Neue; font-weight: normal;">
          WILLIAM
        </h1>

        <div
          style="display: flex; justify-content: space-between; padding: 20px; ;"
        >
          ${(<h1>TEXTO</h1>)}
          <h1>item</h1>
          <h1>descrição</h1>
          <h1>situação</h1>
        </div>

        <div
          style="background-color: yellow;display: flex; justify-content: space-between; padding: 20px; align-items: center ; box-sizing: border-box;"
        >
          <h1>item</h1>

          <div style="
                background-color: red;
                text-align: center;
                box-sizing: border-box;
                color: black;
                max-width: 400px;
              " 
            
            />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus id voluptate sunt maiores ipsa recusandae sint laboriosam obcaecati in, velit et molestias laudantium quos aperiam vero aspernatur quisquam fugit? Eligendi.</p>

          </div>

          <h1>FEITO</h1>

        </div>
        <h1>my list</h1>
        <ul id="myList" ></ul>
    </div>

    <script>
      let data = ["Ram", "Shyam", "Sita", "Gita"];
      
      let list = document.getElementById("myList");

      data.forEach((item) => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
      });
    </script>

  </body>
</html>
  `;

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
          style={{ height: w * 1.25 }}
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
        <Text mt="10" fontSize={16} bold>
          Total de pontos: {ponts}
        </Text>
      </Box>
      <Button onPress={print}>GERAR</Button>
    </Box>
  );
}
