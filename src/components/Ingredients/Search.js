import axios from 'axios';
import React, {useEffect, useState} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
    const [initialText, changeText] = useState(25);
    const [searchResults, changeResult] = useState([]);
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${initialText}`)
            .then(res => {
                console.log(res);
                changeResult(old => [...old, res.data]);
            });
    }, [initialText])

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    <input type="text"
                           value={initialText}
                           onChange={event => changeText(Number(event.target.value))} />
                </div>

            </Card>
            {searchResults.map((result) => <img key={result.id}
                                                src={result.sprites?.front_default}
                                                alt={result.name} />
            )}
        </section>
    );
});

export default Search;
