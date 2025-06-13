import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { RootStackParamList } from '../../types/navigation';

import { Colors } from '../../utils/colors';
import { useEffect, useState } from 'react';
import { Exercicio } from '../../types/treinoModel';
import { ExercicioService } from '../../service/ExercicioService';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts, BebasNeue_400Regular } from "@expo-google-fonts/bebas-neue";

type TreinoListRouteProp = RouteProp<RootStackParamList, 'TreinoList'>;

type TreinoListProp = StackNavigationProp<RootStackParamList, 'TreinoList'>;

export default function TreinoList() {

    useEffect(() => {
        handleList();
    }, [])

    const [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
    })

    const navigation = useNavigation<TreinoListProp>();

    const route = useRoute<TreinoListRouteProp>();
    const { id } = route.params;

    const [treino, setTreino] = useState<Exercicio[]>([]);
    const [nome, setNome] = useState('');

    const handleList = async () => {
        try {
            const response = await ExercicioService.listarExercicios(id);
            setTreino(response.exercicios);
            setNome(response.nome);
        } catch (error) {
            console.warn("Não foi possivel recuperar os dados dos exercicios.");
        }
    }

    const handleSave = async () => {
        try {
            const response = await ExercicioService.atualizarTreino(treino, id);
            navigation.navigate("Home");
        } catch (error) {

        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ textAlign: 'center', color: Colors.Branco, fontSize: 36, fontFamily: 'BebasNeue_400Regular' }}>{nome.toUpperCase()}</Text>
            </View>
            <View style={styles.tableHeader}>
                <Text style={[styles.cell, styles.headerText]}>Exercício</Text>
                <Text style={[styles.cell, styles.headerText]}>Séries</Text>
                <Text style={[styles.cell, styles.headerText]}>Reps</Text>
                <Text style={[styles.cell, styles.headerText]}>Carga</Text>
            </View>

            <FlatList
                data={treino}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.tableRow}>
                        <Text style={styles.cell}>{item.nome}</Text>
                        <TextInput value={item.series.toString()} onChangeText={(text) => {
                            const novoTreino = [...treino];
                            novoTreino[index].series = Number(text);
                            setTreino(novoTreino);
                        }} style={styles.cell} keyboardType='numeric' />
                        <TextInput
                            style={styles.cell}
                            value={item.reps.toString()}
                            onChangeText={(text) => {
                                const novoTreino = [...treino]
                                novoTreino[index].reps = Number(text);
                                setTreino(novoTreino);
                            }}
                            keyboardType='numeric'
                            onFocus={(e) => {
                                const length = item.series.toString().length;
                                e.target.setNativeProps({
                                    selection: { start: length, end: length },
                                });
                            }}
                        />
                        <TextInput
                            style={styles.cell}
                            value={item.carga.toString()}
                            onChangeText={(text) => {
                                const novoTreino = [...treino]
                                novoTreino[index].carga = Number(text)
                                setTreino(novoTreino);
                            }}
                            keyboardType='numeric'
                            onFocus={(e) => {
                                const length = item.carga.toString().length;
                                e.target.setNativeProps({
                                    selection: { start: length, end: length },
                                });
                            }}
                        />
                    </View>
                )}
            />

            <TouchableOpacity style={styles.buttonSave} onPress={handleSave}>
                <Text style={{ textAlign: 'center', fontSize: 28, color: Colors.Branco, fontFamily: 'BebasNeue_400Regular' }}>Salvar</Text>
            </TouchableOpacity>


            {/* <View style={styles.footer}>

            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#000",
        flex: 1,
    },
    header: {
        backgroundColor: Colors.Vermelho,
        paddingVertical: 50,
        borderBottomRightRadius: 12,
        borderBottomLeftRadius: 12,
        marginBottom: 12
    },
    tableHeader: {
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
        paddingVertical: 8,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
        alignItems: 'center'
    },
    cell: {
        flex: 1,
        color: Colors.Branco,
        textAlign: 'center',
    },
    headerText: {
        fontWeight: 'bold',
    },
    buttonSave: {
        backgroundColor: Colors.Vermelho,
        justifyContent: 'center',
        borderRadius: 12,
        paddingVertical: 12,
        marginHorizontal: 10,
        marginBottom: 18
    },
    footer: {
        backgroundColor: Colors.TextCinza,
        height: 100,
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    }
})