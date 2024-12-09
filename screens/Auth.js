import { View, StatusBar, SafeAreaView } from "react-native";
import React, { useState } from "react";
import AuthContainer from "../components/Auth/AuthContainer";
import AuthOnboarding from "../components/Auth/AuthOnboarding";
import ProfilePictureScreen from "../components/Auth/CreateOrSkipScreen";
import Login from "./Login";
import SignUp from "./SignUp";
import OtpScreen from "./OtpScreen";
import ForgetPassowrd from "../components/Auth/ForgetPassowrd";
import VerificationScreen from "./OtpScreen";

const Auth = () => {
  // const [start, setStart] = useState(false);
  const [authType, setAuthtype] = useState("sign-up");
  const changeAuthType = (type) => {
    setAuthtype(type);
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#001272" barStyle="light-content" />

      {authType === "sign-up" ? (
        <SignUp onSetAuth={changeAuthType} />
      ) : authType === "sign-in" ? (
        <Login onSetAuth={changeAuthType} />
      ) : authType === "verify" ? (
        <VerificationScreen onSetAuth={changeAuthType} />
      ) : (
        <ForgetPassowrd onSetAuth={changeAuthType} /> // Forgot Password screen
      )}
    </SafeAreaView>
  );
};

export default Auth;
