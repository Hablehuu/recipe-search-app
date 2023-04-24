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


// function that is used to call OpenAI API 
//input is the message that is sent to ChatGPT
const APICall = async (input) => {
  
  try {
    const { data } = await firebase.functions().httpsCallable('chatWithGPT')(input);
    console.log(data);
    const output = data;
    return(output);
  } catch (err) {
    console.error(err + " something went wrong with the API");
    // Handle the error
    return(err);
  }
};



//home screen of the app handles showing recepies that match the recepies of the user
//ingredients come to the screen through the route object
const HomeScreen = ({ route}) => {
  const [data, setData] = useState([]);
  const [APIresponse, setResponse] = useState("no response yet");
  const [list, setList] = useState(["No recipe yet"]);
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data.map(item => item.Name));
    }
    if(data.length > 0){
      const message = "I have in my fridge " + data + " give me a recipe that I could make with these"
      console.log(message)
      console.log("message to GPT")
      APICall(message).then(output => {  setResponse(output); });
    }
  }, [route.params]);

 useEffect(() =>{
  console.log("API response useeffectissä")
  console.log(APIresponse)
  if(APIresponse != "no response yet") {
    
    const temp = APIresponse.split('\n');
    setList(temp);
  
  
  }
  console.log(list);

 }, [APIresponse]); 


  return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#00BCD4"
          translucent={true}
        />
        {/*a flat list where all the recepies are shown */}
        <FlatList
          data={list}
          renderItem={({item}) => <Text>{item} </Text> }
         
        />
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