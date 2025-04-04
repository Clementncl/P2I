import { useState, useEffect } from 'react';
import Calendar from 'react-calendar'; 
export default function Reservation() {
  const [date, setDate] = useState(new Date());
  const [reservations, setReservations] = useState([]);


  useEffect(() => {
    loadReservations();
  }, [date]);

  const loadReservations = async () => {
    const month = date.getMonth() + 1; // Mois commence à 0 (janvier = 0)
    const year = date.getFullYear();
    const response = await fetch(`http://localhost:5039/api/reservation/Mensuelle?mois=${month}&an=${year}`);
    const data = await response.json();
    setReservations(data);
 
  
  // Convertir la date en objet Date pour chaque réservation
  const reservationsWithDate = data.map(reservation => ({
   ...reservation,
   Date: new Date(reservation.Date) // Conversion du format ISO en Date pour le front
 }));
 setReservations(reservationsWithDate);

 const validReservations = reservationsWithDate.filter(reservation => !isNaN(reservation.Date.getTime()));
 setReservations(validReservations);
};

  return (
    <div>
      <h1>Mes Réservations</h1>
      <div>
        <Calendar
          onChange={setDate}
          value={date}
          // Affichage des réservations sur le calendrier 
        />
      </div>
      <div>
        <h2>Réservations de ce mois</h2>
        <ul>
          {reservations.map((reservation) => (
            <li key={reservation.Id}>
              {reservation.MaterielId} - {new Date(reservation.Date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
