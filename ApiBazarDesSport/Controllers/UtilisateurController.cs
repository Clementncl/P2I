//Contrôleur RESTful complet permettant d’ajouter, modifier, 
//supprimer ou récupérer des utilisateurs via l’API (/api/utilisateur).

using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

[Route("api/utilisateur")]
[ApiController]

public class UtilisateurController : ControllerBase
{

    private readonly IMongoCollection<Utilisateur> _context;

    public UtilisateurController(MongoDBService mongoDBService)
    {

        _context = mongoDBService.GetCollection<Utilisateur>("Utilisateur");

    }

    // GET: api/utilisateur
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Utilisateur>>> Getutilisateur()
    {
        var utilisateurs = await _context.Find(m => true).ToListAsync();
        return Ok(utilisateurs);
    }

    // GET: api/utilisateur/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Utilisateur>> GetItem(string id)
    {
        var utilisateur = await _context.Find(m => m.Id == id).FirstOrDefaultAsync();
        if (utilisateur == null)
            return NotFound();
        return Ok(utilisateur);
    }

    // POST: api/utilisateur
    [HttpPost]
    public async Task<ActionResult<Utilisateur>> PostItem([FromBody] Utilisateur item)
    {
        await _context.InsertOneAsync(item);
        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    // PUT: api/utilisateur/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(string id, [FromBody] Utilisateur item)
    {
        if (id != item.Id)
            return BadRequest();

        var result = await _context.ReplaceOneAsync(m => m.Id == id, item);
        if (result.MatchedCount == 0)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/utilisateur/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(string id)
    {
        var result = await _context.DeleteOneAsync(m => m.Id == id);
        if (result.DeletedCount == 0)
            return NotFound();

        return NoContent();
    }
}


