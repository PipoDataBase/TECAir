using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Maleta
{
    public int NMaleta { get; set; }

    public int AbordajeId { get; set; }

    public decimal Peso { get; set; }

    public string Color { get; set; } = null!;

    public virtual PaseAbordaje? Abordaje { get; set; } = null!;
}
