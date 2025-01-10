/****************************************************************************
 * scripts.js - Juego de preguntas con:
 * - Tarjetas minimalistas (cards) para las opciones
 * - Pregunta centrada
 * - Toast notifications (no modales al avanzar/fallar)
 * - Restricción de 1 partida por matrícula
 ****************************************************************************/

// Variables globales
let nombreJugador = "";
let matriculaJugador = "";
let currentLevel = 0;
let score = 0;
let startTime = 0; 
let scoreboard = [];
let questions = [];

/*****************************************************************************
 * Al cargar la página
 *****************************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // Cargar scoreboard
  cargarScoreboard();

  // Definir preguntas
  definirPreguntas();

  // Botones principales
  document.getElementById("btnNuevoJuego")
    .addEventListener("click", () => abrirModal("modalDatosJugador"));

  document.getElementById("btnCancelarDatos")
    .addEventListener("click", () => cerrarModal("modalDatosJugador"));

  document.getElementById("btnIniciarJuego")
    .addEventListener("click", iniciarJuego);

  document.getElementById("btnToggleScoreboard")
    .addEventListener("click", toggleScoreboard);
});

/*****************************************************************************
 * Cargar / Guardar scoreboard
 *****************************************************************************/
function cargarScoreboard() {
  const data = localStorage.getItem("scoreboard");
  if (data) {
    scoreboard = JSON.parse(data);
  } else {
    scoreboard = [];
  }
  actualizarTabla();
}

function guardarScoreboard() {
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

/*****************************************************************************
 * Definir preguntas de ejemplo
 *****************************************************************************/
function definirPreguntas() {
  questions = [
    {
      pregunta: "¿Cuál es la capital de Francia?",
      opciones: ["Roma", "París", "Londres", "Berlín"],
      correcta: 1
    },
    {
      pregunta: "¿Cuánto es 2 + 2?",
      opciones: ["3", "4", "5", "22"],
      correcta: 1
    },
    {
      pregunta: "¿Qué idioma se habla principalmente en Brasil?",
      opciones: ["Español", "Portugués", "Inglés", "Francés"],
      correcta: 1
    }
  ];
}

/*****************************************************************************
 * Modal de captura de datos (abrir / cerrar)
 *****************************************************************************/
function abrirModal(idModal) {
  document.getElementById(idModal).classList.add("active");
}
function cerrarModal(idModal) {
  document.getElementById(idModal).classList.remove("active");
}

/*****************************************************************************
 * Iniciar juego (verificar si la matrícula ya existe)
 *****************************************************************************/
function iniciarJuego() {
  const nombreInput = document.getElementById("nombreInput");
  const matriculaInput = document.getElementById("matriculaInput");

  if (!nombreInput.value.trim() || !matriculaInput.value.trim()) {
    return;
  }
  if (matriculaExiste(matriculaInput.value.trim())) {
    showToast("Matrícula ya registrada, no puedes jugar otra vez", "error");
    return;
  }

  nombreJugador = nombreInput.value.trim();
  matriculaJugador = matriculaInput.value.trim();

  currentLevel = 1;
  score = 0;
  startTime = Date.now();

  // Cerrar modal y mostrar la sección de preguntas
  cerrarModal("modalDatosJugador");
  document.getElementById("questionSection").classList.remove("hidden");

  mostrarPregunta(currentLevel);
}

/*****************************************************************************
 * Verificar si la matrícula ya jugó
 *****************************************************************************/
function matriculaExiste(mat) {
  return scoreboard.some((entry) => entry.matricula === mat);
}

/*****************************************************************************
 * Mostrar la pregunta y opciones como "cards"
 *****************************************************************************/
function mostrarPregunta(nivel) {
  const questionObj = questions[nivel - 1];
  const questionText = document.getElementById("questionText");
  const answersContainer = document.getElementById("answersContainer");

  questionText.textContent = questionObj.pregunta;
  answersContainer.innerHTML = "";

  // Mezclar opciones
  const ops = questionObj.opciones.map((texto, idx) => ({ texto, idx }));
  mezclar(ops);

  // Crear "cards"
  ops.forEach((op) => {
    const card = document.createElement("div");
    card.classList.add("answer-card");
    card.textContent = op.texto;

    card.addEventListener("click", () => {
      verificarRespuesta(op.idx === questionObj.correcta);
    });

    answersContainer.appendChild(card);
  });
}

/*****************************************************************************
 * Verificar respuesta y mostrar toasts
 *****************************************************************************/
function verificarRespuesta(correcta) {
  const tiempoTranscurrido = (Date.now() - startTime) / 1000;

  if (correcta) {
    score += 10 * Math.max(1, 60 - tiempoTranscurrido);
    currentLevel++;
    if (currentLevel <= questions.length) {
      showToast(`¡Correcto! Avanzas al nivel ${currentLevel}`, "success");
      mostrarPregunta(currentLevel);
    } else {
      showToast("¡Felicidades! Has completado el Quiz", "success");
      guardarResultado("Completado", tiempoTranscurrido, Math.round(score));
      reiniciarJuego();
    }
  } else {
    showToast("¡Buen intento! Has fallado. Reiniciando...", "error");
    guardarResultado(currentLevel, tiempoTranscurrido, Math.round(score));
    reiniciarJuego();
  }
}

/*****************************************************************************
 * Guardar resultado en scoreboard
 *****************************************************************************/
function guardarResultado(nivel, tiempo, puntaje) {
  scoreboard.push({
    nombre: nombreJugador,
    matricula: matriculaJugador,
    nivel,
    tiempo,
    puntaje
  });
  guardarScoreboard();
  actualizarTabla();
}

/*****************************************************************************
 * Reiniciar el juego
 *****************************************************************************/
function reiniciarJuego() {
  currentLevel = 0;
  score = 0;
  startTime = 0;
  nombreJugador = "";
  matriculaJugador = "";

  // Ocultar la sección de pregunta
  document.getElementById("questionSection").classList.add("hidden");
}

/*****************************************************************************
 * Actualizar tabla (orden: puntaje desc, luego tiempo desc)
 * Con emojis en top 3
 *****************************************************************************/
function actualizarTabla() {
  const tbody = document.getElementById("scoreboardBody");
  tbody.innerHTML = "";

  scoreboard.sort((a, b) => {
    if (b.puntaje === a.puntaje) {
      return b.tiempo - a.tiempo;
    }
    return b.puntaje - a.puntaje;
  });

  scoreboard.forEach((entry, index) => {
    const tr = document.createElement("tr");

    const tdJugador = document.createElement("td");
    tdJugador.textContent = entry.nombre;

    const tdNivel = document.createElement("td");
    tdNivel.textContent = entry.nivel;

    const tdTiempo = document.createElement("td");
    tdTiempo.textContent = entry.tiempo.toFixed(2);

    const tdPuntaje = document.createElement("td");
    let emoji = "";
    if (index === 0) emoji = " 🏆";
    else if (index === 1) emoji = " 🥈";
    else if (index === 2) emoji = " 🥉";
    tdPuntaje.textContent = entry.puntaje + emoji;

    tr.appendChild(tdJugador);
    tr.appendChild(tdNivel);
    tr.appendChild(tdTiempo);
    tr.appendChild(tdPuntaje);
    tbody.appendChild(tr);
  });
}

/*****************************************************************************
 * Toast notifications
 *****************************************************************************/
function showToast(msg, type = "success") {
  const container = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  if (type === "error") {
    toast.classList.add("error");
  } else {
    toast.classList.add("success");
  }
  toast.textContent = msg;

  container.appendChild(toast);

  // Desaparece solo tras 3s (lo definimos en la animación)
  setTimeout(() => {
    if (toast.parentNode) {
      container.removeChild(toast);
    }
  }, 3100);
}

/*****************************************************************************
 * Mezclar array (Fisher-Yates)
 *****************************************************************************/
function mezclar(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/*****************************************************************************
 * Ocultar/Mostrar Tablero
 *****************************************************************************/
function toggleScoreboard() {
  const section = document.getElementById("scoreboardSection");
  const btn = document.getElementById("btnToggleScoreboard");

  if (section.style.display === "none") {
    section.style.display = "block";
    btn.textContent = "Ocultar Tablero";
  } else {
    section.style.display = "none";
    btn.textContent = "Mostrar Tablero";
  }
}
