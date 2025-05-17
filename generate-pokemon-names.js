const fs = require('fs');
const fetch = require('node-fetch');

const API_URL = 'https://graphql-pokemon2.vercel.app/';

async function fetchAllPokemonNames() {
  const query = `
    query {
      pokemons(first: 1000) {
        id
        name
      }
    }
  `;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  const json = await response.json();

  return json.data.pokemons.map(pokemon => pokemon.name);
}

async function main() {
  try {
    const pokemonNames = await fetchAllPokemonNames();
    fs.writeFileSync('pokemonNames.json', JSON.stringify(pokemonNames, null, 2));
    console.log(`Saved ${pokemonNames.length} pokemon names to pokemonNames.json`);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();