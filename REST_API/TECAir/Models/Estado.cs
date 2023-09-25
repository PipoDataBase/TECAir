using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Estado
{
    public int Id { get; set; }

    public string Nombre { get; set; } = null!;

    public virtual ICollection<Asiento> Asientos { get; set; } = new List<Asiento>();
}
