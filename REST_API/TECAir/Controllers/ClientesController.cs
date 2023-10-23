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
    public class ClientesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public ClientesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Clientes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Cliente>>> GetClientes()
        {
          if (_context.Clientes == null)
          {
              return NotFound();
          }
            return await _context.Clientes.ToListAsync();
        }

        // GET: api/Clientes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Cliente>> GetCliente(string id)
        {
            var cliente = await _context.Clientes
                    .Where(c => c.Correo == id)
                    .Select(c => new
                    {
                        c.Correo,
                        c.Telefono,
                        c.Nombre,
                        c.Apellido1,
                        c.Apellido2,
                        c.Estudiantes
                    })
                    .FirstOrDefaultAsync();

            if (cliente == null)
            {
                return NotFound();
            }

            return Ok(cliente);
        }

        // PUT: api/Clientes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCliente(string id, Cliente clienteActualizado)
        {
            if (id != clienteActualizado.Correo)
            {
                return BadRequest();
            }

            var cliente = await _context.Clientes.FindAsync(id);
            cliente.Telefono = clienteActualizado.Telefono;
            cliente.Nombre = clienteActualizado.Nombre;
            cliente.Apellido1 = clienteActualizado.Apellido1;
            cliente.Apellido2 = clienteActualizado.Apellido2;
            await _context.SaveChangesAsync();

            return Ok(1);
        }

        // POST: api/Clientes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Cliente>> PostCliente(Cliente cliente)
        {
            if (_context.Clientes == null)
            {
                return Problem("Entity set 'TecairDbContext.Clientes'  is null.");
            }

            try
            {
                // Agregar el cliente a la base de datos
                _context.Clientes.Add(cliente);
                await _context.SaveChangesAsync();

                return Ok(1);
            }
            catch
            {
                if (ClienteExists(cliente.Correo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/Clientes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCliente(string id)
        {
            if (_context.Clientes == null)
            {
                return NotFound();
            }
            var cliente = await _context.Clientes.FindAsync(id);
            if (cliente == null)
            {
                return NotFound();
            }

            _context.Clientes.Remove(cliente);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ClienteExists(string id)
        {
            return (_context.Clientes?.Any(e => e.Correo == id)).GetValueOrDefault();
        }
    }
}
