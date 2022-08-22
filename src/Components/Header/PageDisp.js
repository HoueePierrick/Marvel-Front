import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from "react";

// Function to display the list of pages to be displayed
const PageDisp = (props) => {
    const {page, totPage, setPage, limit, setLimit} = props;

    let maxpage = page + 4; // value of the maximal page proposed (more than current page by default, by 5)
    let minpage = page - 4; // value of the minimal page proposed (less than current page by default, by 5)
    let maxrest = 0; // value for recomputation
    let minrest = 0; // value for recomputation
    let result = []; // list of pages to be proposed (length of 11 by default)

    if(minpage < 1) { // correcting if minpage is too low by default
        minrest = 1 - minpage;
        minpage = 1;
    }

    if(maxpage > totPage) { // correcting if maxpage is bigger than max number of page
        maxrest = totPage - maxpage;
        maxpage = totPage;
    }

    minpage = Math.max(1, minpage + maxrest);
    maxpage = Math.min(totPage, maxpage + minrest)

    for(let i = minpage; i <= maxpage; i++) { // creates pages to be pushed in the result array
        result.push(i)
    }

    return <div className='page-menu'>
                <FontAwesomeIcon className="right-chevron" icon="angle-left" onClick={(e) => {setPage(1)}}></FontAwesomeIcon>
                <span onClick={(e) => {page > 1 && setPage(page - 1)}}>Prev</span>
                {result.map((elem) => {
                    return <span key={elem} className={page===elem && "actual-page"} onClick={(e) => {setPage(elem)}}>{elem}</span>
                })}
                <span onClick={(e) => {page <= totPage && setPage(page + 1)}}>Next</span>
                <FontAwesomeIcon className="left-chevron" icon="angle-right" onClick={(e) => {setPage(totPage)}}></FontAwesomeIcon>
                <div className='limit-options'>
                    <div>
                        <span>{limit} per page</span>
                        <FontAwesomeIcon icon="caret-down" className='caret-down'></FontAwesomeIcon>
                    </div>
                    <span onClick={(e) => {setLimit(5)}}>5 per page</span>
                    <span onClick={(e) => {setLimit(10)}}>10 per page</span>
                    <span onClick={(e) => {setLimit(25)}}>25 per page</span>
                    <span onClick={(e) => {setLimit(50)}}>50 per page</span>
                    <span onClick={(e) => {setLimit(100)}}>100 per page</span>
                </div>
            </div>;
}

export default PageDisp;