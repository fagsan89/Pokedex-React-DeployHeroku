
  import React, { useState, useEffect} from "react";
  import CardDetails from '../../components/CardDetails'
  import Header from '../../pages/Header'

  import axios from "axios";
  
  function DetailsPokemon ({match})  {
    const idPokemon = match.params.id
    const [pokemonData, setPokemonData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
        getPokemon() 
      },[])// eslint-disable-line react-hooks/exhaustive-deps


    const getPokemon = async () => {
        const toArray = [];
        const url = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
        await axios.get(url)
        .then(res => {
            toArray.push(res.data);
            setPokemonData(toArray[0]);
            setLoading(false);
        })
        .catch(err => err)   
    
    };

      
    //console.log(pokemonData.sprites.front_default);
    const urlPathname = window.location.pathname.split('/')

  return (
    <>
      <Header pathname={urlPathname[1]}/>
      <div className="containerD">
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
           
            <div className="grid-containerD">
          
              <CardDetails pokemon={pokemonData} />
           
            </div>
          
          </>
        )}
      </div>
    </>
  );
}

export default DetailsPokemon;
