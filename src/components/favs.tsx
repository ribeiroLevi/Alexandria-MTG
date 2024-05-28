import { useContext } from 'react';
import { favsContext } from '../context/favsContext';
import { Card } from './lib';

export function Favs() {
  const { favorites } = useContext(favsContext);

  return (
    <div>
      <h1>Favorite Items</h1>
      <ul>
        {favorites?.map((favorite) => (
          <li>
            <img src={favorite.imageUrl} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
