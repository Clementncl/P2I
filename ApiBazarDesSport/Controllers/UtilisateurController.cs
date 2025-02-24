// using Microsoft.AspNetCore.Mvc;
// using MongoDB.Driver;
// using System.Collections.Generic;
// using System.Threading.Tasks;

// [Route("api/utilisateur")]
// [ApiController]
// public class UtilisateurController : ControllerBase
// {
//     private readonly IMongoCollection<Utilisateur> _context;

//     public ItemsController()
//     {
//         var client = new MongoClient("mongodb://localhost:27017"); // Modifier l'URL si nécessaire
//         var database = client.GetDatabase("BDS");
//         _context = database.GetCollection<Utilisateur>("Utilisateur");
//     }

//     // GET: api/Reservation
//     [HttpGet]
//     public async Task<ActionResult<IEnumerable<Reservation>>> GetReservation()
//     {
//         // Get Item
//         var Utilisateur = _context.Reservation;
//         return await Utilisateur.ToListAsync();
//     }

//     // GET: api/Reservation/{id}
//     [HttpGet("{id}")]
//     public async Task<ActionResult<Reservation>> GetItem(int id)
//     {
//         // Find a specific personne
//         // SingleAsync() throws an exception if no personne is found (which is possible, depending on id)
//         // SingleOrDefaultAsync() is a safer choice here
//         var Reservation = await _context.Reservation.SingleOrDefaultAsync(t => t.Id == id);
//         if (Reservation == null)
//             return NotFound();
//         return Reservation;
//     }

//     // POST: api/Reservation
//     [HttpPost]
//     public async Task<ActionResult<Reservation>> PostItem(Reservation item)
//     {
//         /*if (!new[] { "mobilier", "bureautique", "électronique" }.Contains(item.Type))
//         {
//             return BadRequest("Type de Reservation invalide.");
//         }*/
//         _context.Reservation.Add(item);
//         await _context.SaveChangesAsync();
//         return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
//     }

//     // PUT: api/Reservation/{id}
//     [HttpPut("{id}")]
//     public async Task<IActionResult> PutItem(int id, Reservation item)
//     {
//         if (id != item.Id)
//             return BadRequest();
//         /*if (!new[] { "mobilier", "bureautique", "électronique" }.Contains(item.Type))
//         {
//             return BadRequest("Type de Reservation invalide.");
//         }*/
//         _context.Entry(item).State = EntityState.Modified;
//         try
//         {
//             await _context.SaveChangesAsync();
//         }
//         catch (DbUpdateConcurrencyException)
//         {
//             if (!_context.Reservation.Any(m => m.Id == id))
//                 return NotFound();
//             else
//                 throw;
//         }
//         return NoContent();
//     }

//     // DELETE: api/Reservation/{id}
//     [HttpDelete("{id}")]
//     public async Task<IActionResult> DeleteItem(int id)
//     {
//         var item = await _context.Reservation.FindAsync(id);
//         if (item == null)
//             return NotFound();
//         _context.Reservation.Remove(item);
//         await _context.SaveChangesAsync();
//         return NoContent();
//     }
// }
