import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketingScreen from "../screens/TicketingScreen";
import CardScreen from "../screens/TicketingScreen/Card";
import ChoosePlans from "../screens/plans/choosePlans";
import ChoosePricePlans from "../screens/plans/choosePricePlan";
import ChoosePlanCalender from "../screens/plans/choosePlanCalender";
const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="ChoosePricePlan"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={TicketingScreen} />
      <Stack.Screen name="card" component={CardScreen} />
      <Stack.Screen name="ChoosePlan" component={ChoosePlans} />
      <Stack.Screen name="ChoosePricePlan" component={ChoosePricePlans} />
      <Stack.Screen name="ChoosePlanCalender" component={ChoosePlanCalender}/>
    </Stack.Navigator>
  );
}
