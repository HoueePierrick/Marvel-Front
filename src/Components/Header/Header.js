// Import of CSS and FontAwesome
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import of links to other pages
import { Link } from 'react-router-dom';

// Hooks import
import { useState } from "react";

const Header = (props) => {
    const [page, setPage] = useState("characters"); // state tracking the page asked (by default is "characters")
    const [wantLogIn, setWantLogIn] = useState(0); // state tracking whether the user tries to log in (by default 0, if clicks on Sign In, becomes 1)
    const [wantJoin, setWantJoin] = useState(0); // state tracking whether the user tries to sign in (by default 0, if clicks on Join, becomes 1)
    const [logEmail, setLogEmail] = useState("") // state to stock the email when the user tries to log in
    const [logPass, setLogPass] = useState("") // state to stock the password when the user tries to log in
    const [token, setToken] = useState("") // state to stock the token after login
    const [firstName, setFirstName] = useState("") // state to stock user first name at account creation
    const [lastName, setLastName] = useState("") // state to stock user last name at account creation
    const [accountEmail, setAccountEmail] = useState("") // state to stock user email at account creation
    const [accountPass, setAccountPass] = useState("") // state to stock user password at account creation
    const [APVisible, setAPVisible] = useState(false) // state to make user account password visible at creation
    const [confirm, setConfirm] = useState("") // state to stock password confirmation at account creation
    const [birthdate, setBirthdate] = useState(null) // state to stock birthdate at account creation
    const [WaltDisney, setWaltDisney] = useState(false) // state to stock user willingness to get Walt Disney offers at account creation
    const [newsletter, setNewsletter] = useState(false) // state to stock uses willingness to register to the newsletter at account creation
    const [country, setCountry] = useState("France") // state to stock user country at account creation
    const [wantCtryChg, setWantCtryChg] = useState(false) // state to check whether the user wants to change his registration countr

    const {search, setSearch, lookedAt, pendSearch, setPendSearch} = props;
    if(pendSearch==="") {setSearch("")}

    return (
        <header>
            <div className="top-div">
                <div className="log-sign">
                    <FontAwesomeIcon icon="arrow-right-to-bracket" className='login-icon'></FontAwesomeIcon>
                    <span onClick={(e) => {setWantLogIn(1); setWantJoin(0)}} className="action">SIGN IN</span>
                    <span> | </span>
                    <span onClick={(e) => {setWantJoin(1); setWantLogIn(0)}} className="action">JOIN</span>
                </div>
                <div className='search-one-container'>
                    <input className="search-one" placeholder={lookedAt==="characters" ? 'Search for a character' : lookedAt==="comics" ? 'Search for a comic' : lookedAt==="favorite-character" ? 'Search for one of your favorite characters' : lookedAt==="favorite-comic" && 'Search for one of your favorite comics'}
                    value={pendSearch} onChange={(e) => {setPendSearch(e.target.value);}} onKeyDown={(e) => {if(e.key === "Enter") {setSearch(e.target.value)}}}></input>
                    <FontAwesomeIcon icon="magnifying-glass" className='search-icon' onClick={(e) => {setSearch(pendSearch)}}></FontAwesomeIcon>
                </div>
                <img src={require("../../Content/Marvel_Logo.svg.png")} alt="Marvel's logo" className="Marvel-logo"/>
            </div>
            <div className='search-two-container'>
                <input className="search-two" placeholder={lookedAt==="characters" ? 'Search for a character' : lookedAt==="comics" ? 'Search for a comic' : lookedAt==="favorite-character" ? 'Search for one of your favorite characters' : lookedAt==="favorite-comic" && 'Search for one of your favorite comics'}
                    value={pendSearch} onChange={(e) => {setPendSearch(e.target.value);}} onKeyDown={(e) => {if(e.key === "Enter") {setSearch(e.target.value)}}}></input>
                <FontAwesomeIcon icon="magnifying-glass" className='search-icon' onClick={(e) => {setSearch(pendSearch)}}></FontAwesomeIcon>
            </div>
            <div className='menu'>
                {lookedAt==="characters" ?
                <span className='current-page'>PERSONNAGES</span>
                :
                <Link to="/" className='menu-link' onClick={(e) => {setPage("characters")}}>PERSONNAGES</Link>
                }
                {lookedAt==="comics" ?
                <span className='current-page'>COMICS</span>
                :
                <Link to="/comics" className='menu-link' onClick={(e) => {setPage("comics")}}>COMICS</Link>
                }
                {page==="favorites" ? // to be improved
                <span className='current-page'>FAVORIS</span>
                :
                <Link to="/favorites" className='menu-link' onClick={(e) => {setPage("favorites")}}>FAVORIS</Link>
                }
            </div>
            {wantLogIn === 1 && 
                <>
                    <div className='full-signin-modal'></div>
                    <div className='real-signin-modal'>
                        <div>
                            <div className='closing-sign-modal'>
                                <FontAwesomeIcon icon="xmark" onClick={(e) => {setWantLogIn(0)}}></FontAwesomeIcon>
                            </div>
                            <div className='sign-modal-logos'>
                                <img src={require("../../Content/Marvel_Logo.svg.png")} alt="Marvel's logo" className="Marvel-logo"/>
                                <img src={require("../../Content/marvel-insider.png")} alt="Marvel insider logo" className='Marvel-logo'></img>
                            </div>
                            <div className='sign-in-modal'>SIGN IN</div>
                            <form className='signin-form'>
                                <input type="text" className='signin-input' placeholder='Email Address' value={logEmail} onChange={(e) => {setLogEmail(e.target.value)}}/>
                                <input type="password" className='signin-input' placeholder='Password' value={logPass} onChange={(e) => {setLogPass(e.target.value)}}/>
                                <button type="submit" className='signin-submit'>SIGN IN</button>
                            </form>
                            <button className='signin-create' onClick={(e) => {setWantLogIn(0); setWantJoin(1)}}>CREATE AN ACCOUNT</button>
                            <div className='div-placeholder'></div>
                        </div>
                    </div>
                </>
            }
            {wantJoin === 1 && 
                <>
                    <div className='full-signin-modal'></div>
                    <div className='real-signin-modal'>
                        <div className='closing-sign-modal'>
                            <FontAwesomeIcon icon="xmark" onClick={(e) => {setWantJoin(0)}}></FontAwesomeIcon>
                        </div>
                        <div className='sign-modal-logos'>
                            <img src={require("../../Content/Marvel_Logo.svg.png")} alt="Marvel's logo" className="Marvel-logo"/>
                            <img src={require("../../Content/marvel-insider.png")} alt="Marvel insider logo" className='Marvel-logo'></img>
                        </div>
                        <div className='sign-in-modal'>CREATE YOUR ACCOUNT</div>
                        <form className='signin-form'>
                                <input type="text" className='signin-input' placeholder='First name' value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                                <input type="password" className='signin-input' placeholder='Last name' value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                                <input type="email" className='signin-input' placeholder='Email address' value={accountEmail} onChange={(e) => {setAccountEmail(e.target.value)}}/>
                                <input type="password" className='signin-input' placeholder='Password' value={accountPass} onChange={(e) => {setAccountPass(e.target.value)}}></input>
                                <div className='checked-signin-input' id="first-checked-input">
                                    <input type="checkbox" className='signin-checkbox' id="show-password"/>
                                    <label htmlFor='show-password' className='signin-check-label'>Show password</label>
                                </div>
                                <input type="password" className='signin-input' placeholder='Confirm password'></input>
                                <label htmlFor="birth-date" className='birth-label'>Birth date:</label>
                                <input type="date" className='signin-input' placeholder='Birth Date dd / mm / yyyy' id="birth-date"/>
                                <div className='checked-signin-input'>
                                    <input type="checkbox" className='signin-checkbox' id="email-offers"/>
                                    <span htmlFor='email-offers' className='signin-check-label'>
                                        <span>Yes! I would like to receive by email special offers and updates about Marvel and other products and services from</span>
                                        <a className='link' target="_blank" rel="noreferrer" href="https://privacy.thewaltdisneycompany.com/en/definitions/#The-Walt-Disney-Family-of-Companies">The Walt Disney Family of Companies</a>
                                    </span>
                                </div>
                                <div className='checked-signin-input'>
                                    <input type="checkbox" className='signin-checkbox' id="newsletter"/>
                                    <label htmlFor='newsletter' className='signin-check-label'>Yes, I would like to receive Marvel's Need To Know newsletter for news, video/podcast updates, and more.</label>
                                </div>
                                <div className='last-desc'>
                                    <span className='classic'>By creating an account, you agree to our</span>
                                    <a className='link' target="_blank" rel="noreferrer" href="https://disneytermsofuse.com/english/">Terms of Use</a>
                                    <span className='classic'>and acknowledge that you have read our</span>
                                    <a className='link' target="_blank" rel="noreferrer" href='https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/'>Privacy Policy</a>
                                    <span className='classic'>, </span>
                                    <a className='link' target="_blank" rel="noreferrer" href='https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/cookies-policy/'>Cookies Policy</a>
                                    <span className='classic'>and</span>
                                    <a className='link' target="_blank" rel="noreferrer" href="https://privacy.thewaltdisneycompany.com/en/current-privacy-policy/privacy-notice/">UK & EU Privacy Rights</a>
                                    <span className='classic'>,</span>
                                    <a className='link' target="_blank" rel="noreferrer" href="https://cdn.registerdisney.go.com/v4/bundle/web/MARVEL-MARVEL.COM.WEB/en-US?cssOverride=https://www.marvel.com/static/oneid/styles/marvel-oneid.css&logLevel=INFO#">More...</a>
                                </div>
                                <div className='last-desc'>
                                    <span className='classic'>My home country/region: France.</span>
                                    <span className='link'>Change</span>
                                </div>
                                <button type="submit" className='signin-submit'>CREATE ACCOUNT</button>
                            </form>
                            <div>
                                <span className='classic'>Already have an account?</span>
                                <span className='link' onClick={(e) => {setWantJoin(0); setWantLogIn(1)}}>Sign In</span>
                            </div>
                            <div className='div-placeholder'></div>
                    </div>
                </>
            }
        </header>
    )
}

export default Header