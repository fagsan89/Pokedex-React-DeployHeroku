import React from 'react';
import { Link } from 'react-router-dom'


function Card({ pokemon }) {

 
    return (
        <Link className="Card" to={`/detalhes/${pokemon.id}`} >
            <div className="Card__img">
                <img src={pokemon.sprites.front_default} alt="" />
            </div>
            <div className="Card__name">
                {pokemon.name}
            </div>
           
        </Link>
    );
}

export default Card;