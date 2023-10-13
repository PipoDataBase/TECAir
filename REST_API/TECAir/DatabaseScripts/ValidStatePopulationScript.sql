INSERT INTO "Vuelo" ("N_Vuelo", "Empleado_Usuario", "Avion_Matricula", "Fecha_Salida", "Fecha_Llegada", "Estado", "Precio") VALUES
(1, 'Emarin19', 'C4509CR', '2023-10-26T15:30:00.000+00:00', '2023-10-26T18:00:00.000+00:00', true, 68),
(2, 'Emarin19', 'C8485CR', '2023-10-27T17:00:00.000+00:00', '2023-10-27T21:30:00.000+00:00', true, 87),
(3, 'Emarin19', 'C4952CR', '2023-11-09T11:00:00.000+00:00', '2023-11-09T17:00:00.000+00:00', true, 105),
(4, 'Emarin19', 'C1728CR', '2023-11-17T08:00:00.000+00:00', '2023-11-17T15:30:00.000+00:00', true, 114);


INSERT INTO "Vuelo_Aeropuerto" ("Aeropuerto_Id", "Vuelo_Numero", "Tipo") VALUES
('SJO', 1, 'Origen'),
('GUA', 1, 'Destino'),
('SJO', 2, 'Origen'),
('SAL', 2, 'Destino'),
('SJO', 3, 'Origen'),
('BOG', 3, 'Destino'),
('SJO', 4, 'Origen'),
('MEX', 4, 'Destino');


INSERT INTO "Viaje" ("id", "Empleado_Usuario", "Fecha_Salida", "Fecha_Llegada", "Origen", "Destino", "Precio") VALUES
(1, 'Emarin19', '2023-10-26T15:30:00.000+00:00', '2023-10-26T18:00:00.000+00:00', 'SJO', 'GUA', 68),
(2, 'Emarin19', '2023-10-27T17:00:00.000+00:00', '2023-10-27T21:30:00.000+00:00', 'SJO', 'SAL', 87),
(3, 'Emarin19', '2023-11-09T11:00:00.000+00:00', '2023-11-09T17:00:00.000+00:00', 'SJO', 'BOG', 105),
(4, 'Emarin19', '2023-11-17T08:00:00.000+00:00', '2023-11-17T15:30:00.000+00:00', 'SJO', 'MEX', 114);


INSERT INTO "Viaje_Vuelo" ("Viaje_Id", "N_Vuelo", "Escala") VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(4, 4, 1);


INSERT INTO "Promocion" ("Viaje_Id", "Precio", "Fecha_Inicio", "Fecha_Vencimiento", "Imagen_Path") VALUES
(1, 68, '2023-10-16', '2023-11-26', 'https://firebasestorage.googleapis.com/v0/b/tecair-bd0cb.appspot.com/o/images%2Fpromo1.jpg?alt=media&token=ae7e5662-8c62-4ad3-8ac0-ca850fc98264&_gl=1*a9ln8t*_ga*OTM2MTI4OTAyLjE2OTQwNzE4Mzk.*_ga_CW55HF8NVT*MTY5NzIyNzc5Ny43LjEuMTY5NzIyODE1Mi4zOC4wLjA.'),
(2, 87, '2023-10-16', '2023-11-26', 'https://firebasestorage.googleapis.com/v0/b/tecair-bd0cb.appspot.com/o/images%2Fpromo2.jpg?alt=media&token=b737fd3a-6b35-403c-8dbe-6996df0a1611&_gl=1*v73hja*_ga*OTM2MTI4OTAyLjE2OTQwNzE4Mzk.*_ga_CW55HF8NVT*MTY5NzIyNzc5Ny43LjEuMTY5NzIyODIzMS42MC4wLjA.'),
(3, 105, '2023-10-16', '2023-11-26', 'https://firebasestorage.googleapis.com/v0/b/tecair-bd0cb.appspot.com/o/images%2Fpromo3.jpg?alt=media&token=5d3fedf0-3260-4003-b6a6-91da9d4676bd&_gl=1*10a09jd*_ga*OTM2MTI4OTAyLjE2OTQwNzE4Mzk.*_ga_CW55HF8NVT*MTY5NzIyNzc5Ny43LjEuMTY5NzIyODI0NC40Ny4wLjA.'),
(4, 114, '2023-10-16', '2023-11-26', 'https://firebasestorage.googleapis.com/v0/b/tecair-bd0cb.appspot.com/o/images%2Fpromo4.jpg?alt=media&token=2b1c2886-e6e3-412f-afba-8d9e1275420d&_gl=1*t9hrcv*_ga*OTM2MTI4OTAyLjE2OTQwNzE4Mzk.*_ga_CW55HF8NVT*MTY5NzIyNzc5Ny43LjEuMTY5NzIyODI1My4zOC4wLjA.');

