import { ViajeVuelo } from "./viaje-vuelo.module";

export interface Viaje {
    id: number;
    empleadoUsuario: string;
    origen: string;
    destino: string;
    fechaSalida: string;
    fechaLlegada: string;
    precio: number;
    viajeVuelos: ViajeVuelo[];
}