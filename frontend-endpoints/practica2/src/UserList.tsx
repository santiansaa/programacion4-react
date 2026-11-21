import { useEffect, useState } from "react";
import { request, message, nameOf } from "./api";
import type { Summary, Detail } from "./api";

export function UserList({ token }: { token: string }) {
  const [users, setUsers] = useState<Summary[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailError, setDetailError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const c = new AbortController();
    request<Summary[]>("/user", { signal: c.signal }, token)
      .then((data) => {
        if (!c.signal.aborted) setUsers(data);
      })
      .catch((e) => {
        if (!c.signal.aborted) setError(message(e));
      })
      .finally(() => {
        if (!c.signal.aborted) setLoading(false);
      });
    return () => c.abort();
  }, [token]);
  useEffect(() => {
    if (selected === null) return;
    const c = new AbortController();
    request<Detail>("/user/" + selected, { signal: c.signal }, token)
      .then((data) => {
        if (!c.signal.aborted) setDetail(data);
      })
      .catch((e) => {
        if (!c.signal.aborted) setDetailError(message(e));
      });
    return () => c.abort();
  }, [token, selected]);

  return (
    <>
      <section>
        <h2>Usuarios</h2>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p role="alert">{error}</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <button
                  onClick={() => {
                    setDetailError("");
                    setSelected(user.id);
                  }}
                >
                  {user.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
      {detailError && <p role="alert">{detailError}</p>}
      {detail && detail.id === selected && (
        <section>
          <h2>{detail.name}</h2>
          <p>Email: {detail.email}</p>
          <p>Edad: {detail.age}</p>
          <p>
            País: {detail.country ? nameOf(detail.country) : "Sin informar"}
          </p>
          <p>Roles: {detail.roles.map(nameOf).join(", ")}</p>
        </section>
      )}
    </>
  );
}
