using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TECAir.Models;

namespace TECAir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ViajesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public ViajesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Viajes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Viaje>>> GetViajes()
        {
            var viajes = await _context.Viajes
                    .Select(v => new
                    {
                        v.Id,
                        v.EmpleadoUsuario,
                        v.Origen,
                        v.Destino,
                        v.FechaSalida,
                        v.FechaLlegada,
                        v.Precio,
                        v.ViajeVuelos
                    })
                    .ToListAsync();

            List<Viaje> viajesTR = new List<Viaje>();

            foreach (var viaje in viajes)
            {
                Viaje viajeTR = new Viaje();
                viajeTR.Id = viaje.Id;
                viajeTR.EmpleadoUsuario = viaje.EmpleadoUsuario;
                viajeTR.ViajeVuelos = viaje.ViajeVuelos;

                if (viaje.ViajeVuelos.Count == 1)
                {
                    var vuelo = await _context.Vuelos
                        .Where(v => v.NVuelo == viaje.ViajeVuelos.First().NVuelo)
                        .Select(v => new
                        {
                            v.FechaSalida,
                            v.FechaLlegada,
                            v.Estado,
                            v.Precio,
                            v.VueloAeropuertos
                        })
                        .FirstOrDefaultAsync();

                    if (vuelo != null)
                    {
                        if (vuelo.VueloAeropuertos.First().Tipo == "Origen") viajeTR.Origen = vuelo.VueloAeropuertos.First().AeropuertoId;
                        if (vuelo.VueloAeropuertos.Last().Tipo == "Origen") viajeTR.Origen = vuelo.VueloAeropuertos.Last().AeropuertoId;
                        if (vuelo.VueloAeropuertos.First().Tipo == "Destino") viajeTR.Destino = vuelo.VueloAeropuertos.First().AeropuertoId;
                        if (vuelo.VueloAeropuertos.Last().Tipo == "Destino") viajeTR.Destino = vuelo.VueloAeropuertos.Last().AeropuertoId;
                        viajeTR.FechaSalida = vuelo.FechaSalida;
                        viajeTR.FechaLlegada = vuelo.FechaLlegada;
                        viajeTR.Precio = vuelo.Precio;
                    }
                }
                else
                {
                    var primero = new ViajeVuelo();
                    var ultimo = new ViajeVuelo();

                    foreach (var viajeVuelo in viaje.ViajeVuelos)
                    {
                        if (viajeVuelo.Escala == 1) primero = viajeVuelo;
                        if (viajeVuelo.Escala == viaje.ViajeVuelos.Count) ultimo = viajeVuelo;
                    }

                    var primerVuelo = await _context.Vuelos
                        .Where(v => v.NVuelo == primero.NVuelo)
                        .Select(v => new
                        {
                            v.FechaSalida,
                            v.FechaLlegada,
                            v.Estado,
                            v.Precio,
                            v.VueloAeropuertos
                        })
                        .FirstOrDefaultAsync();

                    var ultimoVuelo = await _context.Vuelos
                        .Where(v => v.NVuelo == ultimo.NVuelo)
                        .Select(v => new
                        {
                            v.FechaSalida,
                            v.FechaLlegada,
                            v.Estado,
                            v.Precio,
                            v.VueloAeropuertos
                        })
                        .FirstOrDefaultAsync();

                    if (primerVuelo != null && ultimoVuelo != null)
                    {
                        if (primerVuelo.VueloAeropuertos.First().Tipo == "Origen") viajeTR.Origen = primerVuelo.VueloAeropuertos.First().AeropuertoId;
                        if (primerVuelo.VueloAeropuertos.Last().Tipo == "Origen") viajeTR.Origen = primerVuelo.VueloAeropuertos.Last().AeropuertoId;
                        if (ultimoVuelo.VueloAeropuertos.First().Tipo == "Destino") viajeTR.Destino = ultimoVuelo.VueloAeropuertos.First().AeropuertoId;
                        if (ultimoVuelo.VueloAeropuertos.Last().Tipo == "Destino") viajeTR.Destino = ultimoVuelo.VueloAeropuertos.Last().AeropuertoId;
                        viajeTR.FechaSalida = primerVuelo.FechaSalida;
                        viajeTR.FechaLlegada = ultimoVuelo.FechaLlegada;

                        decimal Precio = 0;
                        foreach (var viajeVuelo in viaje.ViajeVuelos)
                        {
                            var vuelo = await _context.Vuelos
                            .Where(v => v.NVuelo == viajeVuelo.NVuelo)
                            .Select(v => new
                            {
                                v.Precio
                            })
                            .FirstOrDefaultAsync();

                            if (vuelo != null)
                            {
                                Precio += vuelo.Precio;
                            }
                        }
                        viajeTR.Precio = Precio;
                    }
                }
                viajesTR.Add(viajeTR);
            }

            return Ok(viajesTR);
        }

        // GET: api/Viajes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Viaje>> GetViaje(int id)
        {
          if (_context.Viajes == null)
          {
              return NotFound();
          }
            var viaje = await _context.Viajes.FindAsync(id);

            if (viaje == null)
            {
                return NotFound();
            }

            return viaje;
        }

        // PUT: api/Viajes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutViaje(int id, Viaje viaje)
        {
            if (id != viaje.Id)
            {
                return BadRequest();
            }

            _context.Entry(viaje).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViajeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Viajes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Viaje>> PostViaje(Viaje viaje)
        {
            if (_context.Viajes == null)
            {
                return Problem("Entity set 'TecairDbContext.Viajes'  is null.");
            }

            // Validar que el Empleado existe
            var empleadoExistente = await _context.Empleados.FindAsync(viaje.EmpleadoUsuario);
            if (empleadoExistente == null)
            {
                return BadRequest("El empleado especificado no existe.");
            }

            try
            {
                // Asignar el empleado existente a las propiedades de navegación
                viaje.EmpleadoUsuarioNavigation = empleadoExistente;

                // Asignar id consecutivo de viaje
                try
                {
                    int lastId = await _context.Viajes.MaxAsync(v => v.Id);
                    viaje.Id = lastId + 1;
                }
                catch
                {
                    viaje.Id = 1;
                }

                // Agregar el viaje a la base de datos
                _context.Viajes.Add(viaje);
                await _context.SaveChangesAsync();

                return Ok(viaje.Id);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // DELETE: api/Viajes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteViaje(int id)
        {
            if (_context.Viajes == null)
            {
                return NotFound();
            }
            var viaje = await _context.Viajes.FindAsync(id);
            if (viaje == null)
            {
                return NotFound();
            }

            // Obtener los ViajeVuelos asociados al viaje
            var viajeVuelos = await _context.ViajeVuelos
                .Where(vv => vv.ViajeId == viaje.Id)
                .ToListAsync();

            // Eliminar los ViajeVuelos asociados
            _context.ViajeVuelos.RemoveRange(viajeVuelos);

            // Eliminar el vuelo
            _context.Viajes.Remove(viaje);

            await _context.SaveChangesAsync();

            return Ok(1);
        }

        private bool ViajeExists(int id)
        {
            return (_context.Viajes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
