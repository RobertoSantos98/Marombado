import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../utils/colors';
import BoxTreinoDetails from '../../components/boxTreinoDetails';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import Cronometro from '../../components/cronometro';


type Props = {
    nomeTreino: string;
    exercicios?: string[];
}

export default function TreinoDetails() {

    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['9%', '30%'], []);

    const exempleTreino = {
        nomeTreino: 'Peito e Tríceps',
        exercicios: ['Supino Reto', 'Supino Inclinado', 'Tríceps Testa', 'Voador']
    }

    const [ exercicios, setExercicios ] = useState(exempleTreino);


 return (
<GestureHandlerRootView style={styles.container}>

    <View style={styles.header} >
        <Text style={{color: '#fff', fontSize: 24, fontWeight: 'bold'}}>
            {exempleTreino.nomeTreino}
        </Text>
    </View>

    {
    exercicios.exercicios?.map((exercicios, index) => (
        <BoxTreinoDetails key={index} nomeExercicio={exercicios} />
         ))
     } 

        <BottomSheet
            ref={bottomSheetRef}
            detached={true}
            snapPoints={snapPoints}
            index={0}
            enablePanDownToClose={false}
            backgroundStyle={{ backgroundColor: Colors.TextCinza, borderTopLeftRadius: 12, borderTopRightRadius: 12,}}
            handleIndicatorStyle={{backgroundColor: '#888', width: 50, borderRadius: 3}}
            enableContentPanningGesture={false} // impede que o conteúdo arraste
            enableHandlePanningGesture={true}   // permite apenas puxar pela handle
        >
            <BottomSheetView style={styles.sheetContent}>
                <View style={{paddingVertical: 10, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.TextCinza}}>
                    <Text style={{fontSize: 16, color: Colors.Branco}}>Cronômetro</Text>
                </View>
                <Cronometro />
            </BottomSheetView>
        </BottomSheet>


   </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#000",
    },
    header:{
        height: 150,
        backgroundColor: Colors.Vermelho,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sheetContent:{
        backgroundColor: Colors.TextCinza,
    }
})