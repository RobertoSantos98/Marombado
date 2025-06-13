import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Colors } from '../../utils/colors';
import BoxTreino from '../../components/boxTreino';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { useEffect, useState } from 'react';
import { Treino } from '../../types/treinoModel';

import { ExercicioService } from '../../service/ExercicioService';
import TreinoDetails from '../TreinoDetails';


type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};


export default function Home({ navigation }: Props) {

  const [listTreinos, setListTreinos] = useState<Treino[]>([]);

  useEffect(() => {
    handleListTreinos();
  }, []);

  const handleListTreinos = async () => {
    try {
      const treinos = await ExercicioService.listarTreinos();
      setListTreinos(treinos);
      console.log("Treinos listados com sucesso:", treinos);
    } catch (error) {
      console.error("Erro ao listar treinos:", error);
    }
  }

  const handleRemoverTreino = (id: any) => {

    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja remover o treino selecionado?',
      [
        { text: 'Cancelar', style: 'cancel', onPress: () => { } },
        {
          text: 'Sim', onPress: async () => {
            try {
              await ExercicioService.removerTreino(id);
              handleListTreinos();
            } catch (error) {
              console.log("Erro ao buscar a lista de treino.");
            }
          }
        }
      ]
    )

  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground source={require('../../assets/image-1.png')} resizeMode='cover' style={styles.header}>
          <View style={{ bottom: 0, position: 'absolute', left: 20, right: 20, paddingVertical: 20, }}>
            <Text style={styles.textTitleHeader} >Sequência Diária</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>

              <View style={{ marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center'  }} >SEG </Text>
              </View>

              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center'  }} >TER </Text>
              </View>

              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center'  }} >QUA</Text>
              </View>

              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center'  }} >QUI</Text>
              </View>

              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center'  }} >SEX </Text>
              </View>

              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center' }} >SAB </Text>
              </View>

              <View style={{ alignItems: 'center', marginHorizontal: 5 }}>
                <TouchableOpacity style={styles.buttonHeader}>

                </TouchableOpacity>
                <Text style={{ color: Colors.Branco, fontSize: 12, textAlign: 'center'  }} >DOM </Text>
              </View>

            </ScrollView>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.contentMain}>
        <ScrollView>
          {listTreinos.map((treino) => (
            <BoxTreino key={treino.id} id={treino.id} diaSemana={treino.diaSemana} nomeTreino={treino.nome} handleRemoverTreino={handleRemoverTreino} />
          ))}

          <TouchableOpacity
            style={{ width: '100%', height: 40, backgroundColor: Colors.TextCinza, borderRadius: 10, marginVertical: 10, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.navigate('AdicionarTreino')}
          >
            <MaterialCommunityIcons name='plus-thick' size={24} color={Colors.Vermelho} />
          </TouchableOpacity>


        </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  header: {
    width: '100%',
    height: '100%',
  },
  textTitleHeader: {
    fontSize: 36,
    color: Colors.Branco,
    fontFamily: 'BebasNeue_400Regular'
  },
  buttonHeader: {
    width: 40,
    height: 40,
    backgroundColor: Colors.FundoCards,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  contentMain: {
    marginHorizontal: '5%',
    marginTop: 12,
  },




})