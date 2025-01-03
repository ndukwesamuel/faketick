// import React from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Image,
// } from "react-native";

// export default function Login({ navigation, onSetAuth }) {
//   return (
//     <View style={styles.container}>
//       {/* Google Sign-in Button */}
//       <TouchableOpacity style={styles.googleButton}>
//         <Text style={styles.googleButtonText}>
//           <Image
//             source={{
//               uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
//             }}
//             style={styles.googleIcon}
//           />
//           Continue with Google
//         </Text>
//       </TouchableOpacity>

//       {/* Login and Sign-in Tabs */}
//       <View style={styles.tabContainer}>
//         <TouchableOpacity
//           style={{
//             alignSelf: "flex-end",
//             backgroundColor: "#005858",
//             borderRadius: 10,
//           }}
//           onPress={() => onSetAuth("sign-up")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               styles.activeTab,
//               {
//                 color: "white",
//                 paddingHorizontal: 15,
//                 paddingVertical: 10,
//               },
//             ]}
//           >
//             Sign Up
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {/* Form Inputs */}
//       <View style={styles.form}>
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           keyboardType="email-address"
//           placeholderTextColor="#FFFFFF"
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           secureTextEntry
//           placeholderTextColor="#FFFFFF"
//         />

//         <Text
//           style={{
//             color: "white",
//             alignSelf: "flex-end",
//             marginVertical: 10,
//           }}
//         >
//           Forgot password?
//         </Text>
//         <TouchableOpacity style={styles.createAccountButton}>
//           <Text style={styles.createAccountButtonText}>Log In</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#121212",
//     // backgroundColor: "white",
//     paddingHorizontal: 20,
//     justifyContent: "center",
//   },
//   googleButton: {
//     backgroundColor: "#FFFFFF",
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 30,
//   },
//   googleButtonText: {
//     color: "#000000",
//     fontSize: 16,
//     fontWeight: "500",
//   },
//   googleIcon: {
//     width: 20,
//     height: 20,
//     marginRight: 10,
//   },
//   tabContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },
//   tabText: {
//     color: "#FFFFFF",
//     fontSize: 18,
//   },
//   activeTab: {
//     color: "#3CB371",
//     fontWeight: "bold",
//   },
//   form: {
//     marginTop: 20,
//   },
//   input: {
//     backgroundColor: "#1E1E1E",
//     // backgroundColor: "white",
//     color: "#FFFFFF",
//     padding: 12,
//     marginBottom: 15,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: "white",
//   },
//   createAccountButton: {
//     backgroundColor: "#005858",
//     padding: 15,
//     borderRadius: 8,
//     alignItems: "center",
//   },
//   createAccountButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   imageContainer: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   verificationImage: {
//     width: 150,
//     height: 150,
//   },
//   verificationText: {
//     color: "#FFFFFF",
//     textAlign: "center",
//     fontSize: 18,
//   },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Forminputpassword } from "../components/shared/InputForm";
import { useDispatch, useSelector } from "react-redux";
import { Login_Fun } from "../Redux/AuthSlice";

export default function Login({ navigation, onSetAuth }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.Auth);
  const { user_isLoading } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    console.log({
      email,
      password,
    });

    dispatch(
      Login_Fun({
        email: email, //"vendor@gmail.com",
        password: password, // "password",
        // device_name: "mobile",
      })
    );
  };

  return (
    <View style={styles.container}>
      {/* Google Sign-in Button */}
      <TouchableOpacity style={styles.googleButton}>
        <Image
          source={require("../assets/ticket/flat-color-icons_google.png")}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      {/* Login and Sign-in Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            // backgroundColor: "#005858",
            // borderRadius: 10,
          }}
          onPress={() => onSetAuth("sign-up")}
        >
          <Text
            style={[
              styles.tabText,
              styles.activeTab,
              {
                color: "#005858",
                paddingHorizontal: 15,
                paddingVertical: 10,
              },
            ]}
          >
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            backgroundColor: "#005858",
            borderRadius: 10,
          }}
          // onPress={() => onSetAuth("sign-in")}
        >
          <Text
            style={[
              styles.tabText,
              styles.activeTab,
              {
                color: "white",
                paddingHorizontal: 15,
                paddingVertical: 10,
              },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
      </View>

      {/* Form Inputs */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
        />

        <Forminputpassword
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          style={{
            // borderWidth: 1,
            borderRadius: 8,

            // borderColor: "#ccc",
          }}
        />

        <Text
          style={{
            color: "white",
            alignSelf: "flex-end",
            marginVertical: 10,
          }}
        >
          Forgot password?
        </Text>

        {user_isLoading ? (
          <ActivityIndicator size="large" color="white" />
        ) : (
          <TouchableOpacity
            style={styles.createAccountButton}
            onPress={handleLogin}
          >
            <Text style={styles.createAccountButtonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  googleButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: "white",
  },
  googleButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  activeTab: {
    color: "#3CB371",
    fontWeight: "bold",
  },
  form: {
    marginTop: 20,
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    padding: 12,
    marginBottom: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "white",
  },
  createAccountButton: {
    backgroundColor: "#005858",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
