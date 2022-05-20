import { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Button,
  TouchableOpacity,
  TouchableNativeFeedback,
  Alert,
  ScrollView,
} from "react-native";
import { db } from "../../firebase";
import AuthContext from "../hooks/useAuth";
export default function NotifyScreen() {
  const { userDataContext, setUserDataContext } = useContext(AuthContext);
  const [buyRequestIds, setBuyRequestIds] = useState([
    { id: 100, email: "jhon@gmail.com" },
  ]);

  function myButton(email) {
    Alert.alert(`${email}'s request accepted`);
  }

  function myButton2(email) {
    Alert.alert(`${email}'s request REJECTED`);
  }

  const listenRealTime = async () => {
    try {
      db.collection("Users")
        .doc(getUserTypeDocString(userDataContext.userType))
        .collection("accounts")
        .doc(userDataContext.email)
        .onSnapshot((snapshot) => {
          // const data = snapshot.data();
          if (snapshot.exists && "notification" in snapshot.data()) {
            const notificationHistory = snapshot.data().notification;
            // console.log(notificationHistory);
            setNotifications([...notificationHistory]);
            // console.log("here");
            // if () {
            // }
          } else {
            // console.log("does not exist");
            setNotifications([]);
          }
          // console.log(notificationHistory);

          // for (let each of notificationHistory) {
          //   setNotifications((previous) => [...previous, each]);
          // }
        });
    } catch (error) {
      console.log("listenRealTimelog: " + error.message);
    }
  };
  useEffect(() => {
    listenRealTime();
  }, []);
  useEffect(() => {
    if (notifications.length !== 0) {
      let arrayToSort = notifications;
      arrayToSort.sort((a, b) => {
        return b.sendTime - a.sendTime;
      });
      arrayToSort = arrayToSort.reverse();
      setNotifications(arrayToSort);
    }
  }, [notifications]);

  const getIndividualUsersData = async (email) => {
    const result = await sendRequestToServer("/profile/fetchUserDetails", {
      email: email,
    });
    return result;
  };

  const getDescriptionString = (notificationType) => {
    switch (notificationType) {
      case "like":
        return "has liked your post";
        break;
      case "comment":
        return "has commented on your phone";
        break;
      case "petBuyRequest":
        return "want to buy your pet";
        break;
      case "reshelterRequest":
        return "want to reshelter your pet";
        break;
      case "breedRequest":
        return "sent breed request for your pet";
        break;
      case "adoptionRequest":
        return "want adopt your pet";
        break;
    }
  };

  const isItRequest = (notificationType) => {
    if (
      notificationType === "comment" ||
      notificationType === "like" ||
      notificationType === "event"
    )
      return false;
    else return true;
  };

  const updateWholeArrayForPost = async (updatedRequestData, index) => {
    const updatedArray = [
      ...notifications.slice(0, index),
      ...notifications.slice(index + 1, notifications.length),
      updatedRequestData,
    ];
    try {
      await db
        .collection("Users")
        .doc(getUserTypeDocString(userDataContext.userType))
        .collection("accounts")
        .doc(userDataContext.email)
        .update({ notification: updatedArray });
    } catch (error) {
      console.log(error.message);
    }
  };

  // const updateWholeArrayForFollowRequest = async (index)=>{
  //   // const updatedArray =[...]
  // }
  const profile = [
    {
      id: 1,
      name: "name  ",
      describe: "description ",
    },
    {
      id: 2,
      name: "name  ",
      describe: "description ",
    },
    {
      id: 3,
      name: "name",
      describe: "description ",
    },
    {
      id: 4,
      name: "name",
      describe: "description ",
    },
  ];

  const oneProfile = ({ item, index }) => {
    // console.log("in the oneProfile " + item);
    if (item.notificationType !== "noNotifications") {
      return (
        <NotificationCard
          item={item}
          updateWholeArrayForPost={updateWholeArrayForPost}
          index={index}
        />
      );
    } else {
      // console.log("here i am");
      return (
        <View>
          <Text>No Notifications</Text>
        </View>
      );
    }
  };
  const itemSeparator = () => {
    return <View style={styles.separator}></View>;
  };
  // console.log(notifications);

  return (
    <SafeAreaView>
      {/* <ScrollView>
        {notifications.length !== 0 ? (
          notifications.map((item, index) => {
            // console.log(here);
            return (
              <NotificationCard
                item={item}
                updateWholeArrayForPost={updateWholeArrayForPost}
                index={index}
              />
            );
          })
        ) : (
          <View>
            <Text>No Notifications</Text>
          </View>
        )}
      </ScrollView> */}
      <FlatList
        data={buyRequestIds}
        renderItem={oneProfile}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#CCC",
  },
  item: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
    margin: 10,
    borderRadius: 20,
    borderWidth: 2,
    paddingLeft: 5,
    // elevation: 3,
    // backgroundColor:"red"
  },
  nameDescriptionStyle: {
    flex: 0.8,
    flexDirection: "column",
    // backgroundColor:"white"
  },
  avatar: {
    height: 55,
    width: 55,
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 13,
  },
  avatarContainer: {
    backgroundColor: "#D9D9D9",
    borderRadius: 100,
    height: 89,
    width: 89,
    justifyContent: "center",
    alignItems: "center",
  },
  area: {
    backgroundColor: "#CCCCCC",
    borderRadius: 20,
    borderWidth: 2,
    padding: 2,
    margin: 2,
    //   justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    // paddingTop:ConstantSourceNode.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  buttonStyle: {
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 3,
  },
});
