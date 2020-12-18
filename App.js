import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Constants from 'expo-constants';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      word: '',
      lexicalCategory: '',
      examples: [],
      defination: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';

    return fetch(url)
      .then((data) => {
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        //console.log(responseObject)
        if (responseObject) {
          //console.log(responseObject)
          var wordData = responseObject.definitions[0];
          console.log(wordData);
          var defination = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            word: this.state.text,
            definition: defination,
            lexicalCategory: lexicalCategory,
          });
          console.log(this.state.defination);
        } else {
          this.setState({
            word: this.state.text,
            lexicalCategory: 'Lexical Category Not Found',
            definition: 'Definition Not Found',
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          centerComponent={{
            text: 'Pocket Dictionary',
            style: { color: 'white', fontSize: 20, fontWeight: 'bold' },
          }}
          backgroundColor={'purple'}
        />

        <Image style={styles.imageLogo} source={require('./assets/Logo.png')} />

        <TextInput
          style={styles.inputBox}
          placeholder="Search a Word"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              this.setState({
                isSearchPressed: true,
              });

              this.getWord(this.state.text);
            }
          }}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchPressed: false,
              word: 'loading...',
              lexicalCategory: 'loading...',
              examples: [],
              definition: 'loading...',
            });
          }}
          value={this.state.text}
        />

        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'black',
            marginTop: 10,
            width: 100,
            height: 30,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            this.setState({
              isSearchPressed: true,
            });

            this.getWord(this.state.text);
          }}>
          <Text style={{ color: 'white' }}>Search</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.typeText}>Word : {''}</Text>
          <Text style={styles.answerText}>{this.state.word}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.typeText}>Type : {''}</Text>
          <Text style={styles.answerText}>{this.state.lexicalCategory}</Text>
        </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.typeText}>Defination : {''}</Text>
          <Text style={styles.answerText}>{this.state.definition}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inputBox: {
    marginTop: 25,
    width: 200,
    borderWidth: 4,
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderRadius: 10,
    fontWeight: 'bold',
  },

  typeText: {
    color: '#007CB8',
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },

  answerText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },

  imageLogo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
});
