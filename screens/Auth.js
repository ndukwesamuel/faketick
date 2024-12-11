import { View, StatusBar, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import AuthContainer from "../components/Auth/AuthContainer";
import AuthOnboarding from "../components/Auth/AuthOnboarding";
import ProfilePictureScreen from "../components/Auth/CreateOrSkipScreen";
import Login from "./Login";
import SignUp from "./SignUp";
import OtpScreen from "./OtpScreen";
import ForgetPassowrd from "../components/Auth/ForgetPassowrd";
import VerificationScreen from "./OtpScreen";
import { useDispatch, useSelector } from "react-redux";
import { reset_login } from "../Redux/AuthSlice";

const Auth = () => {
  // const [start, setStart] = useState(false);
  const [authType, setAuthtype] = useState("sign-up");
  const dispatch = useDispatch();

  const changeAuthType = (type) => {
    setAuthtype(type);
  };
  const { user_message } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (
      user_message === "Your account is not active, please verify your email"
    ) {
      console.log("verify api");
      dispatch(reset_login());
    }
    return () => {};
  }, []);

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
