import  { useState, useEffect } from "react";
import MaterialCard from "./MaterielCard";

const url =  "http://localhost:5039/api/materiel"; 

export default function ListMaterial() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMaterials(data || []))
      .catch((error) => console.error("Erreur lors du chargement :", error));
  }, []);

  return (
    
    <div style={{ display: "flex", flexWrap: "wrap",  gap: "20px" }}>
      {materials.map((material) => (
       <MaterialCard 
       key={material.id || material._id}
       nom={material.nom} 
       image={material.image || "default.jpg"} 
       stock={material.stock} 
       
     />
      ))}
    </div>
  );
}
