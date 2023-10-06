using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class ViajeVuelo
{
    public int ViajeId { get; set; }

    public int NVuelo { get; set; }

    public int? Escala { get; set; }

    public virtual Vuelo NVueloNavigation { get; set; } = null!;

    public virtual Viaje Viaje { get; set; } = null!;
}