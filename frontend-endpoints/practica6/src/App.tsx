import { useState } from "react";
import type { SubmitEvent } from "react";
import { UserList } from "./UserList";
import { request, message } from "./api";
export default function App() {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    setError("");
    try {
      const data = await request<{
        token: string;
        user_id?: number;
        id?: number;
        user?: { id: number };
      }>("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!data.token) throw new Error("Falta el token de la sesión.");
      const id = data.user_id ?? data.user?.id ?? data.id;
      if (!id) throw new Error("El login no devolvió el ID del usuario.");
      setUserId(id);

      setPassword("");
      setToken(data.token);
    } catch (e) {
      setError(message(e));
    }
  }
  return (
    <main>
      <h1>Directorio de usuarios</h1>
      {token ? (
        <UserList token={token} userId={userId} />
      ) : (
        <form onSubmit={handleSubmit}>
          <h2>Ingresar</h2>
          <label>
            Email
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Contraseña
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button>Ingresar</button>
          {error && <p role="alert">{error}</p>}
        </form>
      )}
    </main>
  );
}
