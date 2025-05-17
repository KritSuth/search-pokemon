'use client';

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';

const GET_POKEMON = gql`
  query Pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      image
      types
      evolutions {
        id
        name
      }
      attacks {
        special {
          name
          damage
        }
      }
    }
  }
`;

export default function PokemonResult({ name }: { name: string }) {
  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { name },
  });

  if (loading)
    return <p className="text-center text-gray-500">Loading...</p>;

  if (error || !data?.pokemon)
    return (
      <p className="text-center text-red-600 font-semibold">
        Pokémon not found.
      </p>
    );

  const p = data.pokemon;

  return (
    <section className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <header className="flex items-center gap-6 mb-4">
        <img
          src={p.image}
          alt={p.name}
          className="w-24 h-24 rounded-full border-4 border-purple-300"
        />
        <h2 className="text-3xl font-bold text-purple-700">{p.name}</h2>
      </header>

      <p className="mb-4">
        <span className="font-semibold">Type:</span> {p.types.join(', ')}
      </p>

      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-purple-600">Special Attacks:</h3>
        <ul className="list-disc list-inside space-y-1">
          {p.attacks.special.map((atk: any) => (
            <li key={atk.name} className="text-gray-700">
              {atk.name} ({atk.damage} dmg)
            </li>
          ))}
        </ul>
      </div>

      {p.evolutions && p.evolutions.length > 0 && (
        <div>
          <h3 className="font-semibold mb-2 text-purple-600">Evolutions:</h3>
          <ul className="list-disc list-inside space-y-1">
            {p.evolutions.map((evo: any) => (
              <li key={evo.id}>
                <Link
                  href={`/?name=${evo.name}`}
                  className="text-purple-700 hover:underline font-medium"
                >
                  {evo.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}