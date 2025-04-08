import { useState } from "react";
import ListMaterial from "../Component/ListMateriel";
import { Button, Box, Modal } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TitrePage from "../Component/TitrePage";

// Enum côté frontend, en phase avec ton enum .NET
const TypeMateriel = {
  None: 0,
  Ballon: 1,
  Equipement: 2,
  Logistique: 3,
};

export default function Equipement() {
  const [showAddForm, setShowAddForm] = useState(false);

  // Champs du formulaire
  const [newNom, setNewNom] = useState("");
  const [newStock, setNewStock] = useState(0);
  const [newPrix, setNewPrix] = useState(0);
  const [newType, setNewType] = useState(TypeMateriel.None);
  const [newImage, setNewImage] = useState("");

  // Appel API pour ajouter un nouveau matériel
  const handleAddMaterial = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5039/api/materiel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Les champs attendus par Materiel ou MaterielDTO
          nom: newNom,
          stock: parseInt(newStock),
          prix: parseFloat(newPrix),
          type: parseInt(newType), 
          image:  newImage.trim() !== "" ? newImage : null,
        }),
      });

      if (response.ok) {
        alert("Matériel ajouté avec succès !");
        // On referme le formulaire et on reset les champs
        setShowAddForm(false);
        setNewNom("");
        setNewStock(0);
        setNewPrix(0);
        setNewType(TypeMateriel.None);

        // Forcer la mise à jour de la liste (reload ou callback)
        window.location.reload();
      } else {
        alert("Erreur lors de l'ajout du matériel.");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau.");
    }
  };

  return (
    <>
   <TitrePage titre="Equipements BDS"/>
      {/* Bouton pour afficher le formulaire */}
      {!showAddForm && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 2 }}>
          <Button
            onClick={() => setShowAddForm(true)}
            startIcon={<AddCircleOutlineIcon />}
            color="secondary"
            variant="contained"
            sx={{ backgroundColor: "#7e57c2", fontSize: "0.8rem" }}
          >
            Ajouter un matériel
          </Button>
        </Box>
      )}

      {/* Modal pour afficher le formulaire en overlay */}
      <Modal open={showAddForm} onClose={() => setShowAddForm(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            p: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
          }}
        >
          <form onSubmit={handleAddMaterial}>
            <div>
              <label>Nom du matériel : </label>
              <input
                type="text"
                value={newNom}
                onChange={(e) => setNewNom(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Stock initial : </label>
              <input
                type="number"
                value={newStock}
                onChange={(e) => setNewStock(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Prix : </label>
              <input
                type="number"
                step="0.01"
                value={newPrix}
                onChange={(e) => setNewPrix(e.target.value)}
                required
              />
            </div>
            <div>
              <label>image : </label>
              <input
                type="text"
                value={newImage || "BazarDesSport-Front/public/image/LogoBDS.png"}
                onChange={(e) => setNewImage(e.target.value)}
                
              />
            </div>

            <div>
              <label>Type de matériel : </label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Ballon">Ballon</option>
                <option value="Equipement">Equipement</option>
                <option value="Logistique">Logistique</option>
              </select>
            </div>

            <br />
            <Button
              type="submit"
              color="success"
              variant="outlined"
              sx={{ fontSize: "0.8rem", mr: 1 }}
            >
              Confirmer l’ajout
            </Button>
            <Button
              type="button"
              onClick={() => setShowAddForm(false)}
              color="error"
              variant="outlined"
              sx={{ fontSize: "0.8rem" }}
            >
              Annuler
            </Button>
          </form>
        </Box>
      </Modal>
      <ListMaterial/>
    </>
  );
}
