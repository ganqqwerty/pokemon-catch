import useInterval from '@use-it/interval';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import './App.css';
import yuri from './assets/yuri-pokemon.png'
import PokemonDetails from './components/PokemonDetails';
import PokemonShort from './components/PokemonShort';

function sortById(left, right) {
    return left.id - right.id;
}

const MAX_CATCHING_CAPACITY = 6;
const UPDATE_INTERVAL = 500;
const MAX_POKEMONS = 151;

const App = () => {
    const [pokemonNumber, changePokemonNumber] = useState(1);
    const [wildPokemons, changeWildPokemons] = useState([]);
    const [caughtPokemons, changeCaughtPokemons] = useState([]);
    useInterval(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(res => {
                changePokemonNumber(old => old + 1);
                changeWildPokemons(old => [...old, {
                    id: res.data.id,
                    name: res.data.name,
                    sprite: res.data.sprites.front_default,
                    type: res.data.types[0].type.name
                }]);
            })
            .catch((reason) => {
                console.error(reason);
            });
    }, wildPokemons.length + caughtPokemons.length > MAX_POKEMONS ? null : UPDATE_INTERVAL);

    const catchPokemon = (caughtPokemon) => {
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
        <h1 className="text-center">Pokémon app</h1>
        <main className="container">
            <div className="row">
                <section className="col-6 d-flex flex-wrap bd-highlight justify-content-around wild-pane">
                    {wildPokemons.map((pokemon) => <div key={pokemon.id}
                                                        className="w-30">
                            <PokemonShort pokemon={pokemon}
                                          onPokemonClick={catchPokemon} />
                        </div>
                    )}
                </section>
                <section className="col-6 caught-pane">
                    {caughtPokemons.map((pokemon) => <div key={pokemon.id}
                                                          className="row"
                        >
                            <PokemonDetails pokemon={pokemon}
                                            onPokemonClick={releasePokemon} />
                        </div>
                    )}
                </section>
            </div>
        </main>
        <footer className="d-flex align-content-center justify-content-center"
        >
            <img src={yuri}
                 width="300px"
                 alt="" />
        </footer>
    </React.Fragment>
};

export default App;
