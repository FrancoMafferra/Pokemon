import { 
    GET_POKEMONS, 
    GET_ALL_TYPES, 
    FILTER_CREATED, 
    FILTER_TYPE,
    ORDER_ATK,
    GET_POKEMON_NAME,
    POST_POKEMON,
    GET_DETAILS,
    CLEAN_DETAIL,
    CLEAN_POKEMONS,
    
    // LOADING
 } from "./actions";

const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    pokeDetail: [],
    
}

const rootReducer = (state = initialState, action) => {
    
    switch(action.type) {
        
        case GET_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            };



        case CLEAN_POKEMONS:
            return {
                ...state,
                pokemons: action.payload
            }    


        case GET_ALL_TYPES:
            return {
                ...state,
                types: action.payload
            }; 





            case FILTER_CREATED:
                const allPokemons = state.allPokemons;
                const createdFilter = action.payload === 'created' ? allPokemons.filter(el => el.createdInDb) : state.allPokemons.filter(el => !el.createdInDb)
                return{
                  ...state,
                  pokemons: action.payload === "all" ? state.allPokemons : createdFilter
                }




            
        case FILTER_TYPE:
            let typeFiltered = state.allPokemons.filter(e => {
                if(e.types?.includes(action.payload))
                return e
            });
            if(action.payload === "ALL"){
                typeFiltered = state.allPokemons;   
                alert('There are no pokemon of the indicated type');
            }; 
            
            return {
                ...state,
                pokemons: typeFiltered
            };
        


        //     case 'FILTER_TYPES':
        // let filterType = state.allPokemons.filter((e) => {
        //    if(e.types?.includes(action.payload)) 
        //    return e 
        //   })
        // if(action.payload === "All"){
        //   filterType = state.allPokemons
        // }
        // return {
        //   ...state,
        //   pokemons: filterType
        // }

            // case "FILTER_POKEMON_BY_TYPE": //filtrar por tipo
            // let filterType = state.allPokemons.filter(p => { //filtro los pokemones buscando coincidencia del tipo
            //   if (p.types?.includes(action.payload)) return p  //si el tipo es el mismo al del payload me lo trae
            // })
            // if (action.payload === "All") {
            //   filterType = state.allPkemons
            // }
            // return {
            //   ...state,
            //   pokemons: filterType
            // }

        // case ORDER_NAME:
        //     let copy3 = state.pokemons;
        //     let sortedName = action.payload === 'asc' ?
        //         copy3.sort((a, b) => {
        //             return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        //         }) :
        //         copy3.sort((a, b) => {
        //             return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
        //         })
        //     return {
        //         ...state,
        //         pokemons: sortedName
        //     };          







        case ORDER_ATK:
            let copy4 = state.pokemons;
            let sortedStr
             if(action.payload === 'asc'){sortedStr=copy4.sort((a, b) => a.attack - b.attack)}
                // copy4.sort((a, b) => a.attack - b.attack) :
             else if(action.payload === 'desc'){sortedStr=copy4.sort((a, b) => b.attack - a.attack)}
            // console.table(sortedStr);    
            else if(action.payload === 'A-Z'){sortedStr=copy4.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))}
            else if(action.payload === 'Z-A'){sortedStr=copy4.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()))}
            else(sortedStr = copy4 )
            return {
                ...state,
                pokemons: sortedStr
            };



        case GET_POKEMON_NAME:
            return {
                ...state,
                pokemons: action.payload
            };
        case GET_DETAILS:
            return {
                ...state,
                pokeDetail: action.payload
            }
        case CLEAN_DETAIL:
            return {
                ...state,
                pokeDetail: []
            }
        case POST_POKEMON:
            return {
                ...state
            };
        
        default: 
            return {...state};
    };
    
};

export default rootReducer;