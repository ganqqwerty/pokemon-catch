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
const UPDATE_INTERVAL = 2000;
const MAX_POKEMONS = 150;

const App = () => {
    const [pokemonNumber, setPokemonNumber] = useState(1);
    const [wildPokemons, setWildPokemons] = useState([]);
    const [caughtPokemons, setCaughtPokemons] = useState([]);
    const [isFetchRunning, setIsFetchRunning] = useState(false);

    const shouldPauseRequests = () => {
        const isTooManyPokemons = wildPokemons.length + caughtPokemons.length > MAX_POKEMONS;
        return isTooManyPokemons || isFetchRunning;
    }
    useInterval(() => {
        setIsFetchRunning(true)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`)
            .then(res => {
                setPokemonNumber(old => old + 1);
                setWildPokemons(old => [...old, {
                    id: res.data.id,
                    name: res.data.name,
                    sprite: res.data.sprites.front_default,
                    type: res.data.types[0].type.name
                }]);
                setIsFetchRunning(false);
            })
            .catch((reason) => {
                console.error(reason);
            });
    }, shouldPauseRequests() ? null : UPDATE_INTERVAL);

    const catchPokemon = (caughtPokemon) => {
        if (caughtPokemons.length < MAX_CATCHING_CAPACITY) {
            setWildPokemons(res => res.filter(pokemon => pokemon.id !== caughtPokemon.id));
            setCaughtPokemons(old => [...old, caughtPokemon].sort(sortById));
        }
    }
    const releasePokemon = (releasedPokemon) => {
        setCaughtPokemons(res => res.filter(pokemon => pokemon.id !== releasedPokemon.id));
        setWildPokemons(old => [...old, releasedPokemon].sort(sortById));
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
                            <div className="col-12">
                                <PokemonDetails pokemon={pokemon}
                                                onPokemonClick={releasePokemon} />
                            </div>
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
