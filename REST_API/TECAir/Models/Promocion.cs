using System;
using System.Collections.Generic;
using NpgsqlTypes;

namespace TECAir.Models;

public partial class Promocion
{
    public int ViajeId { get; set; }

    public decimal Precio { get; set; }

    public DateOnly FechaInicio { get; set; }

    public DateOnly FechaVencimiento { get; set; }

    public string? ImagenPath { get; set; }

    public virtual Viaje Viaje { get; set; } = null!;
}
