/*
This page allows the user to enter their name plus a short description of themself and then upload their location using Geo Location to the Fan Finder map. This data is uploaded to a Fire Store Cloud Database.
*/

import * as React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  View,
  SafeAreaView,
} from "react-native";
import * as Location from "expo-location";
import Fire from "../Fire.js";
import { LOCATION_FOREGROUND } from "expo-permissions";

export default class LocationUpload extends React.Component {
  //Required States
  state = {
    name: "",
    description: null,
    location: null,
    geocode: null,
    errorMessage: "",
  };

  //Call method to get Users Location
  handleShare = () => {
    this.getLocationAsync();
  };

  //Check Permission and then Get User Location. Following that add it to the database and transition back to the Fan Finder Page.
  getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync(
      LOCATION_FOREGROUND
    );
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
    });
    const { latitude, longitude } = location.coords;
    this.setState({ location: { latitude, longitude } });
    Fire.addshare({
      name: this.state.name.trim(),
      description: this.state.description.trim(),
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
    })
      .then((ref) => {
        this.setState({ name: "", description: "" });
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  render() {
    //Getting header colour.
    const $headercolor = Get_Team_Colour();

    return (
      //Header with Team Name
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $headercolor }]}>
          <Text style={styles.header_text}>{$Team}</Text>
        </View>

        {/* Main Body with inputs for required data */}

        <View style={[styles.main, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>1. Enter Your Name</Text>
          <TextInput
            style={[styles.input, { borderColor: $headercolor }]}
            placeholder="Your Name"
            onChangeText={(name) => {
              this.setState({ name });
            }}
            value={this.state.name}
          />
        </View>

        <View style={[styles.imagepicker, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>2. Enter Short description</Text>
          <TextInput
            style={[styles.input, { borderColor: $headercolor }]}
            placeholder="Small Text About You"
            onChangeText={(description) => {
              this.setState({ description });
            }}
            value={this.state.description}
          />
        </View>

        <View style={[styles.main_confim, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>3. Share Location </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: $headercolor, borderColor: $headercolor },
            ]}
            onPress={this.handleShare}
          >
            <Text style={styles.text}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

//Styles for this page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15151E",
  },
  header: {
    alignItems: "center",

    height: 90,
    padding: 45,
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
    borderColor: "#E10600",
    borderWidth: 2,
    borderRadius: 100,
    fontWeight: "600",
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
    height: 150,
    borderRadius: 24,
    borderWidth: 5,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomStartRadius: 0,
    borderColor: "#E10600",
  },
  main_confim: {
    marginTop: 55,
    marginLeft: 70,
    marginRight: 20,
    alignItems: "center",
    height: 150,
    borderRadius: 24,
    borderWidth: 5,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomStartRadius: 0,
    borderColor: "#E10600",
  },
  imagepicker: {
    marginTop: 55,
    marginLeft: 20,
    marginRight: 70,
    alignItems: "center",
    height: 140,
    borderRadius: 24,
    borderWidth: 5,
    borderBottomEndRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderBottomStartRadius: 0,
    borderColor: "#E10600",
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
    backgroundColor: "#E10600",
    borderColor: "#E10600",
  },
});

//function to get the team colour
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
