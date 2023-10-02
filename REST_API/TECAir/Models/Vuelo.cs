using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Vuelo
{
    public int NVuelo { get; set; }

    public string EmpleadoUsuario { get; set; } = null!;

    public string AvionMatricula { get; set; } = null!;

    public DateTime FechaSalida { get; set; }

    public DateTime FechaLlegada { get; set; }

    public bool Estado { get; set; }

    public decimal Precio { get; set; }

    public virtual Avion? AvionMatriculaNavigation { get; set; } = null!;

    public virtual Empleado? EmpleadoUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<VueloAeropuerto> VueloAeropuertos { get; set; } = new List<VueloAeropuerto>();

    public virtual ICollection<Viaje> Viajes { get; set; } = new List<Viaje>();
}
