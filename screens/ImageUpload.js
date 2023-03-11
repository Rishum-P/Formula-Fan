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
    const $headercolor = Get_Team_Colour();
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: $headercolor }]}>
          <Text style={styles.header_text}>{$Team}</Text>
        </View>

        {/* Main Sections to get needed details and show preview of image */}

        <View style={[styles.main, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>1. Select A Picture</Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: $headercolor, borderColor: $headercolor },
            ]}
            onPress={this.pickImage}
          >
            <Text style={styles.text}>Open Gallery</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.imagepicker, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>2. Preview Image</Text>
          <Image
            source={{ uri: this.state.image }}
            style={{ marginTop: 15, width: 192, height: 144 }}
          ></Image>
        </View>

        <View style={[styles.main_confim, { borderColor: $headercolor }]}>
          <Text style={styles.text_secondary}>3. Confirm Upload </Text>
          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: $headercolor, borderColor: $headercolor },
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

//Required Styles for this Page
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
    height: 250,
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
