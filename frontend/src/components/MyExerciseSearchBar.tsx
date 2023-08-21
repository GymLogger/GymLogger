import { VStack, Box, Divider, Heading, Input, Icon } from "native-base";
import React from "react";

interface MyExerciseSearchBarProps {
  handleChange: (e: string) => void;
}

const MyExerciseSearchBar: React.FC<MyExerciseSearchBarProps> = ({
  handleChange,
}: MyExerciseSearchBarProps) => {
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
        onChangeText={handleChange}
      />
    </VStack>
  );
};

export default MyExerciseSearchBar;
