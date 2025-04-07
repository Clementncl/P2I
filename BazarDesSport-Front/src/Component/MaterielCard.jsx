import PropTypes from "prop-types";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";

export default function MaterialCard({ id, nom, image, stock }) {
  const [showEdit, setShowEdit] = useState(false);
  const [newStock, setNewStock] = useState(stock);

  // Fonction PUT pour modifier le stock
  const handleEditStock = async () => {
    try {
      const response = await fetch(`http://localhost:5039/api/materiel/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          nom: nom,
          stock: parseInt(newStock),
          prix: 0,
          type: 0, // ou la valeur adaptée
        }),
      });
      if (response.ok) {
        alert("Stock mis à jour !");
        window.location.reload(); // Pour rafraîchir la liste
      } else {
        alert("Erreur lors de la mise à jour du stock");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  };

  // Fonction DELETE pour supprimer le matériel
  const handleDelete = async () => {
    if(!window.confirm("Voulez-vous vraiment supprimer ce matériel ?")) return;

    try {
      const response = await fetch(`http://localhost:5039/api/materiel/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        alert("Matériel supprimé !");
        window.location.reload(); 
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={nom} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nom}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Stock : {stock}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {/* Bouton pour modifier le stock */}
        {!showEdit && (
          <button onClick={() => setShowEdit(true)}>Modifier le stock</button>
        )}

        {showEdit && (
          <>
            <input
              type="number"
              value={newStock}
              onChange={(e) => setNewStock(e.target.value)}
              style={{ width: "80px" }}
            />
            <button onClick={handleEditStock}>OK</button>
            <button onClick={() => setShowEdit(false)}>Annuler</button>
          </>
        )}

        {/* Bouton pour supprimer */}
        <button onClick={handleDelete} style={{ marginLeft: "auto" }}>
          Supprimer
        </button>
      </CardActions>
    </Card>
  );
}

MaterialCard.propTypes = {
  id: PropTypes.string.isRequired,
  nom: PropTypes.string.isRequired,
  image: PropTypes.string,
  stock: PropTypes.number.isRequired,
};
