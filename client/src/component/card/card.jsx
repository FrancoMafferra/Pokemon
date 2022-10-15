import React from "react";
import { NavLink } from "react-router-dom";
// import noImage from './noImagen.png.jpg';
import './card.css'

export default function Card({name, image, types, id}) {
    
    // console.log(name, image, types)
    return(
        <div>
             <NavLink className="none" to={`/pokemon/${id}`}>
                <div>
                    <img className="img" src={image} alt="img not found" width="200px" height="250vh" />
                    <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
                    
                    
                    <div>
                  <h3> Type: </h3>
                  {
                    types.map((n) => {
                      return (<p className="types">{n.toUpperCase()}</p>)
                    })
                  }
        
                </div>
                    
                    
                    {/* <div className="types">
                        {
                            types.map((e, k) => {
                                return (
                                    <div className="types" key={k}>
                                        <img className="typesImg" src={e.img} alt='X' />
                                        <p className="text">{e.name + e.name}</p>
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </div>
            </NavLink> 





{/* 
                 <p>{name}</p>
                 <img src={image} alt="pokemon"/>
                 <p>{types}</p> 
                 <p>{id}</p> */}
        </div>
    )
};