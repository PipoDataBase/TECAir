import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';

import Swal from 'sweetalert2';

import { PaseAbordaje } from 'src/app/models/pase-abordaje.module';
import { Maleta } from 'src/app/models/maleta.module';

import { PaseAbordajeService } from 'src/app/services/pase-abordaje.service';
import { MaletasService } from 'src/app/services/maletas.service';
import { VuelosService } from 'src/app/services/vuelos.service';
import { ViajesVuelosService } from 'src/app/services/viajes-vuelos.service';
import { MatTableDataSource } from '@angular/material/table';

interface boardingPassData {
  boardingPassId: number;
  clientEmail: string;
  boardingGate: string;
  checkedIn: string;
}

@Component({
  selector: 'app-check-boardingpass-baggages',
  templateUrl: './check-boardingpass-baggages.component.html',
  styleUrls: ['./check-boardingpass-baggages.component.css']
})
export class CheckBoardingpassBaggagesComponent {
  selectedBaggageColor = 'None';

  private foundBoardingPass: PaseAbordaje;

  private checkedInHTML: string;
  private foundBoardingPassData: boardingPassData[];
  private foundBaggagesData: Maleta[] = [];

  private flightCheckInAvailable: boolean;

  dataSource = new MatTableDataSource(this.foundBaggagesData)
  
  private baggagesAmount: number;
  
  private checkInButtonLabel: string;

  private expectedPriceByBaggages: number;

  displayedBoardingPassColumns: string[] = ['boardingPassNumber', 'travelNumber', 'clientEmail', 'boardingGate', 'checkedIn', 'checkInButton'];
  displayedBaggagesColumns: string[] = ['baggageId', 'boardingPassId', 'baggageWeight', 'baggageColor', 'deleteBaggageButton'];

  constructor(private _formBuilder: FormBuilder, private paseAbordajeService: PaseAbordajeService, private maletasService: MaletasService, private vuelosService: VuelosService, private viajesVuelosService: ViajesVuelosService){
    this.checkedInHTML = '';
    this.foundBoardingPass = {id: 0, correoCliente: '', puerta: '', checkIn: false, viajeId: 0};
    this.foundBoardingPassData =[];
    this.foundBaggagesData = [];
    this.checkInButtonLabel = 'Check-In';

    this.flightCheckInAvailable = false;

    this.expectedPriceByBaggages = 0;
    this.baggagesAmount = 0;

  }

  public getCheckedInHTML(): string {
    return this.checkedInHTML;
  }
  public setCheckedInHTML(value: string) {
    this.checkedInHTML = value;
  }
  public getfoundBoardingPassData(): boardingPassData[] {
    return this.foundBoardingPassData;
  }
  public setfoundBoardingPassData(value: boardingPassData[]) {
    this.foundBoardingPassData = value;
  }


  public getBaggagesAmount(): number {
    return this.baggagesAmount;
  }
  public setBaggagesAmount(value: number) {
    this.baggagesAmount = value;
  }

  public getCheckInButtonLabel(): string {
    return this.checkInButtonLabel;
  }
  public setCheckInButtonLabel(value: string) {
    this.checkInButtonLabel = value;
  }

  public getFlightCheckInAvailable(): boolean {
    return this.flightCheckInAvailable;
  }
  public setFlightCheckInAvailable(value: boolean) {
    this.flightCheckInAvailable = value;
  }

  public getExpectedPriceByBaggages(): number {
    return this.expectedPriceByBaggages;
  }
  public setExpectedPriceByBaggages(value: number) {
    this.expectedPriceByBaggages = value;
  }

  public getFoundBaggagesData(): Maleta[] {
    return this.foundBaggagesData;
  }
  public setFoundBaggagesData(value: Maleta[]) {
    this.foundBaggagesData = value;
  }

  public getFoundBoardingPass(): PaseAbordaje {
    return this.foundBoardingPass;
  }
  public setFoundBoardingPass(value: PaseAbordaje) {
    this.foundBoardingPass = value;
  }

  BoardingPassSearching = this._formBuilder.group({
    boardingPassNumberSearched: ['', Validators.required]
  });
  baggagesRegistrationForm = this._formBuilder.group({
    baggageWeightInput: ['', Validators.required],
    baggageColorInput: ['', Validators.required]
  });

  updateBaggagesData(boardingPassNumber: number){
    this.foundBaggagesData = [];

    this.maletasService.getMaletas().subscribe({
      next: (maletas) => {
        for(let i = 0; i < maletas.length; i++){
          if(maletas[i].abordajeId == boardingPassNumber){
            this.foundBaggagesData.push(maletas[i])
          }
        }
        console.log("Maletas cargadas: ", this.foundBaggagesData)
        this.dataSource = new MatTableDataSource(this.foundBaggagesData);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  searchBoardingPass(){
    // Searches in database
    this.foundBoardingPass = {id: 0, correoCliente: '', puerta: '', checkIn: false, viajeId: 0};

    var searchedBoardingPassNumber: number = Number(this.BoardingPassSearching.get('boardingPassNumberSearched')?.value);
    
    this.paseAbordajeService.getPaseAbordaje(searchedBoardingPassNumber).subscribe({
      next: (boardingPass) => {

        this.foundBoardingPass = boardingPass;

        if(this.foundBoardingPass.checkIn){
          this.checkedInHTML = 'Si';
          this.checkInButtonLabel = 'Checked-In';

          this.foundBaggagesData = [];

          this.updateBaggagesData(searchedBoardingPassNumber)

          this.baggagesAmount = 0;
          this.maletasService.getMaletas().subscribe({
            next: (maletas) => {
              for(let i = 0; i < maletas.length; i++){
                if(maletas[i].abordajeId == boardingPass.id){
                  this.baggagesAmount += 1;
                  this.calculateExpectedPrice(this.baggagesAmount);
                }
              }
            },
            error: (response) => {
              console.log(response);
            }
          })

        } else {
          this.checkedInHTML = 'No';
          this.checkInButtonLabel = 'Check-In';
        }
    
        // Update table's array
        this.foundBoardingPassData = [{boardingPassId: this.foundBoardingPass.id,
          clientEmail: this.foundBoardingPass.correoCliente,
          boardingGate: this.foundBoardingPass.puerta,
          checkedIn: this.checkedInHTML}]

        this.viajesVuelosService.getViajesVuelos().subscribe({
          next: (viajesVuelos) => {

            viajesVuelos.sort((a, b) => a.escala - b.escala)

            var travelFirstFlightId: number = 0;
            for(let i = 0; i < viajesVuelos.length; i++){
              if(viajesVuelos[i].viajeId == boardingPass.viajeId && viajesVuelos[i].escala == 1){
                travelFirstFlightId = viajesVuelos[i].nVuelo;
              }
            }

            this.vuelosService.getVuelo(String(travelFirstFlightId)).subscribe({
              next: (vuelo) => {
                console.log("Estado: ", vuelo.estado)
                this.flightCheckInAvailable = vuelo.estado;
              },
              error: (response) => {
                console.log(response);
              }
            })
          },
          error: (response) => {
            console.log(response);
          }
        })
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  
  chechInBoardingPass(boardingPassToCheckId: number, boardingPassToCheckEmail: string, boardingPassToCheckgate: string, boardingPassToCheckTravelId: number){

    var updatedBoardingPass: PaseAbordaje = {id: boardingPassToCheckId, correoCliente: boardingPassToCheckEmail, puerta: boardingPassToCheckgate, checkIn: true, viajeId: boardingPassToCheckTravelId}

    this.paseAbordajeService.putPaseAbordaje(boardingPassToCheckId, updatedBoardingPass).subscribe({
      next: (response) => {

        this.checkedInHTML = 'Si';
    
        // Update table's array
        this.foundBoardingPassData = [{boardingPassId: boardingPassToCheckId,
          clientEmail: boardingPassToCheckEmail,
          boardingGate: boardingPassToCheckgate,
          checkedIn: this.checkedInHTML}]

        this.foundBoardingPass.checkIn = true;

        this.checkInButtonLabel = 'Checked-In';

        this.updateBaggagesData(boardingPassToCheckId)
        
        this.baggagesAmount = 0
        this.calculateExpectedPrice(this.baggagesAmount);
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  calculateExpectedPrice(baggagesCuantity: number){
    this.baggagesAmount = baggagesCuantity;
    var baggagesAmountTemp: number = this.baggagesAmount;

    this.expectedPriceByBaggages = 0;

    while(baggagesAmountTemp > 0){
      if(baggagesAmountTemp == 2){
        this.expectedPriceByBaggages += 25;
      }else if(baggagesAmountTemp >= 3){
        this.expectedPriceByBaggages += 75;
      }

      baggagesAmountTemp--;
    }
  }

  registerBaggageAmount(boardingPassId: number, selectedBaggageColor: string){
    if(selectedBaggageColor != "None"){
      if(Number(this.baggagesRegistrationForm.get('baggageWeightInput')?.value) != 0){
        var maletasTmp: Maleta[] = [];

        this.maletasService.getMaletas().subscribe({
          next: (maletas) => {
            maletasTmp = maletas;

            maletasTmp.sort((a, b) => a.nMaleta - b.nMaleta);

            var newBaggageId: number = 1;
            if(maletasTmp.length > 0){
              newBaggageId = (maletasTmp[maletasTmp.length-1].nMaleta)+1
            }
            var newBaggageWight = Number(this.baggagesRegistrationForm.get('baggageWeightInput')?.value);
            var newBaggage: Maleta = {nMaleta: newBaggageId, abordajeId: boardingPassId, peso: newBaggageWight, color: selectedBaggageColor};
            
            this.maletasService.postMaleta(newBaggage).subscribe({
              next: (response) => {
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Maleta agregada correctamente!',
                  showConfirmButton: false,
                  timer: 1500
                })
                this.updateBaggagesData(boardingPassId)

                this.calculateExpectedPrice(this.baggagesAmount + 1);
              },
              error: (response) => {
                console.log(response);
              }
            })
          },
          error: (response) => {
            console.log(response);
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Ups...',
          text: 'Por favor, digite un peso de maleta válido'
        })
      }
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text: 'Por favor, seleccione un color de maleta válido'
      })
    }
  }

  deleteBaggage(baggageNumber: number, boardingPassId: number){
    this.maletasService.deleteMaleta(baggageNumber).subscribe({
      next: (response) => {
        this.updateBaggagesData(boardingPassId);

        this.baggagesAmount -= 1;
        this.calculateExpectedPrice(this.baggagesAmount);

        Swal.fire({
          icon: 'success',
          title: 'Maleta eliminada correctamente!',
          showConfirmButton: false,
          timer: 1500
        })
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
