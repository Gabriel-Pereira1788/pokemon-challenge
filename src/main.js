import { controller } from './controller/controller.js';
import { pokemonService } from './services/pokemon/pokemonService.js';
import { view } from './view/view.js';

async function main(){
    const pokemonsData = await pokemonService.getPokemons();
    const pokemonsTypes = await pokemonService.getPokemonTypes();

    controller.setInMemoryList(pokemonsData);

     view.renderPokemonsList(pokemonsData);
     view.renderSectionOptions(pokemonsTypes)
     view.addEvents({
        searchButtonEvent:controller.onSearch,
        sortAscButtonEvent:controller.onSort(),
        sortDescButtonEvent:controller.onSort("reverse"),
        selectTypeEvent:controller.onSelectType,
     })
}

window.onload = () => {
    main();
}
