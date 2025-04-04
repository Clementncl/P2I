import { useState } from "react";

export default function Connexion() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5039/api/utilisateur");
      const utilisateurs = await res.json();

      const utilisateur = utilisateurs.find(
        (u) => u.email === email && u.passwordHash === password
      );

      if (utilisateur) {
        // Stockage dans localStorage
        localStorage.setItem("userId", utilisateur.id);
        localStorage.setItem("userNom", utilisateur.nom);
        localStorage.setItem("userPrenom", utilisateur.prénom);

        alert("Connexion réussie !");
        window.location.href = "/accueil"; // ou useNavigate() si tu veux
      } else {
        alert("Identifiants incorrects");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Se connecter</button>
      <p>  Pas encore inscrit ? <a href="/inscription">Créer un compte</a> </p>
    </div>
  );
}
