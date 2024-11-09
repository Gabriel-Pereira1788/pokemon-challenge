async function getPokemons(){
    const response = await fetch('./src/service/pokemon_data.json')
    const data = await response.json();

    return data.pokemon;
}

async function searchByText(text){
    const response = await fetch('./src/service/pokemon_data.json')
    const data = await response.json();

    const filteredData = data.pokemon.filter((data) => {
        return data.name.toLowerCase().startsWith(text.toLowerCase())
    })

    return filteredData;
}

export const pokemonService = {
    getPokemons,
    searchByText
}
