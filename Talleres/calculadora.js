const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const preguntar = (pregunta) =>
  new Promise((resolve) => rl.question(pregunta, (r) => resolve(r)));

function clearScreen() {
  // Borra pantalla (2J), borra scrollback (3J) y mueve el cursor a 1,1 (H)
  process.stdout.write("\x1B[2J\x1B[3J\x1B[H");
}

(async function main() {
  let salir = false;

  while (!salir) {
    clearScreen();
    console.log("===== CALCULADORA BÁSICA =====");
    console.log("1. Sumar");
    console.log("2. Restar");
    console.log("3. Multiplicar");
    console.log("4. Dividir");
    console.log("5. Salir\n");

    const opcion = await preguntar("Selecciona una opción: ");

    if (opcion === "5") {
      clearScreen();
      console.log("Hasta luego");
      salir = true;
      break;
    }

    if (!["1", "2", "3", "4"].includes(opcion)) {
      console.log("\nOpción no válida");
      await new Promise((r) => setTimeout(r, 1200));
      continue;
    }

    const num1 = Number(await preguntar("Ingrese el primer número: "));
    const num2 = Number(await preguntar("Ingrese el segundo número: "));

    let textoResultado = "";
    switch (opcion) {
      case "1": textoResultado = `Resultado: ${num1} + ${num2} = ${num1 + num2}`; break;
      case "2": textoResultado = `Resultado: ${num1} - ${num2} = ${num1 - num2}`; break;
      case "3": textoResultado = `Resultado: ${num1} × ${num2} = ${num1 * num2}`; break;
      case "4":
        textoResultado = (num2 === 0)
          ? "No se puede dividir entre 0"
          : `Resultado: ${num1} ÷ ${num2} = ${num1 / num2}`;
        break;
    }

    console.log("\n" + textoResultado);

    // Déjalo visible 2 s y luego limpia y vuelve al menú
    await preguntar("\nPresiona ENTER para continuar...");
  }

  rl.close();
})();
