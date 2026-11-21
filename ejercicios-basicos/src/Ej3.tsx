import { useState } from "react";
export default function Ej3() {
  const [visible, setVisible] = useState(false);
  return (
    <article>
      <h3>¿Para qué sirve una prop?</h3>
      <button aria-expanded={visible} onClick={() => setVisible((v) => !v)}>
        {visible ? "Ocultar respuesta" : "Mostrar respuesta"}
      </button>
      {visible && <p>Para pasar datos a un componente.</p>}
    </article>
  );
}
