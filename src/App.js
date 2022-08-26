// Import of CSS
import './App.css';

// Import of hooks
import React, { useState, useEffect } from "react";

// Import of Cookies;
import Cookies from 'js-cookie';

// Import of React Router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

// Import of components and pages
import Header from './Components/Header/Header';
import Characters from './Pages/Characters/Characters';
import Comics from './Pages/Comics/Comics';
import Favorites from './Pages/Favorites/Favorites';

// FontAwesome icons import
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRightToBracket, faXmark, faMagnifyingGlass, faAngleLeft, faAngleRight, faCaretDown, faEye, faEyeSlash, faHeart} from '@fortawesome/free-solid-svg-icons';
library.add(faArrowRightToBracket, faXmark, faMagnifyingGlass, faAngleLeft, faAngleRight, faCaretDown, faEye, faEyeSlash, faHeart);


function App() {
  const [lookedAt, setLookedAt] = useState("characters") // state to choose what is being looked at in search => characters by default
  const [search, setSearch] = useState("") // state to stock what is being searched in the top bar => empty by default
  const [pendSearch, setPendSearch] = useState("") // stocks the search being typed in before clicking on entry
  const [token, setToken] = useState("") // state to stock the token after login
  const [userEmail, setUserEmail] = useState(""); // state to stock the logged user's email
  const [favChars, setFavChars] = useState([]); // state to stock the list of all favorite characters associated with the user account
  const [favComics, setFavComics] = useState([]); // state to stock the list of all favorite comics associated with the user account

  useEffect(() => {
    setToken(Cookies.get("token"));
    setUserEmail(Cookies.get("token"));
  }, [])

  return (
    <>
      <Router>
        <Header setSearch={setSearch} lookedAt={lookedAt} pendSearch={pendSearch} setPendSearch={setPendSearch} setLookedAt={setLookedAt} token={token} setToken={setToken} setUserEmail={setUserEmail} setFavChars={setFavChars} setFavComics={setFavComics}></Header>
        <Routes>
          <Route path="/" element={<Characters search={search} setSearch={setSearch} setLookedAt={setLookedAt} setPendSearch={setPendSearch} lookedAt={lookedAt} token={token} userEmail={userEmail} setFavChars={setFavChars} favChars={favChars}></Characters>}></Route>
          <Route path="/comics" element={<Comics search={search} setSearch={setSearch} setLookedAt={setLookedAt} setPendSearch={setPendSearch} lookedAt={lookedAt} token={token} userEmail={userEmail} setFavComics={setFavComics} favComics={favComics}></Comics>}></Route>
          <Route path="/favorites" element={<Favorites setSearch={setSearch} setLookedAt={setLookedAt} setPendSearch={setPendSearch} lookedAt={lookedAt} setFavChars={setFavChars} setFavComics={setFavComics} favChars={favChars} favComics={favComics} token={token} userEmail={userEmail} setUserEmail={setUserEmail}></Favorites>}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
