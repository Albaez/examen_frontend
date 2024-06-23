import { NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, View } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const handleProducto = () => {
        navigation.navigate('Producto');
    };

    const waitingTime = 3000;

    useEffect(() => {
        setTimeout(handleProducto, waitingTime);
    }, [])

    const logo = require('../assets/logo.png')

    return (
        <View style={styles.container}>
            <Image source={logo} style={styles.logo}  />
            <ActivityIndicator size="large" color='red'></ActivityIndicator>
            
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 55,
        height: 100,
        aspectRatio: 4,
        marginBottom: 10,
        alignSelf: 'center',
    },
});

export default HomeScreen;

