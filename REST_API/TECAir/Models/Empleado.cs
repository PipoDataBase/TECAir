using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Empleado
{
    public string Usuario { get; set; } = null!;

    public string Contraseña { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Apellido1 { get; set; } = null!;

    public string? Apellido2 { get; set; }

    public virtual ICollection<PrecioMaleta> PrecioMaleta { get; set; } = new List<PrecioMaleta>();

    public virtual ICollection<Viaje> Viajes { get; set; } = new List<Viaje>();

    public virtual ICollection<Vuelo> Vuelos { get; set; } = new List<Vuelo>();
}
