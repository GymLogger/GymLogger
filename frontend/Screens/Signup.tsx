import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useGetUsersQuery } from "../src/generated/graphql";

const Signup = () => {
  const { data, loading } = useGetUsersQuery();

  const [users, setUsers] = useState(Array<any>);

  useEffect(() => {
    if (data) {
      setUsers(data.getUsers);
    }
    console.log("data: ", data);
  }, [data]);
  return (
    <ScrollView>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>This is a Signup Screen</Text>
      </View>
      {users.map((user, index) => (
        <Text key={index}>{user.id}</Text>
      ))}
    </ScrollView>
  );
};
export default Signup;
