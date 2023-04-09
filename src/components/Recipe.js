import { StyleSheet, Text, Alert, TouchableOpacity, } from 'react-native';

//Resepti taulu? joita on päänäkymässä
const Item = ({item, onPress}) => (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text>{item.title}</Text>
    </TouchableOpacity>
  );

//Not used currently
  const Recipe = ({item}) => {
    
    return (
      <Item
        item={item}
        onPress={() => navigation.navigate} //Alert.alert('Flatlist ' + item.title + ' pressed')}
      />
    );
  };

 
//CSS
const styles = StyleSheet.create({
    item: {
      padding: 20,
      marginVertical: 4,
      marginHorizontal: 16,
      backgroundColor:'lightblue'
    },
  });

export default  Item;