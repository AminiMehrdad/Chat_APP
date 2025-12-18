let accessToken: string | null = null;
let refreshFn: (() => Promise<boolean>) | null = null;
let logoutFn: (() => void) | null = null;
let refreshPromise: Promise<boolean> | null = null;

export function bindAuthStore(params: {
  getAccessToken: () => string | null;
  tryRefresh: () => Promise<boolean>;
  logout: () => void;
}) {
  refreshFn = params.tryRefresh;
  logoutFn = params.logout;
  accessToken = params.getAccessToken();
}

export function getAccessToken(): string | null {
  return accessToken;
}

export async function tryRefresh(): Promise<boolean> {
  if (!refreshFn) return false;

  if (!refreshPromise) {
    refreshPromise = refreshFn().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
}

export function logout() {
  if (!logoutFn) {
    throw new Error('Auth not bound');
  }
  logoutFn();
}

export function setAccessToken(token: string | null) {
  accessToken = token;
}
