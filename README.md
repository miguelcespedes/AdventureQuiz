Quiero que crees un **juego de preguntas** (Quiz) que cumpla con los siguientes **requisitos**:

1. **Arquitectura de Archivos**  
   - **index.html**: Estructura principal, carga de estilos (`styles.css`), un modal para pedir **Nombre** y **Matrícula**, una sección para el **Tablero de Campeones** y otra para la **Pregunta**.  
   - **styles.css**: Estilo en **modo oscuro**, minimalista, con **variables** para los colores principales (por ejemplo, `--color-bg`, `--color-text`, etc.). Debe usar un fondo oscuro (#121212 o similar) y texto claro. Cards, toasts, modal, responsividad.  
   - **quizz.js**: Un **array** de **20 preguntas** muy específicas sobre **API Ops**, **API Gateway** y **microservicios**. Cada pregunta con `pregunta`, `opciones`, `correcta`.  
   - **scripts.js**: La **lógica** del juego (scoreboard en `localStorage`, la sección de preguntas, la función para verificar respuestas, los toasts, etc.).  

2. **Flujo del Juego**  
   - Al abrir “**Nuevo Juego**”, se muestra un **modal** que pide:  
     - **Nombre**  
     - **Matrícula**  
   - Al iniciar el juego, se limpia la pantalla anterior y se muestra la **Primera Pregunta** con las tarjetas (cards) de respuesta.  
   - Cada **pregunta** se muestra con “**Pregunta X de 20**: {texto}”.  
   - Si respondes **correcto**, aparece un **toast** (“¡Correcto! Avanzas al nivel {n}”) sin **bloquear** la interacción.  
   - Si respondes **incorrecto**, aparece otro **toast** (“¡Buen intento! Has fallado. Reiniciando…”) y se guarda el resultado.  
   - Al **completar** las 20 preguntas, se muestra un **toast** (“¡Felicidades! Has completado el Quiz”).  

3. **Scoreboard**  
   - Se registra en `localStorage` un **objeto** por **matrícula** con:  
     - `nombre`  
     - `matricula`  
     - `attempts` (número de veces jugadas)  
     - `bestScore` (el puntaje más alto logrado)  
     - `bestTime` (tiempo para ese mejor puntaje)  
     - `bestLevel` (último nivel alcanzado en ese mejor puntaje o “Completado”)  
   - La **misma matrícula** puede volver a jugar. Cada vez que juega, `attempts++`. Si el puntaje mejora, se actualiza `bestScore`, `bestTime`, `bestLevel`.  
   - El **Tablero** se ordena por **bestScore DESC** y, en caso de empate, **bestTime DESC**.  
   - Debe tener columnas:  
     - **Jugador**  
     - **Intentos**  
     - **Mejor Nivel**  
     - **Mejor Tiempo (s)**  
     - **Mejor Puntaje**  
   - Para los **primeros 3** del tablero, mostrar un **emoji** al final del puntaje (`🏆`, `🥈`, `🥉`).  

4. **Modo Oscuro** + **Minimalista**  
   - `body` con `background-color: #121212` y color de texto `#ffffff`.  
   - **Cards** de respuesta con un color algo más claro (ej. `#1f1f1f`), borde, y un **hover** que haga un `transform: scale(1.05)`.  
   - Un **toast** en la esquina superior derecha que desaparezca solo tras ~3s (animado con keyframes).  
   - El **modal** para Nombre/Matrícula con un fondo semitransparente (un `rgba(0,0,0,0.5)`) que centre el contenido.  

5. **Responsividad**  
   - Usa media queries para que en pantallas pequeñas (mobile) las **cards** se muestren en una columna, y la **tabla** reduzca un poco el tamaño de fuente.  

6. **Prevención de errores**  
   - Si `bestTime` es `undefined` (por datos viejos), usar `0.00` de fallback para `.toFixed(2)`.  
   - No bloquear la matrícula: la misma puede volver a jugar para mejorar su score.  

7. **Entrega de Código**  
   - **Cuatro archivos**:  
     1. `index.html` (estructura)  
     2. `styles.css` (tema oscuro y minimal)  
     3. `quizz.js` (array de 20 preguntas, cada una con 4 opciones y un índice de la correcta)  
     4. `scripts.js` (toda la lógica, scoreboard, toasts, reintentos, “Pregunta X de Y”).  
   - Que todo **funcione** al abrir `index.html` sin necesidad de servidores.  
   - Incluye **comentarios** en el JS para que se entienda la lógica principal (cargar scoreboard, mostrar pregunta, verificar respuesta, etc.).  

**Resumen**:  
Necesito un proyecto con **modo oscuro**, **tarjetas minimalistas** para respuestas, **toasts** en vez de modales para feedback, **reintentos** en la misma matrícula, un **scoreboard** con `bestScore`, `bestTime`, `attempts`, ordenado por **score/time**, y **20 preguntas** sobre **API Ops** y **API Gateway** (guardadas en `quizz.js`). Genera los **cuatro** archivos completos.

