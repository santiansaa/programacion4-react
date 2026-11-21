import { useState } from "react";
export default function Ej5() {
  const [texto, setTexto] = useState("");
  const [items, setItems] = useState<{ id: string; nombre: string }[]>([]);
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const nombre = texto.trim();
          if (!nombre) return;
          const item = { id: crypto.randomUUID(), nombre };
          setItems((prev) => [...prev, item]);
          setTexto("");
        }}
      >
        <label>
          Artículo{" "}
          <input value={texto} onChange={(e) => setTexto(e.target.value)} />
        </label>
        <button>Agregar</button>
      </form>
      {items.length === 0 ? (
        <p>No hay nada para comprar</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.nombre}{" "}
              <button
                onClick={() =>
                  setItems((prev) => prev.filter((i) => i.id !== item.id))
                }
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
