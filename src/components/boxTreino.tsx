import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Colors } from "../utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function BoxTreino() {
    return (
        <View style={styles.boxTreino}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                <View style={{gap: 5}}>
                    <Text style={{color: Colors.Branco, fontSize: 18}}>Segunda-Feira </Text>
                    <Text style={{color: Colors.Branco, fontSize: 12}}>Peito e Tríceps </Text>
                </View>
                <TouchableOpacity>
                    <MaterialCommunityIcons name="arrow-right-circle" size={36} color={Colors.Vermelho} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxTreino:{
        width: '100%',
        height: 100,
        backgroundColor: Colors.TextCinza,
        borderRadius: 12,
        justifyContent: 'center',
  },
})