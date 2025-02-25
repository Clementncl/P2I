import { useState } from 'react'
import './App.css'
import PrimarySearchAppBar from './Component/Searchbar'
import MaterialCard from './Component/MaterielCard'
import { Route, Router, Routes } from 'react-router-dom'
import Acceuil from './Pages/Accueil'
import Equipement from './Pages/Equipement'
function App() {
 

  return (
    <Router>
    {/* definition Routes  */}
    <Routes>
      <Route path="/accueil" element={<Accueil />} />
      <Route path="/equipement" element={<Equipement />} />
      {/* <Route path="/statistiques" element={<Cocktail />} /> */}

    </Routes>

   <><PrimarySearchAppBar/>
   <MaterialCard/></>

   </Router>
  )
}

export default App ;
