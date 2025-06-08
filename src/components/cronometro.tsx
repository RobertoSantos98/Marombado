import { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import { Colors } from '../utils/colors';

export default function Cronometro() {

    const [ segundos, setSegundos ] = useState<number>(0);
    const [ rodando, setRodando ] = useState(false);
    const intervalo = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if(rodando){
            intervalo.current = setInterval(() => {
                setSegundos(prev => prev + 1);
            },1000);
        }else if(intervalo.current){
            clearInterval(intervalo.current);
        }

        return () => {
            if(intervalo.current){
                clearInterval(intervalo.current);
            }
        }

    },[rodando])

    const formatarTempo = (s: number) => {
        const min = Math.floor(s / 60);
        const sec = s % 60;
        return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    }


 return (
   <View style={styles.container}>
      <Text style={styles.tempo}>{formatarTempo(segundos)}</Text>

      <View style={styles.botoes}>
        <TouchableOpacity style={styles.button} onPress={() => setRodando(!rodando)}>
            {rodando? <Text style={styles.textButton} >Pausar </Text> : <Text style={styles.textButton}>Iniciar </Text>}
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { setSegundos(0); setRodando(false); }}>
            <Text style={styles.textButton}>Zerar </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tempo: {
    fontSize: 60,
    marginBottom: 20,
    fontWeight: 'bold',
    color: Colors.Branco
  },
  botoes: {
    flexDirection: 'row',
    gap: 10,
    
  },
  textButton:{
    color: Colors.Branco,
    fontSize: 16,
    padding: 8
  },
  button:{
    backgroundColor: Colors.Vermelho,
    borderRadius: 8,
    width: 100,
    alignItems: 'center'
  }
});