import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { client } from '../api/client';

type Role = "user" | "admin";

interface AuthState {
    accessToken: string | null;
    role: Role | null;
    loading: boolean;
};

interface AuthContextValue extends AuthState {
    login: (token: string, role: Role) => void;
    logout: () => void;
    tryRefresh: () => Promise<boolean>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>({
        accessToken: null,
        role: null,
        loading: true
    });

    useEffect(() => {
        const saveToken = localStorage.getItem("accessToken");
        const saveRole = localStorage.getItem("role") as Role || null;
        if (saveToken && saveRole) {
            setState({ accessToken: saveToken, role: saveRole, loading: false });
        } else {
            setState((prve) => ({ ...prve, loading: false }));
        };
    }, []);

    const login = useCallback((token: string, role: Role) => {
        localStorage.setItem("accessToken", token);
        localStorage.setItem("role", role);
        setState({ accessToken: token, role, loading: false });
    }, [])

    const logout = useCallback(() => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("role");
        setState({ accessToken: null, role: null, loading: false });
    }, []);

    const tryRefresh = useCallback(async () => {
        try {
            const { data } = await client.post('/auth/refresh');

            if (data?.accessToken && data?.role) {
                login(data.accessToken, data.role);
                return true;
            }
            logout()
            return false
        } catch {
            logout()
            return false;
        }
    }, [login, logout]);

    return (
        <AuthContext.Provider value={{...state, login, logout, tryRefresh }}>
            {children}
        </AuthContext.Provider>
    )

}


export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}