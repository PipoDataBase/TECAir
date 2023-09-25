using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Universidad
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public string Ubicación { get; set; } = null!;

    public virtual ICollection<Estudiante> Estudiantes { get; set; } = new List<Estudiante>();
}
