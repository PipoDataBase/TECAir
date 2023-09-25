using System;
using Microsoft.EntityFrameworkCore.Migrations;
using NpgsqlTypes;

#nullable disable

namespace TECAir.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Aeropuerto",
                columns: table => new
                {
                    Id = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: false),
                    Nombre = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Ubicacion = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Aeropuerto_pk", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Avion",
                columns: table => new
                {
                    Matricula = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Nombre = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Avion_pk", x => x.Matricula);
                });

            migrationBuilder.CreateTable(
                name: "Cliente",
                columns: table => new
                {
                    Correo = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Teléfono = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Apellido1 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Apellido2 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Cliente_pk", x => x.Correo);
                });

            migrationBuilder.CreateTable(
                name: "Empleado",
                columns: table => new
                {
                    Usuario = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false),
                    Contraseña = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Nombre = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Apellido1 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Apellido2 = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Empleado_pk", x => x.Usuario);
                });

            migrationBuilder.CreateTable(
                name: "Estados",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Estados_pk", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Universidad",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Nombre = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Ubicación = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Universidad_pk", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Pase_Abordaje",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false),
                    Correo_Cliente = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Check_In = table.Column<bool>(type: "boolean", nullable: false),
                    Puerta = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Pase_Abordaje_pk", x => x.Id);
                    table.ForeignKey(
                        name: "Pase_Abordaje_fk0",
                        column: x => x.Correo_Cliente,
                        principalTable: "Cliente",
                        principalColumn: "Correo");
                });

            migrationBuilder.CreateTable(
                name: "Precio_Maleta",
                columns: table => new
                {
                    C_Maletas = table.Column<int>(type: "integer", nullable: false),
                    Costo = table.Column<decimal>(type: "money", nullable: false),
                    Empleado_Usuario = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Precio_Maleta_pk", x => x.C_Maletas);
                    table.ForeignKey(
                        name: "Precio_Maleta_fk0",
                        column: x => x.Empleado_Usuario,
                        principalTable: "Empleado",
                        principalColumn: "Usuario");
                });

            migrationBuilder.CreateTable(
                name: "Viaje",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false),
                    Empleado_Usuario = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false),
                    Fecha_Salida = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Fecha_Llegada = table.Column<DateTime>(type: "timestamp without time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Viaje_pk", x => x.id);
                    table.ForeignKey(
                        name: "Viaje_fk0",
                        column: x => x.Empleado_Usuario,
                        principalTable: "Empleado",
                        principalColumn: "Usuario");
                });

            migrationBuilder.CreateTable(
                name: "Vuelo",
                columns: table => new
                {
                    N_Vuelo = table.Column<int>(type: "integer", nullable: false),
                    Empleado_Usuario = table.Column<string>(type: "character varying(12)", maxLength: 12, nullable: false),
                    Avion_Matricula = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Fecha_Salida = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Fecha_Llegada = table.Column<DateTime>(type: "timestamp without time zone", nullable: false),
                    Estado = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Vuelo_pk", x => x.N_Vuelo);
                    table.ForeignKey(
                        name: "Vuelo_fk0",
                        column: x => x.Empleado_Usuario,
                        principalTable: "Empleado",
                        principalColumn: "Usuario");
                    table.ForeignKey(
                        name: "Vuelo_fk1",
                        column: x => x.Avion_Matricula,
                        principalTable: "Avion",
                        principalColumn: "Matricula");
                });

            migrationBuilder.CreateTable(
                name: "Asiento",
                columns: table => new
                {
                    id = table.Column<string>(type: "character varying(5)", maxLength: 5, nullable: false),
                    Avion_Matricula = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false),
                    Estado_Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Asiento_pk", x => x.id);
                    table.ForeignKey(
                        name: "Asiento_fk0",
                        column: x => x.Avion_Matricula,
                        principalTable: "Avion",
                        principalColumn: "Matricula");
                    table.ForeignKey(
                        name: "Asiento_fk1",
                        column: x => x.Estado_Id,
                        principalTable: "Estados",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Estudiante",
                columns: table => new
                {
                    Carnet = table.Column<int>(type: "integer", nullable: false),
                    Correo = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Universidad_Id = table.Column<int>(type: "integer", nullable: false),
                    Millas = table.Column<decimal>(type: "numeric(6,2)", precision: 6, scale: 2, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Estudiante_pk", x => x.Carnet);
                    table.ForeignKey(
                        name: "Estudiante_fk0",
                        column: x => x.Correo,
                        principalTable: "Cliente",
                        principalColumn: "Correo");
                    table.ForeignKey(
                        name: "Estudiante_fk1",
                        column: x => x.Universidad_Id,
                        principalTable: "Universidad",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Maleta",
                columns: table => new
                {
                    N_Maleta = table.Column<int>(type: "integer", nullable: false),
                    Abordaje_Id = table.Column<int>(type: "integer", nullable: false),
                    Peso = table.Column<decimal>(type: "numeric(3,2)", precision: 3, scale: 2, nullable: false),
                    Color = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Maleta_pk", x => x.N_Maleta);
                    table.ForeignKey(
                        name: "Maleta_fk0",
                        column: x => x.Abordaje_Id,
                        principalTable: "Pase_Abordaje",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Cliente_Viaje",
                columns: table => new
                {
                    Correo_Cliente = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    Viaje_Id = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Cliente_Viaje_pk", x => new { x.Correo_Cliente, x.Viaje_Id });
                    table.ForeignKey(
                        name: "Cliente_Viaje_fk0",
                        column: x => x.Correo_Cliente,
                        principalTable: "Cliente",
                        principalColumn: "Correo");
                    table.ForeignKey(
                        name: "Cliente_Viaje_fk1",
                        column: x => x.Viaje_Id,
                        principalTable: "Viaje",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Promocion",
                columns: table => new
                {
                    Viaje_Id = table.Column<int>(type: "integer", nullable: false),
                    Precio = table.Column<decimal>(type: "money", nullable: false),
                    Fecha_Inicio = table.Column<DateOnly>(type: "date", nullable: false),
                    Fecha_Vencimiento = table.Column<DateOnly>(type: "date", nullable: false),
                    Imagen_Path = table.Column<NpgsqlPath>(type: "path", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Promocion_pk", x => x.Viaje_Id);
                    table.ForeignKey(
                        name: "Promocion_fk0",
                        column: x => x.Viaje_Id,
                        principalTable: "Viaje",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Viaje_Vuelo",
                columns: table => new
                {
                    Viaje_Id = table.Column<int>(type: "integer", nullable: false),
                    N_Vuelo = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Viaje_Vuelo_pk", x => new { x.Viaje_Id, x.N_Vuelo });
                    table.ForeignKey(
                        name: "Viaje_Vuelo_fk0",
                        column: x => x.Viaje_Id,
                        principalTable: "Viaje",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "Viaje_Vuelo_fk1",
                        column: x => x.N_Vuelo,
                        principalTable: "Vuelo",
                        principalColumn: "N_Vuelo");
                });

            migrationBuilder.CreateTable(
                name: "Vuelo_Aeropuerto",
                columns: table => new
                {
                    Aeropuerto_Id = table.Column<string>(type: "character varying(4)", maxLength: 4, nullable: false),
                    Vuelo_Numero = table.Column<int>(type: "integer", nullable: false),
                    Tipo = table.Column<string>(type: "character varying(10)", maxLength: 10, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("Vuelo_Aeropuerto_pk", x => new { x.Aeropuerto_Id, x.Vuelo_Numero });
                    table.ForeignKey(
                        name: "Vuelo_Aeropuerto_fk0",
                        column: x => x.Aeropuerto_Id,
                        principalTable: "Aeropuerto",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "Vuelo_Aeropuerto_fk1",
                        column: x => x.Vuelo_Numero,
                        principalTable: "Vuelo",
                        principalColumn: "N_Vuelo");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Asiento_Avion_Matricula",
                table: "Asiento",
                column: "Avion_Matricula");

            migrationBuilder.CreateIndex(
                name: "IX_Asiento_Estado_Id",
                table: "Asiento",
                column: "Estado_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Cliente_Viaje_Viaje_Id",
                table: "Cliente_Viaje",
                column: "Viaje_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Estudiante_Correo",
                table: "Estudiante",
                column: "Correo");

            migrationBuilder.CreateIndex(
                name: "IX_Estudiante_Universidad_Id",
                table: "Estudiante",
                column: "Universidad_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Maleta_Abordaje_Id",
                table: "Maleta",
                column: "Abordaje_Id");

            migrationBuilder.CreateIndex(
                name: "IX_Pase_Abordaje_Correo_Cliente",
                table: "Pase_Abordaje",
                column: "Correo_Cliente");

            migrationBuilder.CreateIndex(
                name: "IX_Precio_Maleta_Empleado_Usuario",
                table: "Precio_Maleta",
                column: "Empleado_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Viaje_Empleado_Usuario",
                table: "Viaje",
                column: "Empleado_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Viaje_Vuelo_N_Vuelo",
                table: "Viaje_Vuelo",
                column: "N_Vuelo");

            migrationBuilder.CreateIndex(
                name: "IX_Vuelo_Avion_Matricula",
                table: "Vuelo",
                column: "Avion_Matricula");

            migrationBuilder.CreateIndex(
                name: "IX_Vuelo_Empleado_Usuario",
                table: "Vuelo",
                column: "Empleado_Usuario");

            migrationBuilder.CreateIndex(
                name: "IX_Vuelo_Aeropuerto_Vuelo_Numero",
                table: "Vuelo_Aeropuerto",
                column: "Vuelo_Numero");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Asiento");

            migrationBuilder.DropTable(
                name: "Cliente_Viaje");

            migrationBuilder.DropTable(
                name: "Estudiante");

            migrationBuilder.DropTable(
                name: "Maleta");

            migrationBuilder.DropTable(
                name: "Precio_Maleta");

            migrationBuilder.DropTable(
                name: "Promocion");

            migrationBuilder.DropTable(
                name: "Viaje_Vuelo");

            migrationBuilder.DropTable(
                name: "Vuelo_Aeropuerto");

            migrationBuilder.DropTable(
                name: "Estados");

            migrationBuilder.DropTable(
                name: "Universidad");

            migrationBuilder.DropTable(
                name: "Pase_Abordaje");

            migrationBuilder.DropTable(
                name: "Viaje");

            migrationBuilder.DropTable(
                name: "Aeropuerto");

            migrationBuilder.DropTable(
                name: "Vuelo");

            migrationBuilder.DropTable(
                name: "Cliente");

            migrationBuilder.DropTable(
                name: "Empleado");

            migrationBuilder.DropTable(
                name: "Avion");
        }
    }
}
