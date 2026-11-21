# Programación IV · Trabajo práctico de React

La entrega incluye nueve proyectos independientes con React, TypeScript y Vite. Para una revisión rápida, sugerimos probar primero los ejercicios básicos y luego la práctica 8, que reúne todas las funciones del frontend.

| Proyecto | Qué se puede probar |
| --- | --- |
| [Ejercicios básicos](ejercicios-basicos/src) | Siete ejercicios en una página. Incluye productos, contador, mostrar y ocultar, temperatura, compras, búsqueda y props tipadas. Funciona sin backend. |
| [Prácticas 1 a 8](frontend-endpoints) | Ocho versiones acumulativas. En orden agregan detalle, carga y errores, búsqueda, saludo con roles, alta, filtro de mayores, borrado y sesión vencida. |
| [Práctica 8](frontend-endpoints/practica8/src) | Versión final para probar todos los flujos con la API de clase. |
| [Consignas originales](frontend-endpoints/practica1/TPS) | Los dos PDF del trabajo práctico. |

## Probar los ejercicios básicos

Con Git y Node.js 24 con npm instalados, ejecutar en PowerShell:

```powershell
git clone https://github.com/santiansaa/programacion4-react.git
cd programacion4-react/ejercicios-basicos
npm.cmd ci
npm.cmd run dev
```

Abrir **http://localhost:5175**. Por ejemplo, subir el contador a 10 para ver cómo se deshabilita «Sumar», o escribir 35 °C para obtener 95 °F y «Hace calor». Detener Vite con Ctrl+C antes de iniciar otra práctica en el mismo puerto.

## Probar el frontend con endpoints

Se necesita la API de clase en ejecución, accesible desde el navegador, y una cuenta válida. Desde la raíz del repositorio:

```powershell
cd frontend-endpoints/practica8
Copy-Item .env.example .env.development
```

Editar `.env.development` y escribir la URL base real de la API a continuación de `VITE_API_URL=`. Guardar el archivo y ejecutar:

```powershell
npm.cmd ci
npm.cmd run dev
```

Abrir **http://localhost:5175** e ingresar con la cuenta de clase. Para evaluar una etapa anterior, repetir en la carpeta de esa práctica con su propio archivo de entorno.

1. Seleccionar un nombre para ver email, edad, país y roles. Buscar `ma` y usar «Limpiar» para recuperar la lista.
2. Con una cuenta habilitada para crear usuarios, dar de alta uno de prueba de 16 años. Verificar que figure en «Todos» y desaparezca con «Solo mayores».
3. Volver a «Todos» y usar «Borrar» únicamente sobre el usuario de prueba. Primero cancelar la confirmación y luego aceptarla. El resultado depende de los permisos de la cuenta.
4. En la práctica 8, cambiar una letra de `token` en el almacenamiento local del navegador y recargar. Debe aparecer el login con «Tu sesión venció».

## Verificar una carpeta

Ejecutar `npm.cmd run build` para comprobar TypeScript y generar la compilación de producción. Ejecutar `npm.cmd run lint` para revisar el código. En macOS o Linux, usar `npm` en lugar de `npm.cmd` y `cp` para copiar el archivo de entorno.
