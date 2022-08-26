// function allowing for a search by title when comics are already filtered by a character

const SearchInFilter = (search, filteredData) => {
    // filteredData.title stock le titre
    // Si la recherche est positive, search() renvoie l'indice de la première correspondance pour l'expression rationnelle au sein de la chaine de caractères. 
    // Sinon, la méthode renvoie -1.
    let result = [];
    for(let i = 0; i < filteredData.length; i++) {
        if(filteredData[i].title.search(search) !== -1) {
            result.push(filteredData[i])
        }
    }
    return result;
}

export default SearchInFilter;