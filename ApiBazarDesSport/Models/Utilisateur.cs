//Classe Utilisateur représentant un membre de l’application, avec ID Mongo, 
//nom, prénom, email et mot de passe.

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
    public enum Status { admin, user }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("passwordHash")]
    public string PasswordHash { get; set; }
    
     [BsonElement("role")]
    public Status Role { get; set; } = Status.user;
}