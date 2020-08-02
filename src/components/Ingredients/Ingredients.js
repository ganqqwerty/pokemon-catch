import React, {useState} from 'react';
import Search from './Search';

function Ingredients() {
    useState('');

    return (
        <div className="App">
            <Search />
        </div>
    );
}

export default Ingredients;
