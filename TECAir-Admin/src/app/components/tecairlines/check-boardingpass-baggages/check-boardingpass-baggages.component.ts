import { Component } from '@angular/core';
import Swal from 'sweetalert2';

interface boardingPassData {
  boardingPassId: string;
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
  private boardingPassId: string;
  private clientEmail: string;
  private boardingGate: string;
  private checkedIn: boolean;
  private checkedInHTML: string;
  private foundBoardingPassData: boardingPassData[];
  private baggagesAmount: number;
  
  private checkInButtonLabel: string;

  private expectedPriceByBaggages: number;

  displayedColumns: string[] = ['boardingPassNumber', 'clientEmail', 'boardingGate', 'checkedIn', 'checkInButton'];

  constructor(){

    //Default data for testing: Original: ''
    this.boardingPassId = '';
    this.clientEmail = '';
    this.boardingGate = '';
    this.checkedIn = false;
    this.checkedInHTML = '';
    this.foundBoardingPassData =[];
    this.baggagesAmount = 0;
    this.checkInButtonLabel = 'Check-In';
    this.expectedPriceByBaggages = 0;
  }

  public getBoardingPassId(): string {
    return this.boardingPassId;
  }
  public setBoardingPassId(value: string) {
    this.boardingPassId = value;
  }
  public getClientEmail(): string {
    return this.clientEmail;
  }
  public setClientEmail(value: string) {
    this.clientEmail = value;
  }
  public getBoardingGate(): string {
    return this.boardingGate;
  }
  public setBoardingGate(value: string) {
    this.boardingGate = value;
  }
  public getCheckedIn(): boolean {
    return this.checkedIn;
  }
  public setCheckedIn(value: boolean) {
    this.checkedIn = value;
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

  public getExpectedPriceByBaggages(): number {
    return this.expectedPriceByBaggages;
  }
  public setExpectedPriceByBaggages(value: number) {
    this.expectedPriceByBaggages = value;
  }

  searchBoardingPass(){
    // Searches in database

    // Update class attributes
    this.boardingPassId = 'ABCD1234EFGH5678';
    this.clientEmail = 'pedroperico@airtec.com';
    this.boardingGate = 'ABC123';
    this.checkedIn = false;
    
    if(this.checkedIn){
      this.checkedInHTML = 'Si';
    } else {
      this.checkedInHTML = 'No';
    }

    this.checkInButtonLabel = 'Check-In';

    // Update table's array
    this.foundBoardingPassData = [{boardingPassId: this.boardingPassId,
      clientEmail: this.clientEmail,
      boardingGate: this.boardingGate,
      checkedIn: this.checkedInHTML}]
  }

  chechInBoardingPass(){
    this.checkedIn = !this.checkedIn;

    if(this.checkedIn){
      this.checkedInHTML = 'Si';
    } else {
      this.checkedInHTML = 'No';
    }

    this.checkInButtonLabel = 'Checked-In';
  }

  calculateExpectedPrice(event: any){
    this.baggagesAmount = parseInt(event.target.value);
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

  registerBaggageAmount(){
    // Enviar a la base de datos la cantidad de maletas

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500
    })

    this.boardingPassId = '';
    this.clientEmail = '';
    this.boardingGate = '';
    this.checkedIn = false;
    this.checkedInHTML = '';
    this.foundBoardingPassData =[];
    this.baggagesAmount = 0;
    this.checkInButtonLabel = 'Check-In';
    this.expectedPriceByBaggages = 0;
  }
}
