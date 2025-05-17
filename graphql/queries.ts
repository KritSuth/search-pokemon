import { gql } from '@apollo/client';

export const GET_POKEMON = gql`
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
