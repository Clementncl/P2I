using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
public class Materiel
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }
    public string Nom { get; set; }
    public int Stock {get;set;}
        private double _prix;
    public double Prix
    {
        get => _prix;
        set
        {
            if (value < 0)
                throw new ArgumentException("Le prix ne peut pas être négatif.");
            _prix = value;
        }
    }
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


    // Relation avec Reservation
    public ICollection<Reservation> Reservations { get; set; } = new List<Reservation>();

    public Materiel() { }

    public Materiel(MaterielDTO MaterielDto)
    {
        Id = MaterielDto.Id;
        Nom = MaterielDto.Nom;
        Stock = MaterielDto.Stock;
        Prix = MaterielDto.Prix;
        Type = MaterielDto.Type;

        // Convertir ReservationDTO en Reservation
      Reservations = MaterielDto.Reservations?.Select(dto => new Reservation
{
    // Remplir les propriétés de Reservation ici
}).ToList() ?? new List<Reservation>();

    }
}
