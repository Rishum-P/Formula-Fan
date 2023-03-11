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
    const $headercolor = Get_Team_Colour();

    return (
      //Display header then input for user to enter a username. Also show button that when pressed calls the continue method.
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $headercolor }]}>
          <Text style={styles.header_text}>{$Team}</Text>
        </View>

        <View style={[styles.main, { borderColor: $headercolor }]}>
          <Text style={styles.text_main}>Chat with other {$Team} fans!</Text>
        </View>

        <View style={[styles.username, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>Enter a Username</Text>

          <TextInput
            style={[styles.input, { borderColor: $headercolor }]}
            placeholder="Username"
            onChangeText={(name) => {
              this.setState({ name });
            }}
            value={this.state.name}
          />

          <TouchableOpacity
            style={[
              styles.button,
              { borderColor: $headercolor, backgroundColor: $headercolor },
            ]}
            onPress={this.continue}
          >
            <Text style={styles.text}>Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//styles needed for this page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15151E",
  },

  button: {
    alignItems: "center",
    padding: 5,
    marginRight: 80,
    marginLeft: 80,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#fff",
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
  main: {
    marginTop: 55,
    marginLeft: 70,
    marginRight: 20,
    alignItems: "center",
    height: 100,
    borderRadius: 24,
    borderWidth: 5,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomStartRadius: 0,
  },
  username: {
    marginTop: 55,
    marginLeft: 20,
    marginRight: 70,
    alignItems: "center",
    height: 230,
    borderRadius: 24,
    borderWidth: 5,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderBottomStartRadius: 0,
  },
  text_main: {
    marginTop: 15,
    textAlign: "center",
    color: "#ffff",
    fontSize: 35,
    fontFamily: "FormulaOneBold",
  },
  text: {
    color: "#ffff",
    fontSize: 15,
    fontFamily: "FormulaOne",
  },
  text_secondary: {
    marginTop: 15,
    textAlign: "center",
    color: "#ffff",
    fontSize: 25,
    fontFamily: "FormulaOneBold",
  },
  input: {
    alignSelf: "center",
    backgroundColor: "#E5E5E5",
    textAlign: "center",
    marginTop: 20,
    marginLeft: 5,
    height: 50,
    width: 250,
    borderWidth: StyleSheet.hairlineWidth,
    borderWidth: 2,
    borderRadius: 100,
    fontWeight: "600",
  },
  button: {
    alignItems: "center",
    padding: 5,
    marginRight: 80,
    height: 50,
    width: 250,
    marginLeft: 80,
    marginTop: 20,
    paddingTop: 15,
    paddingBottom: 20,
    borderRadius: 50,
    borderWidth: 1,
  },
});

//function to get the header.
function Get_Team_Colour() {
  if ($Team === "Mercedes") {
    return "#00D2BE";
  } else if ($Team === "Red Bull") {
    return "#0600EF";
  } else if ($Team === "Ferrari") {
    return "#DC0000";
  } else if ($Team === "McLaren") {
    return "#FF9800";
  } else if ($Team === "Aston Martin") {
    return "#006F62";
  } else if ($Team === "Alfa Romeo") {
    return "#900000";
  } else if ($Team === "Alpine") {
    return "#0090FF";
  } else if ($Team === "Hass") {
    return "#4E4E4E";
  } else if ($Team === "Williams") {
    return "#005AFF";
  }
}
