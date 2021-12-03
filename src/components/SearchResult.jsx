import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';


function SearchResult() {
    const idToBeSearched  = useLocation();
    const searchKey = idToBeSearched.state.itemid.toLowerCase()
    console.log("post id to be searched: ", idToBeSearched.state.itemid);
    const { initialData } = useSelector(state => state.blogSlice);
    console.log("initialData --> ", initialData);

    // function SearchData(array, key){
    //     const filter1 = 'title'
    //     const filter2 = 'body'
    //     var filteredData = array.title(function(obj) {
    //         return obj[filter1] === key || obj[filter2] === key;
    //     });
    //     console.log("filteredData: ", filteredData);
    // }

    useEffect(() => {
        const filter1 = 'title'
        const filter2 = 'body'

        var filteredData = initialData.title(function(obj) {
            return obj[filter1] === searchKey || obj[filter2] === searchKey;
        });
        
        console.log("filteredData: ", filteredData);
    }, [initialData,searchKey ])



    return(
        <>
            <h3>Search Result</h3>
            <hr />
            <p className="w3-large w3-sans">Search result for  <b>'{searchKey}'</b></p>

            <br />
                {
                    <result/>
                }
            <hr />
            {
                initialData.map((item, i) => <p>item { item.id}</p>)
            }
        </>
    );
}

export default SearchResult;