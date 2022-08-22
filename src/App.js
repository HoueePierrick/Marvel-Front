// Import of CSS
import './App.css';

// Import of hooks
import React, { useState, useEffect } from "react";

// Import of React Router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Cookies use
import Cookies from "js-cookie";

// Import of axios
import axios from "axios";

// Import of components and pages
import Header from './Components/Header/Header';
import Characters from './Pages/Characters/Characters';
import Comics from './Pages/Comics/Comics';
import Favorites from './Pages/Favorites/Favorites';

// FontAwesome icons import
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightToBracket, faXmark, faMagnifyingGlass, faAngleLeft, faAngleRight, faCaretDown } from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRightToBracket, faXmark, faMagnifyingGlass, faAngleLeft, faAngleRight, faCaretDown);


function App() {
  const [lookedAt, setLookedAt] = useState("characters") // state to choose what is being looked at in search => characters by default
  const [search, setSearch] = useState("") // state to stock what is being searched in the top bar => empty by default
  const [pendSearch, setPendSearch] = useState("") // stocks the search being typed in before clicking on entry

  return (
    <>
      <Router>
        <Header search={search} setSearch={setSearch} lookedAt={lookedAt} pendSearch={pendSearch} setPendSearch={setPendSearch}></Header>
        <Routes>
          <Route path="/" element={<Characters search={search} setSearch={setSearch} setLookedAt={setLookedAt} pendSearch={pendSearch} setPendSearch={setPendSearch} lookedAt={lookedAt}></Characters>}></Route>
          <Route path="/comics" element={<Comics search={search} setSearch={setSearch} setLookedAt={setLookedAt} pendSearch={pendSearch} setPendSearch={setPendSearch} lookedAt={lookedAt}></Comics>}></Route>
          <Route path="/favorites" element={<Favorites search={search} setSearch={setSearch} setLookedAt={setLookedAt} pendSearch={pendSearch} setPendSearch={setPendSearch} lookedAt={lookedAt}></Favorites>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
