//Version orientée affichage du Materiel, incluant la disponibilité, 
//les réservations, et des protections sur le nom et le prix.

public enum TypeMateriel
{
    None,
    Ballon,
    Equipement,
    Logistique,
}

public class MaterielDTO
{
    public string? Id { get; set; }
    public int Stock { get; set; }
    public string? Image{get;set;}
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
    public bool EstDisponible { get; set; }
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

    public MaterielDTO(Materiel Materiel, bool estDisponible)
    {
        Id=Materiel.Id;
        Nom = Materiel.Nom;
        Stock = Materiel.Stock;
        Prix = Materiel.Prix;
        Type = Materiel.Type;
        EstDisponible = estDisponible;
        Image = Materiel.Image;


        // Conversion des Reservations associées en ReservationDTO
        Reservations = Materiel.Reservations.Select(c => new ReservationDTO(c)).ToList();
    }
}
