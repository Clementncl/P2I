public enum TypeMateriel  // A modifier
{
    None,
    Mobilier,
    Bureautique,
    Electronique,
}

public class MaterielDTO
{
    public string Id { get; set; }
    private string _nom;
    public string Nom
    {
        get => _nom;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Le nom du matériel ne peut pas être vide.");
            _nom = value;
        }
    }

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
    public TypeMateriel Type { get; set; }
    public List<ReservationDTO> Reservations { get; set; } = new();

    public MaterielDTO() { }

    public MaterielDTO(Materiel Materiel)
    {
        Id = Materiel.Id;
        Nom = Materiel.Nom;
        Prix = Materiel.Prix;
        Type = Materiel.Type;

        // Conversion des Reservations associées en ReservationDTO
        //Reservations = Materiel.Reservations.Select(c => new ReservationDTO(c)).ToList();
    }
}
