/* This page show a map of the world with markers containing shared fan locations as retrived from the Firebase Database */

import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Fire from "../Fire.js";

export default class LocShare extends React.Component {
  //State containing needed data
  state = {
    data: [],
  };

  //Getting data and if focused re-getting data.
  componentDidMount() {
    Fire.locations().then((result) => {
      this.setlocations(result);
    });

    this.focusListener = this.props.navigation.addListener("focus", () => {
      Fire.locations().then((result) => {
        this.setlocations(result);
      });
    });
  }

  componentWillUnmount() {
    this.focusListener();
  }

  //Setting data to state
  setlocations(result) {
    this.setState({ data: result });
  }

  render() {
    const $headercolor = Get_Team_Colour();

    //Very Simple body, just contains Header and a Map View.
    return (
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $headercolor }]}>
          <Text style={styles.header_text}>{$Team}</Text>
        </View>
        <View style={styles.postbutton}>
          <TouchableOpacity
            style={styles.header_pos1}
            onPress={() => {
              this.props.navigation.navigate("LocUploadP");
            }}
          >
            <Text style={styles.header_post}>Share</Text>
          </TouchableOpacity>
        </View>

        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 55.3781,
            longitude: 3.436,
            latitudeDelta: 18,
            longitudeDelta: 15,
          }}
        >
          {/* Get all the Markers and insert into on the Map*/}

          {this.state.data.map((item) => (
            <MapView.Marker
              key={item.time}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}
              title={item.name}
              description={item.description}
            />
          ))}
        </MapView>
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
  header_text: {
    color: "#ffff",
    fontSize: 35,
    fontFamily: "FormulaOneBold",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  header_post: {
    color: "#ffff",
    fontSize: 15,
    fontFamily: "FormulaOneBold",
  },
  header_pos1: {
    width: 60,
    height: 25,
    marginRight: 19,
    marginTop: 11,
  },
  postbutton: {
    position: "absolute",
    width: 60,
    height: 25,
    marginLeft: 340,
    marginTop: 45,
  },
});

//Function to get team colour
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
