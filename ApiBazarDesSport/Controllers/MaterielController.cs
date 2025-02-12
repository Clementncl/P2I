using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/Materiel")]
public class MaterielControllers : ControllerBase
{
    private readonly BdsContexte _context;

    public MaterielControllers(BdsContexte context)
    {
        _context = context;
    }

    // GET: api/Materiel
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Materiel>>> GetMateriel()
    {
        // Get Item
        var Materiels = _context.Materiel;
        return await Materiels.ToListAsync();
    }

    // GET: api/Materiel/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<Materiel>> GetItem(int id)
    {
        // Find a specific personne
        // SingleAsync() throws an exception if no personne is found (which is possible, depending on id)
        // SingleOrDefaultAsync() is a safer choice here
        var Materiel = await _context.Materiel.SingleOrDefaultAsync(t => t.Id == id);
        if (Materiel == null)
            return NotFound();
        return Materiel;
    }

    // POST: api/Materiel
    [HttpPost]
    public async Task<ActionResult<Materiel>> PostItem(Materiel item)
    {
        /*if (!new[] { "mobilier", "bureautique", "électronique" }.Contains(item.Type))
        {
            return BadRequest("Type de Materiel invalide.");
        }*/
        _context.Materiel.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
    }

    // PUT: api/Materiel/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> PutItem(int id, Materiel item)
    {
        if (id != item.Id)
            return BadRequest();
        /*if (!new[] { "mobilier", "bureautique", "électronique" }.Contains(item.Type))
        {
            return BadRequest("Type de Materiel invalide.");
        }*/
        _context.Entry(item).State = EntityState.Modified;
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Materiel.Any(m => m.Id == id))
                return NotFound();
            else
                throw;
        }
        return NoContent();
    }

    // DELETE: api/Materiel/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteItem(int id)
    {
        var item = await _context.Materiel.FindAsync(id);
        if (item == null)
            return NotFound();
        _context.Materiel.Remove(item);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
