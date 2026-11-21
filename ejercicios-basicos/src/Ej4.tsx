import { useState } from "react";
export default function Ej4() {
  const [celsius, setCelsius] = useState("");
  return (
    <>
      <label>
        Celsius{" "}
        <input
          type="number"
          step="any"
          value={celsius}
          onChange={(e) => setCelsius(e.target.value)}
        />
      </label>
      {celsius !== "" && <p>{(Number(celsius) * 9) / 5 + 32} °F</p>}
      {Number(celsius) > 30 && <p>Hace calor</p>}
    </>
  );
}
