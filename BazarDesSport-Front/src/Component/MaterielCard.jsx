import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import SwipeableEdgeDrawer from "./Swipeableedge";

export default function MaterialCard({ nom, image, stock }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={nom} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nom}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {stock} en stock
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        
         <SwipeableEdgeDrawer/>
       
      </CardActions>
    </Card>
  );
}

MaterialCard.propTypes = {
  nom: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  stock: PropTypes.number.isRequired,
};

// Valeurs par défaut (au cas où une prop est manquante)
MaterialCard.defaultProps = {
  nom: "Matériel inconnu",
  image: "",
  stock: 0,
};