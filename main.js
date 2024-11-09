import { pokemonService } from './src/service/pokemonService.js';
import { view } from './src/view/view.js';

async function init(){
    const pokemonsData = await pokemonService.getPokemons();

     handleRenderPokemonsList(pokemonsData);
     view.addOnClickSearchEvent(onSearch);
}
async function onSearch(text){
    if(text && text.length > 0){
        const pokemonsData = await pokemonService.searchByText(text);
         handleRenderPokemonsList(pokemonsData)
    } else {
        const pokemonsData = await pokemonService.getPokemons();
        handleRenderPokemonsList(pokemonsData)
    }
}


function handleRenderPokemonsList(pokemonsData){
    if(pokemonsData && pokemonsData.length > 0) {
        view.renderPokemonsList(pokemonsData);
    } else {
        view.renderEmptyState();
    }
}

init();
