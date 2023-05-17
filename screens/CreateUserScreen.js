import React, {useState, cloneElement} from 'react'
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native'
import { database } from '../database/firebase';
import { collection, addDoc } from 'firebase/firestore';

const CreateUserScreen = (props) => {

    const [state, setState] = useState({
        name:'',
        email:'',
        phone:''
    })

    const handleChangeText = (name, value) => {
        setState({...state, [name]: value})
    }

    const saveNewUser = async () => {
        if (state.name === ''){
            alert('Por favor, ingresa un nombre')
        }else{
            await addDoc(collection(database, 'usuarios'), state);
            props.navigation.navigate('UserList')
        }
    }

  return (
    <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
            <TextInput placeholder='Name User'
             onChangeText={(value) => handleChangeText('name',value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder='Email User'
            onChangeText={(value) => handleChangeText('email',value)}/>
        </View>
        <View style={styles.inputGroup}>
            <TextInput placeholder='Phone User'
            onChangeText={(value) => handleChangeText('phone',value)}/>
        </View>
        <View>
            <Button title='Save User' onPress={() => saveNewUser()}/>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:35
    },
    inputGroup: {
        flex:1,
        padding:0,
        marginBottom:15,
        borderBottomWidth:1,
        borderBottomColor:'#cccccc'
    }
})

export default CreateUserScreen