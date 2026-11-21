import { useState } from "react";
export default function Ej2() {
  const [valor, setValor] = useState(0);
  return (
    <>
      <p>{valor}</p>
      <button
        disabled={valor === 0}
        onClick={() => setValor((v) => Math.max(0, v - 1))}
      >
        Restar
      </button>
      <button
        disabled={valor === 10}
        onClick={() => setValor((v) => Math.min(10, v + 1))}
      >
        Sumar
      </button>
      <button onClick={() => setValor(0)}>Reiniciar</button>
    </>
  );
}
