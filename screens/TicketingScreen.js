// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
//   FlatList,
//   ImageBackground,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import AppScreen from "../components/shared/AppScreen";
// import FontAwesome from "@expo/vector-icons/FontAwesome";

// const TicketingScreen = () => {
//   return (
//     <AppScreen>
//       <ScrollView style={styles.container}>
//         <View style={styles.header}>
//           <FontAwesome name="navicon" size={24} color="white" />

//           <View
//             style={{
//               flex: 1,
//               backgroundColor: "#000",

//               // padding: 20,
//               marginTop: 20,
//               borderWidth: 1,
//               borderColor: "white",
//             }}
//           >
//             {/* Greeting Section */}
//             <View>
//               <Text
//                 style={{
//                   color: "#fff",
//                   fontSize: 24,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Hello Femi
//               </Text>
//               <Text
//                 style={{
//                   color: "#aaa",
//                   fontSize: 16,
//                   marginTop: 4,
//                 }}
//               >
//                 Today is Monday 30 Nov 2024
//               </Text>
//             </View>

//             {/* Free Trial Card */}
//             <View
//               style={{
//                 backgroundColor: "#fff",
//                 // backgroundColor: "red",
//                 borderRadius: 12,
//                 padding: 20,
//                 marginTop: 20,
//                 // height: 390,
//                 flex: 1,
//                 borderWidth: 10,
//                 borderColor: "white",
//               }}
//             >
//               <Text
//                 style={{
//                   fontSize: 24,
//                   fontWeight: "bold",
//                 }}
//               >
//                 $0 /month
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 20,
//                   marginTop: 10,
//                   fontWeight: "bold",
//                 }}
//               >
//                 Free trial
//               </Text>
//               <Text
//                 style={{
//                   color: "#666",
//                   marginTop: 4,
//                 }}
//               >
//                 Your free trial ends on January 23rd 2025
//               </Text>

//               {/* Options */}
//               <View
//                 style={{
//                   flexDirection: "row",
//                   justifyContent: "space-between",
//                   marginTop: 20,
//                 }}
//               >
//                 {/* Take a Picture */}
//                 <View
//                   style={{
//                     alignItems: "center",
//                     flex: 1,
//                     marginRight: 10,
//                   }}
//                 >
//                   {/* Group 227.png */}

//                   <Image
//                     source={require("../assets/ticket/Group 227.png")}
//                     style={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 8,
//                     }}
//                   />

//                   {/* <Image
//                     source={source: { uri: "https://via.placeholder.com/100" }}
//                     style={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 8,
//                     }}
//                   /> */}
//                   <Text
//                     style={{
//                       marginTop: 8,
//                       fontSize: 14,
//                       color: "#000",
//                     }}
//                   >
//                     Take a picture
//                   </Text>
//                 </View>

//                 {/* Upload */}
//                 <View
//                   style={{
//                     alignItems: "center",
//                     flex: 1,
//                     marginLeft: 10,
//                   }}
//                 >
//                   <Image
//                     source={{ uri: "https://via.placeholder.com/100" }}
//                     style={{
//                       width: 80,
//                       height: 80,
//                       borderRadius: 8,
//                     }}
//                   />
//                   <Text
//                     style={{
//                       marginTop: 8,
//                       fontSize: 14,
//                       color: "#000",
//                     }}
//                   >
//                     Upload
//                   </Text>
//                 </View>
//               </View>
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </AppScreen>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#000",
//   },
//   header: {
//     flex: 1,
//     backgroundColor: "#000",
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//   },
//   profileContainer: {
//     alignItems: "center",
//     marginBottom: 16,
//   },
//   profileImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginBottom: 8,
//   },
//   profileName: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
//   profileTitle: {
//     color: "#777",
//     fontSize: 14,
//   },
//   highlightsContainer: {
//     alignItems: "center",
//   },
//   highlightsBox: {
//     borderRadius: 8,
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     elevation: 4,
//   },
//   highlightsText: {
//     color: "#000",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   content: {
//     flex: 1,
//     backgroundColor: "#000",
//     paddingHorizontal: 16,
//     paddingVertical: 24,
//   },
//   sectionTitle: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   weatherForecast: {
//     color: "#fff",
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//   },
//   recommendationsContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 24,
//   },
//   recommendationItem: {
//     width: "30%",
//     backgroundColor: "#444",
//     borderRadius: 8,
//     padding: 12,
//     elevation: 4,
//   },
//   recommendationTitle: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 14,
//     marginBottom: 4,
//   },
//   recommendationDescription: {
//     color: "#aaa",
//     fontSize: 12,
//   },
//   insightContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
//   insightItem: {
//     width: "48%",
//     backgroundColor: "#444",
//     borderRadius: 8,
//     padding: 12,
//     elevation: 4,
//   },
//   insightTitle: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//     marginBottom: 4,
//   },
//   insightDescription: {
//     color: "#aaa",
//     fontSize: 14,
//   },
// });

// export default TicketingScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AppScreen from "../components/shared/AppScreen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { height: screenHeight } = Dimensions.get("window");

const TicketingScreen = ({ navigation }) => {
  return (
    <AppScreen>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {/* <FontAwesome name="navicon" size={24} color="white" /> */}
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            // style={{ position: "absolute", top: 80, left: 30, zIndex: 1 }}
          >
            <FontAwesome name="navicon" size={24} color="white" />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              backgroundColor: "#000",
              marginTop: 40,
              // borderWidth: 1,
              // borderColor: "white",
            }}
          >
            {/* Greeting Section */}
            <View>
              <Text
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                Hello Femi
              </Text>
              <Text
                style={{
                  color: "#aaa",
                  fontSize: 16,
                  marginTop: 4,
                }}
              >
                Today is Monday 30 Nov 2024
              </Text>
            </View>

            {/* Free Trial Card */}
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 12,
                padding: 20,
                marginTop: 50,
                height: screenHeight * 0.5, // Set height to 70% of the screen height
                // borderWidth: 10,
                // borderColor: "white",
              }}
            >
              <Text
                style={{
                  fontSize: 26,
                  fontWeight: "700",
                }}
              >
                $0 /month
              </Text>
              <Text
                style={{
                  fontSize: 26,
                  marginTop: 10,
                  fontWeight: "700",
                }}
              >
                Free trial
              </Text>
              <Text
                style={{
                  color: "#666",
                  marginTop: 4,
                  fontSize: 12,
                  fontWeight: "400",
                }}
              >
                Your free trial ends on January 23rd 2025
              </Text>

              {/* Options */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 80,
                  // alignItems: "flex-end",
                  // alignItems:""
                  // alignSelf: "baseline",
                }}
              >
                {/* Take a Picture */}
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginRight: 10,
                  }}
                >
                  <Image
                    source={require("../assets/ticket/Group 227.png")}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "#000",
                    }}
                  >
                    Take a picture
                  </Text>
                </View>

                {/* Upload */}
                <View
                  style={{
                    alignItems: "center",
                    flex: 1,
                    marginLeft: 10,
                  }}
                >
                  <Image
                    source={require("../assets/ticket/Group 167.png")}
                    // source={{ uri: "https://via.placeholder.com/100" }}
                    style={{
                      width: 150,
                      height: 150,
                      borderRadius: 8,
                    }}
                  />
                  <Text
                    style={{
                      marginTop: 8,
                      fontSize: 14,
                      color: "#000",
                    }}
                  >
                    Upload
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </AppScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flex: 1,
    backgroundColor: "#000",
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
});

export default TicketingScreen;
