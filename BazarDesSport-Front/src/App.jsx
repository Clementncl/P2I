import { useState } from 'react'
import './App.css'
import PrimarySearchAppBar from './Component/Searchbar'
import MaterialCard from './Component/MaterielCard'
function App() {
 

  return (
    // <Router>
    // {/* definition Routes  */}
    // <Routes>
    //   <Route path="/accueil" element={<Acceuil />} />
    //   <Route path="/equipement" element={<Equipement />} />
    //   <Route path="/reservation" element={<Reservation />} />
    //   {/* <Route path="/statistiques" element={<Cocktail />} /> */}


    // </Routes>

   <><PrimarySearchAppBar/>
   <MaterialCard/></>

  //  </Router>
  )
}

export default App ;
