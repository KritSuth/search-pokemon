import { gql } from '@apollo/client';
import { getClient } from '../../../lib/apollo-server-client';
import PokemonResult from '../../../components/PokemonResult';
import { notFound } from 'next/navigation';

const GET_POKEMON = gql`
  query getPokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      types
      image
      attacks {
        special {
          name
          damage
        }
      }
      evolutions {
        id
        name
      }
    }
  }
`;

type Props = {
  params: { name: string };
};

export default async function PokemonPage({ params }: Props) {
  const { name } = params;
  const client = getClient();
  const { data } = await client.query({
    query: GET_POKEMON,
    variables: { name },
  });

  const pokemon = data?.pokemon;
  if (!pokemon) return notFound();
  return (
    <main className="min-h-screen p-6">
      <PokemonResult name={name} />
    </main>
  );
}

export async function generateStaticParams() {
  const names = (await import('../../../pokemonNames.json')).default;
  return names.map((name: string) => ({
    name: name.toLowerCase(),
  }));
}

export const dynamicParams = true;
