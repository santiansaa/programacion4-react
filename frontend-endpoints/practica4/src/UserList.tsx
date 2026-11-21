import { useEffect, useState } from "react";
import { request, message, nameOf } from "./api";
import type { Summary, Detail } from "./api";

export function UserList({
  token,
  userId,
}: {
  token: string;
  userId: number | null;
}) {
  const [users, setUsers] = useState<Summary[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [detail, setDetail] = useState<Detail | null>(null);
  const [detailError, setDetailError] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [path, setPath] = useState("/user");
  const [revision, refresh] = useState(0);
  function show(next: string) {
    setError("");
    setLoading(true);
    setDetailError("");
    setSelected(null);
    setPath(next);
    refresh((r) => r + 1);
  }
  useEffect(() => {
    const c = new AbortController();
    request<Summary[]>(path, { signal: c.signal }, token)
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
  }, [token, path, revision]);
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
  const [me, setMe] = useState<Detail | null>(null);
  const [profileError, setProfileError] = useState("");
  useEffect(() => {
    if (userId === null) return;
    const c = new AbortController();
    request<Detail>("/user/" + userId, { signal: c.signal }, token)
      .then((data) => {
        if (!c.signal.aborted) setMe(data);
      })
      .catch((e) => {
        if (!c.signal.aborted) setProfileError(message(e));
      });
    return () => c.abort();
  }, [token, userId]);

  return (
    <>
      {me && (
        <p>
          Hola, {me.name} ({me.roles.map(nameOf).join(", ")})
        </p>
      )}
      {profileError && <p role="alert">{profileError}</p>}

      <section>
        <h2>Usuarios</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const name = search.trim();
            show(name ? "/user/search/" + encodeURIComponent(name) : "/user");
          }}
        >
          <label>
            Nombre a buscar
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
          </label>
          <button>Buscar</button>
          <button
            type="button"
            onClick={() => {
              setSearch("");
              show("/user");
            }}
          >
            Limpiar
          </button>
        </form>

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
