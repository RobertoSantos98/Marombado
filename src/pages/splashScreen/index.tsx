import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function SplashScreen(){
  return (
    <View style={styles.container}>
        <View>
            <Image source={require('../../assets/logo.png')} style={styles.image} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 300,
        height: 300
    }

})
