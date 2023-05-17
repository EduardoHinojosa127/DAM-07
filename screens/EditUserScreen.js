import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet } from 'react-native';
import { database } from '../database/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

const EditUserScreen = ({ navigation, route }) => {
    const [state, setState] = useState({
        name: '',
        email: '',
        phone: ''
    });

    useEffect(() => {
        if (route.params && route.params.user) {
            const { name, email, phone } = route.params.user;
            setState({ name, email, phone });
        }
    }, [route.params]);

    const handleChangeText = (name, value) => {
        setState({ ...state, [name]: value });
    };

    const saveUser = async () => {
        if (state.name === '') {
            alert('Please enter a name');
        } else {
            try {
                const userRef = doc(database, 'usuarios', route.params.user.id);
                await setDoc(userRef, state);
                navigation.navigate('UserList');
            } catch (error) {
                console.log('Error updating user:', error);
            }
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Name User'
                    onChangeText={(value) => handleChangeText('name', value)}
                    value={state.name}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Email User'
                    onChangeText={(value) => handleChangeText('email', value)}
                    value={state.email}
                />
            </View>
            <View style={styles.inputGroup}>
                <TextInput
                    placeholder='Phone User'
                    onChangeText={(value) => handleChangeText('phone', value)}
                    value={state.phone}
                />
            </View>
            <View>
                <Button title='Save User' onPress={() => saveUser()} />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc'
    }
});

export default EditUserScreen;
