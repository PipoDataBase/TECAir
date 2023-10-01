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
    public class PasesAbordajesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public PasesAbordajesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/PasesAbordajes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaseAbordaje>>> GetPaseAbordajes()
        {
          if (_context.PaseAbordajes == null)
          {
              return NotFound();
          }
            return await _context.PaseAbordajes.ToListAsync();
        }

        // GET: api/PasesAbordajes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaseAbordaje>> GetPaseAbordaje(int id)
        {
          if (_context.PaseAbordajes == null)
          {
              return NotFound();
          }
            var paseAbordaje = await _context.PaseAbordajes.FindAsync(id);

            if (paseAbordaje == null)
            {
                return NotFound();
            }

            return paseAbordaje;
        }

        // PUT: api/PasesAbordajes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPaseAbordaje(int id, PaseAbordaje paseAbordaje)
        {
            if (id != paseAbordaje.Id)
            {
                return BadRequest();
            }

            _context.Entry(paseAbordaje).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaseAbordajeExists(id))
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

        // POST: api/PasesAbordajes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PaseAbordaje>> PostPaseAbordaje(PaseAbordaje paseAbordaje)
        {
          if (_context.PaseAbordajes == null)
          {
              return Problem("Entity set 'TecairDbContext.PaseAbordajes'  is null.");
          }
            _context.PaseAbordajes.Add(paseAbordaje);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PaseAbordajeExists(paseAbordaje.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPaseAbordaje", new { id = paseAbordaje.Id }, paseAbordaje);
        }

        // DELETE: api/PasesAbordajes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaseAbordaje(int id)
        {
            if (_context.PaseAbordajes == null)
            {
                return NotFound();
            }
            var paseAbordaje = await _context.PaseAbordajes.FindAsync(id);
            if (paseAbordaje == null)
            {
                return NotFound();
            }

            _context.PaseAbordajes.Remove(paseAbordaje);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PaseAbordajeExists(int id)
        {
            return (_context.PaseAbordajes?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
