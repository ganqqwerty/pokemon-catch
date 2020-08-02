import React, {useState} from 'react';

import IngredientForm from './IngredientForm';
import Search from './Search';

function Ingredients() {
    useState('');

    return (
        <div className="App">
            <IngredientForm />

            <section>
                <Search />
                {/* Need to add list here! */}
            </section>
        </div>
    );
}

export default Ingredients;
