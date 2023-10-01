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
    public class AvionesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public AvionesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Aviones
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Avion>>> GetAvions()
        {
          if (_context.Avions == null)
          {
              return NotFound();
          }
            return await _context.Avions.ToListAsync();
        }

        // GET: api/Aviones/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Avion>> GetAvion(string id)
        {
          if (_context.Avions == null)
          {
              return NotFound();
          }
            var avion = await _context.Avions.FindAsync(id);

            if (avion == null)
            {
                return NotFound();
            }

            return avion;
        }

        // PUT: api/Aviones/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvion(string id, Avion avion)
        {
            if (id != avion.Matricula)
            {
                return BadRequest();
            }

            _context.Entry(avion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AvionExists(id))
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

        // POST: api/Aviones
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Avion>> PostAvion(Avion avion)
        {
          if (_context.Avions == null)
          {
              return Problem("Entity set 'TecairDbContext.Avions'  is null.");
          }
            _context.Avions.Add(avion);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AvionExists(avion.Matricula))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAvion", new { id = avion.Matricula }, avion);
        }

        // DELETE: api/Aviones/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvion(string id)
        {
            if (_context.Avions == null)
            {
                return NotFound();
            }
            var avion = await _context.Avions.FindAsync(id);
            if (avion == null)
            {
                return NotFound();
            }

            _context.Avions.Remove(avion);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AvionExists(string id)
        {
            return (_context.Avions?.Any(e => e.Matricula == id)).GetValueOrDefault();
        }
    }
}
