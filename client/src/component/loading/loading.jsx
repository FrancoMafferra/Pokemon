import React from 'react'
import { Link } from 'react-router-dom'
import "./loading.css"

 const Loading = () => {

  // function redirect(e){
  //   window.location.reload()
  // }
  return (
    <div className='divLoading'>

        <div className='cargando'>Cargando tu pokedex</div>{/*ACOMODAR TEXTO */}
    
      {/* <button onClick={e=>redirect(e)}>
        <p className='p_landing'>No Matches Found</p>
      </button> */}
    </div>
  )
}

export default Loading
