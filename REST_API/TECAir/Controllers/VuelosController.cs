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
          if (_context.Vuelos == null)
          {
              return NotFound();
          }
            return await _context.Vuelos.ToListAsync();
        }

        // GET: api/Vuelos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Vuelo>> GetVuelo(int id)
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

            return vuelo;
        }

        // PUT: api/Vuelos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVuelo(int id, Vuelo vuelo)
        {
            if (id != vuelo.NVuelo)
            {
                return BadRequest();
            }

            _context.Entry(vuelo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VueloExists(id))
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

            _context.Vuelos.Remove(vuelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VueloExists(int id)
        {
            return (_context.Vuelos?.Any(e => e.NVuelo == id)).GetValueOrDefault();
        }

        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { ReferenceHandler = ReferenceHandler.Preserve };
    }
}
