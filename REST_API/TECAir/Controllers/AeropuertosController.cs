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
    public class AeropuertosController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public AeropuertosController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Aeropuertos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Aeropuerto>>> GetAeropuertos()
        {
          if (_context.Aeropuertos == null)
          {
              return NotFound();
          }
            return await _context.Aeropuertos.ToListAsync();
        }

        // GET: api/Aeropuertos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Aeropuerto>> GetAeropuerto(string id)
        {
          if (_context.Aeropuertos == null)
          {
              return NotFound();
          }
            var aeropuerto = await _context.Aeropuertos.FindAsync(id);

            if (aeropuerto == null)
            {
                return NotFound();
            }

            return aeropuerto;
        }

        // PUT: api/Aeropuertos/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAeropuerto(string id, Aeropuerto aeropuerto)
        {
            if (id != aeropuerto.Id)
            {
                return BadRequest();
            }

            _context.Entry(aeropuerto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AeropuertoExists(id))
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

        // POST: api/Aeropuertos
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Aeropuerto>> PostAeropuerto(Aeropuerto aeropuerto)
        {
          if (_context.Aeropuertos == null)
          {
              return Problem("Entity set 'TecairDbContext.Aeropuertos'  is null.");
          }
            _context.Aeropuertos.Add(aeropuerto);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AeropuertoExists(aeropuerto.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAeropuerto", new { id = aeropuerto.Id }, aeropuerto);
        }

        // DELETE: api/Aeropuertos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAeropuerto(string id)
        {
            if (_context.Aeropuertos == null)
            {
                return NotFound();
            }
            var aeropuerto = await _context.Aeropuertos.FindAsync(id);
            if (aeropuerto == null)
            {
                return NotFound();
            }

            _context.Aeropuertos.Remove(aeropuerto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AeropuertoExists(string id)
        {
            return (_context.Aeropuertos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
