import { Injectable, WritableSignal, signal } from '@angular/core';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile.module';
import { Aeropuerto } from '../models/aeropuerto.module';
import { Student } from '../models/student.module';
import { Viaje } from '../models/viaje.module';
import { Vuelo } from '../models/vuelo.module';
import { OfflineChange } from '../models/offlineChange.module';
import { ProfileService } from './profile.service';


const DB_TECAir = 'TECAirDB';

@Injectable({
  providedIn: 'root'
})


export class DatabaseService {
  private sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  private db!: SQLiteDBConnection;
  private profile: WritableSignal<Profile[]> = signal<Profile[]>([]);
  private aeropuertos: WritableSignal<Aeropuerto[]> = signal<Aeropuerto[]>([]);
  private estudiantes: WritableSignal<Student[]> = signal<Student[]>([]);
  private offlineChanges: WritableSignal<OfflineChange[]> = signal<OfflineChange[]>([]);

  addClientRequest: Profile = {
    correo: '',
    telefono: 0,
    nombre: '',
    apellido1: '',
    apellido2: ''
  };

  constructor(private http: HttpClient, private profileService: ProfileService) { }

  baseApiUrl: string = environment.baseApiUrl;

  async InitializeDB() {

    this.db = await this.sqlite.createConnection(
      DB_TECAir,
      false,
      'no-encryption',
      1,
      false
    );

    await this.db.open();

    const schemaCliente = `CREATE TABLE IF NOT EXISTS Cliente (
                                correo TEXT PRIMARY KEY NOT NULL, 
                                telefono NUMBER NOT NULL,
                                nombre TEXT,
                                apellido1 TEXT,
                                apellido2 TEXT);`;
    const schemaAeropuerto = `CREATE TABLE IF NOT EXISTS Aeropuerto (
                                  id TEXT PRIMARY KEY NOT NULL,
                                  nombre TEXT NOT NULL,
                                  ubicacion TEXT NOT NULL);`;
    const schemaEstudiante = `CREATE TABLE IF NOT EXISTS Estudiante (
                                  carnet TEXT PRIMARY KEY NOT NULL, 
                                  correo TEXT NOT NULL, 
                                  universidadId NOT NULL, 
                                  millas NUMBER NOT NULL DEFAULT 0);`;
    const schemaViaje = `CREATE TABLE IF NOT EXISTS Viaje (
                              id NUMBER PRIMARY KEY NOT NULL, 
                              origen TEXT NOT NULL, 
                              destino TEXT NOT NULL, 
                              fechaSalida TEXT NOT NULL, 
                              fechaLlegada TEXT NOT NULL, 
                              precio NUMBER NOT NULL);`;
    const schemaVuelo = `CREATE TABLE IF NOT EXISTS Viaje (
                              nVuelo NUMBER PRIMARY KEY NOT NULL, 
                              avionMatricula TEXT NOT NULL, 
                              fechaSalida TEXT NOT NULL, 
                              fechaLlegada TEXT NOT NULL, 
                              estado TEXT NOT NULL, 
                              precio NUMBER NOT NULL);`;
    const schemaOfflineChange = `CREATE TABLE IF NOT EXISTS OfflineChange (
                                      nChange NUMBER PRIMARY KEY NOT NULL, 
                                      tableName TEXT NOT NULL, 
                                      changeId TEXT NOT NULL);`;

    await this.db.execute(schemaCliente);
    await this.db.execute(schemaAeropuerto);
    await this.db.execute(schemaEstudiante);
    await this.db.execute(schemaViaje);
    await this.db.execute(schemaVuelo);
    await this.db.execute(schemaOfflineChange);

    this.loadClientsProfile();
    this.loadAeropuertos();
    this.loadEstudiantes();
    this.loadOfflineChanges();

  }

  //CLIENT
  async loadClientsProfile() {
    const Profiles = await this.db.query('SELECT * FROM Cliente;');
    this.profile.set(Profiles.values || [])
    return true
  }


  getClientes() {
    return this.profile;
  }



  async getCliente(Correo: string) {
    var result = await this.db.query(`SELECT * FROM Cliente WHERE Correo='${Correo}';`);
    if (result && result.values && result.values.length > 0) {
      var client = result.values[0];
      this.addClientRequest.correo = client.correo;
      this.addClientRequest.telefono = client.telefono;
      this.addClientRequest.nombre = "client.nombre";
      this.addClientRequest.apellido1 = "client.apellido1";
      this.addClientRequest.apellido2 = "client.apellido2";
      this.profileService.addClient(this.addClientRequest).subscribe({
        next: (response) => {
          console.log("Error getCliente database.service: ", this.addClientRequest);
        }
      });
      return result;
    } else {
      return null; // No record found with the given ID
    }
  }

  async addCliente(Correo: string, Telefono: number) {

    const query = `INSERT INTO Cliente (Correo, Telefono) VALUES ('${Correo}','${Telefono}')`;
    const result = await this.db.query(query);

    this.loadClientsProfile();

    return result;

  }

  async updateClientePorCorreo(Correo: string, Telefono: number) {

    const query = `UPDATE Cliente SET Telefono=${Telefono} WHERE Correo=${Correo}`;
    const result = this.db.query(query);

    this.loadClientsProfile();

    return result;

  }


  async deleteCliente(Correo: string) {



    const query = `DELETE FROM Cliente WHERE Correo=${Correo}`;
    const result = this.db.query(query);

    this.loadClientsProfile();

    return result;

  }

  // AEROPUERTO

  async loadAeropuertos() {
    const Airports = await this.db.query('SELECT * FROM Aeropuerto;');
    this.aeropuertos.set(Airports.values || []);
    return true;
  }


  getAeropuertos() {
    return this.aeropuertos;
  }

  async addAeropuertos(aeropuertos: { id: string; nombre: string; ubicacion: string }[]) {

    const insertPromises = aeropuertos.map(aeropuerto =>
      this.db.query(`
      INSERT INTO Aeropuerto (Id, Nombre, Ubicacion) VALUES ('${aeropuerto.id}', '${aeropuerto.nombre}', '${aeropuerto.ubicacion}')
    `));

    const insertResults = await Promise.all(insertPromises);

    console.log(`posts created successfully!`);
    this.loadAeropuertos();

  }


  // ESTUDIANTE


  async loadEstudiantes() {
    const Students = await this.db.query('SELECT * FROM Cliente;');
    this.estudiantes.set(Students.values || []);
    return true;
  }


  getEstudiantes() {
    return this.estudiantes;
  }

  // OfflineChanges

  async loadOfflineChanges() {
    const OfflineChanges = await this.db.query('SELECT * FROM OfflineChange;');
    this.offlineChanges.set(OfflineChanges.values || []);
    return true;
  }

  getOfflineChanges() {
    return this.offlineChanges;
  }

  async addOfflineChange(TableName: string, ChangeId: string) {

    const result1 = await this.db.query('SELECT COUNT(*) as count FROM OfflineChange;');
    var nChange: number;
    if (result1 && result1.values && result1.values.length > 0) {
      nChange = result1.values[0].count;
      console.log("nChange: ", nChange);
      const query = `INSERT INTO OfflineChange (nChange, TableName, ChangeId) VALUES ('${nChange}','${TableName}','${ChangeId}')`;
      const result = await this.db.query(query);
    }
    this.loadOfflineChanges();
  }

  async deleteOfflineChanges() {

    const query = `DELETE FROM OfflineChange`;
    const result = this.db.query(query);
    this.loadOfflineChanges();
    return result;
  }


}
