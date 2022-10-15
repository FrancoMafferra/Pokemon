const {Pokemon, Type} = require ("../db")
const axios = require ("axios");

//!-----------------------------------------------------------------------------------------------------------
async function infoApi(){
	//const pokemonsData=[]
 const pokemons40= await axios('https://pokeapi.co/api/v2/pokemon?limit=40&offset=0');
 const pokesUrl = pokemons40.data.results.map(e=> axios(e.url) )//llega [] de promesas
 const pokesList = Promise.all(pokesUrl)
 .then(e=> e.map(el => {
	let al = el.data
	return{
    id: al.id,
		name: al.name,
		weight: al.weight,
		height: al.height,
		types: al.types.map(e=> e.type.name),
		hp: al.stats[0].base_stat,
		attack: al.stats[1].base_stat,
		defense: al.stats[2].base_stat,
		sp_attack: al.stats[3].base_stat,
		sp_defense: al.stats[4].base_stat,
		speed: al.stats[5].base_stat,
	     image: al.sprites.versions['generation-v']['black-white']['animated']['front_shiny'],
		//image: al.sprites.other["official-artwork"].front_default,
	};
    }))
	return globalThis.pokeData = pokesList
//  return pokesList
 }
//!-------------------------------------------------------------------------------------------------------------------
//!FN DE CREADOS EN DB 
async function getPokemonsCreated(){
	 const pokemonsC = await Pokemon.findAll({
		
		include:{
			model: Type,
			attributes:["name"],
			through:{attributes:[]}
		  }
	  })
		// return pokemonsC
		const datoLimpio = JSON.parse(JSON.stringify(pokemonsC, null, 2))
		datoLimpio.forEach(pokemon => pokemon.types = pokemon.types.map(tp => tp.name))
		//console.log(datoLimpio)
		return datoLimpio

	}



	
//!-----------------------------------------------------------------------------------------------------
//!CONCATENO API Y DB	
async function getAllPokemons(){
		const info = await infoApi();
		const pokemonsCreated = await getPokemonsCreated();
		const allPokemons = info.concat(pokemonsCreated); 
	
		return allPokemons
	}
	
//!------------------------------------------------------------------------------------------------------------
async function getPokeById (id) { //!api
	const callApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
	const el = callApi.data
	const pokeData ={
		id: el.id,
		name: el.name,
		// image: el.sprites.versions['generation-v']['black-white']['animated']['front_shiny'],
		image: el.sprites.other["official-artwork"].front_default,
		
		types: el.types.map(e=>e.type.name),
		hp: el.stats[0]['base_stat'],
        attack: el.stats[1]['base_stat'],
		defense: el.stats[2]['base_stat'],
		sp_attack: el.stats[3]["base_stat"],
		sp_defense: el.stats[4]['base_stat'],
		speed: el.stats[5]['base_stat'],
		height: el.height,
		weight: el.weight,
	}
	return pokeData;
}
//!------------------------------------------------------------------------
// async function getPokeCreatById(id){ //!DB
// 	const pokeData = await Pokemon.findAll({
// 		where: {id:id,},
// 		include:{
// 			model: Type,
// 			attributes:["name"],
// 			throug:{attributes:[]}
// 		}
// 	})
// 	return pokeData



async function getPokemonsDbById(id){
    const pokeData = await Pokemon.findByPk(id, {
    include: {
      model: Type,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  return {
    id: pokeData.id,
    image: pokeData.image,
    name: pokeData.name,
    types: pokeData.types.map((e) => e.name), //TODO 
    hp: pokeData.hp,
    attack: pokeData.attack,
	sp_attack: pokeData.sp_attack,
    defense: pokeData.defense,
	sp_defense: pokeData.sp_defense,
    speed: pokeData.speed,
    height: pokeData.height,
    weight: pokeData.weight,
  };
  }

module.exports = {
	getAllPokemons,getPokeById,getPokemonsDbById
}
	
	//   async function a (){
	//   	let a = await infoApi()
	//   	console.log(a)
	//   }
	//   a()