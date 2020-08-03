import React from 'react';

const PokemonDetails = (props) => {
    return <div className="row"
                onClick={() => props.onPokemonClick(props.pokemon)}
    >
        <div className="col-4">
            <img src={props.pokemon.sprite}
                 alt={props.pokemon.name}
            />
        </div>
        <table className="table table-borderless col-8"
        >
            <tbody>
                <tr>
                    <th scope="row" className="w-50">ID:</th>
                    <td >{props.pokemon.id}</td>
                </tr>
                <tr>
                    <th scope="row" className="w-50">name:</th>
                    <td>{props.pokemon.name}</td>
                </tr>
                <tr>
                    <th scope="row" className="w-50">type:</th>
                    <td>{props.pokemon.type}</td>
                </tr>
            </tbody>
        </table>
    </div>
}

export default PokemonDetails;
