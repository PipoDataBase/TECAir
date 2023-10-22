import { Injectable } from '@angular/core';
import { Aeropuerto } from '../models/aeropuerto.module';
import { Viaje } from '../models/viaje.module';
import { DatePipe } from '@angular/common';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PaseAbordaje } from 'src/app/models/pase-abordaje.module';

pdfMake.vfs = pdfFonts.pdfMake.vfs

export const _filter = (opt: Aeropuerto[], value: string): Aeropuerto[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item =>
    item.ubicacion.toLowerCase().includes(filterValue) ||
    item.id.toLowerCase().includes(filterValue) ||
    item.nombre.toLowerCase().includes(filterValue)
  );
};

export const _filterOfTravels = (opt: Viaje[], origen: string, destino: string, fecha: string): Viaje[] => {
  const filterValue1 = origen.toLowerCase();
  const filterValue2 = destino.toLowerCase();
  const filterValue3 = fecha;

  return opt.filter(item =>
    item.origen.toLowerCase().includes(filterValue1) &&
    item.destino.toLowerCase().includes(filterValue2) &&
    item.fechaSalida.includes(filterValue3)
  );
};

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  regex = /\((.*?)\)/;
  regex2 = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  searchedOrigin: string = "";
  searchedDestiny: string = "";
  selectedDate: string = "";
// pdf variables

  clienteCorreo: string = '';
  clienteTelefono: string = '';
  clienteNombre: string = '';
  clienteApellidos: string = ''

  puertaAbordaje: string = '';
  horaSalida: string = '';
  asiento: string = '';
  nVuelo: string = '';



  selectedSeatsCuantity: number = 0;

  constructor(private datePipe: DatePipe) { }

  // get the airport location
  getName(aeropuertos: Aeropuerto[], value: string): string {
    var result = aeropuertos.find(aeropuerto => aeropuerto.id === value);
    if (result) {
      return result.ubicacion;
    }
    return "";
  }

  // get the airport code
  getCode(value: string): string {
    const match = value.match(this.regex);
    if (match) {
      return match[1];
    }
    else {
      return "";
    }
  }

  // filter airports by code, name and location
  _filterAirports(aeropuertos: Aeropuerto[], value: string): Aeropuerto[] {
    if (value && typeof value === 'string') {
      return _filter(aeropuertos, value);
    }
    return aeropuertos;
  }

  // departure and arrival format date
  formatDate(date: string): string {
    date = date.replace(':00Z', '');
    const result = this.datePipe.transform(date, 'M/d/yyyy, h:mm a');
    if (result) {
      return result
    }
    return date;
  }

  // departure and arrival format date
  formatDate2(date: string): string {
    date = date.replace(':00Z', '');
    const result = this.datePipe.transform(date, 'M/d/yyyy\nh:mm a');
    if (result) {
      return result
    }
    return date;
  }

  // departure and arrival format date
  formatDate3(date: string): string {
    date = date.replace(':00Z', '');
    const result = this.datePipe.transform(date, 'M/d/yyyy');
    if (result) {
      return result
    }
    return date;
  }

   // filter trips by origin, destiny and date
  _filterTravelsByOriginDestiny(viajes: Viaje[], origen: string, destino: string, fecha: string): Viaje[] {
    if (origen && destino && fecha) {
      const viajesTmp = viajes;

      for (let i = 0; i < viajes.length; i++) {
        viajes[i].fechaSalida = this.formatDate2(viajes[i].fechaSalida);
        viajes[i].fechaLlegada = this.formatDate2(viajes[i].fechaLlegada);

        viajesTmp[i].fechaSalida = this.formatDate3(viajesTmp[i].fechaSalida);
        viajesTmp[i].fechaLlegada = this.formatDate3(viajesTmp[i].fechaLlegada);
      }

      return _filterOfTravels(viajesTmp, origen, destino, this.formatDate3(fecha));
    }
    return viajes;
  }

  // validate client or student email
  validateEmail(email: string) {
    return this.regex2.test(email);
  }

  // validate client phone
  validatePhone(phone: number) {
    return phone >= 10000000 && phone <= 99999999;
  }



  

  public createBookingPDF( PaseAbordajePrint: PaseAbordaje, clienteNombre: string, clienteApellido1: string,clienteApellido2: string ,clienteTelefono: string, asientos: string[] , horaSalida : string) {

   


    this.clienteCorreo = PaseAbordajePrint.correoCliente ;
    this.clienteTelefono = clienteTelefono;
    this.clienteNombre = clienteNombre;
    this.clienteApellidos = clienteApellido1 + ' ' + clienteApellido2
  
    this.puertaAbordaje = PaseAbordajePrint.puerta;
    this.horaSalida =  this.formatDate2(horaSalida);
    this.asiento = asientos.join(', ') ;
    this.nVuelo = PaseAbordajePrint.viajeId.toString();


    const pdfDefinition: any = {
      content: [
        {
          image: 'data:image/png;base64,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',
          style: 'header', alignment: 'center'
        },
        {
          text: "Pase de Abordaje", style: 'subheader'
        },
        {
          text: "Informacion del Cliente", style: 'subheader'
        },
        {
          text: "Nombre:", bold: 'true', style: 'spacer'
        },
        {
          ul: [
            this.clienteNombre,
            this.clienteApellidos
          ]
          , style: 'spacer'

        },

        {
          text: "Contacto:", bold: 'true', style: 'spacer'
        },
        {
          ul: [
            this.clienteCorreo,
            this.clienteTelefono
          ], style: 'spacer'
        },

        {
          text: "Informacion del Pase", style: 'subheader'
        },
        {
          alignment: 'center',
          style: 'tableExample',
          table: {
            body: [['Puerta de Abordaje', 'Fecha y Hora', 'Asiento', 'Numero de Viaje'],
            [this.puertaAbordaje, this.horaSalida, this.asiento, this.nVuelo]]
          }
        }


      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [100, 0, 100, 0]

        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        spacer: {
          margin: [0, 0, 0, 10]
        }
      }



    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();


  }


  
}
