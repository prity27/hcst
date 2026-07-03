import type { Role } from "./roles";

const KEY = "hcts.auth";
const USERS_KEY = "hcts.users";
const RESETS_KEY = "hcts.resets";

export type AuthUser = { email: string; name: string; role: Role };
type StoredUser = AuthUser & { password: string };

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(USERS_KEY) || "[]") as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function nameFromEmail(email: string) {
  return email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function getAuthUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function signIn(email: string, _password?: string): AuthUser {
  const users = readUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  // Demo: unknown accounts default to admin so PM can exercise every screen.
  // Production must reject unknown emails; role always comes from the server record.
  const role: Role = existing?.role ?? "admin";
  const user: AuthUser = {
    email,
    name: existing?.name ?? nameFromEmail(email),
    role,
  };
  window.localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

/**
 * Public self-registration.
 * WBS security fix: sign-up MUST NOT accept a role — only a System Administrator
 * provisions user roles from the Users page. New accounts land as "read_only"
 * until an admin promotes them.
 */
export function signUp(input: { email: string; name: string; password: string }): AuthUser {
  const users = readUsers();
  const filtered = users.filter((u) => u.email.toLowerCase() !== input.email.toLowerCase());
  const stored: StoredUser = { ...input, role: "read_only" };
  filtered.push(stored);
  writeUsers(filtered);
  const user: AuthUser = { email: input.email, name: input.name, role: "read_only" };
  window.localStorage.setItem(KEY, JSON.stringify(user));
  return user;
}

export function requestPasswordReset(email: string): { token: string } {
  const token = Math.random().toString(36).slice(2, 10).toUpperCase();
  try {
    const list = JSON.parse(window.localStorage.getItem(RESETS_KEY) || "[]");
    list.push({ email, token, at: new Date().toISOString() });
    window.localStorage.setItem(RESETS_KEY, JSON.stringify(list));
  } catch {
    /* noop */
  }
  return { token };
}

export function signOut() {
  window.localStorage.removeItem(KEY);
}
