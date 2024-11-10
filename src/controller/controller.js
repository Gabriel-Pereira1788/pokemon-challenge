import { pokemonService } from "../services/pokemon/pokemonService.js";
import { view } from "../view/view.js";

let inMemoryList = [];
async function onSearch(text){
    if(text && text.length > 0){
        const pokemonsData = await pokemonService.searchByText(text);

         setInMemoryList(pokemonsData)
         view.renderPokemonsList(pokemonsData);
    } else {
        const pokemonsData = await pokemonService.getPokemons();

        setInMemoryList(pokemonsData)
        view.renderPokemonsList(pokemonsData);
    }
}

function onSort(type){
    return async () => {
        const sortedData = inMemoryList.sort((a,b) => a.name.localeCompare(b.name));
        if(type === "reverse"){
            view.renderPokemonsList(sortedData.reverse())
        } else {
            view.renderPokemonsList(sortedData)
        }

    }
}

async function onSelectType(type){
    if(type.toLowerCase() === 'all'){
        const pokemonsAllData = await pokemonService.getPokemons();

        setInMemoryList(pokemonsAllData)
        view.renderPokemonsList(pokemonsAllData);
    } else {
        const pokemonsData = await pokemonService.getByType(type);

        setInMemoryList(pokemonsData)
        view.renderPokemonsList(pokemonsData);
    }
}

function setInMemoryList(list){
    inMemoryList = list;
}

export const controller = {
    onSort,
    onSearch,
    onSelectType,
    setInMemoryList,
}
