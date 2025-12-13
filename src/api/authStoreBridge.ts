let accessToken: string | null = null;
let refreshFn: (() => Promise<boolean>) | null = null;
let logoutFn: (() => void) | null = null;

export function bindAuthStore(params: {
  getAccessToken: () => string | null;
  tryRefresh: () => Promise<boolean>;
  logout: () => void;
}) {
  accessToken = params.getAccessToken();
  refreshFn = params.tryRefresh;
  logoutFn = params.logout;
}

export function getAccessToken(): string | null {
  return accessToken;
}

export async function tryRefresh(): Promise<boolean> {
  if (!refreshFn) return false;
  return refreshFn();
}

export function logout() {
  logoutFn?.();
}

/** sync after refresh/login */
export function setAccessToken(token: string | null) {
  accessToken = token;
}
