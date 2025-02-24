using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/materiel")]
[ApiController]
public class MaterielController : ControllerBase
{
    private readonly IMongoCollection<Materiel> _context;

    public MaterielController()
    {
        var client = new MongoClient("mongodb://localhost:5000"); // Modifier l'URL si nécessaire
        var database = client.GetDatabase("BDS");
        _context = database.GetCollection<Materiel>("Materiel");
    }

    // GET: api/materiel
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Materiel>>> GetMateriel()
    {
        var materiels = await _context.Find(m => true).ToListAsync();
        return Ok(materiels);
    }

    // GET: api/materiel/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Materiel>> GetItem(string id)
    {
        var materiel = await _context.Find(m => m.Id == id).FirstOrDefaultAsync();
        if (materiel == null)
            return NotFound();
        return Ok(materiel);
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


