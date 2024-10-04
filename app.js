let ventoIniziale = 0;  // Vento iniziale per calcolare la variazione

// Funzione per calcolare e aggiornare le rotte
function calcolaRotte() {
    let vento = parseFloat(document.getElementById("vento").value);  // Prendi il valore del vento reale dall'input

    if (isNaN(vento) || vento < 0 || vento > 360) {
        alert("Inserisci un valore valido per la direzione del vento! (0-360°)");
        return;
    }

    // Memorizza il vento iniziale solo alla prima esecuzione
    if (ventoIniziale === 0) {
        ventoIniziale = vento;
    }

    // Mostra il vento reale corrente
    document.getElementById("ventoAttuale").innerHTML = `Vento Reale: ${vento}°`;

    // Calcola le rotte teoriche di bolina
    let bolinaDestra = (vento + 45) % 360;
    let bolinaSinistra = (vento - 45 + 360) % 360;

    // Inserisci i dati nella tabella
    let risultato = `
        <tr>
            <td class="bg-danger text-white">
                <button class="btn btn-light btn-lg" onclick="modificaRotta('sinistra', -1)">-</button>
                <span id="rottaSinistra">${bolinaSinistra.toFixed(1)}</span>°
                <button class="btn btn-light btn-lg" onclick="modificaRotta('sinistra', 1)">+</button>
            </td>
            <td class="bg-success text-white">
                <button class="btn btn-light btn-lg" onclick="modificaRotta('destra', -1)">-</button>
                <span id="rottaDestra">${bolinaDestra.toFixed(1)}</span>°
                <button class="btn btn-light btn-lg" onclick="modificaRotta('destra', 1)">+</button>
            </td>
        </tr>`;

    document.getElementById("risultato").innerHTML = risultato;

    // Mostra la variazione del vento rispetto al vento iniziale
    let differenzaVento = vento - ventoIniziale;
    let colore = differenzaVento === 0 ? 'alert-success' : 'alert-warning';
    document.getElementById("variazioneVento").className = `alert ${colore}`;
    document.getElementById("variazioneVento").innerHTML = `Il vento ha ruotato di ${differenzaVento.toFixed(1)}°`;
}

// Funzione per modificare la rotta e aggiornare il vento reale
function modificaRotta(lato, variazione) {
    let rotta = document.getElementById(`rotta${lato.charAt(0).toUpperCase() + lato.slice(1)}`);
    let nuovaRotta = (parseFloat(rotta.innerHTML) + variazione + 360) % 360;
    rotta.innerHTML = nuovaRotta.toFixed(1);

    // Ricalcola il vento reale basato sulle nuove rotte
    let ventoCorrente;
    if (lato === 'destra') {
        ventoCorrente = (nuovaRotta - 45 + 360) % 360;
    } else {
        ventoCorrente = (nuovaRotta + 45) % 360;
    }

    document.getElementById("vento").value = ventoCorrente;
    calcolaRotte();
}
