/* 
Main Team Page that shows News regarding the User's Selected Team.

This page uses the Web Search API (https://rapidapi.com/contextualwebsearch/api/web-search/) to get the 20 recent news articles about the F1 Team selected. API has a limit of 500 requests per day. 
*/

import * as React from "react";
import {
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Dimensions,
} from "react-native";

const teamUrls = {
  Mercedes:
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=mercedes-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  "Red Bull":
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=red-bull-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  Ferrari:
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=ferrari-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedeDate=null&toPublishedDate=null",
  McLaren:
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=mclaren-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  "Aston Martin":
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=aston-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  "Alfa Romeo":
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=alpfa-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  Alpine:
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=alpine-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  Hass: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=hass-f1-team&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
  Williams:
    "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=williams-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null",
};

export default class TeamPage extends React.Component {
  //State that contains that will contain the News Data.
  state = {
    data: [],
  };

  //On the component loading Fetch the data. Also on Focus, re-get the data!
  componentDidMount() {
    this.fetchData();

    this.reload = this.props.navigation.addListener("focus", () => {
      this.fetchData();
    });
  }

  //Reload the data on Unmount.
  componentWillUnmount() {
    this.reload();
  }

  //Fetching the News API data and setting Data to its reply.
  fetchData = async () => {
    $url = teamUrls[$TeamName];

    const response = await fetch($url, {
      method: "GET",
      headers: {
        "x-rapidapi-key": "235bd9daa0mshabde3e5b0be7c19p1acb78jsnfa0974f934ae",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      },
    });

    const json = await response.json();

    this.setState({ data: json.value });
  };

  render() {
    const { data } = this.state;
    return (
      <View style={styles.container}>
        {/* Header that changes color to match users selected Team */}
        <View style={[styles.header, { backgroundColor: $TeamColor }]}>
          <Text style={styles.header_text}>{$TeamName}</Text>
        </View>

        {/* Main Body that shows the News Feed using a Flat List */}
        <View style={styles.body}>
          <FlatList
            data={data}
            keyExtractor={({ id }) => id}
            renderItem={({ item }) => (
              <View style={styles.news_main}>
                <TouchableOpacity onPress={() => Linking.openURL(item.url)}>
                  <View
                    style={[
                      styles.news_top_title,
                      { backgroundColor: $TeamColor },
                    ]}
                  >
                    <Text style={styles.news_text}>{item.provider.name}</Text>
                  </View>
                  <View style={{ width: "100%", alignItems: "center" }}>
                    <Image
                      source={{ uri: item.image.url }}
                      style={{
                        width: "100%",
                        height: 200,
                        borderWidth: 1,
                        borderBottomWidth: 0,
                        borderTopWidth: 0,
                        borderRightWidth: 1,
                        borderColor: "#ffff",
                      }}
                    />
                  </View>
                  <View
                    style={[
                      styles.news_bottom_title,
                      { backgroundColor: $TeamColor },
                    ]}
                  >
                    <Text style={styles.news_text}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

//Styling used for this page.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#15151E",
  },

  header: {
    paddingVertical: 20,
    backgroundColor: "#E10600",
  },

  news_main: {
    marginTop: 20,
    backgroundColor: "#1F1F2B",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },

  news_top_title: {
    borderColor: "#ffff",
    borderRadius: 24,
    borderWidth: 1,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },

  news_bottom_title: {
    borderColor: "#ffff",
    marginBottom: 0,
    borderRadius: 24,
    borderWidth: 1,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
  },

  header_text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "FormulaOneBold",
    marginTop: 35,
  },

  body: {
    height: Dimensions.get("window").height,
    backgroundColor: "#15151E",
  },

  news_text: {
    fontSize: 10,
    alignSelf: "center",
    padding: 10,
    fontFamily: "FormulaOne",
    color: "#ffff",
  },
});
