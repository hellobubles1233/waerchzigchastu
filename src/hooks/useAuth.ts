import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { useState, useCallback } from "react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import toast from "react-hot-toast";

export const useAuth = () => {
  const { instance, accounts } = useMsal();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async () => {
    setIsLoading(true);
    try {
      await instance.loginRedirect(loginRequest);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Anmeldefehler";
      setError(errorMessage);
      toast.error("Anmeldefehler. Bitte versuchen Sie es erneut.");
      setIsLoading(false);
    }
  }, [instance]);

  const logout = useCallback(async () => {
    try {
      await instance.logoutRedirect();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Abmeldefehler";
      setError(errorMessage);
      toast.error("Abmeldefehler. Bitte versuchen Sie es erneut.");
    }
  }, [instance]);

  const getToken = useCallback(async () => {
    try {
      const account = accounts[0];
      if (!account) {
        throw new Error("Kein aktives Konto gefunden");
      }

      try {
        const response = await instance.acquireTokenSilent({
          ...loginRequest,
          account,
        });
        return response.accessToken;
      } catch (err) {
        if (err instanceof InteractionRequiredAuthError) {
          await instance.loginRedirect(loginRequest);
        }
        throw err;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Token-Fehler";
      setError(errorMessage);
      toast.error("Fehler beim Abrufen des Tokens");
      return null;
    }
  }, [instance, accounts]);

  return {
    isAuthenticated: accounts.length > 0,
    user: accounts[0] || null,
    login,
    logout,
    getToken,
    error,
    isLoading,
  };
};