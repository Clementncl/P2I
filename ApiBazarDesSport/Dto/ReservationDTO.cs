using System.ComponentModel;

public class ReservationDTO
{
    public int Id { get; set; }
    public Utilisateur Utilisateur { get; set; }
    public DateTime Date { get; set; }
    public Materiel Materiel { get; set; }
    public int Quantite { get; set; }

    public ReservationDTO() { }

    public ReservationDTO(Reservation reservation)
    {
        Date = reservation.Date;
        Utilisateur = reservation.Utilisateur;
        Materiel = reservation.Materiel;
        Quantite = reservation.Quantite;

    }


}