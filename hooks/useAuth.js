import { useEffect, useState } from "react";
import { isJwtExpired } from "jwt-check-expiration";

export const useAuth = () => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    const tkn = localStorage.getItem("tkn");
    const expired = isJwtExpired(tkn);
    if (tkn && !expired) setAuthenticated(true);
    else if (!tkn || expired) setAuthenticated(false);
  }, []);

  return { authenticated };
};
