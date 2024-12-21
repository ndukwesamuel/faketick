// import React from "react";
// import {
//   Text,
//   View,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   FlatList,
// } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import checkIcon from "../../assets/tick-circle.png";
// import AppScreen from "../../components/shared/AppScreen";
// import { useSelector } from "react-redux";

// const PickPlan = ({ onsetdata }) => {
//   const navigation = useNavigation();
//   const { user_data, user_isLoading, user_profile_data, subscription_data } =
//     useSelector((state) => state?.Auth);

//   console.log({
//     yaya: subscription_data?.docs,
//   });

//   const plans = [
//     {
//       id: "1",
//       title: "Free",
//       price: "$0/month",
//       features: ["Valid for a month", "Unlimited upload", "Download files"],
//       buttonLabel: "Start Trial",
//       // action: () => alert("Free plan selected!"),
//       action: () => onsetdata(true), // alert("Free plan selected!"),
//     },
//     {
//       id: "2",
//       title: "Pro",
//       price: "$4.99/month",
//       features: [
//         "Combined monthly billing",
//         "Unlimited scanning",
//         "Unlimited downloads",
//         "Scanned process",
//       ],
//       buttonLabel: "Subscribe",
//       action: (navigation) => navigation.navigate("ChoosePlanCalender"),
//     },
//   ];

//   const renderPlanCard = ({ item }) => (
//     <View style={styles.MainCardContainer}>
//       <View style={styles.backgroundCard}>
//         <View>
//           <Text style={styles.CardText({ fontSize: 24, marginVertical: 6 })}>
//             {item.title}
//           </Text>
//           <Text style={styles.CardText({ fontSize: 20, marginVertical: 10 })}>
//             {item.price}
//           </Text>
//           <View style={{ paddingVertical: 10 }}>
//             {item.features.map((feature, index) => (
//               <View key={index} style={styles.featureRow}>
//                 <Image
//                   source={checkIcon}
//                   resizeMode="contain"
//                   style={styles.cardIcon}
//                 />
//                 <Text
//                   style={styles.CardText({
//                     fontSize: 11.5,
//                     marginVertical: 10,
//                   })}
//                 >
//                   {feature}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>

//         <TouchableOpacity
//           style={styles.button}
//           onPress={() => item.action(navigation)}
//         >
//           <Text
//             style={styles.CardText({
//               fontSize: 16,
//               marginVertical: 10,
//               color: "#fff",
//             })}
//           >
//             {item.buttonLabel}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <AppScreen>
//       <View style={styles.container}>
//         <View style={styles.headerContainer}>
//           <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
//           <Text style={styles.description}>
//             Start with{" "}
//             <Text style={{ color: "#008B8B" }}>30 days free trial</Text>,
//             upgrade or downgrade anytime
//           </Text>
//         </View>

//         <View
//           style={{
//             marginTop: 40,
//           }}
//         >
//           <FlatList
//             data={plans}
//             keyExtractor={(item) => item.id}
//             renderItem={renderPlanCard}
//             horizontal
//             showsHorizontalScrollIndicator={false}
//             contentContainerStyle={{ paddingHorizontal: 15 }}
//           />
//         </View>

//         <View>
//           <Text style={styles.footerText}>. Terms and conditions</Text>
//         </View>
//       </View>
//     </AppScreen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 15,
//     paddingVertical: 49,
//     backgroundColor: "#000",
//     height: "100%",
//   },
//   headerContainer: {
//     // flex: 0.2,
//     alignItems: "center",
//     paddingTop: 20,
//   },
//   header: {
//     color: "#fff",
//     fontSize: 23,
//     fontWeight: "900",
//     marginVertical: 10,
//   },
//   description: {
//     color: "#fff",
//     textAlign: "center",
//     width: "80%",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   MainCardContainer: {
//     alignItems: "center",
//     padding: 10,
//     // marginTop: 30,
//   },
//   backgroundCard: {
//     backgroundColor: "#fff",
//     height: 410,
//     width: 280,
//     borderWidth: 4,
//     borderColor: "#005858",
//     borderRadius: 20,
//     marginBottom: 60,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   card: {
//     // backgroundColor: "#fff",
//     // height: 450,
//     // width: 280,
//     // borderWidth: 4,
//     // borderColor: "#005858",
//     // borderRadius: 20,
//     // position: "absolute",
//     // zIndex: 1,
//     // justifyContent: "center",
//     // alignItems: "center",
//     // top: -14,
//   },
//   CardText: (data) => ({
//     fontSize: data.fontSize,
//     textAlign: "center",
//     marginVertical: data.marginVertical,
//     fontWeight: "700",
//     color: data.color,
//   }),
//   featureRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 5,
//   },
//   cardIcon: {
//     height: 20,
//     width: 20,
//     marginRight: 5,
//   },
//   button: {
//     backgroundColor: "#005858",
//     paddingVertical: 6,
//     paddingHorizontal: 55,
//     borderRadius: 12,
//     marginTop: 14,
//   },
//   footerText: {
//     color: "#fff",
//     fontSize: 17,
//     fontWeight: "800",
//     textAlign: "center",
//     marginTop: 20,
//   },
// });

// export default PickPlan;

import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import checkIcon from "../../assets/tick-circle.png";
import AppScreen from "../../components/shared/AppScreen";
import { useDispatch, useSelector } from "react-redux";
import Toast from "react-native-toast-message";
import axios from "axios";
import { useMutation } from "react-query";
import { reset_login } from "../../Redux/AuthSlice";

const API_BASEURL = process.env.EXPO_PUBLIC_API_URL;

const PickPlan = ({ onsetdata }) => {
  const navigation = useNavigation();
  const { subscription_data, user_data } = useSelector((state) => state?.Auth);
  const dispatch = useDispatch();
  const yaya = subscription_data?.docs || [];
  function getShortMonth() {
    const monthNames = [
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
    const currentMonthIndex = new Date().getMonth(); // 0-based index
    return monthNames[currentMonthIndex];
  }

  console.log(getShortMonth()); // Example output: "Dec"

  let for_free = getShortMonth();
  console.log({
    yaya: typeof for_free,
  });

  // Map yaya data to plans
  const plans = yaya.map((item) => {
    const commonFeatures =
      item.plan === "TRIAL"
        ? ["Valid for a month"]
        : ["Combined monthly billing", "Unlimited scanning"];
    return {
      id: item._id,
      title: item.plan === "TRIAL" ? "Free" : "Pro",
      price: `$${item.price}/month`,
      features: [...commonFeatures, "Unlimited upload", "Download files"],
      buttonLabel: item.plan === "TRIAL" ? "Start Trial" : "Subscribe",
      action:
        item.plan === "TRIAL"
          ? () => {
              console.log({
                subscription: item?._id,

                months: [for_free],
              }); //onsetdata(true)
              Resend_Mutation.mutate({
                plan: item?._id,
                months: [for_free],
              });
            }
          : () => {
              console.log({
                plan: item?._id,

                months: [for_free],
              }); //onsetdata(true)
            },
    };
  });

  const Resend_Mutation = useMutation(
    (data_info) => {
      let url = `${API_BASEURL}/subscriber`;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          //   "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user_data?.token}`,
        },
      };

      return axios.post(url, data_info, config);
    },
    {
      onSuccess: (success) => {
        Toast.show({
          type: "success",
          // text1: `${success?.data?.message} `,
          text1: "successfull",
        });

        console.log({
          ffff: success,
        });
        dispatch(reset_login());

        // dispatch(checkOtp(true));

        // onPress={() => onSetAuth("sign-in")}
      },

      onError: (error) => {
        console.log({
          error: error?.response?.data,
        });
        Toast.show({
          type: "error",
          text1: `${error?.response?.data?.message} `,
          //   text2: ` ${error?.response?.data?.errorMsg} `,
        });

        const constraints = error?.response?.data[0]?.constraints;
        console.log({
          uuuu: constraints,
        });

        if (constraints) {
          const errorKeys = Object.keys(constraints);

          errorKeys.forEach((key) => {
            Toast.show({
              type: "error",
              text1: constraints[key], // Display the constraint message
            });
          });
        } else {
          Toast.show({
            type: "error",
            text1: error?.response?.data || "An unexpected error occurred.",
          });
        }
      },
    }
  );

  const renderPlanCard = ({ item }) => (
    <View style={styles.MainCardContainer}>
      <View style={styles.backgroundCard}>
        <View>
          <Text style={styles.CardText({ fontSize: 24, marginVertical: 6 })}>
            {item.title}
          </Text>
          <Text style={styles.CardText({ fontSize: 20, marginVertical: 10 })}>
            {item.price}
          </Text>
          <View style={{ paddingVertical: 10 }}>
            {item.features.map((feature, index) => (
              <View key={index} style={styles.featureRow}>
                <Image
                  source={checkIcon}
                  resizeMode="contain"
                  style={styles.cardIcon}
                />
                <Text
                  style={styles.CardText({
                    fontSize: 11.5,
                    marginVertical: 10,
                  })}
                >
                  {feature}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => item.action()}>
          <Text
            style={styles.CardText({
              fontSize: 16,
              marginVertical: 10,
              color: "#fff",
            })}
          >
            {item.buttonLabel}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <AppScreen>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>CHOOSE YOUR PLAN</Text>
          <Text style={styles.description}>
            Start with{" "}
            <Text style={{ color: "#008B8B" }}>30 days free trial</Text>,
            upgrade or downgrade anytime
          </Text>
        </View>

        <View style={{ marginTop: 40 }}>
          <FlatList
            data={plans}
            keyExtractor={(item) => item.id}
            renderItem={renderPlanCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          />
        </View>

        {Resend_Mutation.isLoading && (
          <ActivityIndicator size="large" color="white" />
        )}

        <View>
          <Text style={styles.footerText}>. Terms and conditions</Text>
        </View>
      </View>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 49,
    backgroundColor: "#000",
    height: "100%",
  },
  headerContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    color: "#fff",
    fontSize: 23,
    fontWeight: "900",
    marginVertical: 10,
  },
  description: {
    color: "#fff",
    textAlign: "center",
    width: "80%",
    fontSize: 16,
    fontWeight: "600",
  },
  MainCardContainer: {
    alignItems: "center",
    padding: 10,
  },
  backgroundCard: {
    backgroundColor: "#fff",
    height: 410,
    width: 280,
    borderWidth: 4,
    borderColor: "#005858",
    borderRadius: 20,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  CardText: (data) => ({
    fontSize: data.fontSize,
    textAlign: "center",
    marginVertical: data.marginVertical,
    fontWeight: "700",
    color: data.color,
  }),
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  cardIcon: {
    height: 20,
    width: 20,
    marginRight: 5,
  },
  button: {
    backgroundColor: "#005858",
    paddingVertical: 6,
    paddingHorizontal: 55,
    borderRadius: 12,
    marginTop: 14,
  },
  footerText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 20,
  },
});

export default PickPlan;
