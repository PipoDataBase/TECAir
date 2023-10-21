using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class PaseAbordaje
{
    public int Id { get; set; }

    public string CorreoCliente { get; set; } = null!;

    public bool CheckIn { get; set; }

    public string Puerta { get; set; } = null!;

    public int ViajeId { get; set; }

    public virtual Cliente? CorreoClienteNavigation { get; set; } = null!;

    public virtual ICollection<Maleta> Maleta { get; set; } = new List<Maleta>();

    public virtual Viaje? Viaje { get; set; } = null!;
}
