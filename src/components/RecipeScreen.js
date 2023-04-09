import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function RecipeScreen({ route}) {
  return (
    <View>
      <Text>{route.params.data.Title}</Text>
    </View>
  );
}

export default RecipeScreen;