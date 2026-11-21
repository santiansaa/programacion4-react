const base = (import.meta.env.VITE_API_URL ?? "").replace(/\/$/, "");
export async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
  onUnauthorized?: () => void,
): Promise<T> {
  if (!base)
    throw new Error("Configurá VITE_API_URL para conectar con la API.");
  const response = await fetch(base + path, {
    ...options,
    headers: {
      ...options.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  if (token && response.status === 401) onUnauthorized?.();
  if (!response.ok) {
    const data = await response.json().catch(() => null);
    const d = data?.detail;
    throw new Error(
      typeof d === "string"
        ? d
        : Array.isArray(d)
          ? d.map((item) => item.msg).join(", ")
          : response.statusText,
    );
  }
  const body = await response.text();
  if (!body && options.method !== "DELETE" && options.method !== "POST")
    throw new Error("Respuesta vacía de la API.");
  return (body ? JSON.parse(body) : undefined) as T;
}
export function message(e: unknown) {
  return e instanceof Error ? e.message : "Error de conexión";
}
export interface Summary {
  id: number;
  name: string;
}
type Named = string | { name: string };
export interface Detail extends Summary {
  email: string;
  age: number;
  country: Named | null;
  roles: Named[];
}
export function nameOf(value: Named) {
  return typeof value === "string" ? value : value.name;
}
