using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Asiento
{
    public string Id { get; set; } = null!;

    public string AvionMatricula { get; set; } = null!;

    public int EstadoId { get; set; }

    public virtual Avion AvionMatriculaNavigation { get; set; } = null!;

    public virtual Estado Estado { get; set; } = null!;
}
