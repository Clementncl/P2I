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
console.log("materials",materials)
  return (
    
    <div style={{ display: "flex", flexWrap: "wrap",  gap: "20px" }}>
      
      {materials.map((material) => (
        console.log("image test",material.image),
       <MaterialCard 
       
       key={material.id}
       id={material.id}
       nom={material.nom} 
       image={material.image} 
       stock={material.stock} 
     />
     
      ))}
    </div>
  );
}
