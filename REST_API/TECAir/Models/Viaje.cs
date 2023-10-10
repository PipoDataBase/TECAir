using System;
using System.Collections.Generic;

namespace TECAir.Models;

public partial class Viaje
{
    public int Id { get; set; }

    public string EmpleadoUsuario { get; set; } = null!;

    public string Origen { get; set; } = null!;

    public string Destino { get; set; } = null!;

    public DateTime FechaSalida { get; set; }

    public DateTime FechaLlegada { get; set; }

    public decimal Precio { get; set; }

    public virtual Empleado? EmpleadoUsuarioNavigation { get; set; } = null!;

    public virtual ICollection<PaseAbordaje> PaseAbordajes { get; set; } = new List<PaseAbordaje>();

    public virtual Promocion? Promocion { get; set; }

    public virtual ICollection<ViajeVuelo> ViajeVuelos { get; set; } = new List<ViajeVuelo>();

    public virtual ICollection<Cliente> CorreoClientes { get; set; } = new List<Cliente>();

    public virtual ICollection<Vuelo> NVuelos { get; set; } = new List<Vuelo>();
}
