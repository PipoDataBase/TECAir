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
    public class UniversidadesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public UniversidadesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Universidades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Universidad>>> GetUniversidads()
        {
            if (_context.Universidads == null)
            {
                return NotFound();
            }
            return await _context.Universidads.ToListAsync();
        }

        // GET: api/Universidades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Universidad>> GetUniversidad(int id)
        {
          if (_context.Universidads == null)
          {
              return NotFound();
          }
            var universidad = await _context.Universidads.FindAsync(id);

            if (universidad == null)
            {
                return NotFound();
            }

            return universidad;
        }

        // PUT: api/Universidades/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUniversidad(int id, Universidad universidad)
        {
            if (id != universidad.Id)
            {
                return BadRequest();
            }

            _context.Entry(universidad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UniversidadExists(id))
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

        // POST: api/Universidades
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Universidad>> PostUniversidad(Universidad universidad)
        {
          if (_context.Universidads == null)
          {
              return Problem("Entity set 'TecairDbContext.Universidads'  is null.");
          }
            _context.Universidads.Add(universidad);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (UniversidadExists(universidad.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetUniversidad", new { id = universidad.Id }, universidad);
        }

        // DELETE: api/Universidades/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUniversidad(int id)
        {
            if (_context.Universidads == null)
            {
                return NotFound();
            }
            var universidad = await _context.Universidads.FindAsync(id);
            if (universidad == null)
            {
                return NotFound();
            }

            _context.Universidads.Remove(universidad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UniversidadExists(int id)
        {
            return (_context.Universidads?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
