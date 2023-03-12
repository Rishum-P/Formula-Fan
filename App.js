import * as React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import TeamSelectPage from "./screens/TeamSelect";
import TeamPage from "./screens/TeamPage";
import ChatSelect from "./screens/ChatSelect";
import FansShare from "./screens/FansShare";
import LocShare from "./screens/LocationShare";
import ChatPage from "./screens/Chat";
import UploadPage from "./screens/ImageUpload";
import LocationUploadPage from "./screens/LocationUpload";
import { useFonts } from "expo-font";

//Creating a Stack Navigator
const Stack = createStackNavigator();

//Main App
const App = () => {
  //This is likely very bad practice but the Team the user selects is udrf across the whole app and therefore it is easier to declare it Globally than pass it through serveral times.
  global.$TeamName = "Williams";
  global.$TeamColor = "Williams";

  //Loading the official formula one font
  const [loaded] = useFonts({
    FormulaOne: require("./assets/fonts/Formula1-Regular.ttf"),
    FormulaOneBold: require("./assets/fonts/Formula1-Bold.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    //This is the main navigational container. HomeTabs is the bottom menu bar that is only passed through to the team pages screen.
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="TeamSelect" component={TeamSelectPage} />
        <Stack.Screen name="ChatP" component={ChatPage} />
        <Stack.Screen name="UploadP" component={UploadPage} />
        <Stack.Screen name="LocUploadP" component={LocationUploadPage} />
        <Stack.Screen name="TeamPage" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//Creating the Bottom Menu Bar that is shown on select pages.
const Tab = createBottomTabNavigator();
function HomeTabs() {
  return (
    //Routes with styling to make the Bottom Menu Bar look better.
    <Tab.Navigator
      initialRouteName="TeamPage"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          position: "absolute",
          bottom: 15,
          left: 25,
          right: 25,
          elevation: 0,
          backgroundColor: "#B80F0A",
          borderRadius: 35,
          height: 50,
          ...styles.shadow,
        },
      }}
    >
      <Tab.Screen
        name="News"
        component={TeamPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <View style={{ flexDirection: "column", alignItems: "center" }}>
                <Image
                  source={require("./assets/icons/news.png")}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? "#fff700" : "#ffff",
                    justifyContent: "center",
                  }}
                />
                <Text
                  style={{ color: focused ? "#fff700" : "#ffff", fontSize: 9 }}
                >
                  NEWS
                </Text>
              </View>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatSelect}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("./assets/icons/chat.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "#fff700" : "#ffff",
                }}
              />
              <Text
                style={{ color: focused ? "#fff700" : "#ffff", fontSize: 9 }}
              >
                CHAT
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Share"
        component={FansShare}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={require("./assets/icons/share.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "#fff700" : "#ffff",
                }}
              />
              <Text
                style={{
                  color: focused ? "#fff700" : "#ffff",
                  fontSize: 9,
                  marginTop: 2,
                }}
              >
                SHARE
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Find"
        component={LocShare}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("./assets/icons/location.png")}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? "#fff700" : "#ffff",
                }}
              />
              <Text
                style={{
                  color: focused ? "#fff700" : "#ffff",
                  fontSize: 9,
                  marginTop: 2,
                }}
              >
                FIND
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//Style sheet for Menu Bar Shadow
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default App;
