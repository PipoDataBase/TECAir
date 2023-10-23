import { Component } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.module';
//import { }


import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { PaseAbordaje } from 'src/app/models/pase-abordaje.module';



pdfMake.vfs = pdfFonts.pdfMake.vfs

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PDFComponent {

  clienteCorreo: string = 'pipo@gmail.com';
  clienteTelefono: string = '88776655';
  clienteNombre: string = 'pipo';
  clienteApellidos: string = 'piporin piporon'

  puertaAbordaje: string = 'C7';
  horaSalida: string = '18:00';
  asiento: string = 'B4';
  nVuelo: string = '123456';

  malestas: string[] = ["maleta1", "maleta2", "maleta3"];


  createMaletaPDF() {

    const pdfDefinition: any = {
      content: [
        {
          image: 'data:image/png;base64,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',
          style: 'header', alignment: 'center'
        },
        {
          text: "Maletas", style: 'subheader'
        },
        {
            text: "Correo del Cliente", style: 'subheader'
        },
        {
            
          ul: [
               "sample"
           
          ], style: 'spacer'
        },
        {
            text: "Pase de Abordaje", style: 'subheader'
        },
         {
            
          ul: [
               "sample"
           
          ], style: 'spacer'
        },
        {
          text: "Informacion de las Maletas", style: 'subheader'
        },
        {
          text: "\n"
        },
        {
          ul: [
             "Maleta 1 \t piporan \n Maleta 2 \t piporin \n Maleta 3 \t piporon"
          ]
          , style: 'spacer'

        },

        {
          text: "Precio: \n", bold: 'true', style: 'subheader'
        },
        {
            
          ul: [
               "$5746"

          ], style: 'spacer'
        },
        {
            image: 'data:image/jpeg;base64,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',
            margin: [500,0,500,0],
            opacity: 0.1
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
  
  public createBookingPDF( PaseAbordajePrint: PaseAbordaje, clienteNombre: string, clienteApellido1: string,clienteApellido2: string ,clienteTelefono: string, asientos: string[] , horaSalida : string) {

    this.clienteCorreo = PaseAbordajePrint.correoCliente ;
    this.clienteTelefono = clienteTelefono;
    this.clienteNombre = clienteNombre;
    this.clienteApellidos = clienteApellido1 + ' ' + clienteApellido2
  
    this.puertaAbordaje = PaseAbordajePrint.puerta;
    this.horaSalida =  horaSalida;
    this.asiento = asientos[0] ;
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
            body: [['Puerta de Abordaje', 'Hora de Salida', 'Asiento', 'Numero de Vuelo'],
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