import './Characters.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import PageDisp from '../../Components/PageDisp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FavCharFinder = require('../../Components/FavCharFinder')

const Characters = (props) => {
    const [data, setData] = useState(null); // state to stock API response data
    const [isLoading, setIsLoading] = useState(true); // state to check whether the API data is loading => true by default
    const [page, setPage] = useState(1); // state to stock page number => 1 by default
    const [limit, setLimit] = useState(100); // state to choose how many characters are displayed on each page => 100 by default
    const [totPage, setTotPage] = useState(1); // state stockant le nombre de pages à afficher

    const {search, setSearch, setLookedAt, setPendSearch, lookedAt, token, userEmail, setFavChars, favChars} = props;

    useEffect(() => {
        const fetchData = async() => {
            try {
                let request = `https://reacteur-marvel-back.herokuapp.com/characters?page=${page}&limit=${limit}`;
                if(search) {request = request + `&search=${search}`}
                const response = await axios.get(request);
                setTotPage(Math.ceil(response.data.count / response.data.limit))
                setData(response.data);
                setIsLoading(false);
                if(lookedAt !== "characters") {
                    setPendSearch("");
                    setSearch("");
                }
                setLookedAt("characters");
            } catch (error) {
                console.log(error.response)
            }
        };
        fetchData()
    }, [page, limit, search, lookedAt, setLookedAt, setPendSearch, setSearch])
    
    return isLoading ?
        <span className='loading'>The list of characters is currently loading</span>
        :
        <div className='char-container'>
            {data ? 
            <>
                <PageDisp page={page} totPage={totPage} setPage={setPage} limit={limit} setLimit={setLimit}></PageDisp>
                {data.results.map((elem) => {
                    return <div className='full-item' key={elem._id}>
                            {token && 
                            FavCharFinder(favChars, elem) ?
                            <div className='circle' onClick={async(e) => {
                                try {
                                    let request = `https://reacteur-marvel-back.herokuapp.com/favorite/characters/remove`;
                                                const response = await axios.post(request, {type:"character", content: elem, account_email: userEmail});
                                                let returned = response.data.AllFavChar;
                                                let toreturn = [];
                                                for(let i = 0; i < returned.length; i++) {
                                                    toreturn.push(returned[i].content)
                                                }
                                                setFavChars(toreturn);
                                            } catch (error) {
                                                console.log(error.response)
                                            }
                                        }}><FontAwesomeIcon icon="heart" className='red-heart'></FontAwesomeIcon></div>
                            :
                            <div className='circle' onClick={async(e) => {
                                try {
                                    let request = `https://reacteur-marvel-back.herokuapp.com/favorite/characters/add`;
                                                const response = await axios.post(request, {type:"character", content: elem, account_email: userEmail});
                                                let returned = response.data.AllFavChar;
                                                let toreturn = [];
                                                for(let i = 0; i < returned.length; i++) {
                                                    toreturn.push(returned[i].content)
                                                }
                                                setFavChars(toreturn);
                                            } catch (error) {
                                                console.log(error.response)
                                            }
                                        }}><FontAwesomeIcon icon="heart" className='grey-heart'></FontAwesomeIcon></div>
                            }

                                <Link to="/comics" state={elem} className="link">
                                <img src={elem.thumbnail.path + "." + elem.thumbnail.extension} alt={elem.description} className="charpic"/>
                                <span className='charname'>{elem.name}</span>
                                <div>
                                    <span className='desc'>Description: </span>
                                    <span className='chardesc'>{elem.description ? elem.description : "not available"}</span>
                                </div>
                            </Link>
                            </div>
                })}
                <PageDisp page={page} totPage={totPage} setPage={setPage} limit={limit} setLimit={setLimit}></PageDisp>
            </> 
            : 
            <span>Sorry, we can't display the list of existing characters for the moment</span>}
        </div>
}

export default Characters;