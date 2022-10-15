const { Router } = require('express');
const { Pokemon, Type } = require('../db');
const axios = require('axios');
const { getAllPokemons, getPokeById, getPokemonsDbById } = require('./functionsR');
const { where } = require('sequelize');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


//!------------------------------------------------------------------------------------------------------
router.get('/pokemon', async (req, res)=>{
  const { name } = req.query; //!aca nombre x query
	console.log(name)
	const allPokemons = await getAllPokemons(); //! CAMBIAR ESTA HARDCADEADO!!!!-----------------------------------------
	if (!name) {  //! sin query anda
		res.json(allPokemons);
	} else {  //! con query si anda 
		try {
			console.log( "Imprimiendo", name)
			 const pokemon = allPokemons.filter((pokemon)=> pokemon.name.toLowerCase() === name.toLowerCase())
			 if(pokemon)return res.json(pokemon);
			 return res.status(408).send("We couldn't find your Pokemon")
			} catch(error) {
			res.status(402).send(error)    
			}
    }
});



//!----------------------------------------------------------------------------------------------------
router.get('/pokemon/:idPokemon', async (req, res)=>{ 
	  const { idPokemon } = req.params;
	    try {
	      if (idPokemon<41) {
	        const detallesPokemon = await getPokeById(idPokemon);//!de la api
	        return res.json(detallesPokemon);
	      } else {
	       const detallesPokemon = await getPokemonsDbById(idPokemon);
	       res.json(detallesPokemon);
	      }
	    } catch(e) {
	     res.status(400).send(e);
	    }   
	 });


//!--------------------------------------------------------------------------------------------
router.delete('/pokemon/delete/:idPokemon', async (req, res)=>{ 
    const { idPokemon } = req.params;
	try {
        const deletedPokemon = await Pokemon.findByPk(idPokemon);
		await deletedPokemon.destroy();

		res.send("You've freed a pokemon");
		
	} catch(e) {
		res.status(400).send(e);
	}
	
});
//!--------------------------------------------------------------------------------------------------------

 let id = 41
 
 router.post('/pokemon', async (req, res) => {
	let {name,hp,attack,sp_attack,defense,sp_defense,height,weight,speed,image,createdInDb,types, } = req.body;
	if (!name || !hp || !attack || !defense || !types) {
		return res.json(" You must enter name and specs to create a POKEMON ")
	}
	try {
	  let pokemonCreated = await Pokemon.create({ name,hp,attack,sp_attack,defense,sp_defense,height,weight,speed,image,id: id++,createdInDb,}) //devuelvo todo 1 array
	  let pokemonDb = await Type.findAll({ where: { name: types } })
	  pokemonCreated.addType(pokemonDb)
	  res.status(201).send(" POKEMON created succesfully ")
	} catch (error) {
	  console.log(error);
	  res.status(404).send(" The POKEMON already exists")
	}
})



// router.post("/types", async(req, res)=>{
//  let{name} = req.body
//  try {
	
// 		let nuevoTypo = await Type.create({name})
// 		res.status(200).send(nuevoTypo)
	
//  } catch (error) {
// 	res.status(400).send("type existent")
//  }
// })

//!------------------------------------------------------------------------------------------------------------------
 router.get('/types', async (req, res)=> { //!funciona
	 try {
		const types = await Type.findAll({
			attributes: ['name']
		})
		
 	if (types[0]) {
 		return res.json(types);
 	 } else {
 		  const llamadoApi = await axios('https://pokeapi.co/api/v2/type');
 		  const typesOriginal= llamadoApi.data.results.map((type)=> {return { name: type.name}});
 		  console.log(typesOriginal)		
 		  Type.bulkCreate(typesOriginal);
 		  return res.json(typesOriginal);
 	  }
 	}catch(e) {
		console.log(e)
 		res.status(400).send(e);
 	  }
 });

























module.exports = router