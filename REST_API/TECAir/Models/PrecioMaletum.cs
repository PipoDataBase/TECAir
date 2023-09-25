using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class PrecioMaletum
{
    public int CMaletas { get; set; }

    public decimal Costo { get; set; }

    public string EmpleadoUsuario { get; set; } = null!;

    public virtual Empleado EmpleadoUsuarioNavigation { get; set; } = null!;
}
