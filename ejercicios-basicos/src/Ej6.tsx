import { useState } from "react";
export default function Ej6() {
  const [texto, setTexto] = useState("");
  const resultados = [
    "Java",
    "JavaScript",
    "TypeScript",
    "Python",
    "Rust",
    "C#",
  ].filter((l) => l.toLowerCase().includes(texto.toLowerCase()));
  return (
    <>
      <label>
        Lenguaje{" "}
        <input value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>
      <p>Resultados: {resultados.length}</p>
      <ul>
        {resultados.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
    </>
  );
}
