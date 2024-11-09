function renderPokemonsList(listData){
    const pokemonListEl = document.querySelector('.pokemon_list');
    pokemonListEl.innerHTML = listData
    .map(pokemon => buildCardElement(pokemon))
    .join('');
}

function buildCardElement(pokemon){
    return `<div class="pokemon_card"><img src="${pokemon.img}" alt="${pokemon.name} image"><p>${pokemon.name}</p></div>`;
}

function renderEmptyState(){
    const pokemonListEl = document.querySelector('.pokemon_list');
    pokemonListEl.innerHTML = buildEmptyState('No Pokemons Found', 'Please try again.');
}

function buildEmptyState(title,message){
    return `
        <div class="empty_state">
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
    `
}
function addOnClickSearchEvent(searchEvent){
    const searchButton = document.querySelector('#searchButton');
    searchButton.addEventListener('click',() => {
        const inputSearch = document.querySelector('#searchInput');
        searchEvent(inputSearch.value);
    });
}

export const view = {
    renderPokemonsList,
    renderEmptyState,
    addOnClickSearchEvent,
}
