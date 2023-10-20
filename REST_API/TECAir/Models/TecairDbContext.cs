using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace TECAir.Models;

public partial class TecairDbContext : DbContext
{
    public TecairDbContext()
    {
    }

    public TecairDbContext(DbContextOptions<TecairDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Aeropuerto> Aeropuertos { get; set; }

    public virtual DbSet<Asiento> Asientos { get; set; }

    public virtual DbSet<Avion> Avions { get; set; }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Empleado> Empleados { get; set; }

    public virtual DbSet<Estado> Estados { get; set; }

    public virtual DbSet<Estudiante> Estudiantes { get; set; }

    public virtual DbSet<Maleta> Maleta { get; set; }

    public virtual DbSet<PaseAbordaje> PaseAbordajes { get; set; }

    public virtual DbSet<PrecioMaleta> PrecioMaleta { get; set; }

    public virtual DbSet<Promocion> Promocions { get; set; }

    public virtual DbSet<Universidad> Universidads { get; set; }

    public virtual DbSet<Viaje> Viajes { get; set; }

    public virtual DbSet<ViajeVuelo> ViajeVuelos { get; set; }

    public virtual DbSet<Vuelo> Vuelos { get; set; }

    public virtual DbSet<VueloAeropuerto> VueloAeropuertos { get; set; }
    /*
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Database=TECAirDB;Username=postgres;Password=2002");
    */
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Aeropuerto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Aeropuerto_pk");

            entity.ToTable("Aeropuerto");

            entity.Property(e => e.Id).HasMaxLength(4);
            entity.Property(e => e.Nombre).HasMaxLength(100);
            entity.Property(e => e.Ubicacion).HasMaxLength(50);
        });

        modelBuilder.Entity<Asiento>(entity =>
        {
            entity.HasKey(e => new { e.Id, e.NVuelo, e.AvionMatricula }).HasName("Asiento_pk");

            entity.ToTable("Asiento");

            entity.Property(e => e.Id)
                .HasMaxLength(5)
                .HasColumnName("id");
            entity.Property(e => e.AvionMatricula)
                .HasMaxLength(10)
                .HasColumnName("Avion_Matricula");
            entity.Property(e => e.EstadoId).HasColumnName("Estado_Id");
            entity.Property(e => e.NVuelo)
                .ValueGeneratedNever()
                .HasColumnName("N_Vuelo");

            entity.HasOne(d => d.AvionMatriculaNavigation).WithMany(p => p.Asientos)
                .HasForeignKey(d => d.AvionMatricula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Asiento_fk0");

            entity.HasOne(d => d.Estado).WithMany(p => p.Asientos)
                .HasForeignKey(d => d.EstadoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Asiento_fk1");

            entity.HasOne(d => d.Vuelo).WithMany(p => p.Asientos)
                .HasForeignKey(d => d.NVuelo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Asiento_fk2");
        });

        modelBuilder.Entity<Avion>(entity =>
        {
            entity.HasKey(e => e.Matricula).HasName("Avion_pk");

            entity.ToTable("Avion");

            entity.Property(e => e.Matricula).HasMaxLength(10);
            entity.Property(e => e.Nombre).HasMaxLength(20);
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Correo).HasName("Cliente_pk");

            entity.ToTable("Cliente");

            entity.Property(e => e.Correo).HasMaxLength(20);
            entity.Property(e => e.Apellido1).HasMaxLength(20);
            entity.Property(e => e.Apellido2).HasMaxLength(20);
            entity.Property(e => e.Nombre).HasMaxLength(20);

            entity.HasMany(d => d.Viajes).WithMany(p => p.CorreoClientes)
                .UsingEntity<Dictionary<string, object>>(
                    "ClienteViaje",
                    r => r.HasOne<Viaje>().WithMany()
                        .HasForeignKey("ViajeId")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Cliente_Viaje_fk1"),
                    l => l.HasOne<Cliente>().WithMany()
                        .HasForeignKey("CorreoCliente")
                        .OnDelete(DeleteBehavior.ClientSetNull)
                        .HasConstraintName("Cliente_Viaje_fk0"),
                    j =>
                    {
                        j.HasKey("CorreoCliente", "ViajeId").HasName("Cliente_Viaje_pk");
                        j.ToTable("Cliente_Viaje");
                        j.IndexerProperty<string>("CorreoCliente")
                            .HasMaxLength(20)
                            .HasColumnName("Correo_Cliente");
                        j.IndexerProperty<int>("ViajeId").HasColumnName("Viaje_Id");
                    });
        });

        modelBuilder.Entity<Empleado>(entity =>
        {
            entity.HasKey(e => e.Usuario).HasName("Empleado_pk");

            entity.ToTable("Empleado");

            entity.Property(e => e.Usuario).HasMaxLength(12);
            entity.Property(e => e.Apellido1).HasMaxLength(20);
            entity.Property(e => e.Apellido2).HasMaxLength(20);
            entity.Property(e => e.Contraseña).HasMaxLength(20);
            entity.Property(e => e.Nombre).HasMaxLength(20);
        });

        modelBuilder.Entity<Estado>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Estados_pk");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Nombre).HasMaxLength(10);
        });

        modelBuilder.Entity<Estudiante>(entity =>
        {
            entity.HasKey(e => e.Carnet).HasName("Estudiante_pk");

            entity.ToTable("Estudiante");

            entity.Property(e => e.Carnet).ValueGeneratedNever();
            entity.Property(e => e.Correo).HasMaxLength(20);
            entity.Property(e => e.Millas).HasPrecision(6, 2);
            entity.Property(e => e.UniversidadId).HasColumnName("Universidad_Id");

            entity.HasOne(d => d.CorreoNavigation).WithMany(p => p.Estudiantes)
                .HasForeignKey(d => d.Correo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Estudiante_fk0");

            entity.HasOne(d => d.Universidad).WithMany(p => p.Estudiantes)
                .HasForeignKey(d => d.UniversidadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Estudiante_fk1");
        });

        modelBuilder.Entity<Maleta>(entity =>
        {
            entity.HasKey(e => e.NMaleta).HasName("Maleta_pk");

            entity.Property(e => e.NMaleta)
                .ValueGeneratedNever()
                .HasColumnName("N_Maleta");
            entity.Property(e => e.AbordajeId).HasColumnName("Abordaje_Id");
            entity.Property(e => e.Color).HasMaxLength(10);
            entity.Property(e => e.Peso).HasPrecision(3, 2);

            entity.HasOne(d => d.Abordaje).WithMany(p => p.Maleta)
                .HasForeignKey(d => d.AbordajeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Maleta_fk0");
        });

        modelBuilder.Entity<PaseAbordaje>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Pase_Abordaje_pk");

            entity.ToTable("Pase_Abordaje");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CheckIn).HasColumnName("Check_In");
            entity.Property(e => e.CorreoCliente)
                .HasMaxLength(20)
                .HasColumnName("Correo_Cliente");
            entity.Property(e => e.Puerta).HasMaxLength(10);
            entity.Property(e => e.ViajeId).HasColumnName("Viaje_Id");

            entity.HasOne(d => d.CorreoClienteNavigation).WithMany(p => p.PaseAbordajes)
                .HasForeignKey(d => d.CorreoCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Pase_Abordaje_fk0");

            entity.HasOne(d => d.Viaje).WithMany(p => p.PaseAbordajes)
                .HasForeignKey(d => d.ViajeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Pase_Abordaje_fk1");
        });

        modelBuilder.Entity<PrecioMaleta>(entity =>
        {
            entity.HasKey(e => e.CMaletas).HasName("Precio_Maleta_pk");

            entity.ToTable("Precio_Maleta");

            entity.Property(e => e.CMaletas)
                .ValueGeneratedNever()
                .HasColumnName("C_Maletas");
            entity.Property(e => e.Costo).HasColumnType("money");
            entity.Property(e => e.EmpleadoUsuario)
                .HasMaxLength(12)
                .HasColumnName("Empleado_Usuario");

            entity.HasOne(d => d.EmpleadoUsuarioNavigation).WithMany(p => p.PrecioMaleta)
                .HasForeignKey(d => d.EmpleadoUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Precio_Maleta_fk0");
        });

        modelBuilder.Entity<Promocion>(entity =>
        {
            entity.HasKey(e => e.ViajeId).HasName("Promocion_pk");

            entity.ToTable("Promocion");

            entity.Property(e => e.ViajeId)
                .ValueGeneratedNever()
                .HasColumnName("Viaje_Id");
            entity.Property(e => e.FechaInicio).HasColumnName("Fecha_Inicio");
            entity.Property(e => e.FechaVencimiento).HasColumnName("Fecha_Vencimiento");
            entity.Property(e => e.ImagenPath).HasColumnName("Imagen_Path");
            entity.Property(e => e.Precio).HasColumnType("money");

            entity.HasOne(d => d.Viaje).WithOne(p => p.Promocion)
                .HasForeignKey<Promocion>(d => d.ViajeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Promocion_fk0");
        });

        modelBuilder.Entity<Universidad>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Universidad_pk");

            entity.ToTable("Universidad");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Nombre).HasMaxLength(50);
            entity.Property(e => e.Ubicacion).HasMaxLength(50);
        });

        modelBuilder.Entity<Viaje>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("Viaje_pk");

            entity.ToTable("Viaje");

            entity.Property(e => e.Id)
                .ValueGeneratedNever()
                .HasColumnName("id");
            entity.Property(e => e.Destino).HasMaxLength(4);
            entity.Property(e => e.EmpleadoUsuario)
                .HasMaxLength(12)
                .HasColumnName("Empleado_Usuario");
            entity.Property(e => e.FechaLlegada)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("Fecha_Llegada");
            entity.Property(e => e.FechaSalida)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("Fecha_Salida");
            entity.Property(e => e.Origen).HasMaxLength(4);
            entity.Property(e => e.Precio).HasColumnType("money");

            entity.HasOne(d => d.EmpleadoUsuarioNavigation).WithMany(p => p.Viajes)
                .HasForeignKey(d => d.EmpleadoUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Viaje_fk0");
        });

        modelBuilder.Entity<ViajeVuelo>(entity =>
        {
            entity.HasKey(e => new { e.ViajeId, e.NVuelo }).HasName("Viaje_Vuelo_pk");

            entity.ToTable("Viaje_Vuelo");

            entity.Property(e => e.ViajeId).HasColumnName("Viaje_Id");
            entity.Property(e => e.NVuelo).HasColumnName("N_Vuelo");

            entity.HasOne(d => d.NVueloNavigation).WithMany(p => p.ViajeVuelos)
                .HasForeignKey(d => d.NVuelo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Viaje_Vuelo_fk1");

            entity.HasOne(d => d.Viaje).WithMany(p => p.ViajeVuelos)
                .HasForeignKey(d => d.ViajeId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Viaje_Vuelo_fk0");
        });

        modelBuilder.Entity<Vuelo>(entity =>
        {
            entity.HasKey(e => e.NVuelo).HasName("Vuelo_pk");

            entity.ToTable("Vuelo");

            entity.Property(e => e.NVuelo)
                .ValueGeneratedNever()
                .HasColumnName("N_Vuelo");
            entity.Property(e => e.AvionMatricula)
                .HasMaxLength(10)
                .HasColumnName("Avion_Matricula");
            entity.Property(e => e.EmpleadoUsuario)
                .HasMaxLength(12)
                .HasColumnName("Empleado_Usuario");
            entity.Property(e => e.FechaLlegada)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("Fecha_Llegada");
            entity.Property(e => e.FechaSalida)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("Fecha_Salida");
            entity.Property(e => e.Precio).HasColumnType("money");

            entity.HasOne(d => d.AvionMatriculaNavigation).WithMany(p => p.Vuelos)
                .HasForeignKey(d => d.AvionMatricula)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Vuelo_fk1");

            entity.HasOne(d => d.EmpleadoUsuarioNavigation).WithMany(p => p.Vuelos)
                .HasForeignKey(d => d.EmpleadoUsuario)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Vuelo_fk0");
        });

        modelBuilder.Entity<VueloAeropuerto>(entity =>
        {
            entity.HasKey(e => new { e.AeropuertoId, e.VueloNumero }).HasName("Vuelo_Aeropuerto_pk");

            entity.ToTable("Vuelo_Aeropuerto");

            entity.Property(e => e.AeropuertoId)
                .HasMaxLength(4)
                .HasColumnName("Aeropuerto_Id");
            entity.Property(e => e.VueloNumero).HasColumnName("Vuelo_Numero");
            entity.Property(e => e.Tipo).HasMaxLength(10);

            entity.HasOne(d => d.Aeropuerto).WithMany(p => p.VueloAeropuertos)
                .HasForeignKey(d => d.AeropuertoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Vuelo_Aeropuerto_fk0");

            entity.HasOne(d => d.VueloNumeroNavigation).WithMany(p => p.VueloAeropuertos)
                .HasForeignKey(d => d.VueloNumero)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("Vuelo_Aeropuerto_fk1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
