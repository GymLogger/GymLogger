import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Props, RootStackParamList } from "../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthContext } from "../src/context/AuthContext";

const Login = ({ route, navigation }: Props) => {
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { login } = useContext(AuthContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>This is a Login Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text>Move to Signup Screen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          login();
        }}
      >
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
