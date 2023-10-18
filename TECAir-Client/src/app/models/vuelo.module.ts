import { VueloAeropuerto } from "./vuelo-aeropuerto.module";

export interface Vuelo {
    nVuelo: number;
    empleadoUsuario: string;
    avionMatricula: string;
    fechaSalida: string;
    fechaLlegada: string;
    estado: boolean;
    precio: number;
    vueloAeropuertos: VueloAeropuerto[];
}