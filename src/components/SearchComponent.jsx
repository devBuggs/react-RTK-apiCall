import { useState } from "react";
import { useNavigate } from "react-router";


function SearchComponent(props) {
    let [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearchBtn = (e) => {
        e.preventDefault();
        setSearch(search = e.target.elements.searchKey.value);
        navigate('/search', { state: { itemid: search } });
    }

    return (
        <form className="w3-form w3-row w3-padding-32" onSubmit={handleSearchBtn} method="GET">
            <input type="text" className="w3-input w3-third" name="searchKey" placeholder="Discover keywords.." />
        </form>
    );
}


export default SearchComponent;