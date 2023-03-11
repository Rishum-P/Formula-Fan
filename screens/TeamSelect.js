//This page allows the User to select a Formula One Team.
import * as React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from "react-native";

export default class TeamSelect extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      //Main Container
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.header_text}>Select A Team</Text>
        </View>

        {/* Scrollable Buttons that when pressed navigate to the Team Page and sets the selected team's value */}
        <View style={{ height: 600 }}>
          <ScrollView style={styles.scrollView}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#00D2BE" }]}
              onPress={() => {
                $Team = "Mercedes";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Mercedes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#0600EF" }]}
              onPress={() => {
                $Team = "Red Bull";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Red Bull</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#DC0000" }]}
              onPress={() => {
                $Team = "Ferrari";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Ferrari</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF9800" }]}
              onPress={() => {
                $Team = "McLaren";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>McLaren</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#006F62" }]}
              onPress={() => {
                $Team = "Aston Martin";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Aston Martin</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#900000" }]}
              onPress={() => {
                $Team = "Alfa Romeo";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Alfa Romeo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#0090FF" }]}
              onPress={() => {
                $Team = "Alpine";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Alpine</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#4E4E4E" }]}
              onPress={() => {
                $Team = "Hass";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Hass</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#005AFF" }]}
              onPress={() => {
                $Team = "Williams";
                navigate("TeamPage");
              }}
            >
              <Text style={styles.text}>Williams</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Bottom F1 footer image. Purely for Aesthetics */}
        <View style={styles.imagebottom}>
          <Image
            source={require("../assets/f1-logo.png")}
            style={styles.image}
          />
        </View>
      </View>
    );
  }
}

//Styling for this page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#15151E",
  },

  image: {
    alignItems: "center",
    width: 200,
    height: 100,
  },

  text: {
    color: "#ffff",
    fontSize: 25,
    fontFamily: "FormulaOne",
  },

  imagebottom: {
    alignItems: "center",
    marginBottom: 40,
    flex: 1,
    justifyContent: "flex-end",
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
    height: 90,
    padding: 45,
    backgroundColor: "#E10600",
  },

  header_text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "FormulaOneBold",
  },
});
