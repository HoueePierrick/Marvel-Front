import './Comics.css';
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import PageDisp from '../../Components/Header/PageDisp';

const Comics = (props) => {
    const [data, setData] = useState(null); // state to stock API response data
    const [isLoading, setIsLoading] = useState(true); // state to check whether the API data is loading => true by default
    const [page, setPage] = useState(1); // state to stock page number => 1 by default
    const [limit, setLimit] = useState(100); // state to choose how many characters are displayed on each page => 100 by default
    const [totPage, setTotPage] = useState(1); // state stockant le nombre de pages à afficher;

    const location = useLocation(); // collects infos from clicked character => to be destructured

    const {search, setSearch, setLookedAt, pendSearch, setPendSearch, lookedAt} = props;

    useEffect(() => {
        const fetchData = async() => {
            try {
                let request = `https://reacteur-marvel-back.herokuapp.com/comics?page=${page}&limit=${limit}`;
                if(search) {request = request + `&search=${search}`}
                const response = await axios.get(request);
                setTotPage(Math.ceil(response.data.count / response.data.limit));
                setData(response.data);
                setIsLoading(false);
                if(lookedAt !== "comics") {
                    setPendSearch("");
                    setSearch("");
                }
                setLookedAt("comics");
            } catch (error) {
                console.log(error.response)
            }
        };
        fetchData()
    }, [page, limit, search])

    return isLoading ?
        <span className='loading'>The list of comics is currently loading</span>
        :
        <div className='char-container'>
            {data ? 
            <>
                <PageDisp page={page} totPage={totPage} setPage={setPage} limit={limit} setLimit={setLimit}></PageDisp>
                {data.results.map((elem) => {
                return <div className='full-item' key={elem._id}>
                            <img src={elem.thumbnail.path + "." + elem.thumbnail.extension} alt={elem.description} className="charpic"/>
                            <span className='charname'>{elem.title}</span>
                            <div>
                                <span className='desc'>Description: </span>
                                <span className='chardesc'>{elem.description ? elem.description : "not available"}</span>
                            </div>
                        </div>
                }) }
                <PageDisp page={page} totPage={totPage} setPage={setPage} limit={limit} setLimit={setLimit}></PageDisp>
            </>
            : 
            <span>Sorry, we can't display the list of existing characters for the moment</span>}
        </div>
}

export default Comics;