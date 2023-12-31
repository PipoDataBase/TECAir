﻿using System;
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
    public class EstudiantesController : ControllerBase
    {
        private readonly TecairDbContext _context;

        public EstudiantesController(TecairDbContext context)
        {
            _context = context;
        }

        // GET: api/Estudiantes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Estudiante>>> GetEstudiantes()
        {
          if (_context.Estudiantes == null)
          {
              return NotFound();
          }
            return await _context.Estudiantes.ToListAsync();
        }

        // GET: api/Estudiantes/5
        [HttpGet("{mail}")]
        public async Task<ActionResult<Estudiante>> GetEstudiante(String mail)
        {
          if (_context.Estudiantes == null)
          {
              return NotFound();
          }

            var estudiantestemp = await _context.Estudiantes.ToListAsync();
            var estudiante = estudiantestemp.Find(Estudiante => Estudiante.Correo == mail);
            //var estudiante = await _context.Estudiantes.FindAsync(mail);

            if (estudiante == null)
            {
                return NotFound();
            }

            return estudiante;
        }

        // PUT: api/Estudiantes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEstudiante(int id, Estudiante estudiante)
        {
            if (id != estudiante.Carnet)
            {
                return BadRequest();
            }

            _context.Entry(estudiante).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstudianteExists(id))
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

        // POST: api/Estudiantes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Estudiante>> PostEstudiante(Estudiante estudiante)
        {
            if (_context.Estudiantes == null)
            {
                return Problem("Entity set 'TecairDbContext.Estudiantes' is null.");
            }

            // Validar que el Cliente existe
            var clienteExistente = await _context.Clientes.FindAsync(estudiante.Correo);
            if (clienteExistente == null)
            {
                return BadRequest("El cliente especificado no existe.");
            }

            try
            {
                // Asignar el cliente existente a la propiedad de navegación
                estudiante.CorreoNavigation = clienteExistente;

                // Agregar el estudiante a la base de datos
                _context.Estudiantes.Add(estudiante);
                await _context.SaveChangesAsync();

                try
                {
                    // Agregar estudiante en su especifico cliente
                    var cliente = await _context.Clientes.FindAsync(estudiante.Correo);
                    if (cliente != null)
                    {
                        cliente.Estudiantes.Add(estudiante);
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

            return Ok(JsonSerializer.Serialize(estudiante, jsonSerializerOptions));
        }

        // DELETE: api/Estudiantes/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEstudiante(int id)
        {
            if (_context.Estudiantes == null)
            {
                return NotFound();
            }
            var estudiante = await _context.Estudiantes.FindAsync(id);
            if (estudiante == null)
            {
                return NotFound();
            }

            _context.Estudiantes.Remove(estudiante);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EstudianteExists(int id)
        {
            return (_context.Estudiantes?.Any(e => e.Carnet == id)).GetValueOrDefault();
        }

        private static readonly JsonSerializerOptions jsonSerializerOptions = new JsonSerializerOptions { ReferenceHandler = ReferenceHandler.Preserve };
    }
}
