import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../src/context/AuthContext";
import { useGetUsersQuery } from "../src/generated/graphql";
import { StackNavigationProp } from "@react-navigation/stack";
import { Props, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

const Testing = ({ route, navigation }: Props) => {
  const { data, loading } = useGetUsersQuery();

  const [users, setUsers] = useState(Array<any>);
  const { login } = useContext(AuthContext);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [data]);

  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>You are logged in</Text>
      </View>
      {users.map((user, index) => (
        <Text key={index}>{user.id}</Text>
      ))}
      <TouchableOpacity onPress={() => logout()}>
        <Text>Move back Signup Screen and log out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
export default Testing;
