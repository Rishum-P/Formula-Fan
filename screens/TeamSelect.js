import * as React from "react";
import {
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  FlatList,
} from "react-native";

const teamsData = [
  { name: "Mercedes", color: "#00D2BE" },
  { name: "Red Bull", color: "#0600EF" },
  { name: "Ferrari", color: "#DC0000" },
  { name: "McLaren", color: "#FF9800" },
  { name: "Aston Martin", color: "#006F62" },
  { name: "Alfa Romeo", color: "#900000" },
  { name: "Alpine", color: "#0090FF" },
  { name: "Hass", color: "#4E4E4E" },
  { name: "Williams", color: "#005AFF" },
];

export default class TeamSelect extends React.Component {
  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    return (
      <TouchableOpacity
        style={[styles.button, { backgroundColor: item.color }]}
        onPress={() => {
          $TeamName = item.name;
          $TeamColor = item.color;
          navigate("TeamPage", { team: item.color });
        }}
      >
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.header_text}>Select A Team</Text>
        </View>

        {/* Team buttons */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={teamsData}
            renderItem={this.renderItem}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.scrollView}
          />
        </View>

        {/* Footer */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 0,
    backgroundColor: "#15151E",
  },
  header: {
    paddingVertical: 20,
    backgroundColor: "#E10600",
  },
  header_text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "FormulaOneBold",
    marginTop: 35,
  },
  scrollView: {
    paddingBottom: 40,
  },
  text: {
    color: "#ffff",
    fontSize: 25,
    fontFamily: "FormulaOne",
  },
  imagebottom: {
    alignItems: "center",
    marginBottom: 40,
    flex: 0,
    justifyContent: "flex-end",
  },
  image: {
    alignItems: "center",
    width: 200,
    height: 100,
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
});
