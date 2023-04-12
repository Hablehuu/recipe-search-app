import {
    StyleSheet,
    View,
    Button,
    Alert,
    FlatList,
    SafeAreaView,
    StatusBar
  } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
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




//home screen of the app handles showing recepies that match the recepies of the user
//ingredients come to the screen through the route object
//TODO: also get the ingredients through other means so that the user dosen't need to go to the other screen
//before getting recepies
const HomeScreen = ({ route}) => {
  const [data, setData] = useState([]);
  const [filteredrecipes, setRecipes] = useState([]); //not in use, might be useful later
  const navigation = useNavigation();
  useEffect(() => {
    if (route.params && route.params.data) {
      setData(route.params.data.map(item => item.Name));
      console.log(data)
    }
  }, [route.params]);
  
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