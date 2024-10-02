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
