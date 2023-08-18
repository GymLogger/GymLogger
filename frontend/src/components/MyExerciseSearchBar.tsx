import { VStack, Box, Divider, Heading, Input, Icon } from "native-base";
import React from "react";

interface MyExerciseSearchBarProps {}

const MyExerciseSearchBar: React.FC<MyExerciseSearchBarProps> = ({}) => {
  return (
    <VStack w="100%" space={5} alignSelf="center">
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        height="8"
        borderRadius="10"
        py="1"
        px="2"
        InputLeftElement={<Icon ml="2" size="6" color="gray.400" />}
      />
    </VStack>
  );
};

export default MyExerciseSearchBar;
