import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercicio, Treino } from '../types/treinoModel';
import { Diaria } from '../types/diaria';

const TREINO_KEY = 'treino';
const PREFERENCIAS = 'preferencias'
const SEQUENCIA = 'sequencia'

type Preferencias = {
    introHome: boolean;
    introTreino: boolean;
}

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

    static async listarExercicios(idTreino: string): Promise<{ nome: string; exercicios: Exercicio[] }> {

        try {
            const treinoSalvo = await AsyncStorage.getItem(TREINO_KEY);
            if (!treinoSalvo) {
                console.warn('Nenhum treino encontrado.');
                return { nome: '', exercicios: [] };
            }

            const treinos: Treino[] = JSON.parse(treinoSalvo);
            const treinoEncontrado = treinos.find(t => t.id === idTreino);
            if (!treinoEncontrado) {
                console.warn('Nenhum exercício encontrado para o treino especificado.');
                return { nome: '', exercicios: [] };
            }
            return {
                nome: treinoEncontrado.nome,
                exercicios: treinoEncontrado.exercicios
            };

        } catch (error) {
            console.error('Erro ao listar exercícios:', error);
            return { nome: '', exercicios: [] };

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

    static async atualizarTreino(TreinoNovo: Exercicio[], id: string): Promise<void> {

        try {
            const response = await AsyncStorage.getItem(TREINO_KEY);
            const treinos: Treino[] = response ? JSON.parse(response) : [];
            const treinoAtualizado = treinos.map(treino => {
                if (treino.id === id) {
                    return {
                        ...treino,
                        exercicios: TreinoNovo,
                    };
                }
                return treino;
            })

            await AsyncStorage.setItem(TREINO_KEY, JSON.stringify(treinoAtualizado));

        } catch (error) {
            console.log("Erro ao persistir os dados com asyncStorage");
        }

    }

    static async AdicionarPreferencias(): Promise<void> {

        const config = {
            mostrarDicaTreino: Boolean,
        }

        try {
            const preferencias = await AsyncStorage.setItem(PREFERENCIAS, JSON.stringify(config));
            console.log("Preferências salvas.")
        } catch (error) {
            console.warn("Erro ao extrair preferências");
        }


    }

    static async atualizarPreferenciasIntroTreino(valor: boolean): Promise<void> {

        try {
            const response = await AsyncStorage.getItem(PREFERENCIAS);
            const novasPreferencias: Preferencias = response ? JSON.parse(response) : [];

            novasPreferencias.introTreino = valor;

            await AsyncStorage.setItem(PREFERENCIAS, JSON.stringify(novasPreferencias))

        } catch (error) {
            console.log("Preferencia salva com sucesso");
        }
    }

    static async atualizarPreferenciasIntroHome(valor: boolean): Promise<void> {

        try {
            const response = await AsyncStorage.getItem(PREFERENCIAS);
            const novasPreferencias: Preferencias = response ? JSON.parse(response) : [];

            novasPreferencias.introHome = valor;

            await AsyncStorage.setItem(PREFERENCIAS, JSON.stringify(novasPreferencias))

        } catch (error) {
            console.log("Preferencia salva com sucesso");
        }
    }

    static async atualizarDiaria(): Promise<Diaria> {

        const valor = true;

        const diasSemana = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sabado'];

        const hoje = new Date();

        const diaSemana = diasSemana[hoje.getDay()];

        const diariaPadrao = {
            segunda: false,
            terça: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false,
        };

        try {
            const response = await AsyncStorage.getItem(SEQUENCIA)

            const sequenciaRecuperada: Diaria = response ? JSON.parse(response) : diariaPadrao;

            sequenciaRecuperada[diaSemana as keyof Diaria] = valor;

            await AsyncStorage.setItem(SEQUENCIA, JSON.stringify(sequenciaRecuperada));

            return sequenciaRecuperada

        } catch (error) {
            console.log("Erro ao atualizar a sequencia diária.");
            return diariaPadrao
        }
    }

    static async getSequencia(): Promise<Diaria> {
        const diariaPadrao = {
            segunda: false,
            terça: false,
            quarta: false,
            quinta: false,
            sexta: false,
            sabado: false,
            domingo: false,
        };

        try {
            const response = await AsyncStorage.getItem(SEQUENCIA);
            return response ? JSON.parse(response) : diariaPadrao;
        } catch (error) {
            console.log("Erro ao buscar a sequência diária:", error);
            return diariaPadrao;
        }
    }




}

