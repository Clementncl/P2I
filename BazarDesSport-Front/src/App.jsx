import './App.css'
import PrimarySearchAppBar from './Component/Searchbar'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Equipement from './Pages/Equipement'
import Reservation from './Pages//Reservation'
import EquipementClient from './Pages/EquipementClient'
import ReservationClient from './Pages/ReservationClient'
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
import ValidationDemandes from './Pages/ValidationDemandes';
function App() {
 
  const role = localStorage.getItem("userRole");
  console.log("role utilisateur :", localStorage.getItem("userRole"));

  return (
    <Router>
         {/* definition Header présent sur toutes les pages  */}
      <PrimarySearchAppBar/>

    {/* definition Routes  */}
    <Routes>     
    <Route path="/" element={<Navigate to="/connexion" replace />} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/inscription" element={<Inscription/>} />
      <Route path="/ValidationDemandes" element={<ValidationDemandes/>} />
      <Route path="/reservation" element={ role === "admin" ? <Reservation /> : <ReservationClient /> } />
      <Route path="/equipement" element={ role === "admin" ? <Equipement /> : <EquipementClient /> } />
    </Routes>

   </Router>
   
  )
}

export default App ;
