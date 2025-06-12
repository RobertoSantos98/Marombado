import { View, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Colors } from '../utils/colors';
import Animated, { useAnimatedStyle, useSharedValue, withTiming, runOnJS, interpolateColor } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useState } from 'react';

type Props = {
  nomeExercicio: string;
  series: string;
  onSwipeRight?: () => void;
  onSwipeLeft?: () => void;
}

export default function BoxTreinoDetails({ nomeExercicio, series, onSwipeRight, onSwipeLeft }: Props) {

  const position = useSharedValue(0);

  const onPan = Gesture
    .Pan()
    .onUpdate((event) => {
      position.value = event.translationX;
    })
    .onEnd(() => {
      if (position.value > 100 && onSwipeRight) {
        console.log("Puxou para a direita")
        runOnJS(onSwipeRight)();
      } else if (position.value < -100 && onSwipeLeft) {
        console.log("puxou para a esquerda");
        runOnJS(onSwipeLeft)();
      }

      position.value = withTiming(0);
    })

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      position.value,
      [-100, 0, 100],
      ['#228B22', Colors.TextCinza, '#ff4d4d']
    );
    return {
      transform: [{ translateX: position.value }],
      backgroundColor,
    };
  });

  const getColorByValue = (valor: string): string => {
    const value = Number(valor);
    if (value >= 3) return '#FF0000';       // vermelho
    if (value === 2) return '#B8860B';      // amarelo escuro legível
    if (value === 1) return '#228B22';      // verde escuro
    return '#000000';                       // default preto
  };


  return (
    <GestureDetector gesture={onPan}>
      <Animated.View style={[styles.container, animatedStyle]}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcons name="drag-vertical" size={36} color={"#000"} />
          <Text style={styles.text}>{nomeExercicio} </Text>
        </View>


        <View style={{
          backgroundColor: getColorByValue(series),
          height: 36,
          paddingHorizontal: 14,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8
        }} >
          <Text style={styles.text}>{series}</Text>
        </View>

      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: Colors.TextCinza,
    borderBottomWidth: 1,
    borderBottomColor: Colors.Vermelho,
    marginBottom: 3,
    paddingVertical: 14,
    paddingHorizontal: 8
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  exerciceComplete: {
    flex: 1,
    backgroundColor: "#4CAF50"
  },
  treinoDone: {
    backgroundColor: Colors.FundoCards,
    width: 100,
    height: 10
  }
});
