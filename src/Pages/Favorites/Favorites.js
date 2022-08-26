import './Favorites.css';
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// // Import of Cookies;
// import Cookies from 'js-cookie';


// const FavCharFinder = require('../../Components/FavCharFinder')


const Favorites = (props) => {

    // const [filter, setFilter] = useState("characters")

    // // missing: add a search
    // const {setSearch, setLookedAt, setPendSearch, lookedAt, setFavChars, setFavComics, favChars, favComics, token, userEmail, setUserEmail} = props;

    
    // useEffect(() => {
    //     if(lookedAt !== "favorites") {
    //         setPendSearch("");
    //         setSearch("");
    //     }
    //     setLookedAt("favorites");

    //     setUserEmail(Cookies.get("email"));
    //     console.log(userEmail)

    //     const fetchData = async() => {
    //         let request2 = `https://reacteur-marvel-back.herokuapp.com/favorite/characters/see?email=${userEmail}`;
    //                 const response2 = await axios.get(request2);
    //                 let returned1 = response2.data.AllFavChar;
    //                 let toreturn1 = [];
    //                 for(let i = 0; i < returned1.length; i++) {
    //                     toreturn1.push(returned1[i].content)
    //                 }
    //                 setFavChars(toreturn1);
    
    //                 let request3 = `https://reacteur-marvel-back.herokuapp.com/favorite/comics/see?email=${userEmail}`;
    //                 const response3 = await axios.get(request3);
    //                 let returned2 = response3.data.AllFavChar;
    //                 let toreturn2 = [];
    //                 for(let i = 0; i < returned2.length; i++) {
    //                     toreturn2.push(returned2[i].content)
    //                 }
    //                 setFavComics(toreturn2);
    //     };

    //     fetchData();

    // }, [lookedAt, setPendSearch, setSearch, setLookedAt, setFavChars, setFavComics, userEmail, setUserEmail])

    
    // return (
    //     <div>
    //         <div>Filter div</div>
    //         {filter==="characters" ?
    //         <>
    //         {favChars.map((elem) => {
    //                 return <div className='full-item' key={elem._id}>
    //                         {token && 
    //                         FavCharFinder(favChars, elem) ?
    //                         <div className='circle' onClick={async(e) => {
    //                             try {
    //                                 let request = `https://reacteur-marvel-back.herokuapp.com/favorite/characters/remove`;
    //                                             const response = await axios.post(request, {type:"character", content: elem, account_email: userEmail});
    //                                             let returned = response.data.AllFavChar;
    //                                             let toreturn = [];
    //                                             for(let i = 0; i < returned.length; i++) {
    //                                                 toreturn.push(returned[i].content)
    //                                             }
    //                                             setFavChars(toreturn);
    //                                         } catch (error) {
    //                                             console.log(error.response)
    //                                         }
    //                                     }}><FontAwesomeIcon icon="heart" className='red-heart'></FontAwesomeIcon></div>
    //                         :
    //                         <div className='circle' onClick={async(e) => {
    //                             try {
    //                                 let request = `https://reacteur-marvel-back.herokuapp.com/favorite/characters/add`;
    //                                             const response = await axios.post(request, {type:"character", content: elem, account_email: userEmail});
    //                                             let returned = response.data.AllFavChar;
    //                                             let toreturn = [];
    //                                             for(let i = 0; i < returned.length; i++) {
    //                                                 toreturn.push(returned[i].content)
    //                                             }
    //                                             setFavChars(toreturn);
    //                                         } catch (error) {
    //                                             console.log(error.response)
    //                                         }
    //                                     }}><FontAwesomeIcon icon="heart" className='grey-heart'></FontAwesomeIcon></div>
    //                         }

    //                             <Link to="/comics" state={elem} className="link">
    //                             <img src={elem.thumbnail.path + "." + elem.thumbnail.extension} alt={elem.description} className="charpic"/>
    //                             <span className='charname'>{elem.name}</span>
    //                             <div>
    //                                 <span className='desc'>Description: </span>
    //                                 <span className='chardesc'>{elem.description ? elem.description : "not available"}</span>
    //                             </div>
    //                         </Link>
    //                         </div>
    //             })}
    //         </>
    //         :
    //         <span>B</span>
    //         }
    //     </div>
    // )
    <div>Favorites</div>
}

export default Favorites;