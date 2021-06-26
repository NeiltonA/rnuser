//import liraries
import React, { useState } from 'react';
import {Feather as Icon} from '@expo/vector-icons';
import { Button} from 'react-native-paper';
import api from '../services/api';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from 'react-native';




// create a component
const ProductList = ({ navigation }) => {
  const [user, setUser] = useState();

  const getUserData = async () => {
    try {
      let response = await api.get('/product/list');
      let json = await response.data;
      setUser(json);
    } catch (error) {
      console.error(error);
    }
  };

  useState(() => {
    getUserData();
  }, []);

  // chamada delite

  function handleDeletePress(user){ 
    Alert.alert(
        "Excluir Produto",
        "Você tem certeza que deseja excluir este item?", 
        [
            {
            text: "Não",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { 
              text: "Sim", 
              onPress() {
                onDelete(user.id)
                
              }
            }
        ],
        { cancelable: false }
        );
  }
  
  const onDelete = (user) => {
    console.log('delete ' + user)
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
  
    fetch(`https://example-ecommerce.herokuapp.com/product/${user}/remove`, {
      method: 'DELETE',
      headers: myHeaders,
    })
    .then((response) => {
      response.text();
      if(response.status === 200){
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProductList' }],
        })
      }else{
        console.warn('retorno api ' + response)
        navigation.reset({
          index: 0,
          routes: [{ name: 'ProductList' }],
        })
        
      }
    })
  };
  
  const getUserItem = ({ item: user}) => {
    return (
  
      <ScrollView>
         <TouchableOpacity onPress={()=>navigation.navigate('Dashboard')}>
      <SafeAreaView style={estilos.saveArea}>
      <Animated.ScrollView
          underlayColor='#dddddd'>
        <View>
          <View style={estilos.rowContainer}>
            <View  style={estilos.textContainer}>
              <Text style={estilos.price}>Nome: {user.name}</Text>
              <Text style={estilos.title}>Preço: {currencyFormat(user.price)}</Text>
              <Text style={estilos.title}>Quantidade: {user.amount}</Text>
              <Text style={estilos.title}>Fabricante: {user.factory.name}</Text>
            </View>
            <TouchableOpacity 
                style={estilos.deleteButton}
                type="clear"
                onPress={() => handleDeletePress(user)}>
                <Icon name="trash" color="red" size={22} />
            </TouchableOpacity>
          </View>
          <View style={estilos.separator}/>
        </View>
        </Animated.ScrollView>
        </SafeAreaView>
     </TouchableOpacity>
    </ScrollView>  
  
    );
    
  };

  return (
    <View >
      <FlatList
        data={user}
        renderItem={getUserItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};


var estilos = StyleSheet.create({
  thumb: {
    width: 60,
    height: 60,
    marginRight: 10
  },
  textContainer: {
    flex: 2
  },
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  separator: {
    height: 2,
    backgroundColor: '#dddddd'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8cc53e'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 30
  },
  saveArea: {
    flex: 1,
    backgroundColor: '#eff3fb',
  }
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

export default ProductList;
