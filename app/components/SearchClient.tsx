// แยก SearchClient ออกมาจาก page.tsx ทำงานในฝั่ง logic เพื่อให้สามารถใช้ useSearchParams ได้ เพื่อทำเป็น Static Site Generation (SSG)
'use client';

import { useSearchParams } from 'next/navigation';
import SearchInput from './SearchInput';
import PokemonResult from './PokemonResult';

export default function SearchClient() {
  const searchParams = useSearchParams();
  const name = searchParams.get('name') || '';

  return (
    <>
      <SearchInput initialName={name} />
      <div className="w-full max-w-xl mt-6">
        {name ? (
          <PokemonResult name={name} />
        ) : (
          <p className="text-center text-inherit text-gray-500">
            Please enter a Pokémon name to search.
          </p>
        )}
      </div>
    </>
  );
}
