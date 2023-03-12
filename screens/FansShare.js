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
    return (
      //Show header then a list view of the data items.
      <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: $TeamColor }]}>
          <Text style={styles.header_text}>{$TeamName}</Text>
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
                  width: Dimensions.get("window").width - 10,
                  height: 200,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#dddddd",
                  marginVertical: 10,
                  marginHorizontal: 5,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  shadowColor: "#000",
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
    marginLeft: Dimensions.get("window").width - 75,
    marginTop: Dimensions.get("window").height * 0.07,
  },
});
