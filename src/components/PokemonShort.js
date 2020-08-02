import React from 'react';

const PokemonShort = (props) => {
    return (<img src={props.pokemon.sprite}
                 alt={props.pokemon.name}
                 onClick={() => props.onPokemonClick(props.pokemon)}

    />)
}
export default PokemonShort;
