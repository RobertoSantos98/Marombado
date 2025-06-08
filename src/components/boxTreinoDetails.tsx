import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../utils/colors';


type Props = {
  nomeExercicio: string;
}

// <MaterialCommunityIcons name="pan-horizontal" size={36} color={Colors.Vermelho} />

export default function BoxTreinoDetails({ nomeExercicio }: Props) {
  return (
    <TouchableOpacity style={styles.container}>
        <MaterialCommunityIcons name="drag-vertical" size={36} color={"#000"} />
        <Text style={styles.text}>{nomeExercicio}</Text>
        {/* <View style={styles.exerciceComplete} >
            <MaterialCommunityIcons name="thumb-up" size={36} color={Colors.FundoCards} />
        </View> */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.TextCinza,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Vermelho,
    marginBottom: 2,
    paddingVertical: 14
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  exerciceComplete:{
    flex: 1,
    backgroundColor: "#4CAF50"
  }
});
