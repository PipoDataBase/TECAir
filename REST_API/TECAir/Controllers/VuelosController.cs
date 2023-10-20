using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TECAir.Models;

namespace TECAir.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VuelosController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public VuelosController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Vuelos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vuelo>>> GetVuelos()
        {
            var vuelos = await _context.Vuelos
                    .Select(v => new
                    {
                        v.NVuelo,
                        v.EmpleadoUsuario,
                        v.AvionMatricula,
                        v.FechaSalida,
                        v.FechaLlegada,
                        v.Estado,
                        v.Precio,
                        v.VueloAeropuertos
                    })
                    .ToListAsync();

            return Ok(vuelos);
        }

        // GET: api/Vuelos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vuelo>> GetVuelo(int id)
        {
            var vuelo = await _context.Vuelos
                    .Where(v => v.NVuelo == id)
                    .Select(v => new
                    {
                        v.NVuelo,
                        v.EmpleadoUsuario,
                        v.AvionMatricula,
                        v.FechaSalida,
                        v.FechaLlegada,
                        v.Estado,
                        v.Precio,
                        v.VueloAeropuertos
                    })
                    .FirstOrDefaultAsync();

            if (vuelo == null)
            {
                return NotFound();
            }

            return Ok(vuelo);
        }

        // PUT: api/Vuelos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVuelo(int id, Vuelo vueloActualizado)
        {
            if (_context.Vuelos == null)
            {
                return Problem("Entity set 'TecairDbContext.Vuelos'  is null.");
            }

            // Validar el NVuelo
            if (id != vueloActualizado.NVuelo)
            {
                return BadRequest();
            }

            // Validar que el Avion existe
            var avionExistente = await _context.Avions.FindAsync(vueloActualizado.AvionMatricula);
            if (avionExistente == null)
            {
                return BadRequest("El avión especificado no existe.");
            }

            // Validar que el Empleado existe
            var empleadoExistente = await _context.Empleados.FindAsync(vueloActualizado.EmpleadoUsuario);
            if (empleadoExistente == null)
            {
                return BadRequest("El empleado especificado no existe.");
            }

            var vuelo = await _context.Vuelos.FindAsync(id);
            if (vuelo == null)
            {
                return NotFound();
            }

            try
            {
                // Asignar el avión y empleado existente a las propiedades de navegación
                vuelo.AvionMatriculaNavigation = avionExistente;
                vuelo.EmpleadoUsuarioNavigation = empleadoExistente;

                vuelo.EmpleadoUsuario = vueloActualizado.EmpleadoUsuario;
                vuelo.AvionMatricula = vueloActualizado.AvionMatricula;
                vuelo.FechaSalida = vueloActualizado.FechaSalida;
                vuelo.FechaLlegada = vueloActualizado.FechaLlegada;
                vuelo.Estado = vueloActualizado.Estado;
                vuelo.Precio = vueloActualizado.Precio;
                await _context.SaveChangesAsync();

                return Ok(vuelo.NVuelo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // POST: api/Vuelos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Vuelo>> PostVuelo(Vuelo vuelo)
        {
            if (_context.Vuelos == null)
            {
                return Problem("Entity set 'TecairDbContext.Vuelos'  is null.");
            }

            // Validar que el Avion existe
            var avionExistente = await _context.Avions.FindAsync(vuelo.AvionMatricula);
            if (avionExistente == null)
            {
                return BadRequest("El avión especificado no existe.");
            }

            // Validar que el Empleado existe
            var empleadoExistente = await _context.Empleados.FindAsync(vuelo.EmpleadoUsuario);
            if (empleadoExistente == null)
            {
                return BadRequest("El empleado especificado no existe.");
            }

            try
            {
                // Asignar el avión y empleado existente a las propiedades de navegación
                vuelo.AvionMatriculaNavigation = avionExistente;
                vuelo.EmpleadoUsuarioNavigation = empleadoExistente;

                // Asignar consecutivo de numero de vuelo
                try
                {
                    int lastNVuelo = await _context.Vuelos.MaxAsync(v => v.NVuelo);
                    vuelo.NVuelo = lastNVuelo + 1;
                }
                catch
                {
                    vuelo.NVuelo = 1;
                }

                // Agregar el vuelo a la base de datos
                _context.Vuelos.Add(vuelo);
                await _context.SaveChangesAsync();

                _context.Database.ExecuteSqlRaw("CALL sp_crear_asiento_vuelo({0}, {1})", vuelo.NVuelo, vuelo.AvionMatricula);

                return Ok(vuelo.NVuelo);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // DELETE: api/Vuelos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVuelo(int id)
        {
            if (_context.Vuelos == null)
            {
                return NotFound();
            }
            var vuelo = await _context.Vuelos.FindAsync(id);
            if (vuelo == null)
            {
                return NotFound();
            }

            // Obtener los asientos asociados al vuelo
            var asientos = await _context.Asientos
                .Where(a => a.NVuelo == vuelo.NVuelo)
                .ToListAsync();

            // Eliminar los asientos asociados
            _context.Asientos.RemoveRange(asientos);

            // Obtener los VueloAeropuertos asociados al vuelo
            var vueloAeropuertos = await _context.VueloAeropuertos
                .Where(va => va.VueloNumero == vuelo.NVuelo)
                .ToListAsync();

            // Eliminar los VueloAeropuertos asociados
            _context.VueloAeropuertos.RemoveRange(vueloAeropuertos);

            // Eliminar el vuelo
            _context.Vuelos.Remove(vuelo);

            await _context.SaveChangesAsync();

            return Ok(1);
        }

        private bool VueloExists(int id)
        {
            return (_context.Vuelos?.Any(e => e.NVuelo == id)).GetValueOrDefault();
        }

        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { ReferenceHandler = ReferenceHandler.Preserve };
    }
}
