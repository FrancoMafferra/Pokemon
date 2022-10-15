import React from 'react'
import "./pagination.css"

const Paginado = ({pokemonsXpagina, allPokemons, paginado, currentPage}) => {
   const pageNumber = []
   //console.log("uno",pokemonsXpagina, "dos",allPokemons, "3",paginado )
   for (let i = 0; i < Math.ceil(allPokemons/pokemonsXpagina); i++) {
	  pageNumber.push(i+1)	
	 } 
   return (
    <div className='contPag'>
     <nav className='navPaginado' >
       {/* <div><button onClick={()=>(currentPage-1)}>   PREV   </button></div>  */}

     {pageNumber?.map(number=>(
      <div onClick={()=>paginado(number)} key={number}>
       <button className='buttonPaginado'>{number} </button> 
       </div>
     ))
    }
     {/* <div><button onClick={()=>(currentPage+1)}>  NEXT   </button></div>  */}
    
    </nav>
    </div>
   )
  }

export default Paginado

// const pageNumbers = [];
// for (let i = 1; i <= Math.ceil(allPokemons/pokemonsXpagina, paginado); i++) {
//     pageNumbers.push(i);
// }

// return (
//     <React.Fragment>
//         <div className="navPaginado">
//             {
//                 pageNumbers && pageNumbers.map(number => 
//                     <div key={number}>
//                         <button className="numeroPag" onClick={() => paginado(number)}>{number} </button>
//                     </div>
//                 )
//             }
//         </div>
//     </React.Fragment>
// )
// };

