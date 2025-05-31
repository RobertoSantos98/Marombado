import { View, StyleSheet, Text, ImageBackground, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../../utils/colors';
import InputBox from '../../components/InputBox';

export default function AdicionarTreino() {

    const [contadorTreino, setContadorTreino] = useState(1);
    const [treino, setTreino] = useState([
        { id: 1, name: 'Supino Reto', series: 4, reps: 12, carga: 15 },
        { id: 2, name: 'Agachamento Livre', series: 4, reps: 12, carga: 25 },
    ]);

    const handleAddTreino = () => {
        setContadorTreino(prev => prev + 1);
    };

    const handleRemoveTreino = (id: any) => {
    setTreino(prev => prev.filter(item => item.id !== id));
};


    return (
        <View style={styles.container}>
            <View>
                <ImageBackground source={require('../../assets/image-2.png')} resizeMode='cover' style={styles.header}>
                    <Text style={[styles.Text, { fontSize: 26, fontWeight: 'bold' }]}>Adicionar Treino</Text>
                </ImageBackground>
            </View>

            <View style={styles.content}>
                <View style={{ flexDirection: 'row', marginBottom: 12, alignItems: 'center' }}>
                    <Text style={styles.Text}>Treinos: </Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Dia da Semana'
                        placeholderTextColor={Colors.Branco}
                    />
                </View>

                <View style={styles.tableHeader}>
                    <Text style={[styles.cell, styles.headerText]}>Exercício</Text>
                    <Text style={[styles.cell, styles.headerText]}>Séries</Text>
                    <Text style={[styles.cell, styles.headerText]}>Reps</Text>
                    <Text style={[styles.cell, styles.headerText]}>Carga</Text>
                </View>

                <ScrollView>
                    {treino.map((item) => (
                        <View key={item.id} style={styles.tableRow}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.series}</Text>
                            <Text style={styles.cell}>{item.reps}</Text>
                            <Text style={styles.cell}>{item.carga}</Text>
                            <TouchableOpacity onPress={() => handleRemoveTreino(item.id)}>
                                <MaterialCommunityIcons name="trash-can" size={24} color={Colors.Vermelho} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>

                <InputBox index={contadorTreino} />
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
                    onPress={handleAddTreino}
                >
                    <MaterialCommunityIcons name='plus-thick' size={24} color={Colors.Vermelho} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonSalvar}>
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
});