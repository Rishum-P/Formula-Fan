/* This page allows the user to upload an image from their gallery that will be stored inside the Firebase Database and Storage. This will then be used in the FanShare page. */
import * as React from "react";
import { StyleSheet, Image, TouchableOpacity, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import Fire from "../Fire.js";

//State which contains needed values.
export default class ImageUpload extends React.Component {
  state = {
    text: "TeamName",
    image: null,
  };

  componentDidMount() {
    this.getPhotoPermission();
  }

  //On mount get permission to access gallery.

  getPhotoPermission = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

      if (status != "granted") {
        alert(
          "We need permission to use your camera roll if you'd like to incude a photo."
        );
      }
    }
  };

  //Upload image to Firebase.

  handlePost = () => {
    Fire.addPost({ text: this.state.text.trim(), localUri: this.state.image })
      .then((ref) => {
        this.setState({ text: "", image: null });
        this.props.navigation.goBack();
      })
      .catch((error) => {
        alert(error);
      });
  };

  //Pick Image from Gallary ensuring its 16x9
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: $TeamColor }]}>
          <Text style={styles.header_text}>{$TeamName}</Text>
        </View>

        {/* Main Sections to get needed details and show preview of image */}

        <View style={[styles.main, { borderColor: $TeamColor }]}>
          <Text style={styles.text_secondary}>1. Select A Picture</Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: $TeamColor, borderColor: $TeamColor },
            ]}
            onPress={this.pickImage}
          >
            <Text style={styles.text}>Open Gallery</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.imagepicker, { borderColor: $TeamColor }]}>
          <Text style={styles.text_secondary}>2. Preview Image</Text>
          <Image
            source={{ uri: this.state.image }}
            style={{ marginTop: 15, width: 192, height: 144 }}
          ></Image>
        </View>

        <View style={[styles.main_confim, { borderColor: $TeamColor }]}>
          <Text style={styles.text_secondary}>3. Confirm Upload </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: $TeamColor, borderColor: $TeamColor },
            ]}
            onPress={this.handlePost}
          >
            <Text style={styles.text}>Upload to FanShare</Text>
          </TouchableOpacity>
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
  main: {
    marginTop: 55,
    marginLeft: 70,
    marginRight: 20,
    alignItems: "center",
    height: 150,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: "#E10600",
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomStartRadius: 0,
  },
  main_confim: {
    marginTop: 10,
    marginLeft: 70,
    marginRight: 20,
    alignItems: "center",
    height: 150,
    borderRadius: 24,
    borderWidth: 5,
    borderColor: "#E10600",
    borderBottomEndRadius: 5,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomStartRadius: 0,
  },
  imagepicker: {
    marginTop: 55,
    marginLeft: 20,
    marginRight: 70,
    alignItems: "center",
    height: 250,
    borderRadius: 25,
    borderWidth: 5,
    borderColor: "#E10600",
    borderBottomEndRadius: 0,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 0,
    borderRightWidth: 0,
    borderLeftWidth: 5,
    borderBottomWidth: 0,
    borderBottomStartRadius: 5,
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
  },
  text_secondary: {
    color: "#ffff",
    fontSize: 20,
    marginTop: 20,
    fontFamily: "FormulaOneBold",
  },
  button: {
    width: 150,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    borderWidth: 2,
  },
});
