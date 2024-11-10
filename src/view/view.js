function renderPokemonsList(listData){
    if(listData && listData.length > 0) {
        const pokemonListEl = document.querySelector('.pokemon_list');
        pokemonListEl.innerHTML = listData
        .map(pokemon => buildCardElement(pokemon))
        .join('');
    } else {
        const pokemonListEl = document.querySelector('.pokemon_list');
        pokemonListEl.innerHTML = buildEmptyState('No Pokemons Found', 'Please try again.');
    }
}

function buildCardElement(pokemon){
    return `
    <div class="pokemon_card">
        <img src="${pokemon.img}" alt="${pokemon.name} image">
        <p>${pokemon.name}</p>
    </div>`;
}

function buildEmptyState(title,message){
    return `
        <div class="empty_state">
            <h2>${title}</h2>
            <p>${message}</p>
        </div>
    `
}

function renderSectionOptions(pokemonTypes){
    if(pokemonTypes && pokemonTypes.length > 0){
        const typeSelectEl = document.querySelector("#pokemonType");
        typeSelectEl.innerHTML += pokemonTypes.map((type) => {
            return buildTypeOption(type);
        })
    }
}

function buildTypeOption(type){
    return `
        <option value=${type}>${type}</option>
    `
}

function addEvents(events){
    const searchButton = document.querySelector('#searchButton');
    const sortAscButton = document.querySelector('#sortAscButton');
    const sortDescButton = document.querySelector('#sortDescButton');
    const pokemonTypeSelect = document.querySelector("#pokemonType");

    searchButton.addEventListener('click',() => {
        const inputSearch = document.querySelector('#searchInput');
        events.searchButtonEvent(inputSearch.value);
    });
    sortAscButton.addEventListener('click',events.sortAscButtonEvent);
    sortDescButton.addEventListener('click',events.sortDescButtonEvent);
    pokemonTypeSelect.addEventListener('change',(event) => {
        const type = event.target.value;
        events.selectTypeEvent(type);
    })
}

export const view = {
    renderPokemonsList,
    renderSectionOptions,
    addEvents,

}
