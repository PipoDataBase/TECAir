import { ViajeVuelo } from "./viaje-vuelo.module";

export interface Viaje {
    id: number;
    empleadoUsuario: string;
    fechaSalida: string;
    fechaLlegada: string;
    viajeVuelos: ViajeVuelo[];
}