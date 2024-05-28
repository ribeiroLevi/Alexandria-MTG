import { Card } from '../components/lib';
import React, { useState, ReactNode } from 'react';

interface favsContextProps {
  favorites: Card[];
  setFavorites: React.Dispatch<React.SetStateAction<Card[]>>;
}

export const favsContext = React.createContext<favsContextProps>({
  favorites: [],
  setFavorites: () => console.warn('Dispatch is not ready'),
});

export const FavsProvider: React.FC<{ children: ReactNode[] }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Card[]>([]);
  return (
    <favsContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </favsContext.Provider>
  );
};
