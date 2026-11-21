import { useState } from "react";
import type { SubmitEvent } from "react";
import { request, message } from "./api";
export function Alta({
  token,
  onCreated,
}: {
  token: string;
  onCreated: () => void;
}) {
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  async function submit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = new FormData(form);
    const body = {
      name: fields.get("name"),
      age: Number(fields.get("age")),
      email: fields.get("email"),
      password: fields.get("password"),
      country_id: Number(fields.get("country_id")),
    };
    setError("");
    setPending(true);
    try {
      await request(
        "/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        },
        token,
      );
      form.reset();
      onCreated();
    } catch (e) {
      setError(message(e));
    } finally {
      setPending(false);
    }
  }
  return (
    <form onSubmit={submit}>
      <h2>Alta de usuario</h2>
      <label>
        Nombre
        <input name="name" required />
      </label>
      <label>
        Edad
        <input name="age" type="number" min="0" required />
      </label>
      <label>
        Email
        <input name="email" type="email" required />
      </label>
      <label>
        Contraseña
        <input name="password" type="password" minLength={4} required />
      </label>
      <label>
        País
        <select name="country_id">
          <option value="1">Argentina</option>
          <option value="2">Brasil</option>
        </select>
      </label>
      <button disabled={pending}>Crear usuario</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
