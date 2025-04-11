//Contrôleur pour créer des réservations, 
//les consulter (par ID ou par mois), les modifier ou les supprimer.

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MongoDB.Bson;
using MongoDB.Driver;

[ApiController]
[Route("api/reservation")]
public class ReservationController : ControllerBase
{
    private readonly IMongoCollection<Reservation> _context;  //Chat

    public ReservationController(MongoDBService mongoDBService)
    {

        _context = mongoDBService.GetCollection<Reservation>("Reservation");

    }

    // GET: api/reservation/all
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reservation>>> Getreservation()
    {
        var reservations = await _context.Find(m => true).ToListAsync();
        return Ok(reservations);
    }

    // // GET: api/reservation/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Reservation>> GetItem(string id)
    {
        var reservation = await _context.Find(m => m.Id == id).FirstOrDefaultAsync();
        if (reservation == null)
            return NotFound();
        return Ok(reservation);
    }

// GET: api/reservation/Mensuelle?mois=1&an=2025
[HttpGet("Mensuelle")]
public async Task<ActionResult<IEnumerable<Reservation>>> GetReservationsMensuelle(int mois, int an)
{
    // Début du mois courant
    var start = new DateTime(an, mois, 1);
    // Début du mois suivant
    var end = start.AddMonths(1);

    var reservations = await _context
        .Find(r => r.Date >= start && r.Date < end)
        .ToListAsync();

    return Ok(reservations);
}



    // POST: api/reservation
    [HttpPost]
    public async Task<ActionResult<Reservation>> PostItem([FromBody] Reservation item)
    {
        await _context.InsertOneAsync(item);
        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    // PUT: api/reservation/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(string id, [FromBody] Reservation item)
    {
        if (id != item.Id)
            return BadRequest();

        var result = await _context.ReplaceOneAsync(m => m.Id == id, item);
        if (result.MatchedCount == 0)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/reservation/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(string id)
    {
        var result = await _context.DeleteOneAsync(m => m.Id == id);
        if (result.DeletedCount == 0)
            return NotFound();

        return NoContent();
    }
}



