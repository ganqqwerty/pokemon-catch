import React from 'react';

const PokemonDetails = (props) => {
    return <React.Fragment>
        <div className="col-4">
            <img src={props.pokemon.sprite}
                 alt={props.pokemon.name}
            />
        </div>
        <table className="col-8 d-flex align-self-center"
        >
            <tbody>
                <tr>
                    <th>ID:</th>
                    <td className="pl-1">{props.pokemon.id}</td>
                </tr>
                <tr>
                    <th>name:</th>
                    <td className="pl-1">{props.pokemon.name}</td>
                </tr>
                <tr>
                    <th>type:</th>
                    <td className="pl-1">{props.pokemon.type}</td>
                </tr>
            </tbody>
        </table>
    </React.Fragment>
}

export default PokemonDetails;
