import React, { useContext, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { AuthContext } from "../src/context/AuthContext";
import {
  useByeQuery,
  useGetUsersQuery,
  useMeQuery,
} from "../src/generated/graphql";
import { StackNavigationProp } from "@react-navigation/stack";
import { Props, RootStackParamList } from "../types";
import { useNavigation } from "@react-navigation/native";

const Testing = ({ route, navigation }: Props) => {
  const { data, loading } = useGetUsersQuery();

  const { data: dataMe, loading: loadingMe } = useMeQuery();

  const [users, setUsers] = useState(Array<any>);
  const { login } = useContext(AuthContext);
  const { navigate } = useNavigation<StackNavigationProp<RootStackParamList>>();

  const { logout } = useContext(AuthContext);
  const { data: dataBye } = useByeQuery();

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
  }, [data]);

  useEffect(() => {
    console.log("dataMe: ", dataMe);
  }, [dataMe]);

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
      {/* <Text>
        {!!dataMe.me ? <Text>{dataMe.me.id}</Text> : <Text>no ID</Text>}
      </Text> */}
      {dataBye ? <Text>{dataBye.bye}</Text> : <Text>noBye</Text>}
    </ScrollView>
  );
};
export default Testing;
