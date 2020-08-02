import useInterval from '@use-it/interval';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import './Search.css';

function sortById(left, right) {
    return left.id - right.id;
}

const MAX_CATCHING_CAPACITY = 7;

const Search = props => {
    const [pokemonNumber, changePokemonNumber] = useState(1);
    const [wildPokemons, changeWildPokemons] = useState([]);
    const [caughtPokemons, changeCaughtPokemons] = useState([]);
    useInterval(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(res => {
                console.log(res);
                changePokemonNumber(old => old + 1);
                changeWildPokemons(old => [...old, {
                    id: res.data.id,
                    name: res.data.name,
                    sprite: res.data.sprites.front_default,
                    type: res.data.types[0].type.name
                }]);
            });
    }, 2000);

    const catchPokemon = (caughtPokemon) => {
        console.log(caughtPokemons.length);
        if (caughtPokemons.length < MAX_CATCHING_CAPACITY) {
            changeWildPokemons(res => res.filter(pokemon => pokemon.id !== caughtPokemon.id));
            changeCaughtPokemons(old => [...old, caughtPokemon].sort(sortById));
        }
    }
    const releasePokemon = (releasedPokemon) => {
        changeCaughtPokemons(res => res.filter(pokemon => pokemon.id !== releasedPokemon.id));
        changeWildPokemons(old => [...old, releasedPokemon].sort(sortById));
    }

    return <React.Fragment>
        <div className="container">
            <div className="row">
                <section className="col-6 d-flex flex-wrap bd-highlight justify-content-around wild-pane">
                    {wildPokemons.map((pokemon) => <div key={pokemon.id}
                                                        className="w-30"
                                                        onClick={event => catchPokemon(pokemon)}>
                            <img key={pokemon.id + '_img'}
                                 className=""
                                 src={pokemon.sprite}
                                 alt={pokemon.name}

                            />
                        </div>
                    )}
                </section>
                <section className="col-6 caught-pane">
                    {caughtPokemons.map((pokemon) => <div key={pokemon.id}
                                                          className="row"
                                                          onClick={event => releasePokemon(pokemon)}>
                            <img key={pokemon.id + '_img'}
                                 className="col-6"
                                 src={pokemon.sprite}
                                 alt={pokemon.name}

                            />
                            <table className="col-6 d-flex align-self-center"
                                   key={pokemon.id + '_description'}>
                                <tbody>
                                    <tr>
                                        <th>ID:</th>
                                        <td>{pokemon.id}</td>
                                    </tr>
                                    <tr>
                                        <th>name:</th>
                                        <td>{pokemon.name}</td>
                                    </tr>
                                    <tr>
                                        <th>type:</th>
                                        <td>{pokemon.type}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </section>
            </div>
        </div>
    </React.Fragment>
};

export default Search;
