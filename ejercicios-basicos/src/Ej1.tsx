export function Producto({
  nombre,
  precio,
  stock,
}: {
  nombre: string;
  precio: number;
  stock: number;
}) {
  return (
    <article>
      <h3>{nombre}</h3>
      <p>$ {precio}</p>
      <p>{stock === 0 ? "Sin stock" : `Stock: ${stock}`}</p>
    </article>
  );
}
export default function Ej1() {
  return (
    <div className="productos">
      <Producto nombre="Teclado" precio={25000} stock={7} />
      <Producto nombre="Mouse" precio={16000} stock={0} />
      <Producto nombre="Monitor" precio={190000} stock={3} />
    </div>
  );
}
