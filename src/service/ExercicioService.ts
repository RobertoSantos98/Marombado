import AsyncStorage from '@react-native-async-storage/async-storage';
import { Treino } from '../types/treinoModel';

const TREINO_KEY = 'treino';

export class ExercicioService {

    static async salvarTreino(treino: Treino): Promise<void> {
        try {
            const treinoSalvo = await AsyncStorage.getItem(TREINO_KEY);
            const treinos = treinoSalvo ? JSON.parse(treinoSalvo) : [];
            treinos.push(treino);
            await AsyncStorage.setItem(TREINO_KEY, JSON.stringify(treinos));
            console.log('Treino salvo com sucesso!');
            console.log(treino);
        } catch (error) {
            console.error('Erro ao salvar treino:', error);
            
        }
    }

    static async listarTreinos(): Promise<Treino[]> {
        try {
            const treinoSalvo = await AsyncStorage.getItem(TREINO_KEY);
            const treinos = treinoSalvo ? JSON.parse(treinoSalvo) : [];
            return treinos;

        } catch (error) {
            console.error('Erro ao listar treinos:', error);
            return []; 
        }
    }

    static async listarExercicios(idTreino: string): Promise<Treino['exercicios']> {

        try {
            const treinoSalvo = await AsyncStorage.getItem(TREINO_KEY);
            if (!treinoSalvo) {
                console.warn('Nenhum treino encontrado.');
                return [];
            }

            const treinos: Treino[] = JSON.parse(treinoSalvo);
            const treinoEncontrado = treinos.find(t => t.id === idTreino);
            if (!treinoEncontrado) {
                console.warn('Nenhum exercício encontrado para o treino especificado.');
                return [];
            }
            return treinoEncontrado.exercicios;

        } catch (error) {
            console.error('Erro ao listar exercícios:', error);
            return [];
            
        }
    }

    static async removerTreino(idTreino: string): Promise<void> {
        try {
            const response = await AsyncStorage.getItem(TREINO_KEY)
            if (!response) {
                console.warn('Nenhum treino encontrado.');
                return;
            }
            const treinoList: Treino[] = JSON.parse(response);
            const updatedTreinoList = treinoList.filter(t => t.id !== idTreino);
            await AsyncStorage.setItem(TREINO_KEY, JSON.stringify(updatedTreinoList));
            console.log('Treino removido com sucesso!');

        } catch (error) {
            console.error('Erro ao remover treino:', error);
            
        }
    }



}

