import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

function TitrePage({titre}) {
  return (
    <Box 
      sx={{ 
        display: "flex",
        justifyContent: "center",
        my: 3
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ 
          fontWeight: "bold", 
          color: "#7e57c2" 
        }}
      >
        {titre}
      </Typography>
    </Box>
  );
}
TitrePage.propTypes = {
    titre: PropTypes.string.isRequired,
  };
  

export default TitrePage;
