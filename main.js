document.addEventListener("DOMContentLoaded", function () {
  console.log("Aplicación cargada correctamente.");

  const steps = document.querySelectorAll(".steps .circle");
  const stepContents = document.querySelectorAll(".step-content");
  const nextButton = document.querySelector(".next");
  const indicator = document.querySelector(".steps .progress-bar .indicator");

  let currentStep = 0;
  let selectedCategory = "";
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 0;
  let userName = "";
  let matricula = "";
  let elapsedSeconds = 0;
  let timerInterval = null;
  let answered = false;

  function showNotification(message, type) {
    const toastContainer = document.getElementById("toast-container");
    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center toast-${type} border-0`;
    toastEl.setAttribute("role", "alert");
    toastEl.setAttribute("aria-live", "assertive");
    toastEl.setAttribute("aria-atomic", "true");

    toastEl.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">${message}</div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
      </div>
    `;
    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 4000, autohide: true });
    toast.show();

    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  }

  function loadCategories() {
    const categorySelect = document.getElementById("categoria");
    quizData.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.titulo;
      categorySelect.appendChild(option);
    });
    console.log("Categorías cargadas dinámicamente.");
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  }

  function startTimer() {
    elapsedSeconds = 0;
    document.getElementById("timer").textContent = `Tiempo: ${formatTime(elapsedSeconds)}`;
    timerInterval = setInterval(() => {
      elapsedSeconds++;
      document.getElementById("timer").textContent = `Tiempo: ${formatTime(elapsedSeconds)}`;
    }, 1000);
  }

  function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  function showQuestion() {
    if (currentQuestionIndex < questions.length) {
      const questionData = questions[currentQuestionIndex];
      const step2 = document.getElementById("step-2");

      step2.querySelector("#question-text").textContent = questionData.pregunta;
      step2.querySelector("#question-subtitle").textContent = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;

      const optionsContainer = step2.querySelector("#options-container");
      optionsContainer.innerHTML = "";

      shuffleArray(questionData.opciones).forEach((opcion) => {
        const colDiv = document.createElement("div");
        colDiv.className = "col-12 col-md-4";

        const label = document.createElement("label");
        label.className = "option-card";
        label.setAttribute("data-option-id", opcion.id);

        const input = document.createElement("input");
        input.className = "form-check-input";
        input.type = "radio";
        input.name = "respuesta";
        input.value = opcion.id;

        const optionHeader = document.createElement("div");
        optionHeader.className = "option-header";
        optionHeader.textContent = opcion.id;

        const optionTextDiv = document.createElement("div");
        optionTextDiv.className = "d-flex align-items-center justify-content-center";

        const optionTextSpan = document.createElement("span");
        optionTextSpan.textContent = opcion.texto;

        optionTextDiv.appendChild(optionTextSpan);
        label.appendChild(input);
        label.appendChild(optionHeader);
        label.appendChild(optionTextDiv);
        colDiv.appendChild(label);
        optionsContainer.appendChild(colDiv);

        label.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          if (opcion.id === questionData.correcta) {
            score++;
            showNotification("¡Respuesta correcta!", "success");
          } else {
            showNotification("Respuesta incorrecta.", "danger");
          }
          currentQuestionIndex++;
          setTimeout(() => {
            answered = false;
            showQuestion();
          }, 1000);
        });
      });
    } else {
      finalizeQuiz();
    }
  }

  function finalizeQuiz() {
    stopTimer();
    const tiempoTotal = formatTime(elapsedSeconds);
    saveResult(tiempoTotal);
    createCategoryTabs();
    updateCategoryTables();
    currentStep++;
    updateWizard();
  }

  function saveResult(tiempoTotal) {
    const result = {
      matricula,
      nombre: userName,
      categoria: selectedCategory,
      puntaje: score,
      correctas: score,
      incorrectas: questions.length - score,
      tiempoPromedio: tiempoTotal,
    };
    const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    resultados.push(result);
    localStorage.setItem("resultados", JSON.stringify(resultados));
  }

  function createCategoryTabs() {
    const categoryTabs = document.getElementById("categoryTabs");
    const categoryTabContent = document.getElementById("categoryTabContent");

    categoryTabs.innerHTML = "";
    categoryTabContent.innerHTML = "";

    quizData.forEach((category, index) => {
      const categoryId = `category-${category.id}`;
      const tabItem = document.createElement("li");
      tabItem.className = "nav-item";
      tabItem.innerHTML = `
        <button class="nav-link ${index === 0 ? "active" : ""}" id="${categoryId}-tab" data-bs-toggle="tab"
          data-bs-target="#${categoryId}" type="button" role="tab" aria-controls="${categoryId}"
          aria-selected="${index === 0}">
          ${category.titulo}
        </button>`;
      categoryTabs.appendChild(tabItem);

      const tabPane = document.createElement("div");
      tabPane.className = `tab-pane fade ${index === 0 ? "show active" : ""}`;
      tabPane.id = categoryId;
      tabPane.innerHTML = `
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead>
              <tr>
                <th>Posición</th>
                <th>Jugador</th>
                <th>Correctas</th>
                <th>Incorrectas</th>
                <th>Intentos</th>
                <th>Tiempo Promedio</th>
                <th>Puntaje Total</th>
                <th>Bonificaciones</th>
              </tr>
            </thead>
            <tbody id="results-body-${category.id}"></tbody>
          </table>
        </div>`;
      categoryTabContent.appendChild(tabPane);
    });
  }

  function updateCategoryTables() {
    const resultados = JSON.parse(localStorage.getItem("resultados")) || [];
    const groupedResults = quizData.reduce((acc, category) => {
      acc[category.id] = resultados.filter((res) => res.categoria === category.id);
      return acc;
    }, {});

    Object.keys(groupedResults).forEach((categoryId) => {
      const categoryResults = groupedResults[categoryId];
      const tableBody = document.getElementById(`results-body-${categoryId}`);

      if (!tableBody) return;

      categoryResults.sort((a, b) => {
        if (b.correctas === a.correctas) {
          return a.tiempoPromedio.localeCompare(b.tiempoPromedio);
        }
        return b.correctas - a.correctas;
      });

      tableBody.innerHTML = "";
      const totalPreguntas = quizData.find((cat) => cat.id === categoryId).preguntas.length;

      categoryResults.forEach((result, index) => {
        let emoji = "";

        if (result.correctas === totalPreguntas) {
          if (index === 0) {
            emoji = "🏆";
          } else if (index === 1) {
            emoji = "🥈";
          } else if (index === 2) {
            emoji = "🥉";
          }
        } else {
          emoji = "🔄";
        }

        const tr = document.createElement("tr");
        tr.innerHTML = `
          <th>${index + 1}° ${emoji}</th>
          <td>${result.nombre}</td>
          <td>${result.correctas}</td>
          <td>${result.incorrectas}</td>
          <td>${result.intentos || 1}</td>
          <td>${result.tiempoPromedio}</td>
          <td>${result.puntaje}</td>
          <td>+${result.bonificaciones || 0}</td>`;
        tableBody.appendChild(tr);
      });
    });
  }

  function validateStep1() {
    const matriculaInput = document.getElementById("matricula");
    const nameInput = document.getElementById("name");
    const categoryInput = document.getElementById("categoria");

    matricula = matriculaInput.value.trim().toUpperCase();
    userName = nameInput.value.trim();
    selectedCategory = categoryInput.value;

    if (!matricula || !userName || !selectedCategory) {
      showNotification("Por favor, completa todos los campos para continuar.", "warning");
      return false;
    }
    return true;
  }

  function updateWizard() {
    steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
    stepContents.forEach((content, index) => content.classList.toggle("active", index === currentStep));

    const progressPercentage = (currentStep / (steps.length - 1)) * 100;
    indicator.style.width = `${progressPercentage}%`;

    nextButton.textContent = currentStep === steps.length - 1 ? "Finalizar" : "Siguiente";
  }

  nextButton.addEventListener("click", () => {
    // Verificar si estamos en el paso inicial
    if (currentStep === 0 && validateStep1()) {
      // Preparar las preguntas
      questions = shuffleArray(quizData.find((cat) => cat.id === selectedCategory).preguntas);
      currentQuestionIndex = 0;
      score = 0;
      startTimer();  // Iniciar el temporizador
      currentStep++;  // Avanzar al siguiente paso
      updateWizard();  // Actualizar el asistente
      showQuestion();  // Mostrar la primera pregunta
    } 
    // Si estamos en el último paso (ej. pregunta 5), reiniciar la página
    else if (currentStep === 2) {  // Cambiar este número si necesitas otro paso final
      window.location.reload();  // Recargar la página
    }
  });



  loadCategories();
  updateWizard();
});
