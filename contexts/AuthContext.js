import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Router from "next/router";
import {
  loginRequest,
  fetchSessionRequest,
  logoutRequest,
  setAuthToken
} from "../lib/api";

const TOKEN_KEY = "medie-token";
const USER_KEY = "medie-user";

const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  isAuthenticating: false,
  error: null,
  login: async () => {},
  logout: async () => {},
  refreshSession: async () => {},
  setUser: () => {}
});

function persist(key, value) {
  if (typeof window === "undefined") return;
  try {
    if (value) {
      window.localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
    } else {
      window.localStorage.removeItem(key);
    }
  } catch (error) {
    console.warn("Unable to access localStorage", error);
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState(null);

  const resetSession = useCallback(() => {
    setAuthToken(null);
    setToken(null);
    setUser(null);
    persist(TOKEN_KEY);
    persist(USER_KEY);
  }, []);

  useEffect(() => {
    let isMounted = true;
    async function bootstrap() {
      if (typeof window === "undefined") return;
      const storedToken = window.localStorage.getItem(TOKEN_KEY);
      const storedUser = window.localStorage.getItem(USER_KEY);
      if (storedToken) {
        setToken(storedToken);
        setAuthToken(storedToken);
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch {
            persist(USER_KEY);
          }
        }
        try {
          const session = await fetchSessionRequest();
          if (isMounted && session?.user) {
            setUser(session.user);
            persist(USER_KEY, session.user);
          }
        } catch (sessionError) {
          console.warn("Session bootstrap failed", sessionError);
          if (isMounted) {
            resetSession();
          }
        }
      }
      if (isMounted) {
        setLoading(false);
      }
    }
    bootstrap();
    return () => {
      isMounted = false;
    };
  }, [resetSession]);

  const login = useCallback(async (credentials) => {
    setIsAuthenticating(true);
    setError(null);
    try {
      const { token: nextToken, user: nextUser } = await loginRequest(credentials);
      if (!nextToken || !nextUser) {
        throw new Error("Invalid response from login endpoint");
      }
      setToken(nextToken);
      setAuthToken(nextToken);
      persist(TOKEN_KEY, nextToken);
      setUser(nextUser);
      persist(USER_KEY, nextUser);
      return nextUser;
    } catch (loginError) {
      setError(loginError);
      throw loginError;
    } finally {
      setIsAuthenticating(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutRequest();
    } catch (logoutError) {
      console.warn("Logout failed", logoutError);
    } finally {
      resetSession();
      Router.push("/login");
    }
  }, [resetSession]);

  const refreshSession = useCallback(async () => {
    try {
      const session = await fetchSessionRequest();
      if (session?.user) {
        setUser(session.user);
        persist(USER_KEY, session.user);
        return session.user;
      }
      resetSession();
      return null;
    } catch (refreshError) {
      resetSession();
      throw refreshError;
    }
  }, [resetSession]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      error,
      isAuthenticating,
      login,
      logout,
      refreshSession,
      setUser
    }),
    [user, token, loading, error, isAuthenticating, login, logout, refreshSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
