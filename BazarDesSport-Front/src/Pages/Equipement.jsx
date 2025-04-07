import { useState } from "react";
import ListMaterial from "../Component/ListMateriel";

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
    <div style={{ padding: "20px" }}>
      <h1>Équipements</h1>

      {/* Bouton pour afficher le formulaire */}
      {!showAddForm && (
        <button onClick={() => setShowAddForm(true)}>Ajouter un matériel</button>
      )}

      {/* Formulaire d'ajout de matériel */}
      {showAddForm && (
        <form onSubmit={handleAddMaterial} style={{ margin: "20px 0" }}>
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
            <label>Type de matériel : </label>
            <select
              value={newType}
              onChange={(e) => setNewType(e.target.value)}
            >
              <option value={TypeMateriel.None}>None</option>
              <option value={TypeMateriel.Ballon}>Ballon</option>
              <option value={TypeMateriel.Equipement}>Equipement</option>
              <option value={TypeMateriel.Logistique}>Logistique</option>
            </select>
          </div>

          <br />
          <button type="submit">Confirmer l’ajout</button>
          <button type="button" onClick={() => setShowAddForm(false)}>
            Annuler
          </button>
        </form>
      )}

      {/* Liste des matériels existants */}
      <ListMaterial />
    </div>
  );
}
