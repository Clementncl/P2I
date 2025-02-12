public class Utilisateur
{
    public int Id { get; set; }

    public string Nom { get; set; }
    public string Prénom { get; set; }
    public enum Status { admin, users }
}