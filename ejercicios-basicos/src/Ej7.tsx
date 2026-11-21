import { Producto as Tarjeta } from "./Ej1";
interface ProductoProps {
  nombre: string;
  precio: number;
  stock: number;
  oferta?: boolean;
}
function Producto({ oferta, ...datos }: ProductoProps) {
  return (
    <div>
      <Tarjeta {...datos} />
      {oferta && <strong>¡Oferta!</strong>}
    </div>
  );
}
export default function Ej7() {
  return (
    <div className="productos">
      <Producto nombre="Teclado" precio={19000} stock={4} oferta />
      <Producto nombre="Auriculares" precio={30000} stock={0} />
    </div>
  );
}
