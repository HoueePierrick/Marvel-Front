import './Comics.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import PageDisp from '../../Components/PageDisp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInFilter from '../../Components/SearchinFilter';

const FavCharFinder = require('../../Components/FavCharFinder')

const Comics = (props) => {
    const [data, setData] = useState(null); // state to stock API response data
    const [filteredData, setFilteredData] = useState(null); // state to stock API response data for filter with character
    const [isLoading, setIsLoading] = useState(true); // state to check whether the API data is loading => true by default
    const [page, setPage] = useState(1); // state to stock page number => 1 by default
    const [limit, setLimit] = useState(100); // state to choose how many characters are displayed on each page => 100 by default
    const [totPage, setTotPage] = useState(1); // state stockant le nombre de pages à afficher;
    const [filter, setFilter] = useState(""); // state stockant le personnage utilisé pour filtrer les comics
    const [unFiltered, setUnFiltered] = useState(false); // state to remove the filter
    // const [order, setOrder] = useState(""); // state to order comics by their titles
    // const [firstLetter, setFirstLetter] = useState(""); // state to filter comics by their first letter

    const location = useLocation(); // collects infos from clicked character => to be destructured
    
    const {search, setSearch, setLookedAt, setPendSearch, lookedAt, token, userEmail, setFavComics, favComics} = props;
    
    useEffect(() => {

        if(lookedAt !== "comics") {
            setUnFiltered(true)
        }
        if(!unFiltered) {
            setFilter(location.state)
        }
        
            const fetchData = async() => {
                try {
                    if(!filter) {
                        let request = `https://reacteur-marvel-back.herokuapp.com/comics?page=${page}&limit=${limit}`;
                        if(search) {request = request + `&search=${search}`}
                        const response = await axios.get(request);
                        setTotPage(Math.ceil(response.data.count / response.data.limit));
                        setData(response.data.results);
                        setIsLoading(false);
                        if(lookedAt !== "comics") {
                            setPendSearch("");
                            setSearch("");
                        }
                        setLookedAt("comics");
                    } else {
                        let request = `https://reacteur-marvel-back.herokuapp.com/comics/${location.state._id}`;
                        const response = await axios.get(request);
                        const newdata = SearchInFilter(search, response.data);
                        setFilteredData(newdata); 
                        setLookedAt("comics");
                    }
                    
                } catch (error) {
                    console.log(error.response)
                }
            };
            fetchData()
        }, [page, limit, search, lookedAt, setLookedAt, setPendSearch, setSearch, location, filter, unFiltered])

    return isLoading ?
        <span className='loading'>The list of comics is currently loading</span>
        :
        <div className='char-container'>
            {data ? 
            <>
                {!filter ?
                <PageDisp page={page} totPage={totPage} setPage={setPage} limit={limit} setLimit={setLimit}></PageDisp>
                :
                <div className='comic-char-filter' onClick={(e) => {setFilter(null); setUnFiltered(true); setSearch("")}}>
                    <span className='comic-association'>Comics associated with:</span>
                    <div className='comic-filter'>
                        <span>{filter.name}</span>
                        <FontAwesomeIcon icon="xmark" className='filter-xmark'></FontAwesomeIcon>
                    </div>
                </div>
                }
                {
                    !filter ?
                        data.map((elem) => {
                        return <div className='full-item' key={elem._id}>
                                    {token && 
                                    FavCharFinder(favComics, elem) ?
                                    <div className='circle' onClick={async(e) => {
                                        try {
                                            let request = `https://reacteur-marvel-back.herokuapp.com/favorite/comics/remove`;
                                                        const response = await axios.post(request, {type:"comic", content: elem, account_email: userEmail});
                                                        let returned = response.data.AllFavCom;
                                                        let toreturn = [];
                                                        for(let i = 0; i < returned.length; i++) {
                                                            toreturn.push(returned[i].content)
                                                        }
                                                        setFavComics(toreturn);
                                                    } catch (error) {
                                                        console.log(error.response)
                                                    }
                                                }}><FontAwesomeIcon icon="heart" className='red-heart'></FontAwesomeIcon></div>
                                    :
                                    <div className='circle' onClick={async(e) => {
                                        try {
                                            let request = `https://reacteur-marvel-back.herokuapp.com/favorite/comics/add`;
                                                        const response = await axios.post(request, {type:"comic", content: elem, account_email: userEmail});
                                                        let returned = response.data.AllFavCom;
                                                        let toreturn = [];
                                                        for(let i = 0; i < returned.length; i++) {
                                                            toreturn.push(returned[i].content)
                                                        }
                                                        setFavComics(toreturn);
                                                    } catch (error) {
                                                        console.log(error.response)
                                                    }
                                                }}><FontAwesomeIcon icon="heart" className='grey-heart'></FontAwesomeIcon></div>
                                    }
                                    
                                    <img src={elem.thumbnail.path + "." + elem.thumbnail.extension} alt={elem.description} className="charpic"/>
                                    <span className='charname'>{elem.title}</span>
                                    <div>
                                        <span className='desc'>Description: </span>
                                        <span className='chardesc'>{elem.description ? elem.description : "not available"}</span>
                                    </div>
                                </div>
                    })
                    :
                    filteredData.map((elem) => {
                        return <div className='full-item' key={elem._id}>
                                <img src={elem.thumbnail.path + "." + elem.thumbnail.extension} alt={elem.description} className="charpic"/>
                                <span className='charname'>{elem.title}</span>
                                <div>
                                    <span className='desc'>Description: </span>
                                    <span className='chardesc'>{elem.description ? elem.description : "not available"}</span>
                                </div>
                            </div>
                    })
                }
                {!filter ?
                <PageDisp page={page} totPage={totPage} setPage={setPage} limit={limit} setLimit={setLimit}></PageDisp>
                :
                <></>
                }
            </>
            : 
            <span>Sorry, we can't display the list of existing characters for the moment</span>}
        </div>
}

export default Comics;