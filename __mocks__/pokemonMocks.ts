export const bulbasaur = {
  id: '1',
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
  image: 'https://img.pokemondb.net/artwork/bulbasaur.jpg',
  attacks: {
    special: [
      { name: 'Vine Whip', damage: 45 },
      { name: 'Razor Leaf', damage: 55 },
    ],
  },
  evolutions: [
    { id: '2', name: 'Ivysaur' },
  ],
};

export const charmander = {
  id: '4',
  name: 'Charmander',
  types: ['Fire'],
  image: 'https://img.pokemondb.net/artwork/charmander.jpg',
  attacks: {
    special: [
      { name: 'Flamethrower', damage: 90 },
      { name: 'Fire Spin', damage: 35 },
    ],
  },
  evolutions: [
    { id: '5', name: 'Charmeleon' },
  ],
};

export const squirtle = {
  id: '7',
  name: 'Squirtle',
  types: ['Water'],
  image: 'https://img.pokemondb.net/artwork/squirtle.jpg',
  attacks: {
    special: [
      { name: 'Water Gun', damage: 40 },
      { name: 'Bubble', damage: 30 },
    ],
  },
  evolutions: [
    { id: '8', name: 'Wartortle' },
  ],
};
