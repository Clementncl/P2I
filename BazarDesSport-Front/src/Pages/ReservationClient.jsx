//Affiche un calendrier avec les jours contenant des réservations (colorés),
// un tableau récapitulatif et une modal de suppression.

import { Modal, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import TitrePage from "../Component/TitrePage";

export default function Reservation() {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [reservationsSelectionnees, setReservationsSelectionnees] = useState(
    []
  );
  const [modalOuvert, setModalOuvert] = useState(false);
  const styleModal = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  useEffect(() => {
    loadReservations();
  }, [date]);

  useEffect(() => {}, [reservations]);

  useEffect(() => {
    loadMateriels();
  }, []);

  const loadReservations = async () => {
    const mois = date.getMonth() + 1; // Mois commence à 0 (janvier = 0)
    const annee = date.getFullYear();
    const response = await fetch(
      `http://localhost:5039/api/reservation/Mensuelle?mois=${mois}&an=${annee}`
    );
    const data = await response.json();

    const userId = localStorage.getItem("userId"); // Récupération de l'ID de l'utilisateur connecté

    // Filtrage des réservations pour l'utilisateur connecté
    const dataFiltrees = data.filter(
      (reservation) => reservation.utilisateurId === userId
    );
    // Conversion de la date en objet Date pour chaque réservation
    const reservationsAvecDate = dataFiltrees.map((reservation) => ({
      ...reservation,
      Date: new Date(reservation.date),
    }));
    const reservationsValides = reservationsAvecDate.filter(
      (reservation) => !isNaN(reservation.Date.getTime())
    );
    setReservations(reservationsValides);
  };

  const loadMateriels = async () => {
    try {
      const response = await fetch("http://localhost:5039/api/materiel");
      const data = await response.json();
      setMateriels(data);
    } catch (error) {
      console.error("Erreur lors du chargement des matériels :", error);
    }
  };

  const materielMap = materiels.reduce((map, m) => {
    map[m.id] = m.nom;
    return map;
  }, {});

  // Tri des réservations par nom de matériel
  const sortedReservations = [...reservations].sort((a, b) => {
    const nomA = materielMap[a.materielId] || "";
    const nomB = materielMap[b.materielId] || "";
    return nomA.localeCompare(nomB);
  });

  const estLeMemeJour = (d1, d2) => {
    return d1.toISOString().slice(0, 10) === d2.toISOString().slice(0, 10);
  };

  const handleCancelReservation = async () => {
    if (!window.confirm("Voulez-vous vraiment annuler cette réservation ?"))
      return;
    if (reservationsSelectionnees.length > 0) {
      const reservationId = reservationsSelectionnees[0].id; // Utilisation de la première réservation sélectionnée
      try {
        const response = await fetch(
          `http://localhost:5039/api/reservation/${reservationId}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          alert("Réservation annulée !");
          setModalOuvert(false);
          window.location.reload();
        } else {
          alert("Erreur lors de l'annulation");
        }
      } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur réseau");
      }
    }
  };
  console.log("reservation", reservations);
  console.log("sortedReservations", sortedReservations);
  return (
    <div>
      <style>{`
        /* Style surchargé pour react-calendar */
        .react-calendar {
          width: 100%; 
          max-width: 800px; /* Augmente la largeur du calendrier */
          margin: auto;   /* Centre le calendrier */
          font-family: Arial, Helvetica, sans-serif;
          font-size: 1rem;
          line-height: 1.125em;
        }
        .react-calendar__navigation button {
          min-width: 44px;
          background: none;
          font-size: 1.2rem;
          margin: 0 2px;
        }
        .react-calendar__tile {
          padding: 10px 6.6667px;
          background: white;
        }
        .jour-reservation {
          background-color: rgb(144, 72, 216) !important;
          border-radius: 0%;
        }
     
      `}</style>
      <TitrePage titre="Mes Réservations" />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Calendar
          fontSize="1.25rem"
          fontWeight="bold"
          color="#4a148c"
          padding="0.5rem 0"
          onChange={setDate}
          value={date}
          next2Label={null}
          prev2Label={null}
          // Coloration des jours où il y a une réservation
          tileClassName={({ date: dateTuile, view }) => {
            if (view === "month") {
              const aReservation = reservations.some((r) =>
                estLeMemeJour(r.Date, dateTuile)
              );
              return aReservation ? "jour-reservation" : null;
            }
            return null;
          }}
          onClickDay={(jourClique) => {
            const resDuJour = reservations.filter((r) =>
              estLeMemeJour(r.Date, jourClique)
            );
            if (resDuJour.length > 0) {
              setReservationsSelectionnees(resDuJour);
              setModalOuvert(true);
            } else {
              setReservationsSelectionnees([]);
            }
          }}
          nextLabel={
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#7e57c2",
              }}
            >
              &#x203A;
            </span>
          }
          prevLabel={
            <span
              style={{
                fontSize: "1.3rem",
                fontWeight: "bold",
                color: "#7e57c2",
              }}
            >
              &#x2039;
            </span>
          }
          navigationLabel={({ label }) => (
            <div
              style={{
                fontSize: "1rem",
                fontWeight: "bold",
                color: "#4a148c",
                padding: "0.2rem 4",
              }}
            >
              {label}
            </div>
          )}
        />
      </div>

      {/* Affichage en overlay du détail des réservations pour la date sélectionnée */}
      <Modal
        open={modalOuvert}
        onClose={() => setModalOuvert(false)}
        aria-labelledby="titre-modal"
        aria-describedby="description-modal"
      >
        <Box sx={styleModal}>
          <h3 id="titre-modal">
            Détails des réservations pour le{" "}
            {reservationsSelectionnees.length > 0 &&
              reservationsSelectionnees[0].Date.toLocaleDateString()}
          </h3>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "1.2rem" }}>
            {reservationsSelectionnees.map((res, index) => (
              <li key={res.id || index}>
                Matériel : {materielMap[res.materielId] || res.materielId} -
                Quantité : {res.quantite || "-"}
              </li>
            ))}
          </ul>
          <Box display="flex" gap={2} justifyContent="normal">
            <Button
              onClick={() =>
                handleCancelReservation(reservationsSelectionnees[0].id)
              }
              color="error"
              variant="contained"
              sx={{ mt: 2, fontSize: "1rem" }}
            >
              Annuler ma réservation
            </Button>
            <Button
              onClick={() => setModalOuvert(false)}
              variant="contained"
              sx={{ mt: 2, fontSize: "1rem", backgroundColor: "#7e57c2" }}
            >
              Fermer
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
