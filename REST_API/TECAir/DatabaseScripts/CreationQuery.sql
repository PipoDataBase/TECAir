CREATE TABLE "Viaje" (
	"id" integer NOT NULL,
	"Empleado_Usuario" varchar(12) NOT NULL,
	"Fecha_Salida" TIMESTAMP NOT NULL,
	"Fecha_Llegada" TIMESTAMP NOT NULL,
	CONSTRAINT "Viaje_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Vuelo" (
	"N_Vuelo" integer NOT NULL,
	"Empleado_Usuario" varchar(12) NOT NULL,
	"Avion_Matricula" varchar(10) NOT NULL,
	"Fecha_Salida" TIMESTAMP NOT NULL,
	"Fecha_Llegada" TIMESTAMP NOT NULL,
	"Estado" BOOLEAN NOT NULL,
	CONSTRAINT "Vuelo_pk" PRIMARY KEY ("N_Vuelo")
) WITH (
  OIDS=FALSE
);




CREATE TABLE "Cliente" (
	"Correo" varchar(20) NOT NULL,
	"Teléfono" integer NOT NULL,
	"Nombre" varchar(20) NOT NULL,
	"Apellido1" varchar(20) NOT NULL,
	"Apellido2" varchar(20),
	CONSTRAINT "Cliente_pk" PRIMARY KEY ("Correo")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Pase_Abordaje" (
	"Id" integer NOT NULL,
	"Correo_Cliente" varchar(20) NOT NULL,
	"Check_In" BOOLEAN NOT NULL,
	"Puerta" varchar(10) NOT NULL,
	CONSTRAINT "Pase_Abordaje_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Estudiante" (
	"Carnet" integer NOT NULL,
	"Correo" varchar(20) NOT NULL,
	"Universidad_Id" integer NOT NULL,
	"Millas" numeric(6,2) NOT NULL DEFAULT '0',
	CONSTRAINT "Estudiante_pk" PRIMARY KEY ("Carnet")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Universidad" (
	"Id" int NOT NULL,
	"Nombre" varchar(50) NOT NULL,
	"Ubicación" varchar(50) NOT NULL,
	CONSTRAINT "Universidad_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Maleta" (
	"N_Maleta" integer NOT NULL,
	"Abordaje_Id" integer NOT NULL,
	"Peso" numeric(3,2) NOT NULL,
	"Color" varchar(10) NOT NULL,
	CONSTRAINT "Maleta_pk" PRIMARY KEY ("N_Maleta")
) WITH (
  OIDS=FALSE
);




CREATE TABLE "Empleado" (
	"Usuario" varchar(12) NOT NULL,
	"Contraseña" varchar(20) NOT NULL,
	"Nombre" varchar(20) NOT NULL,
	"Apellido1" varchar(20) NOT NULL,
	"Apellido2" varchar(20),
	CONSTRAINT "Empleado_pk" PRIMARY KEY ("Usuario")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Aeropuerto" (
	"Id" varchar(4) NOT NULL,
	"Nombre" varchar(50) NOT NULL,
	"Ubicacion" varchar(50) NOT NULL,
	CONSTRAINT "Aeropuerto_pk" PRIMARY KEY ("Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Avion" (
	"Matricula" varchar(10) NOT NULL,
	"Nombre" varchar(20) NOT NULL,
	CONSTRAINT "Avion_pk" PRIMARY KEY ("Matricula")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Promocion" (
	"Viaje_Id" integer NOT NULL,
	"Precio" money NOT NULL,
	"Fecha_Inicio" DATE NOT NULL,
	"Fecha_Vencimiento" DATE NOT NULL,
	"Imagen_Path" path,
	CONSTRAINT "Promocion_pk" PRIMARY KEY ("Viaje_Id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Asiento" (
	"id" varchar(5) NOT NULL,
	"Avion_Matricula" varchar(10) NOT NULL,
	"Estado_Id" integer NOT NULL,
	CONSTRAINT "Asiento_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Estados" (
	"id" integer NOT NULL,
	"Nombre" varchar(10) NOT NULL,
	CONSTRAINT "Estados_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "Precio_Maleta" (
	"C_Maletas" integer NOT NULL,
	"Costo" money NOT NULL,
	"Empleado_Usuario" varchar(12) NOT NULL,
	CONSTRAINT "Precio_Maleta_pk" PRIMARY KEY ("C_Maletas")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Vuelo_Aeropuerto" (
	"Aeropuerto_Id" varchar(4) NOT NULL,
	"Vuelo_Numero" integer NOT NULL,
	"Tipo" varchar(10) NOT NULL,
	CONSTRAINT "Vuelo_Aeropuerto_pk" PRIMARY KEY ("Aeropuerto_Id","Vuelo_Numero")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Viaje_Vuelo" (
	"Viaje_Id" integer NOT NULL,
	"N_Vuelo" integer NOT NULL,
	CONSTRAINT "Viaje_Vuelo_pk" PRIMARY KEY ("Viaje_Id","N_Vuelo")
) WITH (
  OIDS=FALSE
);


CREATE TABLE "Cliente_Viaje" (
	"Correo_Cliente" varchar(20) NOT NULL,
	"Viaje_Id" integer NOT NULL,
	CONSTRAINT "Cliente_Viaje_pk" PRIMARY KEY ("Correo_Cliente","Viaje_Id")
) WITH (
  OIDS=FALSE
);


ALTER TABLE "Pase_Abordaje" ADD CONSTRAINT "Pase_Abordaje_fk0" FOREIGN KEY ("Correo_Cliente") REFERENCES "Cliente"("Correo");


ALTER TABLE "Promocion" ADD CONSTRAINT "Promocion_fk0" FOREIGN KEY ("Viaje_Id") REFERENCES "Viaje"("id");

ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_fk0" FOREIGN KEY ("Correo") REFERENCES "Cliente"("Correo");
ALTER TABLE "Estudiante" ADD CONSTRAINT "Estudiante_fk1" FOREIGN KEY ("Universidad_Id") REFERENCES "Universidad"("Id");


ALTER TABLE "Maleta" ADD CONSTRAINT "Maleta_fk0" FOREIGN KEY ("Abordaje_Id") REFERENCES "Pase_Abordaje"("Id");


ALTER TABLE "Viaje" ADD CONSTRAINT "Viaje_fk0" FOREIGN KEY ("Empleado_Usuario") REFERENCES "Empleado"("Usuario");

ALTER TABLE "Vuelo" ADD CONSTRAINT "Vuelo_fk0" FOREIGN KEY ("Empleado_Usuario") REFERENCES "Empleado"("Usuario");
ALTER TABLE "Vuelo" ADD CONSTRAINT "Vuelo_fk1" FOREIGN KEY ("Avion_Matricula") REFERENCES "Avion"("Matricula");


ALTER TABLE "Asiento" ADD CONSTRAINT "Asiento_fk0" FOREIGN KEY ("Avion_Matricula") REFERENCES "Avion"("Matricula");
ALTER TABLE "Asiento" ADD CONSTRAINT "Asiento_fk1" FOREIGN KEY ("Estado_Id") REFERENCES "Estados"("id");


ALTER TABLE "Precio_Maleta" ADD CONSTRAINT "Precio_Maleta_fk0" FOREIGN KEY ("Empleado_Usuario") REFERENCES "Empleado"("Usuario");


ALTER TABLE "Cliente_Viaje" ADD CONSTRAINT "Cliente_Viaje_fk0" FOREIGN KEY ("Correo_Cliente") REFERENCES "Cliente"("Correo");
ALTER TABLE "Cliente_Viaje" ADD CONSTRAINT "Cliente_Viaje_fk1" FOREIGN KEY ("Viaje_Id") REFERENCES "Viaje"("id");

ALTER TABLE "Viaje_Vuelo" ADD CONSTRAINT "Viaje_Vuelo_fk0" FOREIGN KEY ("Viaje_Id") REFERENCES "Viaje"("id");
ALTER TABLE "Viaje_Vuelo" ADD CONSTRAINT "Viaje_Vuelo_fk1" FOREIGN KEY ("N_Vuelo") REFERENCES "Vuelo"("N_Vuelo");


ALTER TABLE "Vuelo_Aeropuerto" ADD CONSTRAINT "Vuelo_Aeropuerto_fk0" FOREIGN KEY ("Aeropuerto_Id") REFERENCES "Aeropuerto"("Id");
ALTER TABLE "Vuelo_Aeropuerto" ADD CONSTRAINT "Vuelo_Aeropuerto_fk1" FOREIGN KEY ("Vuelo_Numero") REFERENCES "Vuelo"("N_Vuelo");
