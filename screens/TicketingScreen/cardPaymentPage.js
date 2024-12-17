import React from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, Image, FlatList, TouchableOpacity } from "react-native";
import BackButton from "../../components/Ticketcomponent/BackButton";
import HeaderTitle from "../../components/Ticketcomponent/HeaderTitle";
import BackgroundDefaultStyle from "../../components/Ticketcomponent/BackgroundDefaultStyle";
import masterCardIcon from '../../assets/380809_card_master_mastercard_icon.png';
import visaIcon from '../../assets/visa.png';

const CardPaymentPage = () => {
    const ImageSource = [masterCardIcon, visaIcon]
    const HandleImage = ({ item }) => {
        return (
            <Image source={item} resizeMode="contain" style={ styles.bankIcon(item) } />
      )
    };
    const DisplayFormInput = ({ placeHolder }) => {
        return (
          <TextInput
            placeholder={placeHolder}
            placeholderTextColor={"#FFFFFF"}
            style={styles.formInput}
          />
        );
    }
    return (
      <BackgroundDefaultStyle>
        <BackButton />
        <View style={styles.container}>
          <HeaderTitle Title={"Pay using credit cards"} />
          <FlatList
            data={ImageSource}
            renderItem={(item) => <HandleImage item={item.item} />}
            horizontal
          />
          <View style={styles.formContainer}>
            <DisplayFormInput placeHolder={"xxxxxxxx"} />
            <DisplayFormInput placeHolder={"MM/YY"} />
            <DisplayFormInput placeHolder={"CVV"} />
            <TouchableOpacity style={styles.paymentButton}>
              <Text style={styles.paymentButtonText}>Make Payment</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BackgroundDefaultStyle>
    );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  bankIcon: (item) => ({
    height: 35,
    width: 35,
    marginRight: item === masterCardIcon ? 68 : 0,
    marginLeft: item === visaIcon ? 68 : 0,
  }),
  formContainer: {
    marginVertical: 50,
  },
  formInput: {
    textAlign: "left",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    width: 320,
    height: 60,
    marginVertical: 7,
    backgroundColor: "#282828",
    borderRadius: 10,
    paddingHorizontal: 25,
    fontSize: 19,
  },
  paymentButton: {
    backgroundColor: "#005858",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
      borderRadius: 10,
    marginTop: 84
    },
    paymentButtonText: {
        color: '#fff',
        fontSize: 23,
        fontWeight: '800'
  }
});

export default CardPaymentPage;