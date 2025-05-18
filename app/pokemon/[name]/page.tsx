import { notFound } from 'next/navigation';
import { gql } from '@apollo/client';
import { getClient } from '../../../lib/apollo-server-client';
import PokemonResult from '../../components/PokemonResult';

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

export default async function PokemonPage({ params }: { params: any }) {
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

export const dynamicParams = true;

export async function generateStaticParams() {
  // import แบบ dynamic เพื่อให้แน่ใจว่าไฟล์ JSON โหลดได้
  const namesModule = await import('../../../pokemonNames.json');
  const names = namesModule.default;

  if (!names || !Array.isArray(names) || names.length === 0) {
    throw new Error('pokemonNames.json is undefined, empty or invalid');
  }

  return names.map((name: string) => ({
    name: name.toLowerCase(),
  }));
}