import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName, cleanPokemons } from '../../redux/actions';
import './searchBar.css'



//!HACER CSS
const SearchBar = () => {
    
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    
    const handleInputChange = (e) => {
        e.preventDefault();
        if(name[0] !== " "){
            setName(e.target.value);
            console.log(name);
        }else{
            alert("Nonexistent Pokémon name")
        }
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(cleanPokemons(dispatch));
        dispatch(getPokemonByName(name));
        setName('');
    }

    return ( 
        <div className="search" >
            <form onSubmit={e => {handleSubmit(e)}}>
                <input type="text" placeholder="Buscar..." onChange={e => {handleInputChange(e)}} value={name} className="input" />
                <button type="submit" className="btn_input">Buscar</button>   
            </form>
        </div>
     );
}
 
export default SearchBar;