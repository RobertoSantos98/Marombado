import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';

import { Colors } from '../../utils/colors';
import InputBox from '../../components/InputBox';
import { Treino, Exercicio } from '../../types/treinoModel';
import { ExercicioService } from '../../service/ExercicioService';


type AdicionarTreinoNavigationProp = StackNavigationProp<RootStackParamList, 'AdicionarTreino'>;

type Props = {
  navigation: AdicionarTreinoNavigationProp;
};


export default function AdicionarTreino({ navigation }: Props) {

    const [treino, setTreino] = useState<Exercicio[]>([]);
    
    const [ id, setId ] = useState<number>(1);
    const [ nomeTreino, setNomeTreino ] = useState('');
    const [ dataTreino, setDataTreino ] = useState(new Date().toISOString().split('T')[0]); // Formato YYYY-MM-DD
    const [ nomeExercicio, setNomeExercicio ] = useState('');
    const [ series, setSeries ] = useState('');
    const [ reps, setReps ] = useState('');
    const [ carga, setCarga ] = useState('');
    const [ diaSemana, setDiaSemana ] = useState('');

    const handleAddExercicio = () => {
        if (nomeExercicio && series && reps && carga) {
            const newExercicio: Exercicio = {
                id: id,
                nome: nomeExercicio,
                series: parseInt(series),
                reps: parseInt(reps),
                carga: parseFloat(carga),
            };
            setTreino(prev => [...prev, newExercicio]);

            setNomeExercicio('');
            setSeries('');
            setReps('');
            setCarga('');
            setId(id + 1);
        }
    };

    const handleRemoveTreino = (nome: string) => {
    setTreino(prev => prev.filter(item => item.nome !== nome));
};

    const handleSalvarTreino = async () => {
        const treinoData: Treino = {
            id: Math.random().toString(36).substring(2, 15),
            diaSemana: diaSemana,
            nome: nomeTreino,
            data: dataTreino,
            exercicios: treino
        }

        try {
            await ExercicioService.salvarTreino(treinoData);
            console.log('Treino salvo com sucesso:', treinoData);
            navigation.navigate('Home');

        } catch (error) {
            console.error('Erro ao salvar treino:', error);
            
        }
    }


    return (
        <View style={styles.container}>
            <View>
                <ImageBackground source={require('../../assets/image-2.png')} resizeMode='cover' style={styles.header}>
                    <Text style={[styles.Text, { fontSize: 26, fontWeight: 'bold' }]}>Adicionar Treino</Text>
                </ImageBackground>
            </View>

            <View style={styles.content}>
                <View style={{ flexDirection: 'row', marginBottom: 12 }}>
                    <Text style={styles.Text}>Treinos: </Text>
                    <View  style={{width: '100%', gap: 8}}>
                        <TextInput
                            value={diaSemana}
                            onChangeText={setDiaSemana}
                            style={styles.input}
                            placeholder='Dia da Semana'
                            placeholderTextColor={Colors.Branco}
                        />
                        <TextInput
                            value={nomeTreino}
                            onChangeText={setNomeTreino}
                            style={styles.input}
                            placeholder='Nome do Treino'
                            placeholderTextColor={Colors.Branco}
                        />
                    </View>
                </View>

                <View style={styles.tableHeader}>
                    <Text style={[styles.cell, styles.headerText]}>Exercício</Text>
                    <Text style={[styles.cell, styles.headerText]}>Séries</Text>
                    <Text style={[styles.cell, styles.headerText]}>Reps</Text>
                    <Text style={[styles.cell, styles.headerText]}>Carga</Text>
                </View>

                <ScrollView>
                    {treino.map((item) => (
                        <View key={item.nome} style={styles.tableRow}>
                            <Text style={styles.cell}>{item.nome}</Text>
                            <Text style={styles.cell}>{item.series}</Text>
                            <Text style={styles.cell}>{item.reps}</Text>
                            <Text style={styles.cell}>{item.carga}</Text>
                            <TouchableOpacity onPress={() => handleRemoveTreino(item.nome)}>
                                <MaterialCommunityIcons name="trash-can" size={24} color={Colors.Vermelho} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 12}}>
                    <ScrollView horizontal>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput value={nomeExercicio} onChangeText={setNomeExercicio} style={[styles.inputBox, {width: 300}]} placeholder="Digite o exercício..." placeholderTextColor={Colors.Branco}/>
                            <TextInput value={series} onChangeText={setSeries} style={[styles.inputBox, {width: 60}]} placeholder="Séries" placeholderTextColor={Colors.Branco} keyboardType='numeric'/>
                            <TextInput value={reps} onChangeText={setReps} style={[styles.inputBox, {width: 60}]} placeholder="Repetições" placeholderTextColor={Colors.Branco} keyboardType='numeric'/>
                            <TextInput value={carga} onChangeText={setCarga} style={[styles.inputBox, {width: 60}]} placeholder="Carga Atual" placeholderTextColor={Colors.Branco} keyboardType='numeric'/>
                        </View>
                    </ScrollView>
                   </View>
            </View>

            <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
                <TouchableOpacity
                    style={{
                        marginHorizontal: 10,
                        height: 40,
                        backgroundColor: Colors.TextCinza,
                        borderRadius: 10,
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onPress={handleAddExercicio}
                >
                    <MaterialCommunityIcons name='plus-thick' size={24} color={Colors.Vermelho} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSalvar} onPress={handleSalvarTreino}>
                    <Text style={[styles.Text, { fontWeight: 'bold' }]}>Salvar Treino</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    header: {
        width: '100%',
        height: 75,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    Text: {
        color: Colors.Branco,
        fontSize: 16,
    },
    content: {
        marginHorizontal: '5%',
        paddingBottom: 100,
    },
    buttonSalvar: {
        bottom: 20,
        alignSelf: 'center',
        height: 50,
        backgroundColor: Colors.Vermelho,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        width: '95%',
    },
    input: {
        height: 45,
        width: '80%',
        fontSize: 14,
        color: Colors.Branco,
        borderColor: Colors.Vermelho,
        borderBottomWidth: 3,
        paddingHorizontal: 10,
        backgroundColor: Colors.TextCinza,
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
    },
    cell: {
        flex: 1,
        color: Colors.Branco,
        textAlign: 'center',
    },
    headerText: {
        fontWeight: 'bold',
    },
    inputBox: {
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

});