import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { client } from '../api/client';

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

  // ✅ run ONCE when app starts
 useEffect(() => {
  const controller = new AbortController();

  const initAuth = async () => {
    try {
      const { data } = await client.post(
        '/auth/refresh',
        {},
        { signal: controller.signal }
      );

      setState({
        accessToken: data.accessToken,
        role: data.role,
        isAuthenticated: true,
        loading: false,
      });
    } catch (err: any) {
        if (err.name === 'CanceledError') return;
        
        setState({
            accessToken: null,
            role: null,
            isAuthenticated: false,
            loading: false,
        });
        
    }
};

initAuth();

  return () => {
    controller.abort();
  };
}, []);


  const login = useCallback((token: string, role: Role) => {
    setState({
      accessToken: token,
      role,
      isAuthenticated: true,
      loading: false,
    });
  }, []);

  const logout = useCallback(() => {
    setState({
      accessToken: null,
      role: null,
      isAuthenticated: false,
      loading: false,
    });
  }, []);

  const tryRefresh = useCallback(async () => {
    try {
      const { data } = await client.post('/auth/refresh');

      if (data?.accessToken && data?.role) {
        setState({
          accessToken: data.accessToken,
          role: data.role,
          isAuthenticated: true,
          loading: false,
        });
        return true;
      }

      logout();
      return false;
    } catch {
      logout();
      return false;
    }
  }, [logout]);

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
