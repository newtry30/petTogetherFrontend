import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomePage = () => {
  const introTextHead = "Hello!";
  const introTextTitle = "Here to remind you something ...";
  const introTextPara =
    "Compassion for animals is intimately associated with goodness of character, and it may be confidently asserted that he who is cruel to animals cannot be a good man.";

    const navigation = useNavigation();

  return (
    <View style={styles.mainContainerStyle}>
      <ImageBackground
        resizeMode="cover"
        style={styles.backgroundImageStyle}
        source={require("../../static/images/back.jpg")}
      >
        <View style={styles.textContainerStyle}>
          <View style={styles.pageTitleViewStyle}>
            <Text style={styles.pageTitleStyle}>Pet Together</Text>
          </View>
          <View style={styles.introTextViewStyle}>
            <Text style={styles.introTextHeadStyle}>{introTextHead}</Text>
            <Text style={styles.introTextTitleStyle}>{introTextTitle}</Text>
            <Text style={styles.introTextParaStyle}>{introTextPara}</Text>
          </View>
          <View style={styles.helloButtonViewStyle}>
            <TouchableNativeFeedback onPress={()=>{navigation.navigate("LoginPage")}}>
              <View style={styles.letsGoButtonStyle}>
                <Text style={{fontSize:20}}>Let's Go!</Text>
              </View>
            </TouchableNativeFeedback>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
    mainContainerStyle: {
    flex: 1,
  },
  backgroundImageStyle: {
    flex: 1,
    justifyContent: "flex-start",
  },
  textContainerStyle: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    // backgroundColor: "red",
  },
  pageTitleViewStyle: {
    flex: 2,
    // backgroundColor: "blue",
  },
  pageTitleStyle: {
    marginTop: "10%",
    fontSize: 30,
    fontWeight: "bold",
    marginLeft: "5%",
  },
  introTextViewStyle: {
    flex: 6,
    marginHorizontal: "5%",
    // backgroundColor: "yellow",
  },
  introTextHeadStyle: {
    marginTop: "15%",
    fontSize: 40,
  },
  introTextTitleStyle: {
    fontSize: 30,
  },
  introTextParaStyle: {
    fontSize: 20,
  },
  helloButtonViewStyle: {
      justifyContent:"center",
      alignItems:"center",
    flex: 5,
  },
  letsGoButtonStyle: {
    justifyContent:"center",
    alignItems:"center",
    backgroundColor: "white",
    height: 50,
    width: 300,
    borderRadius:30,
    marginTop:"30%"
  },
});
