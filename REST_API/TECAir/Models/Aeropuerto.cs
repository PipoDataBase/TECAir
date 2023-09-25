using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Aeropuerto
{
    public string Id { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public string Ubicacion { get; set; } = null!;

    public virtual ICollection<VueloAeropuerto> VueloAeropuertos { get; set; } = new List<VueloAeropuerto>();
}
