// MIT License
// Copyright (c) 2020 Luis Espino - Rafael Morales

function reflex_agent(location, state) {
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "LEFT";
}

/*
1 = estado(A, sucio, sucio)
2 = estado(A, limpio, sucio)
3 = estado(A, sucio, limpio)
4 = estado(A, limpio, limpio)

5 = estado(B, sucio, sucio)
6 = estado(B, limpio, sucio)
7 = estado(B, sucio, limpio)
8 = estado(B, limpio, limpio)
*/

function test(states) {
    var location = states[0];
    var state = states[0] == "A" ? states[1] : states[2];
    var action_result = reflex_agent(location, state);

    document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);

    if (action_result == "CLEAN") {
        if (location == "A") {
            states[1] = "CLEAN";
            if (states[2] == "CLEAN") setNewLocation(location);
            else setIndex(2);

        } else if (location == "B") {
            states[2] = "CLEAN";
            if (states[1] == "CLEAN") setNewLocation(location);
            else setIndex(7);
        }
    }
    else if (action_result == "RIGHT") {
        states[0] = "B";
        console.log("Se traslada a la DERECHA");
        setNewLocation(states[0]);
    } else if (action_result == "LEFT") {
        states[0] = "A";
        console.log("Se traslada a la IZQUIERDA");
        setNewLocation(states[0]);
    }

    if (estadosVisitados.length < 8) {

        states = estadoToca(index);
        estadosVisitados.push(index);

        setTimeout(function () { test(states); }, 2000);

    } else {
        document.getElementById("log").innerHTML += "<br>Proceso Finalizado.";
        return;
    }
}

function setNewLocation(locacion) {
    var i, j, inicio, final;
    let posicion = 0;
    if (locacion == "A") {
        inicio = 0;
        final = 4;
    } else {
        inicio = 4;
        final = 8;
    }

    for (i = inicio; i < final; i++) {
        posicion = i + 1;
        let noExiste = true;

        for (j = 0; j < 8; j++) {
            if (posicion == estadosVisitados[j]) noExiste = false;
        }

        if (noExiste) {
            console.log("Estado siguiente: " + posicion);
            setIndex(posicion);
            break;
        }
    }
}

function estadoToca(toca) {
    console.log("Estado visitado: " + toca);

    if (toca == 2) return ["A", "CLEAN", "DIRTY"];
    else if (toca == 3) return ["A", "DIRTY", "CLEAN"];
    else if (toca == 4) return ["A", "CLEAN", "CLEAN"];
    else if (toca == 5) return ["B", "DIRTY", "DIRTY"];
    else if (toca == 6) return ["B", "CLEAN", "DIRTY"];
    else if (toca == 7) return ["B", "DIRTY", "CLEAN"];
    else if (toca == 8) return ["B", "CLEAN", "CLEAN"];
}

function setIndex(valor) {
    index = valor;
}

var index = 1;
var analiza = false;
var states = ["A", "DIRTY", "DIRTY"];
var estadosVisitados = [1];
test(states);