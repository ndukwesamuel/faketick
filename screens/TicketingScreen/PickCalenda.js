// import React, { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   ActivityIndicator,
//   Alert,
// } from "react-native";
// import {
//   StripeProvider,
//   usePaymentSheet,
//   useStripe,
// } from "@stripe/stripe-react-native";
// import Checkbox from "expo-checkbox";
// import backArrowIcon from "../../assets/left-arrow.png";
// import { useNavigation } from "@react-navigation/native";
// import Toast from "react-native-toast-message";
// import axios from "axios";
// import { useMutation } from "react-query";
// import { useDispatch, useSelector } from "react-redux";
// const API_BASEURL = "https://ticketing-backend-qt14.onrender.com/api/";

// const PickCalenda = ({ maindata, close }) => {
//   //   const { selectedPlan } = route?.params;
//   console.log({
//     mnmn: maindata,
//   });
//   let selectedPlan = maindata;

//   //   console.log({ xcx: selectedMonths });

//   const [selectedMonths, setSelectedMonths] = useState({});
//   const navigation = useNavigation();
//   const { subscription_data, user_data } = useSelector((state) => state?.Auth);
//   const dispatch = useDispatch();

//   const months = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];

//   useEffect(() => {
//     Month_Mutation.mutate();
//   }, []);

//   const Month_Mutation = useMutation(
//     (data_info) => {
//       const url = `${API_BASEURL}available-months`;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${user_data?.token}`,
//         },
//       };
//       return axios.post(url, { months }, config);
//     },
//     {
//       onSuccess: (success) => {
//         console.log({
//           ememka: success?.data,
//         });
//         // const { overlapped } = success?.data || {};
//         // if (Array.isArray(overlapped) && overlapped.length > 0) {
//         //   const initialSelectedMonths = overlapped.reduce((acc, month) => {
//         //     acc[month] = true; // Mark months in the `overlapped` array as checked
//         //     return acc;
//         //   }, {});

//         //   console.log({ xcx: initialSelectedMonths });
//         //   setSelectedMonths(initialSelectedMonths);
//         // } else {
//         //   setSelectedMonths({}); // Clear all selections if `overlapped` is empty
//         // }

//         Toast.show({
//           type: "success",
//           text1: `${success?.data?.message}`,
//         });
//       },
//       onError: (error) => {
//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.error?.message}`,
//         });
//       },
//     }
//   );

//   const payformont_Mutation = useMutation(
//     (data_info) => {
//       const url = `${API_BASEURL}create-payment-intent`;
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//           Authorization: `Bearer ${user_data?.token}`,
//         },
//       };
//       return axios.post(url, data_info, config);
//     },
//     {
//       onSuccess: (success) => {
//         checkout(success?.data);
//         // Toast.show({
//         //   type: "success",
//         //   text1: `${success?.data?.message}`,
//         // });
//         // dispatch(checkOtp(true));
//       },
//       onError: (error) => {
//         Toast.show({
//           type: "error",
//           text1: `${error?.response?.data?.message}`,
//         });
//       },
//     }
//   );

//   const { initPaymentSheet, presentPaymentSheet } = useStripe();

//   const checkout = async (data) => {
//     // 2. Initialize the Payment sheet
//     const initResponse = await initPaymentSheet({
//       merchantDisplayName: "Tiketing",
//       paymentIntentClientSecret: data?.clientSecret,
//     });
//     if (initResponse.error) {
//       Alert.alert("Something went wrong");
//       return;
//     }

//     // 3. Present the Payment Sheet from Stripe
//     const { error } = await presentPaymentSheet();

//     if (error) {
//       Alert.alert(`Payment Failed: ${error.code}`, error.message);
//     } else {
//       Alert.alert(
//         "Payment Successful",
//         "Your payment was processed successfully!",
//         [
//           {
//             text: "OK",
//             // onPress: () => navigation.navigate("Home"), // Replace "Home" with your home screen route name
//           },
//         ]
//       );
//     }
//   };

//   const toggleMonth = (month) => {
//     setSelectedMonths((prevState) => ({
//       ...prevState,
//       [month]: !prevState[month],
//     }));
//   };

//   const selectedCount = Object.values(selectedMonths).filter(Boolean).length;
//   const totalCost = (selectedCount * selectedPlan?.price).toFixed(2);

//   const handlepayument = () => {
//     // Extract selected months from the selectedMonths state
//     const selectedMonthsArray = Object.keys(selectedMonths).filter(
//       (month) => selectedMonths[month] === true
//     );

//     if (selectedMonthsArray.length === 0) {
//       // Handle case where no months are selected
//       Toast.show({
//         type: "error",
//         text1: "No months selected. Please select at least one month.",
//       });
//       return;
//     }

//     let paymentData = {
//       plan: selectedPlan?._id,
//       months: selectedMonthsArray,
//     };

//     payformont_Mutation.mutate(paymentData);
//   };

//   const daaa = () => {
//     console.log("hel me oooo");
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View style={styles.container}>
//         <TouchableOpacity
//           onPress={() => close(false)}
//           style={{
//             // borderWidth: 1,
//             // borderColor: "white",
//             height: 40,
//             width: 40,
//             justifyContent: "center", // Center content vertically
//             alignItems: "center", // Center content horizontally
//             zIndex: 100,
//           }}
//         >
//           <Image
//             source={backArrowIcon}
//             resizeMode="contain"
//             style={{
//               width: 30, // Explicit width for the Image
//               height: 30, // Explicit height for the Image
//             }}
//           />
//         </TouchableOpacity>

//         <View style={styles.headerContainer}>
//           <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
//         </View>
//         <View style={styles.mainCardContainer}>
//           <View style={styles.card}>
//             <Text style={styles.cardTitle}>Pro</Text>
//             <View style={styles.table}>
//               {months.map((month, index) => (
// <View style={styles.tableCheckBox} key={index}>
//   <Text style={styles.monthText}>{month}</Text>
//   {/* {console.log({
//     uncle: selectedMonths,
//   })} */}

//   <Checkbox
//     style={styles.checkBox}
//     value={!!selectedMonths[month]}
//     onValueChange={() => toggleMonth(month)}
//     color={selectedMonths[month] ? "#4630EB" : undefined}
//   />
// </View>
//               ))}
//             </View>
//             <View style={styles.descriptionContainer}>
//               <Text style={styles.descriptionText}>
//                 You selected {selectedCount} months
//               </Text>
//               <View style={styles.descriptionSubContainer}>
//                 <Text style={styles.priceBreakdown}>
//                   ${selectedPlan?.price} x {selectedCount} months
//                 </Text>
//                 <Text style={styles.totalPrice}>${totalCost}</Text>
//               </View>
//               <View style={styles.descriptionSubContainer}>
//                 <Text style={styles.totalLabel}>Total</Text>
//                 <Text style={styles.totalPrice}>${totalCost}</Text>
//               </View>
//               <Text style={styles.taxInfo}>
//                 See your total (including taxes)
//               </Text>
//             </View>

//             {payformont_Mutation.isLoading ? (
//               <ActivityIndicator size="large" color="#005858" />
//             ) : (
//               <TouchableOpacity
//                 style={styles.paymentButton}
//                 onPress={handlepayument}
//               >
//                 <Text style={styles.paymentButtonText}>Proceed to payment</Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//         <Text style={styles.footerText}>. Terms and conditions</Text>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 30,
//     backgroundColor: "#000",
//     height: "100%",
//     borderWidth: 1,
//     borderColor: "white",
//   },
//   backButton: {
//     zIndex: 20,
//   },
//   backArrowIcon: {
//     height: 40,
//     width: 40,
//     position: "absolute",
//     top: 30,
//     left: 20,
//   },
//   headerContainer: {
//     alignItems: "center",
//     // paddingTop: 50,
//     paddingBottom: 60,
//   },
//   header: {
//     color: "#fff",
//     fontSize: 23,
//     fontWeight: "900",
//     marginVertical: 20,
//   },
//   mainCardContainer: {
//     alignItems: "center",
//   },
//   card: {
//     backgroundColor: "#fff",
//     height: 500,
//     width: "90%",
//     borderWidth: 4,
//     borderColor: "#005858",
//     borderRadius: 20,
//     padding: 20,
//   },
//   cardTitle: {
//     fontSize: 24,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   table: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 2,
//     // justifyContent: "space-between",
//     padding: 14,
//     borderWidth: 2,
//     borderColor: "#005858",
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   tableCheckBox: {
//     alignItems: "center",
//     margin: 5,
//   },
//   monthText: {
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   checkBox: {
//     height: 20,
//     width: 20,
//   },
//   descriptionContainer: {
//     marginBottom: 20,
//   },
//   descriptionText: {
//     fontSize: 14,
//     fontWeight: "700",
//     marginBottom: 10,
//   },
//   descriptionSubContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 5,
//   },
//   priceBreakdown: {
//     fontSize: 12,
//     fontWeight: "400",
//   },
//   totalLabel: {
//     fontSize: 14,
//     fontWeight: "700",
//   },
//   totalPrice: {
//     fontSize: 17,
//     fontWeight: "700",
//   },
//   taxInfo: {
//     fontSize: 14,
//     fontWeight: "400",
//     textAlign: "center",
//   },
//   paymentButton: {
//     backgroundColor: "#005858",
//     height: 50,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center",
//     width: "70%",
//   },
//   paymentButtonText: {
//     fontSize: 16,
//     color: "#fff",
//     fontWeight: "700",
//   },

//   footerText: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "800",
//     textAlign: "center",
//     marginTop: 20,
//   },
//   cancelText: {
//     fontSize: 16,
//     color: "red",
//     fontWeight: "bold",
//   },
// });

// export default PickCalenda;

import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  StripeProvider,
  usePaymentSheet,
  useStripe,
} from "@stripe/stripe-react-native";
import Checkbox from "expo-checkbox";
import backArrowIcon from "../../assets/left-arrow.png";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { UserProfile_Fun, reset_login } from "../../Redux/AuthSlice";
const API_BASEURL = "https://ticketing-backend-qt14.onrender.com/api/";

const PickCalenda = ({ maindata, close }) => {
  console.log({ mnmn: maindata });
  let selectedPlan = maindata;

  const [selectedMonths, setSelectedMonths] = useState({});
  const navigation = useNavigation();
  const { subscription_data, user_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  useEffect(() => {
    Month_Mutation.mutate();
  }, []);

  const Month_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}available-months`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.token}`,
        },
      };
      return axios.post(url, { months }, config);
    },
    {
      onSuccess: (success) => {
        const { overlapped } = success?.data || {};
        if (Array.isArray(overlapped) && overlapped.length > 0) {
          const initialSelectedMonths = months.reduce((acc, month) => {
            acc[month] = overlapped.includes(month); // If the month is in the `overlapped` array, set it as true
            return acc;
          }, {});

          setSelectedMonths(initialSelectedMonths);
        } else {
          setSelectedMonths({}); // Clear all selections if `overlapped` is empty
        }
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.error?.message}`,
        });
      },
    }
  );

  const payformont_Mutation = useMutation(
    (data_info) => {
      const url = `${API_BASEURL}create-payment-intent`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${user_data?.token}`,
        },
      };
      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        checkout(success?.data);
      },
      onError: (error) => {
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message}`,
        });
      },
    }
  );

  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  const checkout = async (data) => {
    const initResponse = await initPaymentSheet({
      merchantDisplayName: "Tiketing",
      paymentIntentClientSecret: data?.clientSecret,
    });
    if (initResponse.error) {
      Alert.alert("Something went wrong");
      return;
    }

    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Payment Failed: ${error.code}`, error.message);
    } else {
      Alert.alert(
        "Payment Successful",
        "Your payment was processed successfully!",
        [
          {
            text: "OK",
            onPress: () => dispatch(UserProfile_Fun()),
          },
        ]
      );
    }
    dispatch(UserProfile_Fun());
    dispatch(reset_login());
  };

  const toggleMonth = (month) => {
    setSelectedMonths((prevState) => ({
      ...prevState,
      [month]: !prevState[month],
    }));
  };

  const selectedCount = Object.values(selectedMonths).filter(Boolean).length;
  const totalCost = (selectedCount * selectedPlan?.price).toFixed(2);

  const handlepayument = () => {
    const selectedMonthsArray = Object.keys(selectedMonths).filter(
      (month) => selectedMonths[month] === true
    );

    if (selectedMonthsArray.length === 0) {
      Toast.show({
        type: "error",
        text1: "No months selected. Please select at least one month.",
      });
      return;
    }

    let paymentData = {
      plan: selectedPlan?._id,
      months: selectedMonthsArray,
    };

    payformont_Mutation.mutate(paymentData);
  };

  const daaa = () => {
    console.log("hel me oooo");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => close(false)}
          style={{
            height: 40,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            position: "absolute",
          }}
        >
          <Image
            source={backArrowIcon}
            resizeMode="contain"
            style={{ width: 30, height: 30 }}
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
        </View>
        <View style={styles.mainCardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Pro</Text>
            <View style={styles.table}>
              {months.map((month, index) => (
                <View style={styles.tableCheckBox} key={index}>
                  <Text style={styles.monthText}>{month}</Text>
                  <Checkbox
                    style={styles.checkBox}
                    value={!!selectedMonths[month]}
                    onValueChange={() => toggleMonth(month)}
                    color={selectedMonths[month] ? "#4630EB" : undefined}
                  />
                </View>
              ))}
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText}>
                You selected {selectedCount} months
              </Text>
              <View style={styles.descriptionSubContainer}>
                <Text style={styles.priceBreakdown}>
                  ${selectedPlan?.price} x {selectedCount} months
                </Text>
                <Text style={styles.totalPrice}>${totalCost}</Text>
              </View>
              <View style={styles.descriptionSubContainer}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalPrice}>${totalCost}</Text>
              </View>
              <Text style={styles.taxInfo}>
                See your total (including taxes)
              </Text>
            </View>

            {payformont_Mutation.isLoading ? (
              <ActivityIndicator size="large" color="#005858" />
            ) : (
              <TouchableOpacity
                style={styles.paymentButton}
                onPress={handlepayument}
              >
                <Text style={styles.paymentButtonText}>Proceed to payment</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={styles.footerText}>. Terms and conditions</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    backgroundColor: "#000",
    height: "100%",
  },
  headerContainer: {
    alignItems: "center",
    paddingBottom: 60,
  },
  header: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
    marginVertical: 20,
  },
  mainCardContainer: {
    alignItems: "center",
  },
  card: {
    backgroundColor: "#fff",
    height: 500,
    width: "90%",
    borderRadius: 20,
    padding: 20,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  table: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 2,
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  tableCheckBox: {
    alignItems: "center",
    margin: 5,
  },
  monthText: {
    fontSize: 16,
    fontWeight: "500",
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  descriptionSubContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  priceBreakdown: {
    fontSize: 12,
    fontWeight: "400",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
  },
  totalPrice: {
    fontSize: 17,
    fontWeight: "700",
  },
  taxInfo: {
    fontSize: 14,
    fontWeight: "400",
    textAlign: "center",
  },
  paymentButton: {
    backgroundColor: "#005858",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
  },
  paymentButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },

  footerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PickCalenda;
