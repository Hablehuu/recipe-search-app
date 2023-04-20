import {
    StyleSheet,
    View,
    Button,
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar,
    Text
  } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '@react-native-firebase/functions';
import Item from './Recipe'


//data jota käytetään flatlistin olioiden luomiseen
const DATA = [
  {
    id: '1',
    title: 'salad',
    ingredients: ["carrot","potato","apple"]
  },
  {
    id: '2',
    title: 'potatos with minced meat',
    ingredients: ["potato","minced meat"]
  },
  {
    id: '3',
    title: 'apple',
    ingredients: ["apple"]
  },
  {
    id: '4',
    title: 'CMA test Item',
    ingredients: ["carrot","milk","apple"]
  }
]
// function that is used to call OpenAI API 
//input is the message that is sent to ChatGPT
const APICall = async (input) => {
  
  try {
    const { data } = await firebase.functions().httpsCallable('chatWithGPT')({input: input});
    //const response = await chatWithGPT({input: input});
    console.log(data)
    const output = data.data.data;
    return(output)
    // Do something with the output
  } catch (err) {
    console.error(err + " something went wrong with the API");
    // Handle the error
    return(err)
  }
};

//test functon to test the firebase backend
const helloWorld = async () => {
  
  try {
    const { data } = await firebase.functions().httpsCallable('helloWorld')();
    //const response = await chatWithGPT({input: input});
    console.log(data);
    const output = data;
    console.log(output);
    return(output)
    // Do something with the output
  } catch (err) {
    console.error(err + " something went wrong with the API");
    // Handle the error
    return(err)
  }
};


//home screen of the app handles showing recepies that match the recepies of the user
//ingredients come to the screen through the route object
const HomeScreen = ({ route}) => {
  const [data, setData] = useState([]);
  const [filteredrecipes, setRecipes] = useState([]); //not in use, might be useful later
  const [APIresponse, setResponse] = useState("no response yet"); 
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data.map(item => item.Name));
      //console.log(data)
    }
    /*if(data.length > 0){
      const message = "I have in my fridge " + data + " give me a recipe that I could make with these"
      console.log(message)
      console.log("message to GPT")
      setResponse(APICall(data))
      console.log(APIresponse)
    }*/
  }, [route.params]);


  helloWorld().then(output => {  setResponse(output); });
  //filters the recepies so that only the ones that have all their ingredients owned by the user are shown
  //TODO: the amounts of ingredients could be nice to have aswell
  const filtRecep = DATA.filter((item) => item.ingredients.every((element) => data.includes(element)));
  
  console.log(filtRecep + " filtered recipes")
  //setRecipes(filtRecep)
  
  const Recipe = ({item}) => {
    
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate('recipeScreen',{data: item})} //Alert.alert('Flatlist ' + item.title + ' pressed')}
      />
    );
  };

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        <View style={styles.topNavigator}>
          {/* useless buttons, should propably be remove in the future if no use is found*/}
          <Button
            title="add"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
          <Button
            title="options"
            onPress={() => Alert.alert('Simple Button pressed')}
          />
        </View>
        {/*a flat list where all the recepies are shown*/}
        <FlatList
          data={filtRecep}
          renderItem={Recipe}
          keyExtractor={item => item.id}
        />
        <Text>{APIresponse}</Text> 
      </SafeAreaView>
    )
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
      backgroundColor: '#fff'
      //alignItems: 'center',
      //justifyContent: 'center',
    },
    topNavigator: {
      marginTop: StatusBar.currentHeight || 0
    },
  })

  export default HomeScreen;