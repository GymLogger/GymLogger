import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Props, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../src/context/AuthContext";
import { useByeQuery, useLoginMutation } from "../src/generated/graphql";
import { setAccessToken } from "../src/accessToken";

const Login = ({ route, navigation }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  // const { login } = useContext(AuthContext);
  const { data, error } = useByeQuery();

  const [login] = useLoginMutation();
  // console.log("data: ", data);
  if (error) {
    console.log("error: ", error);
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is a Login Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Move to Signup Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={async () => {
          const response = await login({
            variables: { email: "Colin1", password: "Colin1" },
          });
          console.log("response: ", response);

          if (response && response.data) {
            setAccessToken(response.data.login.accessToken);
          }
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
      {/* {!loading && !!data && <Text>{data.bye}</Text>} */}
    </View>
  );
};
export default Login;
