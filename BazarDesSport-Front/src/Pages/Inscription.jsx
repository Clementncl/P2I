// Page d’inscription avec formulaire complet (nom, prénom, email, mot de passe) connecté à l’API utilisateur.

import { useState } from "react";
import {
  Stack,
  Paper,
  Typography,
  Container,
  TextField,
  Box,
  Link,
  Button,
} from "@mui/material";
import TitrePage from "../Component/TitrePage";

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
          Prenom: prenom,
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
    <Container component="main" maxWidth="xs" sx={{ mt: 8 }}>
      <Paper
        elevation={3}
        sx={{ p: 3, borderRadius: 4, backgroundColor: "#f5f5f5" }}
      >
        <TitrePage titre="Inscription" />
        <Stack spacing={2}>
          <TextField
            label="Nom"
            type="string"
            variant="outlined"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            fullWidth
          />
          <TextField
            label="Prénom"
            type="string"
            variant="outlined"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            fullWidth
          />

          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Mot de passe"
            type="password"
            variant="outlined"
            value={motDePasse}
            onChange={(e) => setMotDePasse(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleInscription}
            fullWidth
            sx={{
              backgroundColor: "#7e57c2",
              color: "#000",
              borderRadius: 3,
              "&:hover": {
                backgroundColor: "#d8d8f0",
              },
            }}
          >
            S&apos;inscrire
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              Déjà inscrit ?{" "}
              <Link href="/connexion" underline="hover">
                Se connecter
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
}
