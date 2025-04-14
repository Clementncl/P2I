// Appelle l’API pour récupérer tous les matériels et
//les affiche avec MaterielCard dans une grille réactive.

import { useState, useEffect } from "react";
import MaterialCard from "./MaterielCard";

const url = "http://localhost:5039/api/materiel";

export default function ListMaterial() {
  const [materials, setMaterials] = useState([]);
  const role = localStorage.getItem("userRole");

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMaterials(data || []))
      .catch((error) => console.error("Erreur lors du chargement :", error));
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {materials.map(
        (material) => (
          (
            <MaterialCard
              admin={role === "0"}
              key={material.id}
              id={material.id}
              nom={material.nom}
              image={material.image}
              stock={material.stock}
            />
          )
        )
      )}
    </div>
  );
}
