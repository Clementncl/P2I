import React, { useState, useEffect } from "react";
import MaterialCard from "./MaterielCard";

const url = "https://localhost:7274"; // Remplace par ton URL API

export default function ListMaterial() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMaterials(data || []))
      .catch((error) => console.error("Erreur lors du chargement :", error));
  }, []);

  return (
    <>
      {materials.map((material) => (
        <MaterialCard
          key={material.id} // Utilisation correcte de l'id
          nom={material.nom}
          image={material.image}
        />
      ))}
    </>
  );
}
