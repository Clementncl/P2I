public enum TypeMateriel
{
    None,
    Mobilier,
    Bureautique,
    Electronique,
}

public class MaterielDTO
{
    public string Id { get; set; }
    public string Nom { get; set; } = null!;
    public double Prix { get; set; }
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
