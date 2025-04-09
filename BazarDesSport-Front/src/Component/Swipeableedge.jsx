/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TextField from '@mui/material/TextField';

const drawerBleeding = 56;

// eslint-disable-next-line no-unused-vars
const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: grey[100],
}));

const StyledBox = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
}));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

function SwipeableEdgeDrawer({ window, materielId, utilisateurId }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState('');
  const [quantite, setQuantite] = React.useState(1);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleReservation = async () => {
      // Vérifiez que materielId et utilisateurId ne sont pas vides
       {console.log(materielId ,  utilisateurId)}
      
    try {
      const response = await fetch("http://localhost:5039/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          MaterielId: materielId,
          UtilisateurId: utilisateurId,
          Date: date,
          Quantite: parseInt(quantite),
        }),
      });

      if (response.ok) {
        alert("Réservation réussie !");
        setOpen(false);
      } else {
        alert("Erreur lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Erreur réseau.");
    }
  };

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
      <Box sx={{ textAlign: 'center', pt: 1 }}>
      <Button
            onClick={toggleDrawer(true)}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
          >
            Réserver
          </Button>
      </Box>
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        keepMounted
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0,
          }}
        >
          <Puller />
       
        </StyledBox>

        <StyledBox sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          <TextField
            label="Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            sx={{ my: 2 }}
          />
          <TextField
            label="Quantité"
            type="number"
            fullWidth
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button variant="contained" fullWidth onClick={handleReservation}>
            Confirmer la réservation
          </Button>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  window: PropTypes.func,
  materielId: PropTypes.string.isRequired,
  utilisateurId: PropTypes.string.isRequired,
};

export default SwipeableEdgeDrawer;
