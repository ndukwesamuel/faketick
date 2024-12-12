import React from "react";
import { SafeAreaView, View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import BackButton from "../../components/Ticketcomponent/BackButton";
import HeaderTitle from "../../components/Ticketcomponent/HeaderTitle";
import planeIcon from '../../assets/airplane.png';
import BackgroundDefaultStyle from "../../components/Ticketcomponent/BackgroundDefaultStyle";

const CategoriesPage = () => {
        return (
              <BackgroundDefaultStyle>
                <BackButton />
                <HeaderTitle Title={"Select Category"} />
                <View>
                  <View style={styles.categoryContainer}>
                    <TouchableOpacity
                      style={styles.categoryCard({
                        backgroundColor: "#64CDDB",
                      })}
                    >
                      <Image
                        source={planeIcon}
                        resizeMode="contain"
                        style={styles.categoryCardIcon({
                          height: 60,
                          width: 60,
                        })}
                      />
                      <Text style={styles.categoryCardDescription}>
                        Work travel exp
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.categoryCard({
                        backgroundColor: "#596174",
                      })}
                    >
                      <Image
                        source={planeIcon}
                        resizeMode="contain"
                        style={styles.categoryCardIcon({
                          height: 60,
                          width: 60,
                        })}
                      />
                      <Text style={styles.categoryCardDescription}>
                        Work related education
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.categoryContainer}>
                    <TouchableOpacity
                      style={styles.categoryCard({
                        backgroundColor: "#F7D794",
                      })}
                    >
                      <Image
                        source={planeIcon}
                        resizeMode="contain"
                        style={styles.categoryCardIcon({
                          height: 60,
                          width: 60,
                        })}
                      />
                      <Text style={styles.categoryCardDescription}>
                        Work clothing
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.categoryCard({
                        backgroundColor: "#F8A5C2",
                      })}
                    >
                      <Image
                        source={planeIcon}
                        resizeMode="contain"
                        style={styles.categoryCardIcon({
                          height: 60,
                          width: 60,
                        })}
                      />
                      <Text style={styles.categoryCardDescription}>
                        Other work related epx
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.categoryContainer}>
                    <TouchableOpacity
                      style={styles.categoryCard({
                        backgroundColor: "#E77F67",
                      })}
                    >
                      <Image
                        source={planeIcon}
                        resizeMode="contain"
                        style={styles.categoryCardIcon({
                          height: 60,
                          width: 60,
                        })}
                      />
                      <Text style={styles.categoryCardDescription}>
                        Gifts and donations
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BackgroundDefaultStyle>
        );
}

const styles = StyleSheet.create({
    headerTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        marginVertical: 40
    },
    categoryContainer: {
        flexDirection: 'row'
    },
    categoryCard: (data) => ({
        backgroundColor: data.backgroundColor,
        height: 170,
        width: '45%',
        marginHorizontal: 8,
        borderRadius: 20,
        padding: 20,
        marginVertical: 10
    }),
    categoryCardIcon: (data) => ({
        height: data.height,
        width: data.width,
        marginHorizontal: 35,
        marginVertical: 20
    }),
    categoryCardDescription: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 15
    }
});

export default CategoriesPage