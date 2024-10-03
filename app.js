function calcolaRotte() {
    let vento = parseFloat(document.getElementById("vento").value);
    
    if (isNaN(vento)) {
        document.getElementById("risultato").innerHTML = "Inserisci un valore valido per la direzione del vento!";
        return;
    }

    let andature = {
        "Bolina Stretta": 45,
        "Bolina Larga": 60,
        "Lasco": 120,
        "Gran Lasco": 150
    };

    let risultati = "";

    for (let andatura in andature) {
        let angoloDx = (vento + andature[andatura]) % 360; // Rotta a destra
        let angoloSx = (vento - andature[andatura] + 360) % 360; // Rotta a sinistra
        
        risultati += `<p>${andatura}: ${angoloDx.toFixed(1)}° (a destra), ${angoloSx.toFixed(1)}° (a sinistra)</p>`;
    }

    document.getElementById("risultato").innerHTML = risultati;
}

function calcolaScostamento() {
    let rottaReale = parseFloat(document.getElementById("rottaReale").value);
    let rottaTeorica = parseFloat(document.getElementById("rottaTeorica").value);

    if (isNaN(rottaReale) || isNaN(rottaTeorica)) {
        document.getElementById("scostamento").innerHTML = "Inserisci valori validi!";
        return;
    }

    let differenza = rottaReale - rottaTeorica;
    let direzione = differenza > 0 ? "+" : "-";

    document.getElementById("scostamento").innerHTML = `Scostamento: ${direzione}${Math.abs(differenza).toFixed(1)}°`;
}

function disegnaBussola() {
    let vento = parseFloat(document.getElementById("vento").value);
    let rottaTeorica = parseFloat(document.getElementById("rottaTeorica").value);
    let rottaReale = parseFloat(document.getElementById("rottaReale").value);

    if (isNaN(vento) || isNaN(rottaTeorica) || isNaN(rottaReale)) {
        alert("Inserisci tutti i valori (vento, rotta teorica, rotta reale)");
        return;
    }

    let canvas = document.getElementById("bussolaCanvas");
    let ctx = canvas.getContext("2d");

    // Pulisce il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Centro del cerchio
    let centroX = canvas.width / 2;
    let centroY = canvas.height / 2;
    let raggio = 150;

    // Disegna il cerchio per la bussola
    ctx.beginPath();
    ctx.arc(centroX, centroY, raggio, 0, 2 * Math.PI);
    ctx.stroke();

    // Funzione per disegnare un indicatore
    function disegnaIndicatore(angolo, colore, testo) {
        let radianAngolo = (angolo - 90) * (Math.PI / 180); // Converti in radianti e ruota per l'orientamento
        let fineX = centroX + raggio * Math.cos(radianAngolo);
        let fineY = centroY + raggio * Math.sin(radianAngolo);

        ctx.beginPath();
        ctx.moveTo(centroX, centroY);
        ctx.lineTo(fineX, fineY);
        ctx.strokeStyle = colore;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Aggiungi testo per l'indicatore
        ctx.font = "16px Arial";
        ctx.fillStyle = colore;
        ctx.fillText(testo, fineX + 10, fineY + 10);
    }

    // Disegna i vari indicatori
    disegnaIndicatore(vento, "blue", "Vento Reale");
    disegnaIndicatore(rottaTeorica, "green", "Rotta Teorica");
    disegnaIndicatore(rottaReale, "red", "Rotta Reale");
}
