import PropTypes from "prop-types";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Button, Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

// import { Button } from "@mui/material";
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
  {/* Boutons "Modifier" et "Supprimer" */}
  {!showEdit && (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end", width: "100%" }}>
      <Button
      
        onClick={() => setShowEdit(true)}
        startIcon={<ModeEditOutlineIcon />}
        variant="text"
        sx={{ backgroundColor: '#7e57c2' , fontSize: '0.8rem' , color:"white"}}
      >
        Modifier le stock
      </Button>

      <Button
        onClick={handleDelete}
        color="error"
        variant="contained"
        startIcon={<DeleteIcon />}
        sx={{ fontSize: '0.75rem' }}
      >
        Supprimer
      </Button>
    </Box>
  )}

  {/* Affichage de l'édition du stock */}
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
