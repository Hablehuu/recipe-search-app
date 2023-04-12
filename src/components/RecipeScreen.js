import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';




function RecipeScreen({ route}) {
  return (
    <View >
      <View style = {styles.Title}>
        <Text style = {styles.Titletext}>{route.params.data.title}
        </Text>
      </View>
      
      <FlatList
      data={route.params.data.ingredients}
      renderItem={({item}) => <Text>{item} </Text> }
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  Title: {
    //backgroundColor: 'red',
    borderBottomWidth: 2,
  },
  Titletext: {
    fontSize: 30,
  },
})



export default RecipeScreen;