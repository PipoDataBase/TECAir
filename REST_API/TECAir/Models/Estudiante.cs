using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Estudiante
{
    public int Carnet { get; set; }

    public string Correo { get; set; } = null!;

    public int UniversidadId { get; set; }

    public decimal Millas { get; set; }

    public virtual Cliente? CorreoNavigation { get; set; } = null!;

    public virtual Universidad? Universidad { get; set; } = null!;
}
