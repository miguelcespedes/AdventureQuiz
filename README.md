Quiero que crees un juego de preguntas tipo “Quiz” con las siguientes características y diseño:

1. **Tecnologías y Estructura**  
   - **HTML + CSS + JavaScript** puros.  
   - **No** usar frameworks de UI (ej. no usar Material).  
   - Tres archivos: `index.html`, `styles.css`, `scripts.js`.  
   - Al abrir `index.html` en un navegador moderno, debe funcionar sin servidores adicionales.

2. **Tema Oscuro (Dark)** y Diseño Minimalista  
   - **Fondo** oscuro (por ejemplo, #121212).  
   - **Texto** claro (#ffffff).  
   - **Paleta** con un color principal (ej. #bb86fc) y secundario (#03dac6).  
   - **Pregunta** centrada en la pantalla.  
   - **Opciones** como **tarjetas** minimalistas (cards) en vez de botones.  
   - **Hover**: Al pasar sobre la tarjeta, un ligero **scale** y color de fondo más claro del color principal.  
   - **Estilo** minimal y responsivo (usar `rem`, `em` o media queries).  

3. **Interacción**  
   - Al **inicio**, hay dos **botones principales** en la pantalla:  
     1. “Nuevo Juego” (abre un **modal** para capturar **Nombre** y **Matrícula**).  
     2. “Ocultar/Mostrar Tablero” (para el “Tablero de Campeones”).  
   - **Restricción**: Solo una partida por **Matrícula**.  
     - Si la Matrícula ya existe, se muestra un **toast** de error: “Matrícula ya registrada…”.  

4. **Preguntas**  
   - Mínimo **3 preguntas** de ejemplo.  
   - Cada pregunta se muestra centrada arriba.  
   - Debajo, las **opciones** (3-4) se presentan como **cards** en fila.  
   - Se **mezclan** aleatoriamente (para que la respuesta correcta no esté siempre en la misma posición).

5. **Respuestas**  
   - Si la respuesta es **Correcta**, se muestra un **toast** (no un modal) con un mensaje: “¡Correcto! Avanzas al nivel {n}”.  
     - No se detiene el juego, el usuario avanza sin dar clic extra.  
   - Si la respuesta es **Incorrecta**, **otro toast**: “¡Buen intento! Has fallado. Reiniciando…”.  
     - Se guarda el puntaje y se reinicia el juego (nivel 0, oculta la sección de preguntas).  

6. **Puntaje y Scoreboard**  
   - El **puntaje** incrementa según una fórmula basada en **tiempo**, por ejemplo:  
     ```
     puntaje += 10 * Math.max(1, 60 - elapsedTime)
     ```
     donde `elapsedTime` es el tiempo en segundos desde que comenzó.  
   - Al **fallar** o **completar** el Quiz, se guarda en el “Tablero de Campeones” con:  
     - Nombre  
     - Matrícula  
     - Nivel (o “Completado”)  
     - Tiempo (s)  
     - Puntaje  
   - Se ordena por **puntaje DESC** y, si hay empate, por **tiempo DESC**.  
   - Los **primeros 3** lugares llevan **emojis** al final del puntaje (p. ej. “1250 🏆”).  
   - El **Tablero** se puede **mostrar/ocultar** con el botón.  
   - Usa `localStorage` para persistir la tabla.  

7. **Modal vs. Toast**  
   - **Modal**: solo se usa para capturar **Nombre** y **Matrícula** (al iniciar un juego).  
   - **Toasts**: para feedback rápido (correcto/incorrecto, matrícula repetida, etc.) sin interrumpir el flujo.  
   - Los **toasts** flotan en la esquina (p. ej. `position: fixed; top: 1rem; right: 1rem;`) y **desaparecen** solos.  

8. **Responsividad**  
   - Usa **media queries** para que en pantallas pequeñas (móviles), las **cards** de opciones se apilen o expandan en ancho.  
   - Asegúrate de que los textos sean legibles (no se monten).  

9. **Entrega**  
   - Quiero el **código completo** de los tres archivos (`index.html`, `styles.css`, `scripts.js`) que cumpla con todo lo anterior.  
   - Incluye **comentarios** en el JS que describan el flujo principal.  
   - Debe funcionar únicamente abriendo `index.html` sin necesitar Node, npm, etc.

**Resumen**:  
Deseo un **juego de preguntas** (Quiz) con estilo **oscuro** y **minimalista**, donde la **pregunta** aparezca **centrada** y las **opciones** sean **tarjetas** en fila. El **usuario** recibe **toasts** (no modales) como retroalimentación inmediata al responder, **sin** bloquear el juego. Se restringe a **una partida** por **matrícula**, se guarda el **puntaje** y el **tiempo** en un **Tablero de Campeones** en `localStorage`, ordenado por **puntaje** y **tiempo** (desc), con emojis para el top 3. Genera el **código completo** en tres archivos.

