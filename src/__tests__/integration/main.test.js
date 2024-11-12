/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
const main = require('../../main.js');
const { mockPokemonData } = require('../../test/mock/mockPokemonData.js');
const { mockFetchImplementation, waitForElements, waitForElement } = require('../../test/utils');


describe("Main", () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <section class="pokemon_list"></section>
            <section id="controls">
                <input type="text" id="searchInput">
                <button id="searchButton"></button>
            </section>
            <section class="filters_container">
                <select id="pokemonType"></select>
                <button id="sortAscButton"></button>
                <button id="sortDescButton"></button>
            </section>
        `;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Flow: should be render pokemons list",async () => {
        mockFetchImplementation(mockPokemonData);
        window.onload();
        const pokemonsCards = await waitForElements('.pokemon_card');
        expect(pokemonsCards.length).toEqual(mockPokemonData.length);
    })

    it("Flow: should be render empty state when pokemon list is empty",async () => {
        mockFetchImplementation([]);
        window.onload();
        const emptyStateSection = await waitForElement('.empty_state');
        expect(emptyStateSection).toBeTruthy();
    })
    it("Flow: should filter pokemons by type and render the results", async () => {
        mockFetchImplementation(mockPokemonData);
        window.onload();
        // 1) render list
        await waitForElements('.pokemon_card');
        // 2) get type select
        const typeSelect = document.querySelector('#pokemonType');
        // 3) trigger change event with Grass type
        const changeEvent = new Event('change');
        typeSelect.value = 'Grass';
        typeSelect.dispatchEvent(changeEvent);
        // 4) wait for filtered cards
        const pokemonsCards = await waitForElements('.pokemon_card');
        // 5) assert the results - both Bulbasaur and Ivysaur are Grass type
        expect(pokemonsCards.length).toEqual(2);
    })

    it("Flow: should sort pokemons in ascending and descending order", async () => {
        mockFetchImplementation(mockPokemonData);
        window.onload();
        // 1) get sort buttons
        const sortAscButton = document.querySelector('#sortAscButton');
        const sortDescButton = document.querySelector('#sortDescButton');
        
        // 2) test ascending sort
        sortAscButton.click();
        let pokemonCards = await waitForElements('.pokemon_card');
        let pokemonNames = Array.from(pokemonCards).map(card => card.querySelector('p').textContent);
        expect(pokemonNames).toEqual(['Bulbasaur', 'Ivysaur']);

        // 3) test descending sort
        sortDescButton.click();
        pokemonCards = await waitForElements('.pokemon_card');
        pokemonNames = Array.from(pokemonCards).map(card => card.querySelector('p').textContent);
        expect(pokemonNames).toEqual(['Ivysaur', 'Bulbasaur']);
    },)

    it("Flow: should be search data by text and render the results",async () => {
        mockFetchImplementation(mockPokemonData);
        window.onload();
        // 1) render list
        await waitForElements('.pokemon_card');
        // 2) get search input
        const searchInput = document.querySelector('#searchInput');
        // 3) set value to search input
        searchInput.value = 'Bulbasaur';
        // 4) get search button
        const searchButton = document.querySelector('#searchButton');
        // 5) click on search button
        searchButton.click();
        // 6) wait for new pokemons card rendered
        const pokemonsCards = await waitForElements('.pokemon_card');
        // 7) assert the results
        expect(pokemonsCards.length).toEqual(1);
    })
})
