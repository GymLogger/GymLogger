import { Box } from "native-base";
import React from "react";

interface SingleSetProps {
  setNumber: number;
  weight: number;
  reps: number;
}

const SingleSet: React.FC<SingleSetProps> = ({
  setNumber,
  weight,
  reps,
}: SingleSetProps) => {
  return (
    <Box>
      <Box>{`set number: ${setNumber}, weight: ${weight}, reps: ${reps}`}</Box>
    </Box>
  );
};

export default SingleSet;
