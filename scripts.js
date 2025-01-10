/****************************************************************************
 * scripts.js
 * 
 * 1) La misma matrícula puede jugar varias veces (attempts++).
 * 2) Se guarda en scoreboard: { nombre, matricula, attempts, bestLevel, bestTime, bestScore }
 * 3) "Pregunta X de Y" al mostrar cada nivel.
 * 4) Se hace fallback a 0 si bestTime no existe (para evitar error de "toFixed").
 * 5) Se ocultan "Mejor Nivel" y "Mejor Tiempo (s)" en móvil usando la clase .mobile-hide
 ****************************************************************************/

/*****************************************************************************
 * VARIABLES GLOBALES
 *****************************************************************************/
let nombreJugador = "";
let matriculaJugador = "";
let currentLevel = 0;
let score = 0;
let startTime = 0; 
// scoreboard = [{ nombre, matricula, attempts, bestLevel, bestTime, bestScore }, ...]
let scoreboard = [];

/*****************************************************************************
 * AL CARGAR LA PÁGINA
 *****************************************************************************/
document.addEventListener("DOMContentLoaded", () => {
  // Cargar scoreboard desde localStorage
  cargarScoreboard();

  // Botón "Nuevo Juego"
  document.getElementById("btnNuevoJuego")
    .addEventListener("click", () => abrirModal("modalDatosJugador"));

  // Botón "Cancelar" (modal de datos)
  document.getElementById("btnCancelarDatos")
    .addEventListener("click", () => cerrarModal("modalDatosJugador"));

  // Botón "Iniciar" (modal de datos)
  document.getElementById("btnIniciarJuego")
    .addEventListener("click", iniciarJuego);

  // Botón "Ocultar/Mostrar Tablero"
  document.getElementById("btnToggleScoreboard")
    .addEventListener("click", toggleScoreboard);
});

/*****************************************************************************
 * LOCALSTORAGE: CARGAR / GUARDAR
 *****************************************************************************/
function cargarScoreboard() {
  const data = localStorage.getItem("scoreboard");
  if (data) {
    scoreboard = JSON.parse(data);
  } else {
    scoreboard = [];
  }
  actualizarTablaScoreboard();
}

function guardarScoreboard() {
  localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
}

/*****************************************************************************
 * INICIAR JUEGO
 * - Permite reintentos (no bloquea la matrícula).
 *****************************************************************************/
function iniciarJuego() {
  const nombreInput = document.getElementById("nombreInput");
  const matriculaInput = document.getElementById("matriculaInput");

  if (!nombreInput.value.trim() || !matriculaInput.value.trim()) {
    // Campos vacíos, no hacemos nada
    return;
  }

  nombreJugador = nombreInput.value.trim();
  matriculaJugador = matriculaInput.value.trim();

  // Reiniciar valores de juego
  currentLevel = 1;
  score = 0;
  startTime = Date.now();

  // Cerrar modal
  cerrarModal("modalDatosJugador");

  // Mostrar sección de preguntas
  document.getElementById("questionSection").classList.remove("hidden");

  // Mostrar la primera pregunta
  mostrarPregunta(currentLevel);
}

/*****************************************************************************
 * MOSTRAR PREGUNTA
 * "Pregunta X de Y: <texto>"
 *****************************************************************************/
function mostrarPregunta(nivel) {
  // "questions" viene de quizz.js
  const questionObj = questions[nivel - 1];
  const questionText = document.getElementById("questionText");
  const answersContainer = document.getElementById("answersContainer");

  questionText.textContent = `Pregunta ${nivel} de ${questions.length}: ${questionObj.pregunta}`;
  answersContainer.innerHTML = "";

  // Mezclar opciones
  const ops = questionObj.opciones.map((texto, idx) => ({ texto, idx }));
  mezclarArray(ops);

  // Crear "cards"
  ops.forEach(op => {
    const card = document.createElement("div");
    card.classList.add("answer-card");
    card.textContent = op.texto;

    card.addEventListener("click", () => {
      const esCorrecta = (op.idx === questionObj.correcta);
      verificarRespuesta(esCorrecta);
    });

    answersContainer.appendChild(card);
  });
}

/*****************************************************************************
 * VERIFICAR RESPUESTA
 *****************************************************************************/
function verificarRespuesta(esCorrecta) {
  const tiempoTranscurrido = (Date.now() - startTime) / 1000;

  if (esCorrecta) {
    // Fórmula de puntaje
    score += 10 * Math.max(1, 60 - tiempoTranscurrido);

    currentLevel++;
    if (currentLevel <= questions.length) {
      showToast(`¡Correcto! Avanzas al nivel ${currentLevel}`, "success");
      mostrarPregunta(currentLevel);
    } else {
      // Terminó el quiz
      showToast("¡Felicidades! Has completado el Quiz", "success");
      guardarResultado("Completado", tiempoTranscurrido, Math.round(score));
      reiniciarJuego();
    }
  } else {
    // Falló
    showToast("¡Buen intento! Has fallado. Reiniciando...", "error");
    guardarResultado(currentLevel, tiempoTranscurrido, Math.round(score));
    reiniciarJuego();
  }
}

/*****************************************************************************
 * GUARDAR RESULTADO EN EL SCOREBOARD
 * - Se incrementa attempts
 * - Se comparan bestScore y bestTime
 *****************************************************************************/
function guardarResultado(nivel, tiempo, puntaje) {
  let record = scoreboard.find(r => r.matricula === matriculaJugador);

  if (!record) {
    // Nuevo registro
    record = {
      nombre: nombreJugador,
      matricula: matriculaJugador,
      attempts: 1,
      bestLevel: nivel,
      bestTime: tiempo,
      bestScore: puntaje
    };
    scoreboard.push(record);
  } else {
    // Ya existía => reintento
    record.attempts++;
    // Si este puntaje es mejor
    if (puntaje > record.bestScore) {
      record.bestScore = puntaje;
      record.bestTime = tiempo;
      record.bestLevel = nivel;
    }
  }

  guardarScoreboard();
  actualizarTablaScoreboard();
}

/*****************************************************************************
 * REINICIAR JUEGO
 *****************************************************************************/
function reiniciarJuego() {
  currentLevel = 0;
  score = 0;
  startTime = 0;
  nombreJugador = "";
  matriculaJugador = "";

  document.getElementById("questionSection").classList.add("hidden");
}

/*****************************************************************************
 * ACTUALIZAR TABLA DEL SCOREBOARD
 * - Fallback a 0 si bestTime es undefined (para evitar error .toFixed())
 * - Se ocultan "Mejor Nivel" y "Mejor Tiempo" en móvil usando la clase .mobile-hide
 *****************************************************************************/
function actualizarTablaScoreboard() {
  const tbody = document.getElementById("scoreboardBody");
  tbody.innerHTML = "";

  // Ordenar: bestScore desc, si empate => bestTime desc
  scoreboard.sort((a, b) => {
    if (b.bestScore === a.bestScore) {
      return b.bestTime - a.bestTime;
    }
    return b.bestScore - a.bestScore;
  });

  scoreboard.forEach((entry, index) => {
    const tr = document.createElement("tr");

    // Jugador
    const tdJugador = document.createElement("td");
    tdJugador.textContent = entry.nombre;

    // Intentos
    const tdIntentos = document.createElement("td");
    tdIntentos.textContent = entry.attempts;

    // Mejor Nivel (ocultar en móvil)
    const tdNivel = document.createElement("td");
    tdNivel.classList.add("mobile-hide");
    tdNivel.textContent = entry.bestLevel;

    // Mejor Tiempo (ocultar en móvil)
    const tdTiempo = document.createElement("td");
    tdTiempo.classList.add("mobile-hide");
    const safeTime = (typeof entry.bestTime === "number") ? entry.bestTime : 0;
    tdTiempo.textContent = safeTime.toFixed(2);

    // Mejor Puntaje + emojis top 3
    const tdPuntaje = document.createElement("td");
    let emoji = "";
    if (index === 0) emoji = " 🏆";
    else if (index === 1) emoji = " 🥈";
    else if (index === 2) emoji = " 🥉";
    tdPuntaje.textContent = entry.bestScore + emoji;

    tr.appendChild(tdJugador);
    tr.appendChild(tdIntentos);
    tr.appendChild(tdNivel);
    tr.appendChild(tdTiempo);
    tr.appendChild(tdPuntaje);

    tbody.appendChild(tr);
  });
}

/*****************************************************************************
 * MOSTRAR TOAST (notificación flotante)
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

  // Desaparece tras ~3s
  setTimeout(() => {
    if (toast.parentNode) {
      container.removeChild(toast);
    }
  }, 3100);
}

/*****************************************************************************
 * MEZCLAR ARRAY (FISHER-YATES)
 *****************************************************************************/
function mezclarArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/*****************************************************************************
 * TOGGLE SCOREBOARD
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

/*****************************************************************************
 * MODALES (ABRIR / CERRAR)
 *****************************************************************************/
function abrirModal(id) {
  document.getElementById(id).classList.add("active");
}
function cerrarModal(id) {
  document.getElementById(id).classList.remove("active");
}
