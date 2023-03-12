/* This page uses GiftedChat for displaying the messages between users. It gets the messages and also uploads any new messages to the Firebase Realtime Database */
import React from "react";
import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Fire from "../Fire.js";

export default class ChatScreen extends React.Component {
  //State that contains the messages
  state = {
    messages: [],
  };

  //Gets the users unique id and name
  get user() {
    return {
      _id: Fire.uid,
      name: this.props.route.params.name,
    };
  }

  //on mount set gifted chat messages to the messages retreived.
  componentDidMount() {
    Fire.get((message) =>
      this.setState((previous) => ({
        messages: GiftedChat.append(previous.messages, message),
      }))
    );
  }

  componentWillUnmount() {
    Fire.off();
  }

  render() {
    //Gifted chat. On send calls the Firebase send method.
    const chat = (
      <GiftedChat
        messages={this.state.messages}
        onSend={Fire.send}
        user={this.user}
      />
    );

    //Display message area for Android devices with keyboard avoidance.
    if (Platform.OS === "android") {
      return (
        <View style={styles.container}>
          <View style={[styles.header, { backgroundColor: $TeamColor }]}>
            <Text style={styles.header_text}>{$TeamName}</Text>
          </View>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            keyboardVerticalOffset={1}
            enabled
          >
            {chat}
          </KeyboardAvoidingView>
        </View>
      );
    }

    return (
      //Diplay message area for IOS (Untested)
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $TeamColor }]}>
          <Text style={styles.header_text}>{$TeamName}</Text>
        </View>
        <SafeAreaView style={{ flex: 1 }}>{chat}</SafeAreaView>
      </View>
    );
  }
}

//Styles needed for this page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#15151E",
  },
  header: {
    alignItems: "center",

    height: 90,
    padding: 45,
  },
  header_text: {
    color: "#ffff",
    fontSize: 35,
    fontFamily: "FormulaOneBold",
  },
});
