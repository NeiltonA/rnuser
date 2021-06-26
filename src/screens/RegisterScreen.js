import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Alert,ScrollView, TouchableWithoutFeedback } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import { addressValidator } from '../helpers/addressValidator'
import { ageValidator } from '../helpers/ageValidator'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [address, setAddress] = useState({ value: '', error: '' })
  const [age, setAge] = useState({ value: '', error: '' })

 
  const onSignUpPressed = () => {

    var myHeaders = new Headers();

    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    const addressError = addressValidator(address.value)
    const ageError = ageValidator(age.value)
    if (emailError || passwordError || nameError || addressError || ageError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      setAddress({ ...address, error: addressError })
      setAge({ ...age, error: ageError })
      console.log('idade',age.value)
      return
    }


    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    fetch('https://example-ecommerce.herokuapp.com/user/customer/add', {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify({
        address: email.value,
        age: age.value,
        email: email.value,
        name: name.value,
        userPassword: password.value
      }),
    })
    .then((response) => {
      console.log('  data ' + response)
      if(response.status === 201){
        navigation.reset({
          index: 0,
          routes: [{ name: 'LoginScreen' }],
        })
      }else{
        handleErrorPress(response.status);
      }
    })
    };


    function handleErrorPress(arror){ 

      if(arror === 400){
        Alert.alert("Error!",
          "Email já cadastrado! " + arror,
          [
            {
              text: "OK",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ],
          );
      }else{
        Alert.alert("Error!",
          "Erro ao realizar o cadastro, tente novamente! " + arror,
          [
            {
              text: "OK",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            }
          ],
          );
      } 
    }

  return (
    <ScrollView>
    <TouchableWithoutFeedback >
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Criar conta de acesso</Header>
      <TextInput
        label="Nome"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Senha"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TextInput
        label="Endereço"
        returnKeyType="next"
        value={address.value}
        onChangeText={(text) => setAddress({ value: text, error: '' })}
        error={!!address.error}
        errorText={address.error}
      />
      <TextInput
        label="Idade"
        returnKeyType="next"
        value={age.value}
        onChangeText={(text) => setAge({ value: text, error: '' })}
        error={!!age.error}
        errorText={age.error}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Criar
      </Button>
      <View style={styles.row}>
        <Text>Já tem uma conta? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </Background>
    </TouchableWithoutFeedback>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },

})

