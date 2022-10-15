import React from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getDetailPromise , cleanDetail} from "../../redux/actions";
import { useEffect } from "react";
// import noImage from '../card/noImagen.png.jpg';
// import Loading from "../loading/loading";
import './detail.css'
export default function Detail(props) {

    console.log(props)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetailPromise(props.match.params.id))
        return ()=>dispatch(cleanDetail())
        
    }, [dispatch, props.match.params.id])

    const myPokemon = useSelector((state) => state.pokeDetail)
    console.log(myPokemon)

  

    return (
        <div className='detailsConteirner'>
            {/* {myPokemon.length > 0 && myPokemon.created && <p>Pokemon personalizado!!, crack :D</p>}
            {
                myPokemon.length > 0 ? */}
                    <div className='detailist'>
                        <h1> {myPokemon.name}</h1>
                        <img src={myPokemon.image} alt="pokemon" /> 
                        <h2>ID number: {myPokemon.id}</h2>
                        <h2>Life: {myPokemon.hp}</h2>
                        <h2>Attack: {myPokemon.attack}</h2>
                        <h2>Sp_attack: {myPokemon.sp_attack}</h2>
                        <h2>Defense: {myPokemon.defense}</h2>
                        <h2>Sp_defense: {myPokemon.sp_defense}</h2>
                        <h2>Heigth: {myPokemon.height}</h2>
                        <h2>Weigth: {myPokemon.weight}</h2>
                        <h2>Speed: {myPokemon.speed}</h2>
                        <h2>Types: {myPokemon.types + ' '}</h2>    
                    </div> 
            <Link to='/home'>
                <div className="btnVolverXfuera">
                <button className="botonVolverXdentro">Go To Home</button>
                </div>            
            </Link>
           
        </div>
    )  
}

















// const Detail = (props) => {

//     const dispatch = useDispatch();
//     const myPokemon = useSelector((state) => state.pokeDetail)

//     useEffect(() => {
//         dispatch(getDetailPromise(props.match.params.id))
//         return () => {
//             dispatch(cleanDetail(dispatch), cleanPokemons(dispatch))
//         }
//     }, [dispatch, props.match.params.id])


//     return ( 
//         <div>
//             {
//                 myPokemon.length > 0 ?
//                 <div className="container">
//                     <div className="card">
//                         <h2 className="h2">{myPokemon.name.charAt(0).toUpperCase() + myPokemon.name.slice(1)}</h2>
//                         <p className="p">#{myPokemon.id}</p>
//                         <img src={myPokemon.img ? myPokemon.img : noImage} alt="img not found" height="250px" width="200px" />
//                         <div className="types">
//                             <h3>{myPokemon.types?.map((e, k) => {
//                                     return (
//                                         <div className="types" key={k}>
//                                             <img className="typesImg" src={e.img} alt='X' />
//                                             <p className="text">{e.name.charAt(0).toUpperCase() + e.name.slice(1)}</p>
//                                         </div>
//                                     )
//                                 })} </h3>
//                         </div>
//                         <h5 className="h5">HP:  {myPokemon.hp}</h5>
//                         <h5 className="h5">Attack:  {myPokemon.attack}</h5>
//                         <h5 className="h5">Defense:  {myPokemon.defense}</h5>
//                         <h5 className="h5">Speed:  {myPokemon.speed}</h5>
//                         <h5 className="h5">Height:  {myPokemon.height}</h5>
//                         <h5 className="h5">Weight:  {myPokemon.weight}</h5>
//                     </div>
//                 </div> : 
//                 <div>
//                     <Loading />
//                 </div>
//             }
//             <div>
//             <Link to='/home'>
//                 <button className="btn">Go back</button>
//             </Link>
//             </div>
//         </div>
        
//      );
// }
 
// export default Detail;