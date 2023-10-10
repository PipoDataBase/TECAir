using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class VueloAeropuerto
{
    public string AeropuertoId { get; set; } = null!;

    public int VueloNumero { get; set; }

    public string Tipo { get; set; } = null!;

    public virtual Aeropuerto? Aeropuerto { get; set; } = null!;

    public virtual Vuelo? VueloNumeroNavigation { get; set; } = null!;
}
