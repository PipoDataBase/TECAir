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
            _context.Vuelos.Add(vuelo);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (VueloExists(vuelo.NVuelo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetVuelo", new { id = vuelo.NVuelo }, vuelo);
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
    }
}
