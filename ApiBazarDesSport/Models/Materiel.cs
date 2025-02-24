using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
public class Materiel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Nom { get; set; }
    public double Prix { get; set; }
    private TypeMateriel _type;
    public TypeMateriel Type
    {
        get => _type;
        set
        {
            if (!Enum.IsDefined(typeof(TypeMateriel), value))
            {
                throw new ArgumentException($"Valeur non valide pour TypeMateriel : {value}");
            }
            _type = value;
        }
    }

    //Relation avec Reservation
    // public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public Materiel() { }

    public Materiel(MaterielDTO MaterielDto)
    {
        Id = MaterielDto.Id;
        Nom = MaterielDto.Nom;
        Prix = MaterielDto.Prix;
        // Type = MaterielDto.Type;

        // Convertir ReservationDTO en Reservation
        // Reservations = MaterielDto
        //     .Reservations.Select(dto => new Reservation
        //     {
        //         // A remplir 
        //     })
        //     .ToList();
    }
}
