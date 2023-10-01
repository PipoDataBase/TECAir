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
    public class PrecioMaletasController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public PrecioMaletasController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/PrecioMaletas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PrecioMaleta>>> GetPrecioMaleta()
        {
          if (_context.PrecioMaleta == null)
          {
              return NotFound();
          }
            return await _context.PrecioMaleta.ToListAsync();
        }

        // GET: api/PrecioMaletas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PrecioMaleta>> GetPrecioMaleta(int id)
        {
          if (_context.PrecioMaleta == null)
          {
              return NotFound();
          }
            var precioMaleta = await _context.PrecioMaleta.FindAsync(id);

            if (precioMaleta == null)
            {
                return NotFound();
            }

            return precioMaleta;
        }

        // PUT: api/PrecioMaletas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrecioMaleta(int id, PrecioMaleta precioMaleta)
        {
            if (id != precioMaleta.CMaletas)
            {
                return BadRequest();
            }

            _context.Entry(precioMaleta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrecioMaletaExists(id))
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

        // POST: api/PrecioMaletas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PrecioMaleta>> PostPrecioMaleta(PrecioMaleta precioMaleta)
        {
          if (_context.PrecioMaleta == null)
          {
              return Problem("Entity set 'TecairDbContext.PrecioMaleta'  is null.");
          }
            _context.PrecioMaleta.Add(precioMaleta);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PrecioMaletaExists(precioMaleta.CMaletas))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPrecioMaleta", new { id = precioMaleta.CMaletas }, precioMaleta);
        }

        // DELETE: api/PrecioMaletas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrecioMaleta(int id)
        {
            if (_context.PrecioMaleta == null)
            {
                return NotFound();
            }
            var precioMaleta = await _context.PrecioMaleta.FindAsync(id);
            if (precioMaleta == null)
            {
                return NotFound();
            }

            _context.PrecioMaleta.Remove(precioMaleta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PrecioMaletaExists(int id)
        {
            return (_context.PrecioMaleta?.Any(e => e.CMaletas == id)).GetValueOrDefault();
        }
    }
}
