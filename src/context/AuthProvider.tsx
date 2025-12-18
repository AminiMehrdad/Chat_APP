import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { client } from '../api/client';
import { bindAuthStore, setAccessToken } from '../api/authStoreBridge';

type Role = 'user' | 'admin';

interface AuthState {
  accessToken: string | null;
  role: Role | null;
  loading: boolean;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  login: (token: string, role: Role) => void;
  logout: () => void;
  tryRefresh: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    accessToken: null,
    role: null,
    loading: true,
    isAuthenticated: false,
  });

  /* ---------------------------
     INITIAL REFRESH ON APP LOAD
  ----------------------------*/
  useEffect(() => {
    const controller = new AbortController();

    const initAuth = async () => {
      try {
          const { data } = await client.post(
          '/auth/refresh',
          {},
          { signal: controller.signal }
        );
        
        
        const token = data.data.accessToken;
        const role = data.data.role;

        setState({
          accessToken: token,
          role,
          isAuthenticated: true,
          loading: false,
        });

        setAccessToken(token); // ✅ sync bridge
      } catch (err: any) {
        console.log(err.name);
        
        if (err.name === 'CanceledError') return;

        setState({
          accessToken: null,
          role: null,
          isAuthenticated: false,
          loading: false,
        });

        setAccessToken(null);
      }
    };

    initAuth();

    return () => controller.abort();
  }, []);

  /* ---------------------------
     LOGIN
  ----------------------------*/
  const login = useCallback((token: string, role: Role) => {
    setState({
      accessToken: token,
      role,
      isAuthenticated: true,
      loading: false,
    });

    setAccessToken(token); // ✅ MUST
  }, []);

  /* ---------------------------
     LOGOUT
  ----------------------------*/
  const logout = useCallback(() => {
    setState({
      accessToken: null,
      role: null,
      isAuthenticated: false,
      loading: false,
    });

    setAccessToken(null); // ✅ MUST
  }, []);

  /* ---------------------------
     REFRESH (used by interceptor)
  ----------------------------*/
  const tryRefresh = useCallback(async (): Promise<boolean> => {
    try {
      const { data } = await client.post('/auth/refresh');

      const token = data.data.accessToken;
      const role = data.data.role;

      if (!token) throw new Error('No token');

      setState({
        accessToken: token,
        role,
        isAuthenticated: true,
        loading: false,
      });

      setAccessToken(token); // ✅ CRITICAL
      return true;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

  /* ---------------------------
     BIND AUTH → BRIDGE (REACTIVE)
  ----------------------------*/
  useEffect(() => {
    bindAuthStore({
      getAccessToken: () => state.accessToken,
      tryRefresh,
      logout,
    });
  }, [state.accessToken, tryRefresh, logout]);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, tryRefresh }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
