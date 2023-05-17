import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { database } from '../database/firebase';
import { QuerySnapshot, collection, onSnapshot, orderBy, query, deleteDoc, doc } from 'firebase/firestore';
import Usuarios from './Usuarios';

const UserList = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState('');

    useEffect(() => {
        const collectionRef = collection(database, 'usuarios');
        const q = query(collectionRef, orderBy('name', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setUsers(
                querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    email: doc.data().email,
                    name: doc.data().name,
                    phone: doc.data().phone,
                }))
            );
        });

        return unsubscribe;
    }, []);

    const handleDeleteUser = async () => {
        try {
            const userRef = doc(database, 'usuarios', selectedUserId);
            await deleteDoc(userRef);
        } catch (error) {
            console.log('Error deleting user:', error);
        }
    };

    const handleEditUser = (user) => {
        navigation.navigate('EditUserScreen', { user });
    };

    const confirmDeleteUser = (userId) => {
        setSelectedUserId(userId);
    };

    return (
        <View style={styles.container}>
            <View style={styles.addButtonContainer}>
                <Button title="Add User" onPress={() => navigation.navigate('CreateUserScreen')} />
            </View>
            <Text style={styles.title}>Users List</Text>
            {users.map((usuario) => (
                <View key={usuario.id} style={styles.userContainer}>
                    <View style={styles.userDataContainer}>
                        <Usuarios {...usuario} />
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button title="Edit" onPress={() => handleEditUser(usuario)} color="orange" />
                        <Button title="Delete" onPress={() => confirmDeleteUser(usuario.id)} color="red" />
                    </View>
                </View>
            ))}
            {selectedUserId !== '' && (
                <View style={styles.confirmationContainer}>
                    <Text style={styles.confirmationText}>Are you sure you want to delete this user?</Text>
                    <View style={styles.confirmationButtonsContainer}>
                        <TouchableOpacity style={styles.confirmationButton} onPress={handleDeleteUser}>
                            <Text style={styles.confirmationButtonText}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.confirmationButton} onPress={() => setSelectedUserId('')}>
                            <Text style={styles.confirmationButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    addButtonContainer: {
      marginBottom: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    userContainer: {
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: '#cccccc',
    },
    userDataContainer: {
      flex: 1,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    deleteButton: {
      marginLeft: 10,
    },
    deleteButtonText: {
      color: 'red',
      backgroundColor: 'red'
    },
    confirmationContainer: {
      marginTop: 20,
      padding: 10,
      backgroundColor: '#f8f8f8',
      borderRadius: 5,
    },
    confirmationText: {
      fontSize: 16,
      marginBottom: 10,
    },
    confirmationButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    confirmationButton: {
      marginLeft: 10,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: 'red',
      borderRadius: 5,
    },
    confirmationButtonText: {
      color: 'white',
    },
  });
  

export default UserList;
