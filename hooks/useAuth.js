import { useEffect, useState } from "react";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const tkn = localStorage.getItem("tkn");
    if (tkn) setAuthenticated(true);
    else if (!tkn) setAuthenticated(false);
  }, []);

  return authenticated;
};
