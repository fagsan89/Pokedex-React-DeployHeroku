import React from 'react';
import typeColors from '../../helpers/typeColors'


function CardDetails({ pokemon }) {

    const image = pokemon.sprites !== undefined ? pokemon.sprites.front_default  : ''
    const name = pokemon.name 
 
    return (
        <div className="CardD">
                 <div className="Card__imgD">
                    <img src={image} alt="" width="250px" />
                </div>
                <div className="Card__nameD">
                    {name}
                </div>
                <div className="Card__typesD">
                    {
                        pokemon.types.map((type,index) => {
                            return (
                                <div key={index} className="Card__typeD" style={{ backgroundColor: typeColors[type.type.name] }}>
                                    {type.type.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div className="Card__infoD">
                    <div className="Card__dataD Card__data--weightD">
                        <p className="titleD">Weight</p>
                        <p>{pokemon.weight}</p>
                    </div>
                    <div className="Card__dataD Card__data--weightD">
                        <p className="titleD">Height</p>
                        <p>{pokemon.height}</p>
                    </div>
                    <div className="Card__dataD Card__data--abilityD">
                        <p className="titleD">Ability</p>
                        <p>{pokemon.abilities[0].ability.name}</p>
                    </div>
                </div> 
            </div>
    );
}

export default CardDetails;