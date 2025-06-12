import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { Colors } from '../../utils/colors';
import BoxTreinoDetails from '../../components/boxTreinoDetails';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import AppIntroSlider from 'react-native-app-intro-slider'

import Cronometro from '../../components/cronometro';

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

function renderSlides({item}: any){
  return(
    <View style={{flex: 1, backgroundColor: "#000", alignItems: 'center', justifyContent: 'center', gap: '5%'}}>
      <Text style={{color: Colors.Branco, fontSize: 24, textAlign: 'center', paddingHorizontal: 12}} >{item.title} </Text>
      <Image source={item.image} style={{resizeMode: 'cover', width: '90%'}} />
      <Text style={{color: Colors.Branco, fontSize: 18, textAlign: 'center', paddingHorizontal: 12}}>{item.text} </Text>
    </View>
  )
}

export default function TreinoDetails() {

    const [showIntro, setShowIntro] = useState(true);


    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['9%', '30%'], []);

    const exempleTreino = {
        nomeTreino: 'Peito e Tríceps',
        exercicios: [
            { id: 1, nome: 'Supino Reto', series: '4', reps: 10, carga: 60 },
            { id: 2, nome: 'Supino Inclinado', series: '3', reps: 12, carga: 50 },
            { id: 3, nome: 'Tríceps Testa', series: '3', reps: 10, carga: 30 },
            { id: 4, nome: 'Voador', series: '4', reps: 15, carga: 20 },
            { id: 5, nome: 'Supino Reto', series: '3', reps: 8, carga: 65 },
            { id: 6, nome: 'Supino Inclinado', series: '3', reps: 10, carga: 55 },
            { id: 7, nome: 'Tríceps Testa', series: '3', reps: 12, carga: 35 },
        ],
    };

    const [exercicios, setExercicios] = useState(exempleTreino);

    const renderItem = ({ item }: { item: any }) => (
        <BoxTreinoDetails nomeExercicio={item.exercicios} series={item.series} />
    )

    const handleDelete = (item: number) => {
        setExercicios((prev) => ({
            ...prev,
            exercicios: prev.exercicios.filter((ex) => ex.id !== item)
        }));
    };

    const handleExerciseDone = (id: number) => {
        setExercicios((prev) => {
            const updated = prev.exercicios
                .map((ex) => {
                    if (ex.id === id) {
                        const newSeries = Number(ex.series) - 1;

                        if (newSeries <= 0) {
                            handleDelete(id); // Chama a função para remover (opcional)
                            return null; // Marcar para remover do array
                        }

                        return { ...ex, series: newSeries.toString() };
                    }

                    return ex;
                })
                .filter((ex): ex is typeof prev.exercicios[number] => ex !== null);
            // <- filtro com tipo para remover nulls de forma segura

            return { ...prev, exercicios: updated };
        });
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
                renderNextButton={() => <Text style={{fontSize: 16, color: Colors.Branco}}></Text>}
                renderDoneButton={() => <Text style={{fontSize: 16, color: Colors.Branco}} >FECHAR </Text>}
                onDone={() => (setShowIntro(false))}
            />
        );
    } else {
    return (
        <View style={styles.container}>

            <View style={styles.header} >
                <Text style={{ color: '#fff', fontSize: 24, fontWeight: 'bold' }}>
                    {exempleTreino.nomeTreino}
                </Text>
            </View>

            <FlatList
                data={exercicios.exercicios} // usa o state correto
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <BoxTreinoDetails
                        nomeExercicio={item.nome}
                        series={item.series}
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