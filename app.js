let ventoIniziale = 0;

function calcolaRotte() {
    let vento = parseFloat(document.getElementById("vento").value);

    if (isNaN(vento) || vento < 0 || vento > 360) {
        alert("Inserisci un valore valido per la direzione del vento!");
        return;
    }

    // Se è la prima volta che viene inserito il vento, memorizzarlo
    if (ventoIniziale === 0) {
        ventoIniziale = vento;
    }

    // Mostra il vento reale corrente
    document.getElementById("ventoAttuale").innerHTML = `Vento Reale: ${vento}°`;

    // Definizione delle rotte di bolina (a sinistra e a destra)
    let rotteSinistra = {
        sinistra1: (vento - 45 + 360) % 360,
        sinistra2: (vento - 60 + 360) % 360
    };

    let rotteDestra = {
        destra1: (vento + 45) % 360,
        destra2: (vento + 60) % 360
    };

    // Genera le righe della tabella con i pulsanti + e -
    let risultato = "";

    for (let rotta in rotteSinistra) {
        risultato += `
            <tr>
                <td class="bg-danger text-white">
                    <button class="btn btn-light btn-lg" onclick="modificaRotta('${rotta}', -1)">-</button>
                    <span id="${rotta}_sinistra">${rotteSinistra[rotta].toFixed(1)}</span>°
                    <button class="btn btn-light btn-lg" onclick="modificaRotta('${rotta}', 1)">+</button>
                </td>
                <td class="bg-success text-white">
                    <button class="btn btn-light btn-lg" onclick="modificaRotta('${rotta}', -1)">-</button>
                    <span id="${rotta}_destra">${rotteDestra[rotta].toFixed(1)}</span>°
                    <button class="btn btn-light btn-lg" onclick="modificaRotta('${rotta}', 1)">+</button>
                </td>
            </tr>`;
    }

    // Inserisci i dati nella tabella
    document.getElementById("risultato").innerHTML = risultato;

    // Calcola e mostra la variazione del vento
    let differenzaVento = vento - ventoIniziale;
    let colore = differenzaVento === 0 ? 'alert-success' : 'alert-warning';
    document.getElementById("variazioneVento").className = `alert ${colore}`;
    document.getElementById("variazioneVento").innerHTML = `Il vento ha ruotato di ${differenzaVento.toFixed(1)}°`;
}

function modificaRotta(id, variazione) {
    // Recupera i valori di rotte sinistra e destra
    let rottaSinistra = parseFloat(document.getElementById(`${id}_sinistra`).innerHTML);
    let rottaDestra = parseFloat(document.getElementById(`${id}_destra`).innerHTML);

    // Calcola il nuovo valore della rotta sinistra e destra
    let nuovaRottaSinistra = (rottaSinistra + variazione + 360) % 360;
    let nuovaRottaDestra = (rottaDestra + variazione + 360) % 360;

    // Aggiorna il valore della rotta in tabella
    document.getElementById(`${id}_sinistra`).innerHTML = nuovaRottaSinistra.toFixed(1);
    document.getElementById(`${id}_destra`).innerHTML = nuovaRottaDestra.toFixed(1);

    // Ricalcola il vento reale in base alla nuova rotta
    let ventoCorrente = (nuovaRottaSinistra + 45) % 360;  // Supponiamo che la bolina stretta sia l'andatura di riferimento
    document.getElementById("vento").value = ventoCorrente;
    calcolaRotte();  // Aggiorna la tabella e il vento reale
}
