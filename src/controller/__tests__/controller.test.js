
import { jest } from '@jest/globals';


const mockView = {
    renderPokemonsList: jest.fn(),
    addEvents: jest.fn(),
    renderSectionOptions: jest.fn(),
}

const mockPokemonService = {
    searchByText: jest.fn(),
    getPokemons: jest.fn(),
    getByType: jest.fn(),
}

jest.mock('../../view/view', () => ({
    view: mockView
}));

jest.mock('../../services/pokemon/pokemonService', () => ({
    pokemonService: mockPokemonService
}));


const {controller} = require ('../controller.js');
describe("Controller", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should get all pokemons when search text is empty", async () => {
        await controller.onSearch("");
        
        expect(mockPokemonService.getPokemons).toHaveBeenCalled();
        expect(mockView.renderPokemonsList).toHaveBeenCalled();
    });

    it("should sort pokemons in ascending order", async () => {
        const mockList = [
            {name: "Bulbasaur"},
            {name: "Charmander"},
            {name: "Abra"}
        ];
        controller.setInMemoryList(mockList);
        
        await controller.onSort("asc")();
        
        expect(mockView.renderPokemonsList).toHaveBeenCalledWith([
            {name: "Abra"},
            {name: "Bulbasaur"}, 
            {name: "Charmander"}
        ]);
    });

    it("should sort pokemons in descending order", async () => {
        const mockList = [
            {name: "Bulbasaur"},
            {name: "Charmander"},
            {name: "Abra"}
        ];
        controller.setInMemoryList(mockList);
        
        await controller.onSort("reverse")();
        
        expect(mockView.renderPokemonsList).toHaveBeenCalledWith([
            {name: "Charmander"},
            {name: "Bulbasaur"},
            {name: "Abra"}
        ]);
    });

    it("should get all pokemons when type is 'all'", async () => {
        await controller.onSelectType("all");
        
        expect(mockPokemonService.getPokemons).toHaveBeenCalled();
        expect(mockView.renderPokemonsList).toHaveBeenCalled();
    });

    it("should filter pokemons by type", async () => {
        await controller.onSelectType("fire");
        
        expect(mockPokemonService.getByType).toHaveBeenCalledWith("fire");
        expect(mockView.renderPokemonsList).toHaveBeenCalled();
    });
    it("should be dispatch on search function correctly",async () => {
        await controller.onSearch("test");

        expect(mockPokemonService.searchByText).toHaveBeenCalledWith("test");
        expect(mockView.renderPokemonsList).toHaveBeenCalled();
    })
});

