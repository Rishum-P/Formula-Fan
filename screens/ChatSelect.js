/* This page allows the user to select a username for the chat page. */
import * as React from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

export default class ChatSelect extends React.Component {
  //State containing player name
  state = {
    name: "",
  };

  //Method that deals with moving to the chat screen. Also passing the name entered.
  continue = () => {
    this.props.navigation.navigate("ChatP", { name: this.state.name });
  };

  render() {
    return (
      //Display header then input for user to enter a username. Also show button that when pressed calls the continue method.
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $TeamColor }]}>
          <Text style={styles.header_text}>{$TeamName}</Text>
        </View>

        <View style={styles.card}>
          <View style={[styles.main, { backgroundColor: $TeamColor }]}>
            <Text style={styles.text_main}>
              Chat with other {$TeamName} fans!
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.username, { backgroundColor: $TeamColor }]}>
            <Text style={styles.text_secondary}>Enter a Username</Text>

            <TextInput
              style={[styles.input, { borderColor: $TeamColor }]}
              placeholder="Enter a Username"
              onChangeText={(name) => {
                this.setState({ name });
              }}
              value={this.state.name}
            />
          </View>
        </View>

        <View style={styles.card}>
          <View style={[styles.main, { backgroundColor: $TeamColor }]}>
            <TouchableOpacity
              style={[
                styles.button,
                { borderColor: $TeamColor, backgroundColor: $TeamColor },
              ]}
              onPress={this.continue}
            >
              <Text style={styles.text}>Continue</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15151E",
  },

  button: {
    alignItems: "center",
    padding: 5,
    marginTop: 0,
    paddingTop: 15,
    paddingBottom: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
  },
  header: {
    paddingVertical: 20,
    backgroundColor: "#E10600",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  header_text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "FormulaOneBold",
    marginTop: 35,
  },
  main: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "E10600",
    elevation: 10, // Add a box shadow
  },
  username: {
    marginTop: 20,
    marginHorizontal: 20,
    alignItems: "center",
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "E10600",
    elevation: 10, // Add a box shadow
  },
  text_main: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 35,
    fontFamily: "FormulaOneBold",
  },
  text: {
    color: "#ffff",
    fontSize: 25,
    fontFamily: "FormulaOne",
  },
  text_secondary: {
    textAlign: "center",
    color: "#ffff",
    fontSize: 25,
    fontFamily: "FormulaOneBold",
  },
  input: {
    backgroundColor: "#E5E5E5",
    textAlign: "center",
    marginTop: 20,
    height: 50,
    width: 250,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 100,
    fontWeight: "600",
  },
});
