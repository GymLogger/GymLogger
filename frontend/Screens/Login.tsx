import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Props, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../src/context/AuthContext";
import { useByeQuery, useLoginMutation } from "../src/generated/graphql";
import { setAccessToken } from "../src/accessToken";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ route, navigation }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { login } = useContext(AuthContext);
  const { data, error } = useByeQuery();

  const [loginApollo] = useLoginMutation();
  // console.log("data: ", data);
  if (error) {
    console.log("error: ", error);
  }

  const [testToken, setTestToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then((x) =>
      console.log("userToken from async: ", x)
    );
  }, []);

  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
  return (
    <>
      <View style={{ alignItems: "center", paddingTop: "20%" }}>
        <Text>Welcome to the fitness app!</Text>
      </View>
      <SafeAreaView>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="email"
        />
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="password"
        />
      </SafeAreaView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          <Button
            title="Login"
            onPress={async () => {
              const response = await loginApollo({
                variables: { email: email, password: password },
              });
              console.log("response: ", response);

              if (response && response.data) {
                setAccessToken(response.data.login.accessToken);
                login(response.data.login.accessToken);
              }
            }}
          />
          <Button
            title="Register"
            onPress={() => Alert.alert("Simple Button pressed")}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text>Move to Signup Screen</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            const response = await loginApollo({
              variables: { email: email, password: password },
            });
            console.log("response: ", response);

            if (response && response.data) {
              setAccessToken(response.data.login.accessToken);
              login(response.data.login.accessToken);
            }
          }}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        {/* {!loading && !!data && <Text>{data.bye}</Text>} */}
      </View>
    </>
  );
};
export default Login;
