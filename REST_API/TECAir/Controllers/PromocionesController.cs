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
    public class PromocionesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public PromocionesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Promociones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Promocion>>> GetPromocions()
        {
            var promociones = await _context.Promocions
                      .Select(p => new
                      {
                          p.ViajeId,
                          p.Precio,
                          p.FechaInicio,
                          p.FechaVencimiento,
                          p.ImagenPath,
                          p.Viaje
                      })
                      .ToListAsync();

            return Ok(promociones);
        }

        // GET: api/Promociones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Promocion>> GetPromocion(int id)
        {
            if (_context.Promocions == null)
            {
                return NotFound();
            }

            var promocion = await _context.Promocions
                    .Where(p => p.ViajeId == id)
                    .Select(p => new
                    {
                        p.ViajeId,
                        p.Precio,
                        p.FechaInicio,
                        p.FechaVencimiento,
                        p.ImagenPath
                    })
                    .FirstOrDefaultAsync();

            if (promocion == null)
            {
                return NotFound();
            }

            return Ok(promocion);
        }

        // PUT: api/Promociones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPromocion(int id, Promocion promocion)
        {
            if (_context.Promocions == null)
            {
                return Problem("Entity set 'TecairDbContext.Promocions'  is null.");
            }

            // Validar el ViajeId
            if (id != promocion.ViajeId)
            {
                return BadRequest();
            }

            // Validar que el Viaje existe
            var viajeExistente = await _context.Viajes.FindAsync(promocion.ViajeId);
            if (viajeExistente == null)
            {
                return BadRequest("El viaje especificado no existe.");
            }

            var _promocion = await _context.Promocions.FindAsync(id);
            if (_promocion == null)
            {
                return NotFound();
            }

            try
            {
                // Asignar el viaje a la propiedad de navegación
                _promocion.Viaje = viajeExistente;

                _promocion.Precio = promocion.Precio;
                _promocion.FechaInicio = promocion.FechaInicio;
                _promocion.FechaVencimiento = promocion.FechaVencimiento;
                _promocion.ImagenPath = promocion.ImagenPath;
                await _context.SaveChangesAsync();

                return Ok(_promocion.ViajeId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // POST: api/Promociones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Promocion>> PostPromocion(Promocion promocion)
        {
            if (_context.Promocions == null)
            {
                return Problem("Entity set 'TecairDbContext.Promocions'  is null.");
            }

            // Validar que el Viaje existe
            var viajeExistente = await _context.Viajes.FindAsync(promocion.ViajeId);
            if (viajeExistente == null)
            {
                return BadRequest("El viaje especificado no existe.");
            }

            try
            {
                // Asignar el viaje a la propiedad de navegación
                promocion.Viaje = viajeExistente;

                // Agregar promoción a la base de datos
                try
                {
                    _context.Promocions.Add(promocion);
                    await _context.SaveChangesAsync();
                }
                catch
                {
                    return BadRequest();
                }

                return Ok(promocion.ViajeId);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno del servidor: {ex.Message}");
            }
        }

        // DELETE: api/Promociones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePromocion(int id)
        {
            if (_context.Promocions == null)
            {
                return NotFound();
            }
            var promocion = await _context.Promocions.FindAsync(id);
            if (promocion == null)
            {
                return NotFound();
            }

            // Eliminar promoción
            _context.Promocions.Remove(promocion);

            await _context.SaveChangesAsync();

            return Ok(1);
        }

        private bool PromocionExists(int id)
        {
            return (_context.Promocions?.Any(e => e.ViajeId == id)).GetValueOrDefault();
        }
    }
}
