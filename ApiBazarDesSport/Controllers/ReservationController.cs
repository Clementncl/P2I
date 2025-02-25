using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;

[ApiController]
[Route("api/reservation")]
public class ReservationController : ControllerBase
{
     private readonly IMongoCollection<Reservation> _context;  //Chat

    public ReservationController(MongoDBService mongoDBService)
    {
        System.Console.WriteLine("lsjshshssg");
        _context = mongoDBService.GetCollection<Reservation>("Reservation");

    }   

    // GET: api/reservation
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Reservation>>> Getreservation()
    {
        var reservations = await _context.Find(m => true).ToListAsync();
        return Ok(reservations);
    }

    // GET: api/reservation/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Reservation>> GetItem(string id)
    {
        var reservation = await _context.Find(m => m.Id == id).FirstOrDefaultAsync();
        if (reservation == null)
            return NotFound();
        return Ok(reservation);
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
