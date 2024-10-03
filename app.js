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
    let rottaReale = parseFloat(document.getElementById("rottaReale").value);

    // Definiamo gli angoli teorici per ciascuna andatura
    let andature = {
        "Bolina Stretta": (vento + 45) % 360,
        "Bolina Larga": (vento + 60) % 360,
        "Lasco": (vento + 120) % 360,
        "Gran Lasco": (vento + 150) % 360
    };

    let canvas = document.getElementById("bussolaCanvas");
    let ctx = canvas.getContext("2d");

    // Pulisce il canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Centro del cerchio
    let centroX = canvas.width / 2;
    let centroY = canvas.height / 2;
    let raggio = 150;

    // Disegna il cerchio della bussola
    ctx.beginPath();
    ctx.arc(centroX, centroY, raggio, 0, 2 * Math.PI);
    ctx.stroke();

    // Ruota la bussola in modo che il vento reale sia sempre in alto (0°)
    ctx.save();
    ctx.translate(centroX, centroY);
    ctx.rotate(-vento * Math.PI / 180); // Ruota in senso antiorario di vento gradi
    ctx.translate(-centroX, -centroY);

    // Funzione per disegnare i gradi ogni 10°
    for (let gradi = 0; gradi < 360; gradi += 10) {
        let radianAngolo = (gradi - 90) * (Math.PI / 180); // Converti in radianti e ruota di 90°
        let fineX = centroX + raggio * Math.cos(radianAngolo);
        let fineY = centroY + raggio * Math.sin(radianAngolo);

        ctx.beginPath();
        ctx.moveTo(centroX + (raggio - 10) * Math.cos(radianAngolo), centroY + (raggio - 10) * Math.sin(radianAngolo));
        ctx.lineTo(fineX, fineY);
        ctx.strokeStyle = "black";
        ctx.stroke();

        // Disegna i numeri dei gradi ogni 30°
        if (gradi % 30 === 0) {
            ctx.font = "12px Arial";
            ctx.fillText(gradi.toString(), fineX - 5, fineY + 5);
        }
    }

    // Funzione per disegnare un indicatore con etichetta
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

        // Aggiungi testo per l'indicatore con il valore dell'angolo
        ctx.font = "16px Arial";
        ctx.fillStyle = colore;
        ctx.fillText(testo + " (" + angolo.toFixed(1) + "°)", fineX + 10, fineY + 10);
    }

    // Disegna i vari indicatori (rotte teoriche e reale)
    disegnaIndicatore(vento, "blue", "Vento Reale");
    disegnaIndicatore(rottaReale, "red", "Rotta Reale");
    
    // Disegna tutte le rotte teoriche
    for (let andatura in andature) {
        disegnaIndicatore(andature[andatura], "green", andatura);
    }

    ctx.restore(); // Ripristina il contesto originale (senza rotazione)
}
