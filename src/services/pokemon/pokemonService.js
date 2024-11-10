async function getPokemons(){
    const response = await fetch('./src/services/pokemon/pokemon_data.json')
    const data = await response.json();

    return data.pokemon;
}

async function getPokemonTypes(){
    const pokemonsListData = await getPokemons();
    if(pokemonsListData.length > 0){
        return pokemonsListData.reduce((acc,data) => {
            data.type.forEach((type) => {
                if(!acc.includes(type)){
                    acc.push(type);
                }
            })
            return acc;
        },[])
    }
    return []
}
async function searchByText(text){
    const pokemonsListData = await getPokemons();

    const filteredData = pokemonsListData.filter((data) => {
        return data.name.toLowerCase().startsWith(text.toLowerCase())
    })

    return filteredData;
}

async function getByType(type){
    const pokemonsListData = await getPokemons();

    return pokemonsListData.filter((data) => {
        return data.type.includes(type);
    });
}

export const pokemonService = {
    getPokemons,
    getPokemonTypes,
    getByType,
    searchByText
}
