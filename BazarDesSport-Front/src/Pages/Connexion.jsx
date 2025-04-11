//Formulaire de login vérifiant les identifiants en interrogeant l’API. 
// Stocke l’ID utilisateur dans localStorage en cas de succès.

import { useState } from "react";
import {  Stack, Paper,Typography,Container,TextField,Box,Link,Button} from "@mui/material";
import TitrePage from "../Component/TitrePage";
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
        localStorage.setItem("userPrenom", utilisateur.prenom);
        localStorage.setItem("userRole", utilisateur.role);

        
        window.location.href = "/equipement"; 
      } else {
        alert("Identifiants incorrects");
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la connexion");
    }
  };
  
  return (

    <Container component="main" maxWidth="xs" sx={{ mt: 8,}}>
      <Paper elevation={3} sx={{ p: 3 , borderRadius: 4, backgroundColor: '#f5f5f5' }}>
          <TitrePage titre="Connexion"/>  
        <Stack spacing={2}>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button variant="contained" onClick={handleLogin} fullWidth   sx={{
    backgroundColor: '#7e57c2', 
    color: '#000',
    borderRadius: 3,
    '&:hover': {
      backgroundColor: '#d8d8f0', 
    },
  }}>
            Se connecter
          </Button>

          <Box textAlign="center">
            <Typography variant="body2">
              Pas encore inscrit ?{" "}
              <Link href="/inscription" underline="hover">
                Créer un compte
              </Link>
            </Typography>
          </Box>
        </Stack>
      </Paper>
    </Container>

  );
}
