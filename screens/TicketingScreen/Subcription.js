import { View, Text } from "react-native";
import React from "react";
import ChoosePlans from "./plans/choosePlans";
import PickPlan from "./PickPlan";

const Subcription = ({ onsetdata }) => {
  return <PickPlan onsetdata={onsetdata} />;
};

export default Subcription;
