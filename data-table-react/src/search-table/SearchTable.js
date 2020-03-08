import React, {useState} from 'react';

import "./SearchTable.css";
 
const SearchTable = (props) => {

    const [value, setValue] = useState('');

    const valueChangeHandler = (event) => { 
        setValue(event.target.value)
    }

    return (
        <div className="search-panel">
            <input 
                type="search" 
                className="input-search" 
                placeholder="Введите значение"
                value={value}
                onChange={valueChangeHandler}
            />
            <button 
                type="button" 
                className="btn-search"
                onClick={()=> props.onSearch(value)}>Поиск</button>
        </div>
    )    
}

export default SearchTable;  
