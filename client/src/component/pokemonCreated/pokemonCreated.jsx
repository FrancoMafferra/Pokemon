import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { getAlltypes, postPokemon, cleanPokemons } from '../../redux/actions';
import { useDispatch, useSelector } from "react-redux";
import './pokemonCreated.css'

const PokemonCreate = () => {
    
    const dispatch = useDispatch();
    const types = useSelector((state) => state.types);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    
    const [input, setInput] = useState({name: '', hp: '', attack: '',sp_attack:'', defense: '',sp_defense:'',  speed: '',height: '', weight: '', types: [], image: ''})
    
    let noEmpty = /\S+/;
    let validateName = /^[a-z]+$/i;
    let validateNum = /^\d+$/;
    let validateUrl = /^(ftp|http|https):\/\/[^ "]+$/;
    
    const validate = (input) => {
            let errors = {};
            
            if (!noEmpty.test(input.name) || !validateName.test(input.name) || input.name.length < 3 ) {
            errors.name = "Name required. Only string of more than two and less than fifteen characters and without numbers";
          
            }
            if (!validateNum.test(input.hp) || parseInt(input.hp) < 10 ) {
                errors.hp = "Number required. greater than 10 and less than 150";
            }
            if (!validateNum.test(input.attack) || parseInt(input.attack) < 10 ) {
                errors.attack = "Number required. greater than 10 and less than 150";
            }
            if(!validateNum.test(input.sp_attack)|| parseInt(input.sp_attack)<10 ){
                errors.sp_attack = "Number required. greater than 10 and less than 150";
            }
            if (!validateNum.test(input.defense) || parseInt(input.defense) < 10 ) {
                errors.defense = "Number required. greater than 10 and less than 150";
            }
            if (!validateNum.test(input.sp_defense) || parseInt(input.sp_defense) < 10 ) {
                errors.sp_defense = "Number required. greater than 10 and less than 150";
            }
            if (!validateNum.test(input.speed) || parseInt(input.speed) < 10 ) {
                errors.speed = "Number required. greater than 10 and less than 150";
            }
            if (!validateNum.test(input.height) || parseInt(input.height) > 10 ) {
                errors.height = "Number required. greater than 1 and less than 10";
            }
            if (!validateNum.test(input.weight) || parseInt(input.weight) < 10 ) {
                errors.weight = "Number required. greater than 1 and less than 1500";
            }
            if (!validateUrl.test(input.image)) {
            errors.image = "URL required";
            }

            return errors;
        };

    const handleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    const handleSelect = e => {
        if (input.types.length < 2) {
            setInput({
                ...input,
                types: [...input.types, e.target.value]
            })
            e.target.value = 'Select type';
        } else {
            alert('Two types of pokemon at most')
        }
    }

    const handleSubmit = e => {
        e.preventDefault();

        if (!errors.name && !errors.hp && !errors.attack && !errors.sp_attack && !errors.defense && !errors.sp_defense &&!errors.speed && !errors.height && !errors.weight && !errors.image ) {

            dispatch(postPokemon(input));
            setInput({ name: '',  hp: '',  attack: '', sp_attack: '',  defense: '', sp_defense: '',  speed: '',height: '', weight: '', types: [],image: ''});
            dispatch(cleanPokemons(dispatch));
            history.push('/home')
        } else {
            alert('Error. Check the form');
        }
    }

    const handleDelete = (e) => {
        setInput({
            ...input,
            types: input.types.filter(type => type !== e)
        })
    }

    useEffect(() => {
        dispatch(getAlltypes())
    }, [dispatch])

    return ( 
        <div className="container">
            <Link to='/home'>
                <button className="btnToBack">Go Back</button>
            </Link>
            <form className="form" onSubmit={e => {handleSubmit(e)}}>
            <h2 className="h2PokeCreated">Create a pokémon!</h2>
                <div className="div">
                    <div className="divito">

                        <label className="label">Name:</label>
                        <input className="input" type="text" value={input.name} name='name' onChange={e => {handleChange(e)}} placeholder="Name" />
                        <p className="p">{errors.name}</p>

                        <label className="label">HP:</label>
                        <input className="input" type="number" value={input.hp} name='hp' onChange={e => {handleChange(e)}} placeholder="HP" />
                        <p className="p">{errors.hp}</p>

                        <label className="label">Attack:</label>
                        <input className="input" type="number" value={input.attack} name='attack' onChange={e => {handleChange(e)}} placeholder="Attack" />
                        <p className="p">{errors.attack}</p>

                        <label className="label">Sp_attack:</label>
                        <input className="input" type="number" value={input.sp_attack} name='sp_attack' onChange={e => {handleChange(e)}} placeholder="Sp_attack" />
                        <p className="p">{errors.sp_attack}</p>

                        <label className="label">Defense:</label>
                        <input className="input" type="number" value={input.defense} name='defense' onChange={e => {handleChange(e)}} placeholder="Defense" />
                        <p className="p">{errors.defense}</p>

                        <label className="label">Sp_defense:</label>
                        <input className="input" type="number" value={input.sp_defense} name='sp_defense' onChange={e => {handleChange(e)}} placeholder="Sp_defense" />
                        <p className="p">{errors.sp_defense}</p>

                    </div>
                    <div className="divito">

                        <label className="label">Speed:</label>
                        <input className="input" type="number" value={input.speed} name='speed' onChange={e => {handleChange(e)}} placeholder="Speed" />
                        <p className="p">{errors.speed}</p>

                        <label className="label">Height:</label>                        
                        <input className="input" type="number" value={input.height} name='height' onChange={e => {handleChange(e)}} placeholder="Height" />
                        <p className="p">{errors.height}</p>

                        <label className="label">Weight:</label>
                        <input className="input" type="number" value={input.weight} name='weight' onChange={e => {handleChange(e)}} placeholder="Weight" />
                        <p className="p">{errors.weight}</p>

                        <label className="label">Image:</label>
                        <input className="input" type="text" value={input.image} name='image' onChange={e => {handleChange(e)}} placeholder="URL Image..." />
                        <p className="p">{errors.image}</p>

                    </div>
                </div>
                <div>
                    <select className="selectPokemonCreated" onChange={e => {handleSelect(e)}}>
                        <option>Select type</option>
                        {
                            types?.map(e => {
                                return (
                                    <option key={e.id} value={e.name}>{e.name}</option>
                                )
                            })
                        }
                    </select>
                            {
                                input.types.map(e => {
                                    return (
                                        <div className="typesSelect" key={e}>
                                            <p className="pTypes">{e}</p>
                                            <button className="btnDelete" onClick={() => {handleDelete(e)}}>X</button>
                                        </div>
                                    )
                                }) //para poder ver que fui seleccionando
                            }
                </div>
            <button className="btnCreate" type='submit'>Create!</button>
            </form>
        </div>
     );
}
 
export default PokemonCreate;