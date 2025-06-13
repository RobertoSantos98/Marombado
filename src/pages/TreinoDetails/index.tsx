import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Colors } from '../../utils/colors';
import BoxTreinoDetails from '../../components/boxTreinoDetails';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AppIntroSlider from 'react-native-app-intro-slider'

import Cronometro from '../../components/cronometro';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { ExercicioService } from '../../service/ExercicioService';
import { Exercicio } from '../../types/treinoModel';

type Props = {
    nomeTreino: string;
    exercicios?: string[];
}

const slides = [
    {
        key: 1,
        title: 'Deslize para a esquerda quando completar uma serie de repetições',
        text: 'Isso fará com que a contagem das séries diminua.',
        image: require('../../assets/slider/image-slide-1.png')
    },
    {
        key: 2,
        title: 'Deslize para a direita quando terminar uma série por completa',
        text: 'Isso excluirá o exercicio da lista.',
        image: require('../../assets/slider/image-slide-2.png')
    },
    {
        key: 3,
        title: 'Você pode usar o cronômetro dentro do app. Apenas puxe para cima',
        text: 'E você pode iniciar ou zerar a cada descanso.',
        image: require('../../assets/slider/image-slide-3.png')
    }
]

function renderSlides({ item }: any) {
    return (
        <View style={{ flex: 1, backgroundColor: "#000", alignItems: 'center', justifyContent: 'center', gap: '5%' }}>
            <Text style={{ color: Colors.Branco, fontSize: 24, textAlign: 'center', paddingHorizontal: 12 }} >{item.title} </Text>
            <Image source={item.image} style={{ resizeMode: 'cover', width: '90%' }} />
            <Text style={{ color: Colors.Branco, fontSize: 18, textAlign: 'center', paddingHorizontal: 12 }}>{item.text} </Text>
        </View>
    )
}

type TreinoDetailsRouteProp = RouteProp<RootStackParamList, 'TreinoDetails'>;

export default function TreinoDetails() {

    useEffect(() => {
        handleList();
    }, [])

    const route = useRoute<TreinoDetailsRouteProp>();
    const { id } = route.params;

    const [nome, setNome] = useState<string>();
    const [showIntro, setShowIntro] = useState(true);
    const [exercicios, setExercicios] = useState<Exercicio[]>();

    const handleList = async () => {
        const { nome, exercicios } = await ExercicioService.listarExercicios(id)
        setExercicios(exercicios);
        setNome(nome);
    };


    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['9%', '30%'], []);


    const renderItem = ({ item }: { item: any }) => (
        <BoxTreinoDetails nomeExercicio={item.exercicios} series={item.series} />
    )

    const handleDelete = (itemId: number) => {
        setExercicios((prev) => prev?.filter((ex) => ex.id !== itemId) ?? []);
    };


    const handleExerciseDone = async (id: number) => {
        let terminou = false;

        setExercicios((prev) => {
            if (!prev) return [];

            const updated = prev
                .map((ex) => {
                    if (ex.id === id) {
                        const newSeries = Number(ex.series) - 1;

                        if (newSeries <= 0) {
                            terminou = true;
                            return null;
                        }

                        return { ...ex, series: newSeries.toString() };
                    }
                    return ex;
                })
                .filter((ex): ex is Exercicio => ex !== null);

            return updated;
        });

        if (terminou) {
            console.log("Treino Finalizado");
            await ExercicioService.atualizarDiaria();
        }
    };



    if (showIntro) {
        return (
            <AppIntroSlider
                renderItem={renderSlides}
                data={slides}
                activeDotStyle={{
                    backgroundColor: Colors.Vermelho,
                    width: 30
                }}
                dotStyle={{
                    backgroundColor: Colors.TextCinza
                }}
                renderNextButton={() => <Text style={{ fontSize: 16, color: Colors.Branco }}></Text>}
                renderDoneButton={() => <Text style={{ fontSize: 16, color: Colors.Branco }} >FECHAR </Text>}
                onDone={() => (setShowIntro(false))}
            />
        );
    } else {
        return (
            <View style={styles.container}>

                <View style={styles.header} >
                    <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                        {nome}
                    </Text>
                </View>

                <FlatList
                    data={exercicios} // usa o state correto
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <BoxTreinoDetails
                            nomeExercicio={item.nome}
                            series={item.series.toString()}
                            onSwipeRight={() => handleDelete(item.id)}
                            onSwipeLeft={() => handleExerciseDone(item.id)}
                        />
                    )}
                />

                <BottomSheet
                    ref={bottomSheetRef}
                    detached={true}
                    snapPoints={snapPoints}
                    index={0}
                    enablePanDownToClose={false}
                    backgroundStyle={{ backgroundColor: Colors.TextCinza, borderTopLeftRadius: 12, borderTopRightRadius: 12, borderColor: "#000", borderTopWidth: 2 }}
                    handleIndicatorStyle={{ backgroundColor: '#888', width: 50, borderRadius: 3 }}
                    enableContentPanningGesture={false} // impede que o conteúdo arraste
                    enableHandlePanningGesture={true}   // permite apenas puxar pela handle
                >
                    <BottomSheetView style={styles.sheetContent}>
                        <View style={{ paddingVertical: 10, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.TextCinza }}>
                            <Text style={{ fontSize: 16, color: Colors.Branco }}>Cronômetro</Text>
                        </View>
                        <Cronometro />
                    </BottomSheetView>
                </BottomSheet>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    header: {
        height: 150,
        backgroundColor: Colors.Vermelho,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetContent: {
        backgroundColor: Colors.TextCinza,
    }
})