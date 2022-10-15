import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPokemons, getPokemons, getAlltypes } from '../../redux/actions';
import Card from '../card/card';
import Filters from '../filters/filters';
import Paginado from '../pagination/pagination';
import Nav from '../nav/nav';

//import Loading from '../loading/loading';
import './home.css'


export default function Home() {
    const dispatch = useDispatch();
    const allPokemons = useSelector((state) => state.pokemons)
    //Paginado acá abajo
    const [currentPage, setCurrentPage] = useState(1);
    const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
    const [order, setOrder] = useState(''); //Para modificar el estado local y me ayude al renderizado
    const indexOfLastPokemon = currentPage * pokemonsPerPage;
    const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
    // console.log(allPokemons);
    const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

    const paginado = pageNumber => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getPokemons())
        dispatch(getAlltypes())
    }, [dispatch])

    const handleClick = (e) => {
        e.preventDefault();
        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemons());
    }

    function redirect(e){
      window.location.reload() //recarga la URL
    }

    

  return(
    <div>
    {/* {currentPokemons.length > 1 ?  */}
         <div>
          <Nav />
            
         <div className="home">
          
          
            <div >
               <Paginado
                  pokemonsXpagina={pokemonsPerPage}
                  allPokemons={allPokemons.length}
                  paginado={paginado}
                  />
            </div>

      {currentPokemons.length>0?
          <div className="filters">
            <><Filters setCurrentPage={setCurrentPage}
             currentPage={currentPage}
             setOrder={setOrder}
              /><button className="btn" onClick={e => { handleClick(e); } }>Clear filters</button></>
          </div>
         : <button onClick={e=>redirect(e)} className='recargador_home'>Cargando</button>
      }

          <div>
          {/* {currentPokemons.length > 0 ?     */}
          <div className="cards"> {
            currentPokemons?.map((e) => {
              return(
                       <div key={e.name} className="card">
                       <Card 
                        key={e.name}
                        id={e.id}
                        name={e.name}
                        image={e.image}
                        types={e.types} />
                      </div>
                    ) 
              })
            }
            </div>
                 {/* : <div className='notFound'></div>}     */}
          </div>
        </div>
      </div>
     {/* :<Loading/>} */}
  </div>
  )
};
