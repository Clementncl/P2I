using System.ComponentModel;

public class ReservationDTO
{
    public string Id { get; set; }
    public Utilisateur Utilisateur { get; set; }
    public DateTime Date { get; set; }
    public Materiel Materiel { get; set; }
    public int Quantite { get; set; }

    public ReservationDTO() { }

    public ReservationDTO(Reservation reservation)
    {
        Id=reservation.Id;
        Date = reservation.Date;
        Quantite = reservation.Quantite;
    }


}