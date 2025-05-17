'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import pokemonNames from '../pokemonNames.json';

interface Props {
  initialName: string;
}

export default function SearchInput({ initialName }: Props) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // ฟังก์ชันกรองชื่อ pokemon
  useEffect(() => {
    if (name.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    const filtered = pokemonNames.filter((n) =>
      n.toLowerCase().startsWith(name.toLowerCase())
    );
    setSuggestions(filtered);
    setShowSuggestions(true);
  }, [name]);

  const handleSearch = (searchName: string) => {
    if (searchName.trim()) {
      router.push(`/?name=${searchName.trim()}`);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative max-w-xl mx-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch(name);
        }}
        className="flex gap-2"
        aria-label="Pokémon search form"
      >
        <input
          type="text"
          placeholder="Enter Pokémon name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          aria-label="Pokémon name"
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 rounded-md hover:bg-purple-700 transition"
        >
          Search
        </button>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-48 overflow-auto shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSearch(suggestion)}
              className="px-4 py-2 cursor-pointer hover:bg-purple-100"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
