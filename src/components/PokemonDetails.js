import React from 'react';

const PokemonDetails = (props) => {
    return (<div className="row"
                onClick={() => props.onPokemonClick(props.pokemon)}
    >
        <div className="col-4">
            <img src={props.pokemon.sprite}
                 alt={props.pokemon.name}
            />
        </div>
        <table className="col-8">
            <tbody>
                <tr>
                    <th className="w-50">ID:</th>
                    <td className="w-50">{props.pokemon.id}</td>
                </tr>
                <tr>
                    <th className="w-50">name:</th>
                    <td className="w-50">{props.pokemon.name}</td>
                </tr>
                <tr>
                    <th className="w-50">type:</th>
                    <td className="w-50">{props.pokemon.type}</td>
                </tr>
            </tbody>
        </table>
    </div>)
}

export default PokemonDetails;
