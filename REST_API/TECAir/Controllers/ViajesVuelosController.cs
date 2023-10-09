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
    public class ViajesVuelosController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public ViajesVuelosController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/ViajesVuelos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ViajeVuelo>>> GetViajeVuelos()
        {
          if (_context.ViajeVuelos == null)
          {
              return NotFound();
          }
            return await _context.ViajeVuelos.ToListAsync();
        }

        // GET: api/ViajesVuelos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ViajeVuelo>> GetViajeVuelo(int id)
        {
          if (_context.ViajeVuelos == null)
          {
              return NotFound();
          }
            var viajeVuelo = await _context.ViajeVuelos.FindAsync(id);

            if (viajeVuelo == null)
            {
                return NotFound();
            }

            return viajeVuelo;
        }

        // PUT: api/ViajesVuelos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutViajeVuelo(int id, ViajeVuelo viajeVuelo)
        {
            if (id != viajeVuelo.ViajeId)
            {
                return BadRequest();
            }

            _context.Entry(viajeVuelo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ViajeVueloExists(id))
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

        // POST: api/ViajesVuelos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ViajeVuelo>> PostViajeVuelo(ViajeVuelo viajeVuelo)
        {
            if (_context.ViajeVuelos == null)
            {
                return Problem("Entity set 'TecairDbContext.ViajeVuelos'  is null.");
            }

            // Validar que el Viaje existe
            var viajeExistente = await _context.Viajes.FindAsync(viajeVuelo.ViajeId);
            if (viajeExistente == null)
            {
                return BadRequest("El avión especificado no existe.");
            }

            // Validar que el Vuelo existe
            var vueloExistente = await _context.Vuelos.FindAsync(viajeVuelo.NVuelo);
            if (vueloExistente == null)
            {
                return BadRequest("El vuelp especificado no existe.");
            }

            try
            {
                // Asignar el viaje y vuelo existente a las propiedades de navegación
                viajeVuelo.Viaje = viajeExistente;
                viajeVuelo.NVueloNavigation = vueloExistente;

                // Agregar el ViajeVuelo a la base de datos
                _context.ViajeVuelos.Add(viajeVuelo);
                await _context.SaveChangesAsync();

                try
                {
                    // Agregar viajeVuelo en su especifico viaje
                    var viaje = await _context.Viajes.FindAsync(viajeVuelo.ViajeId);
                    if (viaje != null)
                    {
                        viaje.ViajeVuelos.Add(viajeVuelo);
                    }
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest("No se pudo almacenar vueloAeropuerto en Vuelos.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }

            return Ok(JsonSerializer.Serialize(viajeVuelo, jsonSerializerOptions));
        }

        // DELETE: api/ViajesVuelos/5/1
        [HttpDelete("{ViajeId}/{NVuelo}")]
        public async Task<IActionResult> DeleteViajeVuelo(int ViajeId, int NVuelo)
        {
            if (_context.ViajeVuelos == null)
            {
                return NotFound();
            }
            var viajeVuelo = await _context.ViajeVuelos.FindAsync(ViajeId, NVuelo);
            if (viajeVuelo == null)
            {
                return NotFound();
            }

            _context.ViajeVuelos.Remove(viajeVuelo);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ViajeVueloExists(int id)
        {
            return (_context.ViajeVuelos?.Any(e => e.ViajeId == id)).GetValueOrDefault();
        }

        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { ReferenceHandler = ReferenceHandler.Preserve };
    }
}
