import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

type MovieContextType = {
  favorites: any[];
  setFavorites: Dispatch<SetStateAction<any[]>>;
  addToFavorites: any;
  removeFromFavorites: any;
  isFavorite: any;
};

const MovieContext = createContext<MovieContextType | null>(null);

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  // load favs on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
  }, []);

  // for storing favs on local storage only
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = useCallback((movie: any) => {
    setFavorites((prev) => [...prev, movie]);
  }, []);

  const removeFromFavorites = useCallback((movieId: number) => {
    setFavorites((prev) => prev.filter((curr) => curr.id !== movieId));
  }, []);

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((movie) => movie.id === movieId);
    },
    [favorites]
  );

  const value = {
    favorites,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
};
