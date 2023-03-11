/* 
Main Team Page that shows News regarding the User's Selected Team.

This page uses the Web Search API (https://rapidapi.com/contextualwebsearch/api/web-search/) to get the 20 recent news articles about the F1 Team selected. API has a limit of 500 requests per day. 
*/

import * as React from 'react';
import { StyleSheet, Linking , Image, TouchableOpacity, Text, View, FlatList, Dimensions  } from 'react-native';

export default class TeamPage extends React.Component {

  //State that contains that will contain the News Data.
  state = {
    data: []
  };

  //On the component loading Fetch the data. Also on Focus, re-get the data!
  componentDidMount(){
    this.fetchData();

    this.reload = this.props.navigation.addListener('focus', () => {
      this.fetchData();
    });
  }

  //Reload the data on Unmount.
  componentWillUnmount() {
    this.reload();
  }

  //Fetching the News API data and setting Data to its reply.
  fetchData = async () => {
    
    if ($Team === 'Mercedes') { 
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=mercedes-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Red Bull'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=red-bull-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Ferrari'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=ferrari-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedeDate=null&toPublishedDate=null"
    }
    else if ($Team === 'McLaren'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=mclaren-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Aston Martin'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=aston-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Alfa Romeo'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=alpfa-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Alpine'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=alpine-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Hass'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=hass-f1-team&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }
    else if ($Team === 'Williams'){
      $url = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI?q=williams-f1&pageNumber=1&pageSize=20&autoCorrect=false&safeSearch=false&withThumbnails=true&fromPublishedDate=null&toPublishedDate=null"
    }

    const response = await fetch($url, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "235bd9daa0mshabde3e5b0be7c19p1acb78jsnfa0974f934ae",
        "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
      }
    })

    const json = await response.json();

    this.setState({data: json.value});
    
  };

 

  render(){

    //Getting the Header Color.
    const $headercolor = Get_Team_Colour();

    return (
            
      <View style={styles.container}>

         {/* Header that changes color to match users selected Team */}
        <View style={[styles.header,{backgroundColor: $headercolor}]}>
            <Text style={styles.header_text}>{ $Team }</Text>
        </View>


         {/* Main Body that shows the News Feed using a Flat List */}
        
        <View style={styles.body}>

            <FlatList data={this.state.data} keyExtractor={(item, index) => item.id} renderItem={({ item }) =>
            
              <View style={styles.news_main}>
                <TouchableOpacity onPress={() => {Linking.openURL(item.url)}}>
                  <View style={[styles.news_top_title,{backgroundColor: $headercolor}]}>
                      <Text style={styles.news_text}>
                        {item.provider.name}
                      </Text>
                  </View>

                  <Image source={{uri: item.image.url}} style={{width: Dimensions.get('window').width, height:200, borderWidth: 1, borderBottomWidth: 0, borderTopWidth: 0,borderRightWidth: 1, borderColor: '#ffff' }} />
                    
                  <View style={[styles.news_bottom_title,{backgroundColor: $headercolor}]}>
                    <Text style={styles.news_text}>
                      {item.title}
                    </Text>
                    </View>     
                </TouchableOpacity>
              </View>  

            } />

        </View>        
      </View>

   ) 

  }

}

//Styling used for this page.
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#15151E',
  },

  header: {
    alignItems: "center",
    height: 90,
    padding: 45,
  },

  news_main: {
    marginTop: 20,
  },

  news_top_title: {
    borderColor: '#ffff',
    borderRadius:24,
    borderWidth: 1,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },

  news_bottom_title: {
    borderColor: '#ffff',
    marginBottom: 0,
    borderRadius:24,
    borderWidth: 1,
    borderTopEndRadius: 0,
    borderTopLeftRadius: 0,
  },

  header_text: {
    color: '#ffff',
    fontSize: 35,
    fontFamily: 'FormulaOneBold'
  },

  body: {
    height: Dimensions.get('window').height,
    backgroundColor: "#15151E",
  },
  
  news_text: {
    fontSize: 10,
    alignSelf: "center",
    padding: 10,
    fontFamily: 'FormulaOne',
    color: '#ffff'

  },

});
//Very Simple Function that returns the colour code based on the users selected team
function Get_Team_Colour() {
    if ($Team === 'Mercedes') { 
        return '#00D2BE'
    }
    else if ($Team === 'Red Bull'){
      return '#0600EF'
    }
    else if ($Team === 'Ferrari'){
      return '#DC0000'
    }
    else if ($Team === 'McLaren'){
      return '#FF9800'
    }
    else if ($Team === 'Aston Martin'){
      return '#006F62'
    }
    else if ($Team === 'Alfa Romeo'){
      return '#900000'
    }
    else if ($Team === 'Alpine'){
      return '#0090FF'
    }
    else if ($Team === 'Hass'){
      return '#4E4E4E'
    }
    else if ($Team === 'Williams'){
      return '#005AFF'
    }
}
