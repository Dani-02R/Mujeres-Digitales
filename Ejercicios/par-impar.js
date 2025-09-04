const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Ingrese un número: ", (n) => {
    const numero = Number(n);
    if (isNaN(numero)) {
    console.log("El valor ingresado no es un número");
    return;
} else if (numero % 2 === 0) {
        console.log("El número es par");
    } else {
        console.log("El número es impar");
    }
    rl.close();
})


