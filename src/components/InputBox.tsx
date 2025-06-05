import { View, StyleSheet, Text, TextInput, ScrollView } from 'react-native';

import { Colors } from '../utils/colors';

export default function InputBox() {
 return (
   <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
    <ScrollView horizontal>
        <View style={{flexDirection: 'row'}}>
            <TextInput style={[styles.input, {width: 300}]} placeholder="Digite o exercício..." placeholderTextColor={Colors.Branco}/>
            <TextInput style={[styles.input, {width: 60}]} placeholder="Séries" placeholderTextColor={Colors.Branco} keyboardType='numeric'/>
            <TextInput style={[styles.input, {width: 60}]} placeholder="Repetições" placeholderTextColor={Colors.Branco} keyboardType='numeric'/>
            <TextInput style={[styles.input, {width: 60}]} placeholder="Carga Atual" placeholderTextColor={Colors.Branco} keyboardType='numeric'/>
        </View>
    </ScrollView>
   </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 45,
    fontSize: 14,
    color: Colors.Branco,
    borderColor: Colors.Vermelho,
    borderBottomWidth: 3,
    marginBottom: 12,
    paddingHorizontal: 10,
    backgroundColor: Colors.TextCinza,
    marginRight: 8
  },
  text:{
    color: Colors.Branco,
    fontSize: 14,
    marginBottom: 8,
    fontWeight: 'bold'
  }
});