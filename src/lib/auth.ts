const KEY = "hcts.auth";

export type AuthUser = { email: string; name: string };

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function signIn(email: string) {
  const user: AuthUser = {
    email,
    name: email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  };
  window.localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function signOut() {
  window.localStorage.removeItem(KEY);
}
