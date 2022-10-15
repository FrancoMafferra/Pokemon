import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { getAlltypes, filterCreated, filterType, filterAtk } from "../../redux/actions";
import SearchBar from "../searchBar/searchBar";
import "./filters.css"



const Filters = ({setCurrentPage, setOrder}) => {

    const dispatch = useDispatch(); //cambie el nombre
    const allTypes = useSelector((state)=>state.types); //estado de types
    const allPokemons = useSelector((state)=>state.AllPokemons); //

    

    useEffect(()=>{
        dispatch(getAlltypes())
    },[dispatch]);

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
        setCurrentPage(1);
      };
    
      // const handleOrderName = (e) => {
      //   e.preventDefault();
      //   dispatch(orderName(e.target.value));
      //   setCurrentPage(1);
      //   setOrder(e.target.value);
      // };
    
      const handleFilterType = (e) => {                                         
        e.preventDefault(); 
        dispatch(filterType(e.target.value)); 
        setCurrentPage(1);
        setOrder(e.target.value);
      };
    
      const handleFilterAtk = (e) => {
        e.preventDefault();
        dispatch(filterAtk(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
      };

  return (
    <div className="divPrincipal">
        <div><SearchBar/></div>
    <div>
      <div>
        <h4 className="h4">Filters</h4>
        <label className="labelFilter">Created - Api</label>
        <select className="select" onChange={e=>{handleFilterCreated(e)}}>
        <option value="all"> ALL </option> 
        <option value="api"> API </option> 
        <option value="created">CREATED</option>    
        <botton></botton>
        </select>
       




      </div>

     <div>
        <label className="labelFilter">Types</label>
        <select className="select" onChange={e=>{handleFilterType((e))}}>
            <option value="all"> ALL </option>
            {allTypes?.map(e=>{return(
              <option key={e.name} value={e.name}>{e.name/*.toUpperCase()*/}</option>
              )})}
              
        </select>
        </div>
    </div>

    <div>
        <h4 className="h4"> Order </h4>
        <select className="select" onChange={e=>{handleFilterAtk((e))}}>
            <option> BY ID  </option>
            <option className="optionOrder" > Attack </option>
            <option value="asc" /* onClick={e=>{handleFilterAtk(e)}}*/>ASC</option>
            <option value="desc" /*onClick={e=>{handleFilterAtk(e)}}*/ >DESC</option>
        
            <option className="optionOrder">Alphabetically</option>
             <option value="A-Z" /*onClick={e=>{handleOrderName(e)}} */>A-Z</option>
            <option value="Z-A" /*onClick={e=>{handleOrderName(e)}}  */>Z-A</option> 
        </select>
    </div>

    </div>
  )
}

export default Filters


