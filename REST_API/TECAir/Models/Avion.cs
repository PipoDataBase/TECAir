using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Avion
{
    public string Matricula { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Asiento> Asientos { get; set; } = new List<Asiento>();

    public virtual ICollection<Vuelo> Vuelos { get; set; } = new List<Vuelo>();
}
