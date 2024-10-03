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

    // Definizione delle andature di bolina
    let andatureSinistra = {
        "Bolina Stretta": (vento - 45 + 360) % 360,
        "Bolina Larga": (vento - 60 + 360) % 360
    };

    let andatureDestra = {
        "Bolina Stretta": (vento + 45) % 360,
        "Bolina Larga": (vento + 60) % 360
    };

    // Genera le righe della tabella con i pulsanti + e -
    let risultato = "";

    for (let andatura in andatureSinistra) {
        risultato += `
            <tr>
                <td class="bg-success text-white">
                    ${andatura}: <span id="${andatura}_sinistra">${andatureSinistra[andatura].toFixed(1)}</span>°
                    <button class="btn btn-secondary btn-sm" onclick="modificaRotta('${andatura}_sinistra', -1)">-</button>
                    <button class="btn btn-secondary btn-sm" onclick="modificaRotta('${andatura}_sinistra', 1)">+</button>
                </td>
                <td class="bg-danger text-white">
                    ${andatura}: <span id="${andatura}_destra">${andatureDestra[andatura].toFixed(1)}</span>°
                    <button class="btn btn-secondary btn-sm" onclick="modificaRotta('${andatura}_destra', -1)">-</button>
                    <button class="btn btn-secondary btn-sm" onclick="modificaRotta('${andatura}_destra', 1)">+</button>
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
    let elemento = document.getElementById(id);
    let valoreAttuale = parseFloat(elemento.innerHTML);

    // Aggiorna il valore della rotta
    let nuovoValore = (valoreAttuale + variazione + 360) % 360;
    elemento.innerHTML = nuovoValore.toFixed(1);

    // Colora il risultato in base alla vicinanza con il vento reale
    let ventoReale = parseFloat(document.getElementById("vento").value);
    let differenza = Math.abs(nuovoValore - ventoReale);

    if (differenza < 10) {
        elemento.parentElement.classList.add("bg-success");
        elemento.parentElement.classList.remove("bg-danger");
    } else {
        elemento.parentElement.classList.add("bg-danger");
        elemento.parentElement.classList.remove("bg-success");
    }
}
