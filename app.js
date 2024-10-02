function calcolaAngolo() {
    let vento = parseFloat(document.getElementById("vento").value);
    let rotta = parseFloat(document.getElementById("rotta").value);
    
    if (isNaN(vento) || isNaN(rotta)) {
        document.getElementById("risultato").innerHTML = "Inserisci valori validi!";
        return;
    }

    let angolo = Math.abs(rotta - vento);
    if (angolo > 180) {
        angolo = 360 - angolo;
    }

    document.getElementById("risultato").innerHTML = `Angolo: ${angolo.toFixed(1)}°`;
}
