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
import { AuthContext } from "./AuthContext";
import {
  addFavorite,
  findFavoritesByUser,
  removeFavorite,
} from "../api/favoriteService";

type FavoritesContextType = {
  favorites: any[];
  setFavorites: Dispatch<SetStateAction<any[]>>;
  addToFavorites: (mediaId: number, mediaType: string) => void;
  removeFromFavorites: (mediaId: number) => any;
  isFavorite: any;
};

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const { user } = useContext(AuthContext);

  // load favs on mount
  useEffect(() => {
    if (!user) {
      return;
    }
    findFavoritesByUser(user._id).then((res) => {
      setFavorites(res.data);
    });
  }, [user]);

  const addToFavorites = useCallback(
    async (mediaId: number, mediaType: string) => {
      try {
        const favoriteRequest = {
          userId: user._id,
          mediaId: mediaId,
          mediaType: mediaType,
        };
        const result = await addFavorite(favoriteRequest);
        console.log(result);
        setFavorites((prev) => [...prev, { mediaId: mediaId }]);
      } catch (error) {
        console.log(error);
      }
    },
    [user],
  );

  const removeFromFavorites = useCallback(
    async (mediaId: number) => {
      try {
        const favoriteRequest = {
          userId: user._id,
          mediaId: mediaId,
        };
        const result = await removeFavorite(favoriteRequest);
        setFavorites((prev) => prev.filter((curr) => curr.mediaId !== mediaId));
      } catch (error) {
        console.log(error);
      }
    },
    [user],
  );

  const isFavorite = useCallback(
    (movieId: number) => {
      return favorites.some((media) => media.mediaId === movieId);
    },
    [favorites],
  );

  const value = {
    favorites,
    setFavorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};
