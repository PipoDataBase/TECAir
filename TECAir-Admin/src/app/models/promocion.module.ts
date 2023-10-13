import { Viaje } from "./viaje.module";

export interface Promocion {
    viajeId: number;
    precio: number;
    fechaInicio: string;
    fechaVencimiento: string;
    imagenPath: string;
    viaje: Viaje
}