import { useContext } from 'react';
import { favsContext } from '../context/favsContext';
export function Favs() {
  const { favorites } = useContext(favsContext);
  console.log(favorites);
  return 'Hello World';
}
