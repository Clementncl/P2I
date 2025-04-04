import { useState } from "react";

export default function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleInscription = async () => {
    if (!email || !motDePasse || !nom || !prenom) {
      alert("Tous les champs sont requis !");
      return;
    }

    try {
      const response = await fetch("http://localhost:5039/api/utilisateur", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nom: nom,
          prénom: prenom,
          email: email,
          passwordHash: motDePasse, 
        }),
      });

      if (response.ok) {
        alert("Inscription réussie !");
        window.location.href = "/connexion"; // redirige vers la page de connexion
      } else {
        alert("Erreur lors de l'inscription.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div>
      <h2>Créer un compte</h2>
      <input
        type="text"
        placeholder="Nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      /><br />
      <input
        type="text"
        placeholder="Prénom"
        value={prenom}
        onChange={(e) => setPrenom(e.target.value)}
      /><br />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={motDePasse}
        onChange={(e) => setMotDePasse(e.target.value)}
      /><br />
      <button onClick={handleInscription}> S&apos;inscrire</button>
    </div>
  );
}
