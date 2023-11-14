import { Opcion } from "./opcion";

export class Pregunta{
    id!: number;
    titulo!: string;
    tipo!: string;
    respuesta!: string | null;
    opciones!: Opcion[];
}