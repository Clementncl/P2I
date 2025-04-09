using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

public class Utilisateur
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string Nom { get; set; }
    
    [BsonElement("Prenom")] 
    public string Prenom { get; set; }
    public enum Status { admin, users }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; }
}