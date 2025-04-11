//Affiche un calendrier avec les jours contenant des réservations (colorés),
// un tableau récapitulatif et une modal de suppression.

import { Modal, Box, Button } from "@mui/material";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import TitrePage from "../Component/TitrePage";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Reservation() {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const [materiels, setMateriels] = useState([]);
  const [utilisateurs, setUtilisateurs] = useState([]);
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

  useEffect(() => {
    loadMateriels();
  }, []);
  useEffect(() => {
    loadUtilisateurs();
  }, []);

  const loadReservations = async () => {
    const mois = date.getMonth() + 1; // Mois commence à 0 (janvier = 0)
    const annee = date.getFullYear();
    const response = await fetch(
      `http://localhost:5039/api/reservation/Mensuelle?mois=${mois}&an=${annee}`
    );
    const data = await response.json();
    console.log("données", data);

    const reservationsAvecDate = data.map((reservation) => ({
      ...reservation,
      Date: new Date(reservation.date),
    }));
    // Conversion de la date en objet Date pour chaque réservation

    console.log("reservation.date", reservations.date);
    const reservationsValides = reservationsAvecDate.filter(
      (reservation) => !isNaN(reservation.Date.getTime())
    );
    setReservations(reservationsValides);
  };

  const loadUtilisateurs = async () => {
    try {
      const response = await fetch("http://localhost:5039/api/utilisateur");
      const data = await response.json();
      setUtilisateurs(data);
    } catch (error) {
      console.error("Erreur lors du chargement des utilisateurs :", error);
    }
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
  const utilisateurMap = utilisateurs.reduce((map, u) => {
    map[u.id] = `${u.prenom} ${u.nom}`;
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

  // Fonction de supression de réservation
  const handleDelete = async (reservationId) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cette réservation ?"))
      return;
    try {
      const response = await fetch(
        `http://localhost:5039/api/reservation/${reservationId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        alert("Réservation supprimé !");
        window.location.reload();
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur réseau");
    }
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
        .jour-reservation {
          background-color: rgb(144, 72, 216) !important;
          border-radius: 0%;
        }
        .calendrier__tile--courant {
          background-color: white !important;
        }
        .calendrier__tile--adjacent {
          color: grey !important;
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
      <div style={{ textAlign: "center", paddingTop: "2rem" }}>
        <TitrePage titre="Réservation du mois" />
        {sortedReservations.length > 0 ? (
          <table
            style={{
              width: "80%",
              margin: "0 auto",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr
                style={{ borderBottom: "1px solid #ccc", textAlign: "center" }}
              >
                <th style={{ padding: "8px" }}>Nom du matériel</th>
                <th style={{ padding: "8px" }}>Réservé par</th>
                <th style={{ padding: "8px" }}>Date</th>
                <th style={{ padding: "8px" }}>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {sortedReservations.map((reservation, index) => (
                <tr key={reservation.id || index}>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    {materielMap[reservation.materielId] ||
                      reservation.materielId}
                  </td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    {utilisateurMap[reservation.utilisateurId] ||
                      reservation.utilisateurId}
                  </td>

                  <td style={{ padding: "8px", textAlign: "center" }}>
                    {reservation.Date.toLocaleDateString()}
                  </td>
                  <td style={{ padding: "8px", textAlign: "center" }}>
                    {reservation.quantite || "-"}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      onClick={() => handleCancelReservation(reservation.id)}
                      color="error"
                      variant="contained"
                      startIcon={<DeleteIcon />}
                      sx={{ fontSize: "0.6rem", width: "95px" }}
                    >
                      Supprimer
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Aucune réservation pour ce mois.</p>
        )}
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
              onClick={() => handleDelete(reservationsSelectionnees[0].id)}
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
