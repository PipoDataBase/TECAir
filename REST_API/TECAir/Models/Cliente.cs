using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Cliente
{
    public string Correo { get; set; } = null!;

    public int Teléfono { get; set; }

    public string Nombre { get; set; } = null!;

    public string Apellido1 { get; set; } = null!;

    public string? Apellido2 { get; set; }

    public virtual ICollection<Estudiante> Estudiantes { get; set; } = new List<Estudiante>();

    public virtual ICollection<PaseAbordaje> PaseAbordajes { get; set; } = new List<PaseAbordaje>();

    public virtual ICollection<Viaje> Viajes { get; set; } = new List<Viaje>();
}
