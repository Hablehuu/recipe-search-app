import {
    StyleSheet,  
    View,
    SafeAreaView,
    StatusBar,
    Button,
    TextInput,
    FlatList,
    Text, 
    Alert, 
    TouchableOpacity,
  } from 'react-native'
import React, { useEffect, useState } from 'react';
import ingredientsData from '../../Ingredients.json';
//TODO: the code is very messy and "spaghetti", could use a clean up
//TODO: a way for the user to set how much they have of a certain ingredient
const SearchScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  useEffect(() => {
    setData(ingredientsData.Ingredients);
  }, []);

  const filterData = (query) => {
    const filteredData = ingredientsData.Ingredients.filter((item) =>
      item.Name.toLowerCase().includes(query.toLowerCase())
    );
    setData(filteredData);
  };


  const renderItem = ({ item }) => (
    <TouchableOpacity 
      onPress ={() => {
        const newData = data.map(ingredient => {
          if (ingredient.Name === item.Name) {
            return {
              ...ingredient,
              owns: !ingredient.owns
            };
          }
          return ingredient;
        });
        setData(newData);
        //if(!item.owns){Alert.alert('Ingredient added')}
        //else Alert.alert('Ingredient removed')
        
      }
     } 
      style={[styles.item, item.owns ? styles.green : styles.white]}>
      <Text>{item.Name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topNavigator}>
        <TextInput
          style={styles.input}
          onChangeText={(query) => {
            setQuery(query);
            filterData(query);
          }}
          value={query}
          placeholder="Search ingredients..."
        />
      </View>
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item.Name} />
      <Button
          title="save changes and return to home screen"
          //TODO: actually save data to the JSON file
          onPress={() => navigation.navigate('Home', { data: data.filter(ingredient => ingredient.owns) })}
      />
    </SafeAreaView>
  );
};





const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: '#fff',
  },
  topNavigator: {
    marginTop: StatusBar.currentHeight || 0,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  item: {
    padding: 20,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "black",
  },
  white: {
    backgroundColor: 'white',
  },
  green: {
    backgroundColor: 'lightgreen',
  },
});

  
export default  SearchScreen;