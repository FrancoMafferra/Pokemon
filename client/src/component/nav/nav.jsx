import React from "react";
import {Link} from 'react-router-dom';
import pokemonImg from './pokemon-logo2.png'
import './nav.css'

const Nav = () => {
    return (
        <header>
            <nav className="nav">
                 <div className="imgLogo">
                    <img src={pokemonImg} alt="img not found" className=".img" /> 
                </div> 
                <div>  
                    <Link to='/create'>
                        <button className="btnCreated" >Create a pokémon</button>
                    </Link>
                </div>
            </nav>
        </header>
    )
}
 
export default Nav;