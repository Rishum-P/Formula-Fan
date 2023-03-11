/* This page retrives user uploaded images from Firebase and displays them in a List */
import * as React from "react";
import {
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  Text,
  View,
} from "react-native";
import Fire from "../Fire.js";

export default class FansShare extends React.Component {
  //State that will contain the needed data
  state = {
    data: [],
  };

  //On mount get data and if focused re-get data.
  componentDidMount() {
    Fire.images().then((result) => {
      this.setimages(result);
    });

    this.focus = this.props.navigation.addListener("focus", () => {
      Fire.images().then((result) => {
        this.setimages(result);
      });
    });
  }

  componentWillUnmount() {
    this.focus();
  }

  //Set result to data value.
  setimages(result) {
    this.setState({ data: result });
  }

  render() {
    const $headercolor = Get_Team_Colour();
    return (
      //Show header then a list view of the data items.
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $headercolor }]}>
          <Text style={styles.header_text}>{$Team}</Text>
        </View>
        <View style={styles.postbutton}>
          <TouchableOpacity
            style={styles.header_pos1}
            onPress={() => {
              this.props.navigation.navigate("UploadP");
            }}
          >
            <Text style={styles.header_post}>Upload</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.uploadbutton}>
          <FlatList
            data={this.state.data}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Image
                source={{ uri: item }}
                key={item}
                resizeMode="cover"
                style={{
                  width: Dimensions.get("window").width,
                  height: 200,
                  borderWidth: 1,
                  borderColor: "#ffff",
                }}
              />
            )}
          />
        </View>
      </View>
    );
  }
}

//Styles needed for this page.
const styles = StyleSheet.create({
  container: {
    paddingTop: 0,
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
  uploadbutton: {
    height: Dimensions.get("window").height,
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
