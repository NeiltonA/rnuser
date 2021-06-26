//import liraries
import React, { Component, useEffect, useState } from 'react';
import {AntDesign, Feather as Icon } from '@expo/vector-icons';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from 'react-native';


function handleDeletePress(){ 
  Alert.alert(
      "Atenção!",
      "Você tem certeza que deseja excluir este produto?",
      [
          {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
          },
          { text: "Sim", onPress: () => console.log(`${props.id} deleted`) }
      ],
      { cancelable: false }
      );
}
// create a component
const Get = ({ navigation }) => {
  const [user, setUser] = useState();

  const getUserData = async () => {
    try {
      let response = await fetch('https://example-ecommerce.herokuapp.com/product/list');
      let json = await response.json();
      setUser(json);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUserData();
  }, []);

  const getUserItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=>navigation.navigate('Detail', {
        item: item
       
      })}>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
            padding: 5,
          }}>
            
          <Text >Nome: {item.name}</Text>
          <Text numberFormat>Preço: {currencyFormat(item.price)}</Text>
          <Text >Quantidade: {item.amount}</Text>
          <Text >Fabricante: {item.factory.name}</Text>

          <TouchableOpacity 
            style={styles.deleteButton}
            type="clear"
            onPress={handleDeletePress}> 
            <Icon name="trash" color="red" size={22} />
        </TouchableOpacity>
        </View>
      
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={user}
        renderItem={getUserItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

  function getActions(user){
    return(
        <>
        <Button
        onPress={() => confirmUserDeletion(user)}
        type="clear"
        icon={<Icon name="delete" size={25} color="red"/>}
        />
        </>
    )
  }

  function currencyFormat(num) {
    return 'R$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }
//make this component available to the app
export default Get;
