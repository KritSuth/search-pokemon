'use client';

import SearchInput from '../components/SearchInput';
import PokemonResult from '../components/PokemonResult';
import { useSearchParams } from 'next/navigation';

export default function HomePage() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-8 text-purple-700 drop-shadow-md">
        🔎 Pokémon Search
      </h1>

      <SearchInput initialName={name} />

      <div className="w-full max-w-xl mt-6">
        {name ? (
          <PokemonResult name={name} />
        ) : (
          <p className="text-center text-gray-500">Please enter a Pokémon name to search.</p>
        )}
      </div>
    </main>
  );
}