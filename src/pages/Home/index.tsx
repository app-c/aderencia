/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, FlatList, Text } from "native-base";
import fire from "@react-native-firebase/firestore";
import { Alert, Dimensions } from "react-native";
import uid from "uuid";
import Async from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Card } from "../../Components/card";
import { aderencias } from "../../utils/aderencia";
import { Header } from "../../Components/header";
import { useAuth } from "../../hooks/AuthContext";

interface PropsAderenceia {
  descricao: string;
  nota: string;
  id: string;
  check: boolean;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export function Home() {
  const { user } = useAuth();
  const w = Dimensions.get("window").width;

  const [data, setData] = React.useState<PropsAderenceia[]>([]);
  const [check, setCheck] = React.useState(false);

  // !! NOTIFICATION
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // useEffect(() => {
  //   notificationListener.current =
  //     Notifications.addNotificationReceivedListener((notification) => {
  //       setNotification(notification);
  //     });

  //   responseListener.current =
  //     Notifications.addNotificationResponseReceivedListener((response) => {
  //       console.log(response);
  //     });

  //   return () => {
  //     Notifications.removeNotificationSubscription(
  //       notificationListener.current
  //     );
  //     Notifications.removeNotificationSubscription(responseListener.current);
  //   };
  // }, []);

  console.log(notification);

  const PushAlertas = React.useCallback(async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got mail! 📬",
        body: "Here is the notification body",
        data: { data: "goes here" },
      },
      trigger: { seconds: 2 },
    });
    await Async.removeItem("ad");
  }, []);

  const loadDados = React.useCallback(async () => {
    const ad = aderencias.map((h, i) => {
      return {
        ...h,
        id: String(i),
        check: false,
      };
    });

    const rs = await Async.getItem("ad");

    const response = rs ? JSON.parse(rs) : ad;
    setData(response);
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadDados();
    }, [check])
  );

  const handleCheck = React.useCallback(
    async (id: string, descricao: string, nota: string, ck: boolean) => {
      const adIndex = data.findIndex((h) => h.id === id);

      const dados = {
        id,
        descricao,
        nota,
        check: !ck,
      };

      data[adIndex] = dados;

      await Async.setItem("ad", JSON.stringify(data));
      setCheck(!check);
    },
    [check, data]
  );

  return (
    <Box bg="dark.300">
      <Header name={user.nome} />
      <Box p="5">
        <Button onPress={PushAlertas} w={w * 0.4}>
          INICIAR TAREFAS
        </Button>
        <Box mt="5">
          <FlatList
            contentContainerStyle={{ paddingBottom: 400 }}
            data={data}
            keyExtractor={(h) => String(h.id)}
            renderItem={({ item: h }) => (
              <Box>
                <Card
                  pres={() => handleCheck(h.id, h.descricao, h.nota, h.check)}
                  check={h.check}
                  text={h.descricao}
                />
              </Box>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
}
