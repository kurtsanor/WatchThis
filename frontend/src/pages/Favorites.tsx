import { Button, Text, Title } from "@mantine/core";
import { useState } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  return (
    <div>
      <Title order={3} mb={"xl"}>
        Your Favorites
      </Title>
      {favorites.length < 1 && (
        <Text ta={"center"}>You have no favorites.</Text>
      )}
    </div>
  );
}
export default Favorites;
