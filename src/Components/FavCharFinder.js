const FavCharFinder = (array, object) => {
    let result = false;
    for(let i = 0; i < array.length; i++) {
        if(array[i]._id === object._id) {
            result = true;
        }
    }
    return result;
}

module.exports = FavCharFinder;