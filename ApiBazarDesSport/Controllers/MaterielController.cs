using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/materiel")]
[ApiController]
public class MaterielController : ControllerBase
{
    private readonly IMongoCollection<Materiel> _context;
    private readonly IMongoCollection<Reservation> _reservationCollection;

    public MaterielController(MongoDBService mongoDBService)
    {
        _context = mongoDBService.GetCollection<Materiel>("Materiel");
        _reservationCollection = mongoDBService.GetCollection<Reservation>("Reservation");
    }

    // GET: api/materiel
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MaterielDTO>>> GetMateriels()
    {
        var materiels = await _context.Find(m => true).ToListAsync();
        var materielsDto = new List<MaterielDTO>();

        foreach (var materiel in materiels)
        {
            var reservations = await _reservationCollection
                .Find(r => r.MaterielId == materiel.Id)
                .ToListAsync();

            bool estDisponible = !reservations.Any(); // Disponible s'il n'y a aucune réservation active

            materielsDto.Add(new MaterielDTO(materiel, estDisponible));
        }

        return Ok(materielsDto);
    }


    // GET: api/materiel/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<MaterielDTO>> GetItem(string id)
    {
        var materiel = await _context.Find(m => m.Id == id).FirstOrDefaultAsync();
        if (materiel == null)
            return NotFound();

        var reservations = await _reservationCollection
            .Find(r => r.MaterielId == id)
            .ToListAsync();

        bool estDisponible = !reservations.Any();

        return Ok(new MaterielDTO(materiel, estDisponible));
    }

    // GET: api/materiel/disponibilite/{materielId}/{date}
    [HttpGet("disponibilite/{materielId}/{date}")]
    public async Task<IActionResult> VerifierDisponibilite(string materielId, DateTime date)
    {
        var reservations = await _reservationCollection
            .Find(r => r.MaterielId == materielId && r.Date== date)
            .ToListAsync();

        bool estDisponible = !reservations.Any();

        return Ok(new { MaterielId = materielId, Disponible = estDisponible });
    }

    // POST: api/materiel
    [HttpPost]
    public async Task<ActionResult<Materiel>> PostItem([FromBody] Materiel item)
    {
        await _context.InsertOneAsync(item);
        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    // PUT: api/materiel/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(string id, [FromBody] Materiel item)
    {
        if (id != item.Id)
            return BadRequest();

        var result = await _context.ReplaceOneAsync(m => m.Id == id, item);
        if (result.MatchedCount == 0)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/materiel/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(string id)
    {
        var result = await _context.DeleteOneAsync(m => m.Id == id);
        if (result.DeletedCount == 0)
            return NotFound();

        return NoContent();
    }
}
