// Import of CSS and FontAwesome
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import of links to other pages
import { Link } from 'react-router-dom';

// Hooks import
import { useState, useEffect } from "react";
import axios from 'axios';

// Import of Cookies;
import Cookies from 'js-cookie';

// Import of password checking function
const PasswordCheck = require("../PassValid");

// List of countries
const country_list = ["Select a country","Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];

const Header = (props) => {
    const [wantLogIn, setWantLogIn] = useState(0); // state tracking whether the user tries to log in (by default 0, if clicks on Sign In, becomes 1)
    const [wantJoin, setWantJoin] = useState(0); // state tracking whether the user tries to sign in (by default 0, if clicks on Join, becomes 1)
    const [logEmail, setLogEmail] = useState("") // state to stock the email when the user tries to log in
    const [logPass, setLogPass] = useState("") // state to stock the password when the user tries to log in

    const [firstName, setFirstName] = useState("") // state to stock user first name at account creation
    const [lastName, setLastName] = useState("") // state to stock user last name at account creation
    const [accountEmail, setAccountEmail] = useState("") // state to stock user email at account creation
    const [accountPass, setAccountPass] = useState("") // state to stock user password at account creation
    const [APVisible, setAPVisible] = useState(false) // state to make user account password visible at login or sign-up
    const [confirm, setConfirm] = useState("") // state to stock password confirmation at account creation
    const [BPVisible, setBPVisible] = useState(false) // state to make user account password validation visible at sign-up
    const [birthdate, setBirthdate] = useState(null) // state to stock birthdate at account creation
    const [WaltDisney, setWaltDisney] = useState(false) // state to stock user willingness to get Walt Disney offers at account creation
    const [newsletter, setNewsletter] = useState(false) // state to stock uses willingness to register to the newsletter at account creation
    const [country, setCountry] = useState("France") // state to stock user country at account creation
    const [wantCtryChg, setWantCtryChg] = useState(false) // state to check whether the user wants to change his registration countr
    const [passAnalysis, setPassAnalysis] = useState([]);
    const [badLogin, setBadLogin] = useState([false, ""]); // state to react if login parameters are incorrect and why
    const [badSignIn, setBadSignIn] = useState([false, ""]); // state to react if sign-in parameters are incorrect and why

    const {setSearch, lookedAt, pendSearch, setPendSearch, setLookedAt, token, setToken, setUserEmail, setFavChars, setFavComics} = props;

    useEffect(() => {
        if(pendSearch==="") {setSearch("")}
    }, [pendSearch, setSearch]);

    const HandleLogSubmit = async(event) => {
        if(logEmail && logPass) {
            event.preventDefault();
            const request = `https://reacteur-marvel-back.herokuapp.com/login?logemail=${logEmail}&logpassword=${logPass}`;
            try {
                const response = await axios.get(request)
                Cookies.set("token", response.data.token, {expires: 7});
                setToken(Cookies.get("token"));
                Cookies.set("email", response.data.emailaddress, {expires: 7});
                setUserEmail(Cookies.get("token"));

                let request2 = `https://reacteur-marvel-back.herokuapp.com/favorite/characters/see?email=${logEmail}`;
                const response2 = await axios.get(request2);
                let returned1 = response2.data.AllFavChar;
                let toreturn1 = [];
                for(let i = 0; i < returned1.length; i++) {
                    toreturn1.push(returned1[i].content)
                }
                setFavChars(toreturn1);

                let request3 = `https://reacteur-marvel-back.herokuapp.com/favorite/comics/see?email=${logEmail}`;
                const response3 = await axios.get(request3);
                let returned2 = response3.data.AllFavChar;
                let toreturn2 = [];
                for(let i = 0; i < returned2.length; i++) {
                    toreturn2.push(returned2[i].content)
                }
                setFavComics(toreturn2);

                setWantLogIn(2);
            } catch (error) {
                setBadLogin([true, error.response.data.message])
            }
        } else {
            event.preventDefault();
        }
    }

    const HandleSignInSubmit = async(event) => {
        event.preventDefault();
        if(accountPass !== confirm) {
            setBadSignIn([true, "The passwords that you've entered don't match"])
        } else if(!firstName) {
            setBadSignIn([true, "Please provide a firstname"])
        } else if(!lastName) {
            setBadSignIn([true, "Please provide a surname"])
        } else if(!accountEmail) {
            setBadSignIn([true, "Please provide an email"])
        } else if(!accountPass) {
            setBadSignIn([true, "Please provide a password"])
        } else if(!passAnalysis[0]) {
            setBadSignIn([true, "Please provide a strong password"])
        } else if(!birthdate) {
            setBadSignIn([true, "Please provide a birthdate"])
        } else {
            try {
                const request = `https://reacteur-marvel-back.herokuapp.com/create`;
                const response = await axios.post(request, {
                    firstname: firstName, 
                    lastname: lastName, 
                    emailaddress: accountEmail, 
                    password: accountPass, 
                    birthdate: birthdate, 
                    specialoffers: WaltDisney, 
                    newsletter: newsletter, 
                    country: country
                });
                Cookies.set("token", response.data.token, {expires: 7});
                setToken(Cookies.get("token"));
                Cookies.set("email", response.data.emailaddress, {expires: 7});
                setUserEmail(Cookies.get("email"));
                setWantJoin(2);
            } catch (error) {
                setBadSignIn([true, error.response.data.message])
            }
        }
    }

    return (
        <header>
            <div className="top-div">
                {!token ?
                <div className="log-sign">
                    <FontAwesomeIcon icon="arrow-right-to-bracket" className='login-icon'></FontAwesomeIcon>
                    <span onClick={(e) => {setWantLogIn(1); setWantJoin(0); setPassAnalysis([])}} className="action">SIGN IN</span>
                    <span> | </span>
                    <span onClick={(e) => {setWantJoin(1); setWantLogIn(0); setPassAnalysis([])}} className="action">JOIN</span>
                </div>
                :
                <div className="log-sign">
                    <span onClick={(e) => {setToken(""); setUserEmail(""); Cookies.remove("token"); Cookies.remove("email")}}> LOG OUT </span>
                </div>
                }
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
                <Link to="/" className='menu-link' onClick={(e) => {setLookedAt("characters")}}>PERSONNAGES</Link>
                }
                {lookedAt==="comics" ?
                <span className='current-page'>COMICS</span>
                :
                <Link to="/comics" className='menu-link' onClick={(e) => {setLookedAt("comics")}}>COMICS</Link>
                }
                {token ?
                    lookedAt==="favorites" ? // to be improved
                        <span className='current-page'>FAVORIS</span>
                    :
                        <Link to="/favorites" className='menu-link' onClick={(e) => {setLookedAt("favorites")}}>FAVORIS</Link>
                :
                <span className='current-page'></span>
                }
            </div>
            {wantLogIn === 1 ? 
                <>
                    <div className='full-signin-modal'></div>
                    <div className='real-signin-modal'>
                        <div>
                            <div className='closing-sign-modal'>
                                <FontAwesomeIcon icon="xmark" onClick={(e) => {setWantLogIn(0); setPassAnalysis([]); setBadLogin([false, ""]); setBadSignIn([false, ""])}}></FontAwesomeIcon>
                            </div>
                            <div className='sign-modal-logos'>
                                <img src={require("../../Content/Marvel_Logo.svg.png")} alt="Marvel's logo" className="Marvel-logo"/>
                                <img src={require("../../Content/marvel-insider.png")} alt="Marvel insider logo" className='Marvel-logo'></img>
                            </div>
                            <div className='sign-in-modal'>SIGN IN</div>
                            <form className='signin-form' onSubmit={HandleLogSubmit}>
                                <input type="email" className='signin-input' placeholder='Email Address' value={logEmail} onChange={(e) => {setLogEmail(e.target.value)}}/>
                                {!logEmail && <span className='email-miss'>Veuillez fournir un email</span>}
                                {!APVisible ?
                                    <div className='input-password'>
                                        <input type="password" className='signin-input' placeholder='Password' value={logPass} onChange={(e) => {setLogPass(e.target.value); setPassAnalysis(PasswordCheck(e.target.value))}}/>
                                        <FontAwesomeIcon icon="eye" className='eye-password' onClick={(e) => {setAPVisible(true)}}></FontAwesomeIcon>
                                        {!passAnalysis[0] ? <span className='pass-miss'>{passAnalysis[1]}</span> : <span className='pass-correct'>Your password is strong</span>}
                                    </div>
                                :
                                    <div className='input-password'>
                                        <input type="string" className='signin-input' placeholder='Password' value={logPass} onChange={(e) => {setLogPass(e.target.value); setPassAnalysis(PasswordCheck(e.target.value))}}/>
                                        <FontAwesomeIcon icon="eye-slash" className='eye-password' onClick={(e) => {setAPVisible(false)}}></FontAwesomeIcon>
                                        {!passAnalysis[0] ? <span className='pass-miss'>{passAnalysis[1]}</span> : <span className='pass-correct'>Your password is strong</span>}
                                    </div>
                                }
                                <button type="submit" className='signin-submit'>SIGN IN</button>
                                {badLogin[0] && <span className='badlogin'>{badLogin[1]}</span>}
                            </form>
                            <button className='signin-create' onClick={(e) => {setWantLogIn(0); setWantJoin(1); setPassAnalysis([]); setBadSignIn([false, ""]); setBadLogin([false, ""])}}>CREATE AN ACCOUNT</button>
                            <div className='div-placeholder'></div>
                        </div>
                    </div>
                </>
            :
            wantLogIn === 2 && 
                <>
                    <div className='full-signin-modal'></div>
                    <div className='real-signin-modal'>
                        <div className='login-succ-contain'>
                            <div className='closing-sign-modal'>
                                <FontAwesomeIcon icon="xmark" onClick={(e) => {setWantLogIn(0); setPassAnalysis([]); setBadLogin([false, ""]); setBadSignIn([false, ""])}}></FontAwesomeIcon>
                            </div>
                            <span className='login-success'>You're logged in with success !</span>
                        </div>
                    </div>
                </>
            }
            {wantJoin === 1 ? 
                <>
                    <div className='full-signin-modal'></div>
                    <div className='real-signin-modal'>
                        <div className='closing-sign-modal'>
                            <FontAwesomeIcon icon="xmark" onClick={(e) => {setWantJoin(0); setPassAnalysis([])}}></FontAwesomeIcon>
                        </div>
                        <div className='sign-modal-logos'>
                            <img src={require("../../Content/Marvel_Logo.svg.png")} alt="Marvel's logo" className="Marvel-logo"/>
                            <img src={require("../../Content/marvel-insider.png")} alt="Marvel insider logo" className='Marvel-logo'></img>
                        </div>
                        <div className='sign-in-modal'>CREATE YOUR ACCOUNT</div>
                        <form className='signin-form' onSubmit={HandleSignInSubmit}>
                                <input type="text" className='signin-input' placeholder='First name' value={firstName} onChange={(e) => {setFirstName(e.target.value)}}/>
                                <input type="text" className='signin-input' placeholder='Last name' value={lastName} onChange={(e) => {setLastName(e.target.value)}}/>
                                <input type="email" className='signin-input' placeholder='Email address' value={accountEmail} onChange={(e) => {setAccountEmail(e.target.value)}}/>
                                {!accountEmail && <span className='email-miss'>Veuillez fournir un email</span>}
                                {!APVisible ?
                                    <div className='input-password'>
                                        <input type="password" className='signin-input' placeholder='Password' value={accountPass} onChange={(e) => {setAccountPass(e.target.value); setPassAnalysis(PasswordCheck(e.target.value))}}/>
                                        <FontAwesomeIcon icon="eye" className='eye-password' onClick={(e) => {setAPVisible(true)}}></FontAwesomeIcon>
                                        {!passAnalysis[0] ? <span className='pass-miss'>{passAnalysis[1]}</span> : <span className='pass-correct'>Your password is strong</span>}
                                    </div>
                                :
                                    <div className='input-password'>
                                        <input type="string" className='signin-input' placeholder='Password' value={accountPass} onChange={(e) => {setAccountPass(e.target.value); setPassAnalysis(PasswordCheck(e.target.value))}}/>
                                        <FontAwesomeIcon icon="eye-slash" className='eye-password' onClick={(e) => {setAPVisible(false)}}></FontAwesomeIcon>
                                        {!passAnalysis[0] ? <span className='pass-miss'>{passAnalysis[1]}</span> : <span className='pass-correct'>Your password is strong</span>}
                                    </div>
                                }
                                {!BPVisible ?
                                    <div className='input-password'>
                                        <input type="password" className='signin-input' placeholder='Confirm password' value={confirm} onChange={(e) => {setConfirm(e.target.value)}}/>
                                        <FontAwesomeIcon icon="eye" className='eye-password' onClick={(e) => {setBPVisible(true)}}></FontAwesomeIcon>
                                        {accountPass !== confirm ? <span className='pass-miss'>Les deux mots de passe entrés ne correspondent pas.</span> : <span className='pass-correct'>Les deux mots de passe correspondent.</span>}
                                    </div>
                                :
                                    <div className='input-password'>
                                        <input type="string" className='signin-input' placeholder='Password' value={confirm} onChange={(e) => {setConfirm(e.target.value)}}/>
                                        <FontAwesomeIcon icon="eye-slash" className='eye-password' onClick={(e) => {setBPVisible(false)}}></FontAwesomeIcon>
                                        {accountPass !== confirm ? <span className='pass-miss'>Les deux mots de passe entrés ne correspondent pas.</span> : <span className='pass-correct'>Les deux mots de passe correspondent.</span>}
                                    </div>
                                }
                                <label htmlFor="birth-date" className='birth-label'>Birth date:</label>
                                <input type="date" className='signin-input' placeholder='Birth Date dd / mm / yyyy' id="birth-date" onChange={(e) => {setBirthdate(e.target.value)}}/>
                                <div className='checked-signin-input'>
                                    <input type="checkbox" className='signin-checkbox' id="email-offers" onClick={(e) => {if(!WaltDisney) {setWaltDisney(true)} else {setWaltDisney(false)}}}/>
                                    <span htmlFor='email-offers' className='signin-check-label'>
                                        <span>Yes! I would like to receive by email special offers and updates about Marvel and other products and services from</span>
                                        <a className='link' target="_blank" rel="noreferrer" href="https://privacy.thewaltdisneycompany.com/en/definitions/#The-Walt-Disney-Family-of-Companies">The Walt Disney Family of Companies</a>
                                    </span>
                                </div>
                                <div className='checked-signin-input'>
                                    <input type="checkbox" className='signin-checkbox' id="newsletter" onClick={(e) => {if(!newsletter) {setNewsletter(true)} else {setNewsletter(false)}}}/>
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
                                    <span className='classic'>My home country/region: {country}.</span>
                                    <span className='link' onClick={(e) => {setWantCtryChg(true)}}>Change</span>
                                </div>
                                {wantCtryChg && 
                                <>
                                    <div className='full-signin-modal-two'></div>
                                    <div className='real-signin-modal-two'>
                                        <div className='sign-modal-logos'>
                                            <img src={require("../../Content/Marvel_Logo.svg.png")} alt="Marvel's logo" className="Marvel-logo"/>
                                            <img src={require("../../Content/marvel-insider.png")} alt="Marvel insider logo" className='Marvel-logo'></img>
                                        </div>
                                        <div className='sign-in-modal'>WHERE DO YOU LIVE?</div>
                                        <span htmlFor='email-offers' className='country-label'>Country/Region of Residence</span>
                                        <select placeholder={country} className='country-select' onChange={(e) => {setCountry(e.target.value)}}>
                                            {country_list.map((elem, index) => {
                                                return <option value={elem} key={index}>{elem}</option>
                                            })}
                                        </select>
                                        <div className='red-done' onClick={(e) => {setWantCtryChg(false)}}><span>DONE</span></div>
                                    </div>
                                    <div className='black-placeholder'></div>
                                </>
                                }
                                <button type="submit" className='signin-submit'>CREATE ACCOUNT</button>
                                {badSignIn[0] && <span className='badlogin'>{badSignIn[1]}</span>}
                            </form>
                            <div>
                                <span className='classic'>Already have an account?</span>
                                <span className='link' onClick={(e) => {setWantJoin(0); setPassAnalysis([]); setWantLogIn(1)}}>Sign In</span>
                            </div>
                            <div className='div-placeholder'></div>
                    </div>
                </>
                :
                wantJoin === 2 && 
                <>
                <div className='full-signin-modal'></div>
                <div className='real-signin-modal'>
                    <div className='login-succ-contain'>
                        <div className='closing-sign-modal'>
                            <FontAwesomeIcon icon="xmark" onClick={(e) => {setWantJoin(0); setPassAnalysis([]); setBadLogin([false, ""]); setBadSignIn([false, ""])}}></FontAwesomeIcon>
                        </div>
                        <span className='login-success'>You're signed in with success !</span>
                    </div>
                </div>
            </>
            }
        </header>
    )
}

export default Header