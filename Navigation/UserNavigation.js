import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TicketingScreen from "../screens/TicketingScreen";
import CardScreen from "../screens/TicketingScreen/Card";
// import ChoosePlans from "../screens/plans/choosePlans";
// import ChoosePricePlans from "../screens/plans/choosePricePlan";
// import ChoosePlanCalender from "../screens/plans/choosePlanCalender";
import CategoriesPage from "../screens/category/categoriesPage";
import ImagePreviewScreen from "../screens/TicketingScreen/ImagePreviewScreen";
import CardPaymentPage from "../screens/TicketingScreen/cardPaymentPage";
import DownloadFilesPage from "../screens/TicketingScreen/downloadFilesPage";
const Stack = createNativeStackNavigator();

export default function UserNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={TicketingScreen} />
      <Stack.Screen name="card" component={CardScreen} />
      {/* <Stack.Screen name="ChoosePlan" component={ChoosePlans} />
      <Stack.Screen name="ChoosePricePlan" component={ChoosePricePlans} />
      <Stack.Screen name="ChoosePlanCalender" component={ChoosePlanCalender} /> */}
      <Stack.Screen name="Categories" component={CategoriesPage} />
      <Stack.Screen name="ImagePreview" component={ImagePreviewScreen} />
      <Stack.Screen name="cardPayment" component={CardPaymentPage} />
      <Stack.Screen name="DownloadFile" component={DownloadFilesPage} />
    </Stack.Navigator>
  );
}