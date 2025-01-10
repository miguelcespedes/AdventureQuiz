// ----------------------------------------------------------------------------------
// LÓGICA DE JUEGO
// - Tablero ordenado por puntaje DESC y luego tiempo DESC
// - Restricción: una sola partida por matrícula (mensaje empático si ya jugó)
// - Botón para ocultar/mostrar el tablero
// ----------------------------------------------------------------------------------

let nombreJugador = "";
let matriculaJugador = "";
let currentLevel = 0;
let score = 0;
let startTime = 0;
let questions = [];
let scoreboard = [];

document.addEventListener("DOMContentLoaded", () => {
  inicializarMDC();
  cargarScoreboardDeLocalStorage();
  definirPreguntasDeEjemplo();

  const btnNuevoJuego = document.getElementById("btnNuevoJuego");
  btnNuevoJuego.addEventListener("click", abrirModalDatosJugador);

  const btnIniciarJuego = document.getElementById("btnIniciarJuego");
  btnIniciarJuego.addEventListener("click", iniciarJuego);

  const btnModalOk = document.getElementById("btnModalOk");
  btnModalOk.addEventListener("click", cerrarModalNotificacion);

  // Botón para ocultar/mostrar Tablero
  const btnToggleScoreboard = document.getElementById("btnToggleScoreboard");
  btnToggleScoreboard.addEventListener("click", toggleScoreboard);
});

// --------------------
// Inicializa los componentes de Material
// --------------------
function inicializarMDC() {
  mdc.autoInit();
}

// --------------------
// Carga el scoreboard del localStorage
// --------------------
function cargarScoreboardDeLocalStorage() {
  const data = localStorage.getItem("scoreboard");
  if (data) {
    scoreboard = JSON.parse(data);
  } else {
    scoreboard = [];
  }
  actualizarTablaScoreboard();
}

// --------------------
// Guarda el scoreboard en localStorage
// --------------------
function guardarScoreboardEnLocalStorage() {
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

// --------------------
// Actualiza la tabla (orden por puntaje desc, luego tiempo desc)
// --------------------
function actualizarTablaScoreboard() {
  const tbody = document.getElementById("scoreboardBody");
  tbody.innerHTML = "";

  // Ordenar primero por puntaje desc, luego por tiempo desc
  scoreboard.sort((a, b) => {
    if (b.puntaje === a.puntaje) {
      // Ordenar por tiempo descendente
      return b.tiempo - a.tiempo;
    }
    // Ordenar por puntaje descendente
    return b.puntaje - a.puntaje;
  });

  // Rellenar la tabla
  scoreboard.forEach((entry, index) => {
    const tr = document.createElement("tr");
    tr.classList.add("mdc-data-table__row");

    // Jugador
    const tdJugador = document.createElement("td");
    tdJugador.classList.add("mdc-data-table__cell");
    tdJugador.textContent = entry.nombre;

    // Nivel
    const tdNivel = document.createElement("td");
    tdNivel.classList.add("mdc-data-table__cell");
    tdNivel.textContent = entry.nivel;

    // Tiempo
    const tdTiempo = document.createElement("td");
    tdTiempo.classList.add("mdc-data-table__cell");
    tdTiempo.textContent = entry.tiempo.toFixed(2);

    // Puntaje
    const tdPuntaje = document.createElement("td");
    tdPuntaje.classList.add("mdc-data-table__cell");
    tdPuntaje.textContent = entry.puntaje;

    tr.appendChild(tdJugador);
    tr.appendChild(tdNivel);
    tr.appendChild(tdTiempo);
    tr.appendChild(tdPuntaje);

    tbody.appendChild(tr);
  });
}

// --------------------
// Definir preguntas de ejemplo
// --------------------
function definirPreguntasDeEjemplo() {
  questions = [
    {
      pregunta: "¿Cuál es la capital de Francia?",
      opciones: ["Roma", "París", "Londres", "Berlín"],
      respuestaCorrecta: 1
    },
    {
      pregunta: "¿Cuánto es 2 + 2?",
      opciones: ["3", "4", "5", "22"],
      respuestaCorrecta: 1
    },
    {
      pregunta: "¿Qué idioma se habla principalmente en Brasil?",
      opciones: ["Español", "Portugués", "Inglés", "Francés"],
      respuestaCorrecta: 1
    }
  ];
}

// --------------------
// Abre modal para pedir datos del jugador
// --------------------
function abrirModalDatosJugador() {
  const dialog = new mdc.dialog.MDCDialog(document.getElementById("modalDatosJugador"));
  dialog.open();
}

// --------------------
// Inicia el juego (verificar si la matrícula ya jugó)
// --------------------
function iniciarJuego() {
  const nombreInput = document.getElementById("nombreInput");
  const matriculaInput = document.getElementById("matriculaInput");

  if (!nombreInput.value.trim() || !matriculaInput.value.trim()) {
    return; // campos vacíos
  }

  // Verificar si la matrícula ya jugó
  if (yaJugoEstaMatricula(matriculaInput.value.trim())) {
    abrirModalNotificacion(
      "¡Ups! Ya jugaste",
      "Veo que ya has participado con esa matrícula. ¡Muchas gracias por tu entusiasmo, pero solo puedes jugar una vez!"
    );
    return;
  }

  nombreJugador = nombreInput.value.trim();
  matriculaJugador = matriculaInput.value.trim();

  currentLevel = 1;
  score = 0;
  startTime = Date.now();

  document.getElementById("questionSection").style.display = "block";

  mostrarPregunta(currentLevel);
}

// --------------------
// Checa si la matrícula ya existe en scoreboard
// --------------------
function yaJugoEstaMatricula(matricula) {
  return scoreboard.some((entry) => entry.matricula === matricula);
}

// --------------------
// Muestra la pregunta actual
// --------------------
function mostrarPregunta(nivel) {
  const questionObj = questions[nivel - 1];
  const questionText = document.getElementById("questionText");
  const answersContainer = document.getElementById("answersContainer");

  questionText.textContent = questionObj.pregunta;
  answersContainer.innerHTML = "";

  // Mezclamos las opciones
  const opcionesConIndices = questionObj.opciones.map((op, idx) => ({ texto: op, indice: idx }));
  mezclarArray(opcionesConIndices);

  // Creamos un botón por cada opción
  opcionesConIndices.forEach((op) => {
    const btn = document.createElement("button");
    btn.className = "answer-button mdc-button";
    btn.textContent = op.texto;

    btn.addEventListener("click", () => {
      verificarRespuesta(op.indice === questionObj.respuestaCorrecta);
    });

    answersContainer.appendChild(btn);
  });
}

// --------------------
// Verifica si la respuesta es correcta
// --------------------
function verificarRespuesta(esCorrecta) {
  if (esCorrecta) {
    // Puntaje en función del tiempo
    const elapsedTime = (Date.now() - startTime) / 1000;
    score += 10 * Math.max(1, 60 - elapsedTime);

    currentLevel++;
    if (currentLevel <= questions.length) {
      abrirModalNotificacion(
        `¡Nivel ${currentLevel}!`,
        "¡Respuesta correcta! Avanzando a la siguiente pregunta..."
      );
      mostrarPregunta(currentLevel);
    } else {
      // Completó el juego
      const totalTime = (Date.now() - startTime) / 1000;
      abrirModalNotificacion(
        "¡Felicidades!",
        `Has completado todos los niveles. Tu puntaje final es: ${Math.round(score)}`
      );
      guardarResultadoEnScoreboard("Completado", totalTime, Math.round(score));
      reiniciarJuego();
    }
  } else {
    // Respuesta incorrecta
    const totalTime = (Date.now() - startTime) / 1000;
    abrirModalNotificacion("¡Buen intento!", "Has fallado. El juego se reiniciará.");
    guardarResultadoEnScoreboard(currentLevel, totalTime, Math.round(score));
    reiniciarJuego();
  }
}

// --------------------
// Guarda el resultado en scoreboard
// --------------------
function guardarResultadoEnScoreboard(nivel, tiempo, puntaje) {
  scoreboard.push({
    nombre: nombreJugador,
    matricula: matriculaJugador,
    nivel: nivel,
    tiempo: tiempo,
    puntaje: puntaje
  });
  guardarScoreboardEnLocalStorage();
  actualizarTablaScoreboard();
}

// --------------------
// Reinicia el juego
// --------------------
function reiniciarJuego() {
  currentLevel = 0;
  score = 0;
  startTime = 0;
  nombreJugador = "";
  matriculaJugador = "";

  document.getElementById("questionSection").style.display = "none";
}

// --------------------
// Abre el modal de notificación
// --------------------
function abrirModalNotificacion(titulo, contenido) {
  const modalTitle = document.getElementById("modalNotificacion-title");
  const modalContent = document.getElementById("modalNotificacion-content");
  modalTitle.textContent = titulo;
  modalContent.textContent = contenido;

  const dialog = new mdc.dialog.MDCDialog(document.getElementById("modalNotificacion"));
  dialog.open();
}

// --------------------
// Cierra el modal de notificación
// --------------------
function cerrarModalNotificacion() {
  const dialog = new mdc.dialog.MDCDialog(document.getElementById("modalNotificacion"));
  dialog.close();
}

// --------------------
// Mezclar array (Fisher-Yates)
// --------------------
function mezclarArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// --------------------
// Ocultar/Mostrar el scoreboard
// --------------------
function toggleScoreboard() {
  const scoreboardSection = document.getElementById("scoreboardSection");
  const btnToggle = document.getElementById("btnToggleScoreboard");

  // Toggle visibilidad
  if (scoreboardSection.style.display === "none") {
    scoreboardSection.style.display = "block";
    btnToggle.textContent = "Ocultar Tablero";
  } else {
    scoreboardSection.style.display = "none";
    btnToggle.textContent = "Mostrar Tablero";
  }
}
