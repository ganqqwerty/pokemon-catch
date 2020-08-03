import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import "./App.css";
import yuri from "./assets/yuri-pokemon.png";
import PokemonDetails from "./components/PokemonDetails";
import PokemonShort from "./components/PokemonShort";

function sortById(left, right) {
    return left.id - right.id;
}

const MAX_CATCHING_CAPACITY = 6;
const UPDATE_INTERVAL = 500;
const MAX_POKEMONS = 151;

const App = () => {
    const timerId = useRef();
    const [pokemons, setPokemons] = useState([]);
    const wildPokemons = useMemo(() => pokemons.filter((item) => !item.isCaught), [pokemons]);
    const caughtPokemons = useMemo(() => pokemons.filter((item) => item.isCaught), [pokemons]);
    const catchPokemonsIsAvailable = caughtPokemons.length < MAX_CATCHING_CAPACITY;

    const updateData = useCallback(async (number) => {
        try {
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`);

            setPokemons((pokemons) => [
                ...pokemons,
                {
                    id: data.id,
                    name: data.name,
                    sprite: data.sprites.front_default,
                    type: data.types[0].type.name,
                    isCaught: false,
                },
            ]);
        } catch (error) {
            console.error(error.message);
        }
    }, []);

    useEffect(() => {
        if (pokemons.length < MAX_POKEMONS) {
            timerId.current = setTimeout(() => {
                updateData(pokemons.length + 1);
            }, UPDATE_INTERVAL);
        }
        return () => {
            clearTimeout(timerId.current);
        };
    }, [pokemons, updateData]);

    const setPokemon = (pokemon) => {
        setPokemons((pokemons) =>
            pokemons
                .map((item) =>
                    item.id === pokemon.id ? { ...item, isCaught: !item.isCaught } : item
                )
                .sort(sortById)
        );
    };
    const catchPokemon = (caughtPokemon) => {
        if (catchPokemonsIsAvailable) {
            setPokemon(caughtPokemon);
        }
    };

    const releasePokemon = (releasedPokemon) => {
        setPokemon(releasedPokemon);
    };

    return (
        <React.Fragment>
            <h1 className="text-center">Pokemon app</h1>
            <main className="container">
                <div className="row">
                    <section className="col-6 d-flex flex-wrap bd-highlight justify-content-around wild-pane">
                        {wildPokemons.map((pokemon) => (
                            <div key={pokemon.id} className="w-30">
                                <PokemonShort pokemon={pokemon} onPokemonClick={catchPokemon} />
                            </div>
                        ))}
                    </section>
                    <section className="col-6 caught-pane">
                        {caughtPokemons.map((pokemon) => (
                            <div key={pokemon.id} className="row">
                                <div className="col-12">
                                    <PokemonDetails
                                        pokemon={pokemon}
                                        onPokemonClick={releasePokemon}
                                    />
                                </div>
                            </div>
                        ))}
                    </section>
                </div>
            </main>
            <footer className="d-flex align-content-center justify-content-center">
                <img src={yuri} width="300px" alt="" />
            </footer>
        </React.Fragment>
    );
};

export default App;
