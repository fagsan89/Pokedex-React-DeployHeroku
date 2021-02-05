import React, { useState, useEffect } from 'react';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import { getPokemon, getAllPokemon } from '../../services/pokemon';
import axios from 'axios'
import Header from '../../pages/Header'
import { Link } from 'react-router-dom'

function App() {
  const [pokemonData, setPokemonData] = useState([])
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('')
  const initialURL = 'https://pokeapi.co/api/v2/pokemon'

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialURL)
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      await loadPokemon(response.results);
      setLoading(false);
    }
    fetchData();
  }, [])

  async function fetchDataReload() {
    let response = await getAllPokemon(initialURL)
    setNextUrl(response.next);
    setPrevUrl(response.previous);
    await loadPokemon(response.results);
    setLoading(false);
  }

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  }

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon)
      return pokemonRecord
    }))
    setPokemonData(_pokemonData);
  }

  function handleKeyFilter(vPokemon){
     //console.log(value)
     if(vPokemon !== ''){
      setDescription(vPokemon)
    }else{
      setDescription('')
      fetchDataReload()
    }

  }

  async function pokemonFilter(){   
      
      const url = `https://pokeapi.co/api/v2/pokemon/${description}`;  
      await axios.get(url)
      .then(res => {
        let toArray = []
        toArray.push(res.data)
        setPokemonData(toArray)
      })
      .catch(err => {
        setPokemonData([])
        console.log(err)
      })
     
  }


  const urlPathname = window.location.pathname.split('/')
  
  return (
    <>
    <Header pathname={urlPathname[1]}/>
      <div className="container">
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : 

                  pokemonData.length === 0 ?
                      <>
                      <div className="pseudo-search">           
                                  <input 
                                          type="search" 
                                          placeholder="Search Pokemon, and press Enter ..." 
                                          autoFocus
                                          onKeyUp={(event) => { if (event.which === 13) { pokemonFilter() } }}
                                          onChange={(event) => handleKeyFilter(event.target.value)}
                                          value={description} 
                                    />
                        </div>
                      <h1 style={{ textAlign: 'center' }}>No data found!</h1>
                      </>
                  :
        
                  pokemonData.length > 1 ?
                      (
                          <>
                        
                            <div className="pseudo-search">           
                              <input 
                                      type="search" 
                                      placeholder="Search Pokemon, and press Enter ..." 
                                      autoFocus
                                      onKeyUp={(event) => { if (event.which === 13) { pokemonFilter() } }}
                                      onChange={(event) => handleKeyFilter(event.target.value)}
                                      value={description} 
                                />
                              </div>
                          
                            <div className="grid-container">
                              
                              {pokemonData.map((pokemon, i) => {
                                return <Card key={i} pokemon={pokemon} />
                              })}
                            </div>
                            <Pagination
                              gotoNextPage={nextUrl ? next : null}
                              gotoPrevPage={prevUrl ? prev : null}
                            />
                          
                          </>
                      )

                      :

                      <>
                        
                            <div className="pseudo-search">           
                              <input 
                                      type="search" 
                                      placeholder="Search Pokemon, and press Enter ..." 
                                      autoFocus
                                      onKeyUp={(event) => { if (event.which === 13) { pokemonFilter() } }}
                                      onChange={(event) => handleKeyFilter(event.target.value)}
                                      value={description} 
                                />
                              </div>
                          
                            <div className="grid-containerD">                      
                              <Link className="CardD" to={`/detalhes/${pokemonData[0].id}`} >
                                  <div className="Card__imgD">
                                      <img src={pokemonData[0].sprites !== undefined ? pokemonData[0].sprites.front_default : ''} alt="" />
                                  </div>
                                  <div className="Card__nameD">
                                      {pokemonData[0].name}
                                  </div>
                                
                              </Link>
                            </div>
                          
                          
                          </>

            }
      </div>
    </>
  );
}

export default App;
