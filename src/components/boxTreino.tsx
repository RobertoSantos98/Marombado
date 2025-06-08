import { View, StyleSheet, Text, TouchableOpacity } from "react-native"
import { Colors } from "../utils/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { useNavigation } from "@react-navigation/native";

type DetailsNavigationProp = StackNavigationProp<RootStackParamList, 'TreinoDetails'>;

type Props = {
    id: string;
    diaSemana: string;
    nomeTreino: string;
}

export default function BoxTreino({ diaSemana, nomeTreino, id }: Props) {

    const navigation = useNavigation<DetailsNavigationProp>();

    return (
        <View style={styles.boxTreino}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                <View style={{gap: 5}}>
                    <Text style={{color: Colors.Branco, fontSize: 18}}>{nomeTreino}</Text>
                    <Text style={{color: Colors.Branco, fontSize: 12}}>{diaSemana}</Text>
                </View>
                <TouchableOpacity onPress={() => {navigation.navigate('TreinoDetails')}} >
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
        marginTop: 10,
  },
})