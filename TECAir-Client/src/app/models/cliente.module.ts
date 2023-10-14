import { Estudiante } from "./estudiante.module";

export interface Cliente {
    correo: string;
    telefono: number;
    nombre: string;
    apellido1: string;
    apellido2: string;
    estudiantes: Estudiante[]
}