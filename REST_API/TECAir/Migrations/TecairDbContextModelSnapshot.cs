﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using NpgsqlTypes;
using TECAir.Models;

#nullable disable

namespace TECAir.Migrations
{
    [DbContext(typeof(TecairDbContext))]
    partial class TecairDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.11")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ClienteViaje", b =>
                {
                    b.Property<string>("CorreoCliente")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)")
                        .HasColumnName("Correo_Cliente");

                    b.Property<int>("ViajeId")
                        .HasColumnType("integer")
                        .HasColumnName("Viaje_Id");

                    b.HasKey("CorreoCliente", "ViajeId")
                        .HasName("Cliente_Viaje_pk");

                    b.HasIndex("ViajeId");

                    b.ToTable("Cliente_Viaje", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Aeropuerto", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(4)
                        .HasColumnType("character varying(4)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<string>("Ubicacion")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id")
                        .HasName("Aeropuerto_pk");

                    b.ToTable("Aeropuerto", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Asiento", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(5)
                        .HasColumnType("character varying(5)")
                        .HasColumnName("id");

                    b.Property<string>("AvionMatricula")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)")
                        .HasColumnName("Avion_Matricula");

                    b.Property<int>("EstadoId")
                        .HasColumnType("integer")
                        .HasColumnName("Estado_Id");

                    b.HasKey("Id")
                        .HasName("Asiento_pk");

                    b.HasIndex("AvionMatricula");

                    b.HasIndex("EstadoId");

                    b.ToTable("Asiento", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Avion", b =>
                {
                    b.Property<string>("Matricula")
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Matricula")
                        .HasName("Avion_pk");

                    b.ToTable("Avion", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Cliente", b =>
                {
                    b.Property<string>("Correo")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Apellido1")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Apellido2")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<int>("Telefono")
                        .HasColumnType("integer");

                    b.HasKey("Correo")
                        .HasName("Cliente_pk");

                    b.ToTable("Cliente", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Empleado", b =>
                {
                    b.Property<string>("Usuario")
                        .HasMaxLength(12)
                        .HasColumnType("character varying(12)");

                    b.Property<string>("Apellido1")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Apellido2")
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Contraseña")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.HasKey("Usuario")
                        .HasName("Empleado_pk");

                    b.ToTable("Empleado", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Estado", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.HasKey("Id")
                        .HasName("Estados_pk");

                    b.ToTable("Estados");
                });

            modelBuilder.Entity("TECAir.Models.Estudiante", b =>
                {
                    b.Property<int>("Carnet")
                        .HasColumnType("integer");

                    b.Property<string>("Correo")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)");

                    b.Property<decimal>("Millas")
                        .HasPrecision(6, 2)
                        .HasColumnType("numeric(6,2)");

                    b.Property<int>("UniversidadId")
                        .HasColumnType("integer")
                        .HasColumnName("Universidad_Id");

                    b.HasKey("Carnet")
                        .HasName("Estudiante_pk");

                    b.HasIndex("Correo");

                    b.HasIndex("UniversidadId");

                    b.ToTable("Estudiante", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Maleta", b =>
                {
                    b.Property<int>("NMaleta")
                        .HasColumnType("integer")
                        .HasColumnName("N_Maleta");

                    b.Property<int>("AbordajeId")
                        .HasColumnType("integer")
                        .HasColumnName("Abordaje_Id");

                    b.Property<string>("Color")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<decimal>("Peso")
                        .HasPrecision(3, 2)
                        .HasColumnType("numeric(3,2)");

                    b.HasKey("NMaleta")
                        .HasName("Maleta_pk");

                    b.HasIndex("AbordajeId");

                    b.ToTable("Maleta");
                });

            modelBuilder.Entity("TECAir.Models.PaseAbordaje", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<bool>("CheckIn")
                        .HasColumnType("boolean")
                        .HasColumnName("Check_In");

                    b.Property<string>("CorreoCliente")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("character varying(20)")
                        .HasColumnName("Correo_Cliente");

                    b.Property<string>("Puerta")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.Property<int>("ViajeId")
                        .HasColumnType("integer")
                        .HasColumnName("Viaje_Id");

                    b.HasKey("Id")
                        .HasName("Pase_Abordaje_pk");

                    b.HasIndex("CorreoCliente");

                    b.HasIndex("ViajeId");

                    b.ToTable("Pase_Abordaje", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.PrecioMaleta", b =>
                {
                    b.Property<int>("CMaletas")
                        .HasColumnType("integer")
                        .HasColumnName("C_Maletas");

                    b.Property<decimal>("Costo")
                        .HasColumnType("money");

                    b.Property<string>("EmpleadoUsuario")
                        .IsRequired()
                        .HasMaxLength(12)
                        .HasColumnType("character varying(12)")
                        .HasColumnName("Empleado_Usuario");

                    b.HasKey("CMaletas")
                        .HasName("Precio_Maleta_pk");

                    b.HasIndex("EmpleadoUsuario");

                    b.ToTable("Precio_Maleta", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Promocion", b =>
                {
                    b.Property<int>("ViajeId")
                        .HasColumnType("integer")
                        .HasColumnName("Viaje_Id");

                    b.Property<DateOnly>("FechaInicio")
                        .HasColumnType("date")
                        .HasColumnName("Fecha_Inicio");

                    b.Property<DateOnly>("FechaVencimiento")
                        .HasColumnType("date")
                        .HasColumnName("Fecha_Vencimiento");

                    b.Property<NpgsqlPath?>("ImagenPath")
                        .HasColumnType("path")
                        .HasColumnName("Imagen_Path");

                    b.Property<decimal>("Precio")
                        .HasColumnType("money");

                    b.HasKey("ViajeId")
                        .HasName("Promocion_pk");

                    b.ToTable("Promocion", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Universidad", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.Property<string>("Ubicacion")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)");

                    b.HasKey("Id")
                        .HasName("Universidad_pk");

                    b.ToTable("Universidad", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Viaje", b =>
                {
                    b.Property<int>("Id")
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    b.Property<string>("EmpleadoUsuario")
                        .IsRequired()
                        .HasMaxLength(12)
                        .HasColumnType("character varying(12)")
                        .HasColumnName("Empleado_Usuario");

                    b.Property<DateTime>("FechaLlegada")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("Fecha_Llegada");

                    b.Property<DateTime>("FechaSalida")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("Fecha_Salida");

                    b.HasKey("Id")
                        .HasName("Viaje_pk");

                    b.HasIndex("EmpleadoUsuario");

                    b.ToTable("Viaje", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.Vuelo", b =>
                {
                    b.Property<int>("NVuelo")
                        .HasColumnType("integer")
                        .HasColumnName("N_Vuelo");

                    b.Property<string>("AvionMatricula")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)")
                        .HasColumnName("Avion_Matricula");

                    b.Property<string>("EmpleadoUsuario")
                        .IsRequired()
                        .HasMaxLength(12)
                        .HasColumnType("character varying(12)")
                        .HasColumnName("Empleado_Usuario");

                    b.Property<bool>("Estado")
                        .HasColumnType("boolean");

                    b.Property<DateTime>("FechaLlegada")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("Fecha_Llegada");

                    b.Property<DateTime>("FechaSalida")
                        .HasColumnType("timestamp without time zone")
                        .HasColumnName("Fecha_Salida");

                    b.Property<decimal>("Precio")
                        .HasColumnType("money");

                    b.HasKey("NVuelo")
                        .HasName("Vuelo_pk");

                    b.HasIndex("AvionMatricula");

                    b.HasIndex("EmpleadoUsuario");

                    b.ToTable("Vuelo", (string)null);
                });

            modelBuilder.Entity("TECAir.Models.VueloAeropuerto", b =>
                {
                    b.Property<string>("AeropuertoId")
                        .HasMaxLength(4)
                        .HasColumnType("character varying(4)")
                        .HasColumnName("Aeropuerto_Id");

                    b.Property<int>("VueloNumero")
                        .HasColumnType("integer")
                        .HasColumnName("Vuelo_Numero");

                    b.Property<string>("Tipo")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("character varying(10)");

                    b.HasKey("AeropuertoId", "VueloNumero")
                        .HasName("Vuelo_Aeropuerto_pk");

                    b.HasIndex("VueloNumero");

                    b.ToTable("Vuelo_Aeropuerto", (string)null);
                });

            modelBuilder.Entity("ViajeVuelo", b =>
                {
                    b.Property<int>("ViajeId")
                        .HasColumnType("integer")
                        .HasColumnName("Viaje_Id");

                    b.Property<int>("NVuelo")
                        .HasColumnType("integer")
                        .HasColumnName("N_Vuelo");

                    b.HasKey("ViajeId", "NVuelo")
                        .HasName("Viaje_Vuelo_pk");

                    b.HasIndex("NVuelo");

                    b.ToTable("Viaje_Vuelo", (string)null);
                });

            modelBuilder.Entity("ClienteViaje", b =>
                {
                    b.HasOne("TECAir.Models.Cliente", null)
                        .WithMany()
                        .HasForeignKey("CorreoCliente")
                        .IsRequired()
                        .HasConstraintName("Cliente_Viaje_fk0");

                    b.HasOne("TECAir.Models.Viaje", null)
                        .WithMany()
                        .HasForeignKey("ViajeId")
                        .IsRequired()
                        .HasConstraintName("Cliente_Viaje_fk1");
                });

            modelBuilder.Entity("TECAir.Models.Asiento", b =>
                {
                    b.HasOne("TECAir.Models.Avion", "AvionMatriculaNavigation")
                        .WithMany("Asientos")
                        .HasForeignKey("AvionMatricula")
                        .IsRequired()
                        .HasConstraintName("Asiento_fk0");

                    b.HasOne("TECAir.Models.Estado", "Estado")
                        .WithMany("Asientos")
                        .HasForeignKey("EstadoId")
                        .IsRequired()
                        .HasConstraintName("Asiento_fk1");

                    b.Navigation("AvionMatriculaNavigation");

                    b.Navigation("Estado");
                });

            modelBuilder.Entity("TECAir.Models.Estudiante", b =>
                {
                    b.HasOne("TECAir.Models.Cliente", "CorreoNavigation")
                        .WithMany("Estudiantes")
                        .HasForeignKey("Correo")
                        .IsRequired()
                        .HasConstraintName("Estudiante_fk0");

                    b.HasOne("TECAir.Models.Universidad", "Universidad")
                        .WithMany("Estudiantes")
                        .HasForeignKey("UniversidadId")
                        .IsRequired()
                        .HasConstraintName("Estudiante_fk1");

                    b.Navigation("CorreoNavigation");

                    b.Navigation("Universidad");
                });

            modelBuilder.Entity("TECAir.Models.Maleta", b =>
                {
                    b.HasOne("TECAir.Models.PaseAbordaje", "Abordaje")
                        .WithMany("Maleta")
                        .HasForeignKey("AbordajeId")
                        .IsRequired()
                        .HasConstraintName("Maleta_fk0");

                    b.Navigation("Abordaje");
                });

            modelBuilder.Entity("TECAir.Models.PaseAbordaje", b =>
                {
                    b.HasOne("TECAir.Models.Cliente", "CorreoClienteNavigation")
                        .WithMany("PaseAbordajes")
                        .HasForeignKey("CorreoCliente")
                        .IsRequired()
                        .HasConstraintName("Pase_Abordaje_fk0");

                    b.HasOne("TECAir.Models.Viaje", "Viaje")
                        .WithMany("PaseAbordajes")
                        .HasForeignKey("ViajeId")
                        .IsRequired()
                        .HasConstraintName("Pase_Abordaje_fk1");

                    b.Navigation("CorreoClienteNavigation");

                    b.Navigation("Viaje");
                });

            modelBuilder.Entity("TECAir.Models.PrecioMaleta", b =>
                {
                    b.HasOne("TECAir.Models.Empleado", "EmpleadoUsuarioNavigation")
                        .WithMany("PrecioMaleta")
                        .HasForeignKey("EmpleadoUsuario")
                        .IsRequired()
                        .HasConstraintName("Precio_Maleta_fk0");

                    b.Navigation("EmpleadoUsuarioNavigation");
                });

            modelBuilder.Entity("TECAir.Models.Promocion", b =>
                {
                    b.HasOne("TECAir.Models.Viaje", "Viaje")
                        .WithOne("Promocion")
                        .HasForeignKey("TECAir.Models.Promocion", "ViajeId")
                        .IsRequired()
                        .HasConstraintName("Promocion_fk0");

                    b.Navigation("Viaje");
                });

            modelBuilder.Entity("TECAir.Models.Viaje", b =>
                {
                    b.HasOne("TECAir.Models.Empleado", "EmpleadoUsuarioNavigation")
                        .WithMany("Viajes")
                        .HasForeignKey("EmpleadoUsuario")
                        .IsRequired()
                        .HasConstraintName("Viaje_fk0");

                    b.Navigation("EmpleadoUsuarioNavigation");
                });

            modelBuilder.Entity("TECAir.Models.Vuelo", b =>
                {
                    b.HasOne("TECAir.Models.Avion", "AvionMatriculaNavigation")
                        .WithMany("Vuelos")
                        .HasForeignKey("AvionMatricula")
                        .IsRequired()
                        .HasConstraintName("Vuelo_fk1");

                    b.HasOne("TECAir.Models.Empleado", "EmpleadoUsuarioNavigation")
                        .WithMany("Vuelos")
                        .HasForeignKey("EmpleadoUsuario")
                        .IsRequired()
                        .HasConstraintName("Vuelo_fk0");

                    b.Navigation("AvionMatriculaNavigation");

                    b.Navigation("EmpleadoUsuarioNavigation");
                });

            modelBuilder.Entity("TECAir.Models.VueloAeropuerto", b =>
                {
                    b.HasOne("TECAir.Models.Aeropuerto", "Aeropuerto")
                        .WithMany("VueloAeropuertos")
                        .HasForeignKey("AeropuertoId")
                        .IsRequired()
                        .HasConstraintName("Vuelo_Aeropuerto_fk0");

                    b.HasOne("TECAir.Models.Vuelo", "VueloNumeroNavigation")
                        .WithMany("VueloAeropuertos")
                        .HasForeignKey("VueloNumero")
                        .IsRequired()
                        .HasConstraintName("Vuelo_Aeropuerto_fk1");

                    b.Navigation("Aeropuerto");

                    b.Navigation("VueloNumeroNavigation");
                });

            modelBuilder.Entity("ViajeVuelo", b =>
                {
                    b.HasOne("TECAir.Models.Vuelo", null)
                        .WithMany()
                        .HasForeignKey("NVuelo")
                        .IsRequired()
                        .HasConstraintName("Viaje_Vuelo_fk1");

                    b.HasOne("TECAir.Models.Viaje", null)
                        .WithMany()
                        .HasForeignKey("ViajeId")
                        .IsRequired()
                        .HasConstraintName("Viaje_Vuelo_fk0");
                });

            modelBuilder.Entity("TECAir.Models.Aeropuerto", b =>
                {
                    b.Navigation("VueloAeropuertos");
                });

            modelBuilder.Entity("TECAir.Models.Avion", b =>
                {
                    b.Navigation("Asientos");

                    b.Navigation("Vuelos");
                });

            modelBuilder.Entity("TECAir.Models.Cliente", b =>
                {
                    b.Navigation("Estudiantes");

                    b.Navigation("PaseAbordajes");
                });

            modelBuilder.Entity("TECAir.Models.Empleado", b =>
                {
                    b.Navigation("PrecioMaleta");

                    b.Navigation("Viajes");

                    b.Navigation("Vuelos");
                });

            modelBuilder.Entity("TECAir.Models.Estado", b =>
                {
                    b.Navigation("Asientos");
                });

            modelBuilder.Entity("TECAir.Models.PaseAbordaje", b =>
                {
                    b.Navigation("Maleta");
                });

            modelBuilder.Entity("TECAir.Models.Universidad", b =>
                {
                    b.Navigation("Estudiantes");
                });

            modelBuilder.Entity("TECAir.Models.Viaje", b =>
                {
                    b.Navigation("PaseAbordajes");

                    b.Navigation("Promocion");
                });

            modelBuilder.Entity("TECAir.Models.Vuelo", b =>
                {
                    b.Navigation("VueloAeropuertos");
                });
#pragma warning restore 612, 618
        }
    }
}
