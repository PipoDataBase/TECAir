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

            return Ok(viajes);
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
