import { useEffect, useState } from "react";

const useAuth = () => {
  const [user, setUser] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setUser(user);
    setIsLoading(false);
  }, []);

  return { user, isLoading };
};

export default useAuth;
