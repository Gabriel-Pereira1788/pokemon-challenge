/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
const { view } = require('../view.js');

describe('View', () => {
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
    it('should render empty state when pokemon list is empty', () => {
        const emptyList = [];
        
        view.renderPokemonsList(emptyList);
        
        const pokemonList = document.querySelector('.pokemon_list');
        expect(pokemonList?.innerHTML).toContain('No Pokemons Found');
        expect(pokemonList?.innerHTML).toContain('Please try again.');
    });

    it('should render pokemon types options correctly', () => {
        const mockTypes = ['fire', 'water', 'grass'];
        
        view.renderSectionOptions(mockTypes);
        
        const typeSelect = document.querySelector('#pokemonType');
        expect(typeSelect?.children.length).toBe(mockTypes.length);
        expect(typeSelect?.innerHTML).toContain('fire');
        expect(typeSelect?.innerHTML).toContain('water');
        expect(typeSelect?.innerHTML).toContain('grass');
    });

    it('should not render type options when types list is empty', () => {
        const emptyTypes = [];
        
        view.renderSectionOptions(emptyTypes);
        
        const typeSelect = document.querySelector('#pokemonType');
        expect(typeSelect?.children.length).toBe(0);
    });

    it('should add event listeners to control elements', () => {
        const mockEvents = {
            searchButtonEvent: jest.fn(),
            sortAscButtonEvent: jest.fn(),
            sortDescButtonEvent: jest.fn(),
            selectTypeEvent: jest.fn()
        };

        view.addEvents(mockEvents);

        const searchButton = document.querySelector('#searchButton');
        const sortAscButton = document.querySelector('#sortAscButton');
        const sortDescButton = document.querySelector('#sortDescButton');
        const typeSelect = document.querySelector('#pokemonType');
        
        searchButton?.click();
        sortAscButton?.click();
        sortDescButton?.click();
        typeSelect?.dispatchEvent(new Event('change'));

        expect(mockEvents.searchButtonEvent).toHaveBeenCalled();
        expect(mockEvents.sortAscButtonEvent).toHaveBeenCalled();
        expect(mockEvents.sortDescButtonEvent).toHaveBeenCalled();
        expect(mockEvents.selectTypeEvent).toHaveBeenCalled();
    });

    it('should be render pokemons list correctly.', () => {
        const mockPokemons = [
            { name: 'Pikachu', types: ['electric'], image: 'pikachu.jpg' },
            { name: 'Charmander', types: ['fire'], image: 'charmander.jpg' }
        ];

        view.renderPokemonsList(mockPokemons);

        const pokemonList = document.querySelector('.pokemon_list');
        expect(pokemonList?.children.length).toBe(2);
        expect(pokemonList?.innerHTML).toContain('Pikachu');
        expect(pokemonList?.innerHTML).toContain('Charmander');
    });

});
