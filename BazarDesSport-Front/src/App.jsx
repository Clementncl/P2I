import './App.css'
import PrimarySearchAppBar from './Component/Searchbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accueil from './Pages/Accueil'
import Equipement from './Pages/Equipement'
import Reservation from './Pages/Reservation'
import Connexion from './Pages/Connexion';
import Inscription from './Pages/Inscription';
function App() {
 

  return (
    <Router>
         {/* definition Header présent sur toutes les pages  */}
      <PrimarySearchAppBar/>

    {/* definition Routes  */}
    <Routes>
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/equipement" element={<Equipement />} />
      <Route path="/reservation" element={<Reservation/>} />
      <Route path="/connexion" element={<Connexion/>} />
      <Route path="/inscription" element={<Inscription/>} />
    </Routes>

   </Router>
  )
}

export default App ;
