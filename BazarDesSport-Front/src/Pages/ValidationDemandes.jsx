
// Page qui permetttra de valider les demandes d'enprunts de matériel des adhérents par le bds
import ConstructionIcon from "@mui/icons-material/Construction";
import TitrePage from "../Component/TitrePage";
import { Box } from "@mui/material";

export default function ValidationDemandes() {
  return (
    <>
      <TitrePage titre="Validation des emprunts" />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <h2>En cours de developpement</h2>
        <ConstructionIcon sx={{ fontSize: 60 }} />
      </Box>
    </>
  );
}
