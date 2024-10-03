function calcolaRotte() {
    let vento = parseFloat(document.getElementById("vento").value);
    
    if (isNaN(vento) || vento < 0 || vento > 360) {
        alert("Inserisci un valore valido per la direzione del vento!");
        return;
    }

    // Definizione degli angoli per le andature
    let andatureSinistra = {
        "Bolina Stretta": (vento - 45 + 360) % 360,
        "Bolina Larga": (vento - 60 + 360) % 360,
        "Lasco": (vento - 120 + 360) % 360,
        "Gran Lasco": (vento - 150 + 360) % 360
    };

    let andatureDestra = {
        "Bolina Stretta": (vento + 45) % 360,
        "Bolina Larga": (vento + 60) % 360,
        "Lasco": (vento + 120) % 360,
        "Gran Lasco": (vento + 150) % 360
    };

    // Genera le righe della tabella
    let risultato = "";

    for (let andatura in andatureSinistra) {
        risultato += `
            <tr>
                <td class="bg-danger text-white">${andatura}: ${andatureSinistra[andatura].toFixed(1)}°</td>
                <td class="bg-success text-white">${andatura}: ${andatureDestra[andatura].toFixed(1)}°</td>
            </tr>`;
    }

    // Inserisci i dati nella tabella
    document.getElementById("risultato").innerHTML = risultato;
}
