public class Reservation
{
    public string Id { get; set; }
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