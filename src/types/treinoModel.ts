export type Exercicio = {
    id: number;
    nome: string;
    series: number;
    reps: number;
    carga: number;
}

export type Treino = {
    id: string;
    diaSemana: string;
    nome: string;
    data: string;
    exercicios: Exercicio[];
}