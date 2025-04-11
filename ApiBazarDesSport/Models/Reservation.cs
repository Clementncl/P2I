//Classe représentant une réservation faite par un 
//utilisateur sur un matériel à une date et quantité données.

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
public class Reservation
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }
    public string UtilisateurId { get; set; }
    public DateTime Date { get; set; }
    public string MaterielId { get; set; }
    public int Quantite { get; set; }


    public Reservation() { }

    public Reservation(ReservationDTO reservationDTO)
    {
        Id = reservationDTO.Id;
        MaterielId = reservationDTO.Materiel.Id;
        Date = reservationDTO.Date;
        UtilisateurId = reservationDTO.Utilisateur.Id;

    }
}