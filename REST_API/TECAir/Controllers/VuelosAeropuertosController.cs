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
    public class VuelosAeropuertosController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public VuelosAeropuertosController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/VuelosAeropuertos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<VueloAeropuerto>>> GetVueloAeropuertos()
        {
          if (_context.VueloAeropuertos == null)
          {
              return NotFound();
          }
            return await _context.VueloAeropuertos.ToListAsync();
        }

        // GET: api/VuelosAeropuertos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<VueloAeropuerto>> GetVueloAeropuerto(string id)
        {
            if (_context.VueloAeropuertos == null)
            {
                return NotFound();
            }

            var vueloAeropuerto = await _context.VueloAeropuertos.FindAsync(id);
            if (vueloAeropuerto == null)
            {
                return NotFound();
            }

            return Ok(vueloAeropuerto);
        }

        // PUT: api/VuelosAeropuertos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVueloAeropuerto(string id, VueloAeropuerto vueloAeropuertoActualizado)
        {
            if (_context.VueloAeropuertos == null)
            {
                return Problem("Entity set 'TecairDbContext.VueloAeropuertos'  is null.");
            }

            // Validar el AeropuertoId
            if (id != vueloAeropuertoActualizado.AeropuertoId)
            {
                return BadRequest();
            }

            // Validar que el Aeropuerto existe
            var aeropuertoExistente = await _context.Aeropuertos.FindAsync(vueloAeropuertoActualizado.AeropuertoId);
            if (aeropuertoExistente == null)
            {
                return BadRequest("El avión especificado no existe.");
            }

            // Validar que el Vuelo existe
            var vueloExistente = await _context.Vuelos.FindAsync(vueloAeropuertoActualizado.VueloNumero);
            if (vueloExistente == null)
            {
                return BadRequest("El empleado especificado no existe.");
            }

            // Obtener los VueloAeropuertos asociados al vuelo
            var vueloAeropuertos = await _context.VueloAeropuertos
                .Where(va => va.VueloNumero == vueloExistente.NVuelo)
                .ToListAsync();

            // Eliminar los VueloAeropuertos asociado
            foreach (var va in vueloAeropuertos)
            {
                if (va.Tipo == vueloAeropuertoActualizado.Tipo)
                {
                    _context.VueloAeropuertos.Remove(va);
                }
            }

            var vueloAeropuerto = new VueloAeropuerto();
            try
            {
                // Asignar el aeropuerto y vuelo existente a las propiedades de navegación
                vueloAeropuerto.Aeropuerto = aeropuertoExistente;
                vueloAeropuerto.VueloNumeroNavigation = vueloExistente;

                vueloAeropuerto.AeropuertoId = vueloAeropuertoActualizado.AeropuertoId;
                vueloAeropuerto.VueloNumero = vueloAeropuertoActualizado.VueloNumero;
                vueloAeropuerto.Tipo = vueloAeropuertoActualizado.Tipo;

                // Agregar el VueloAeropuerto a la base de datos
                _context.VueloAeropuertos.Add(vueloAeropuerto);
                await _context.SaveChangesAsync();

                try
                {
                    // Agregar vueloAeropuerto en su especifico vuelo
                    var vuelo = await _context.Vuelos.FindAsync(vueloAeropuerto.VueloNumero);
                    if (vuelo != null)
                    {
                        vuelo.VueloAeropuertos.Add(vueloAeropuerto);
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

            return Ok(JsonSerializer.Serialize(vueloAeropuerto, jsonSerializerOptions));
        }

        // POST: api/VuelosAeropuertos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<VueloAeropuerto>> PostVueloAeropuerto(VueloAeropuerto vueloAeropuerto)
        {
            if (_context.VueloAeropuertos == null)
            {
                return Problem("Entity set 'TecairDbContext.VueloAeropuertos'  is null.");
            }

            // Validar que el Aeropuerto existe
            var aeropuertoExistente = await _context.Aeropuertos.FindAsync(vueloAeropuerto.AeropuertoId);
            if (aeropuertoExistente == null)
            {
                return BadRequest("El avión especificado no existe.");
            }

            // Validar que el Vuelo existe
            var vueloExistente = await _context.Vuelos.FindAsync(vueloAeropuerto.VueloNumero);
            if (vueloExistente == null)
            {
                return BadRequest("El vuelo especificado no existe.");
            }

            try
            {
                // Asignar el aeropuerto y vuelo existente a las propiedades de navegación
                vueloAeropuerto.Aeropuerto = aeropuertoExistente;
                vueloAeropuerto.VueloNumeroNavigation = vueloExistente;

                // Agregar el VueloAeropuerto a la base de datos
                _context.VueloAeropuertos.Add(vueloAeropuerto);
                await _context.SaveChangesAsync();

                try
                {
                    // Agregar vueloAeropuerto en su especifico vuelo
                    var vuelo = await _context.Vuelos.FindAsync(vueloAeropuerto.VueloNumero);
                    if (vuelo != null)
                    {
                        vuelo.VueloAeropuertos.Add(vueloAeropuerto);
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

            return Ok(JsonSerializer.Serialize(vueloAeropuerto, jsonSerializerOptions));
        }

        // DELETE: api/VuelosAeropuertos/SJO/1
        [HttpDelete("{AeropuertoId}/{VueloNumero}")]
        public async Task<IActionResult> DeleteVueloAeropuerto(string AeropuertoId, int VueloNumero)
        {
            if (_context.VueloAeropuertos == null)
            {
                return NotFound();
            }
            var vueloAeropuerto = await _context.VueloAeropuertos.FindAsync(AeropuertoId, VueloNumero);
            if (vueloAeropuerto == null)
            {
                return NotFound();
            }

            _context.VueloAeropuertos.Remove(vueloAeropuerto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VueloAeropuertoExists(string id)
        {
            return (_context.VueloAeropuertos?.Any(e => e.AeropuertoId == id)).GetValueOrDefault();
        }

        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { ReferenceHandler = ReferenceHandler.Preserve };
    }
}
