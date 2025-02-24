public class Reservation
{
    public string Id { get; set; }
    public Utilisateur Utilisateur { get; set; }
    public int UtilisateurID { get; set; }
    public DateTime Date { get; set; }
    public Materiel Materiel { get; set; }
    public int MaterielID { get; set; }
    public int Quantite { get; set; }


    public Reservation() { }

    public Reservation(ReservationDTO reservationDTO)
    {
        Id = reservationDTO.Id;
        Materiel = reservationDTO.Materiel;
        Date = reservationDTO.Date;
        Utilisateur = reservationDTO.Utilisateur;

    }
}