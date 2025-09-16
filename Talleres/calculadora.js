const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Esta función es como una “versión pro” de rl.question,
// porque la envuelve en una Promesa y así la podemos usar
// con async/await en vez de callbacks raros.
const preguntar = (pregunta) =>
  new Promise((resolve) => rl.question(pregunta, (r) => resolve(r)));

// Esta función borra lo que está en la consola.
// Es como darle “refresh” a la pantalla.
function clearScreen() {
  process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
}

(async function main() {
  let salir = false;

  // Bucle principal: se repite hasta que elijas “Salir”.
  while (!salir) {
    clearScreen();
    console.log("===== CALCULADORA BÁSICA =====");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Salir\n");

    // Pedimos la opción al usuario.
    const opcion = await preguntar("Selecciona una opción: ");

    // Si ponen “5”, despedida y cerramos todo.
    if (opcion === "5") {
      clearScreen();
      console.log("Hasta luego");
      salir = true;
      break;
    }

    // Si ponen cualquier cosa que no esté en el menú, errorcito.
    if (!["1", "2", "3", "4"].includes(opcion)) {
      console.log("\nOpción no válida");
      // Metemos una mini pausa para que alcance a leer el mensaje.
      await new Promise((r) => setTimeout(r, 1200));
      continue;
    }

    // Si llegamos acá, toca pedir los dos números.
    // Importante: si meten letras, se va a volver NaN.
    const num1 = Number(await preguntar("Ingrese el primer número: "));
    const num2 = Number(await preguntar("Ingrese el segundo número: "));

    let textoResultado = "";

    // Dependiendo de lo que eligieron, hacemos la operación.
    switch (opcion) {
      case "1":
        textoResultado = `Resultado: ${num1} + ${num2} = ${num1 + num2}`;
        break;
      case "2":
        textoResultado = `Resultado: ${num1} - ${num2} = ${num1 - num2}`;
        break;
      case "3":
        textoResultado = `Resultado: ${num1} × ${num2} = ${num1 * num2}`;
        break;
      case "4":
        // División especial: no queremos explotar si dividen entre 0.
        textoResultado =
          num2 === 0
            ? "No se puede dividir entre 0"
            : `Resultado: ${num1} ÷ ${num2} = ${num1 / num2}`;
        break;
    }

    // Mostramos el resultado bonito.
    console.log("\n" + textoResultado);

    // Pausa para que lean el resultado antes de reiniciar menú.
    await preguntar("\nPresiona ENTER para continuar...");
  }

  // Cuando ya no quieren jugar más, cerramos la interfaz.
  rl.close();
})();
