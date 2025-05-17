import { render, screen, waitFor } from '@testing-library/react';
import PokemonResult from '../components/PokemonResult';
import { MockedProvider } from '@apollo/client/testing';
import { GET_POKEMON } from '../graphql/queries';
import { bulbasaur, charmander, squirtle } from '../__mocks__/pokemonMocks';

const createMock = (pokemonData: any) => ({
  request: {
    query: GET_POKEMON,
    variables: { name: pokemonData.name },
  },
  result: {
    data: { pokemon: pokemonData },
  },
});

describe('PokemonResult Component', () => {
  it('renders Bulbasaur correctly as Grass/Poison type', async () => {
    render(
      <MockedProvider mocks={[createMock(bulbasaur)]} addTypename={false}>
        <PokemonResult name="Bulbasaur" />
      </MockedProvider>
    );
    expect(await screen.findByText(/Bulbasaur/i)).toBeInTheDocument();

    await waitFor(() => {
      const types = screen.getAllByText(/Grass, Poison/i);
      expect(types.length).toBeGreaterThan(0);
    });
  });

  it('renders Charmander correctly as Fire type', async () => {
    render(
      <MockedProvider mocks={[createMock(charmander)]} addTypename={false}>
        <PokemonResult name="Charmander" />
      </MockedProvider>
    );
    expect(await screen.findByText(/Charmander/i)).toBeInTheDocument();

    await waitFor(() => {
      const fireTypes = screen.getAllByText(/Fire/i);
      expect(fireTypes.length).toBeGreaterThan(0);
    });
  });

  it('renders Squirtle correctly as Water type', async () => {
    render(
      <MockedProvider mocks={[createMock(squirtle)]} addTypename={false}>
        <PokemonResult name="Squirtle" />
      </MockedProvider>
    );
    expect(await screen.findByText(/Squirtle/i)).toBeInTheDocument();

    await waitFor(() => {
      const waterTypes = screen.getAllByText(/Water/i);
      expect(waterTypes.length).toBeGreaterThan(0);
    });
  });
});