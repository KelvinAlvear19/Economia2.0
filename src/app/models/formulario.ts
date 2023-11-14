import { Pregunta } from "./pregunta";

export class Formulario{
  id!: number;
  titulo!: string;
  descripcion?: string;
  proceso!: string;
  grupoPreguntas!: string;
  tipoFormulario!: string;
  usuario!: string;
  preguntas!: Pregunta[];
}