Quiero que crees un juego de preguntas tipo “Quiz” con las siguientes características y requerimientos:

1. **Tecnologías y Estilo**  
   - Uso de **HTML + CSS + JavaScript** puros (sin frameworks complicados).  
   - Se debe mantener el **estilo Material Design 3** (MD3) de manera sencilla y minimalista, apoyándose en la **CDN** de [Material Components Web](https://github.com/material-components/material-components-web).  
   - Diseño responsivo (adaptable a pantallas pequeñas).  
   - Un **fondo degradado** o un estilo agradable que no se vea “aburrido”.  
   - Fuentes limpias (Roboto u otra tipografía que sea clara).  

2. **Estructura de archivos**  
   - `index.html` con la estructura base y referencias a `styles.css` y `scripts.js`.  
   - `styles.css` para los estilos globales y personalizados.  
   - `scripts.js` para la lógica de front-end.  

3. **Flujo de Juego**  
   - Al cargar la página, se presentan dos botones principales:  
     1. “Nuevo Juego”.  
     2. “Ocultar/Mostrar Tablero” (para ocultar o mostrar la tabla de campeones).  
   - Al dar clic en “Nuevo Juego”, aparece un **modal** que pide:
     - **Nombre** del jugador.  
     - **Matrícula**.  
   - Si la matrícula ya existe en el tablero de campeones, debe mostrarse un mensaje empático diciendo que “ya jugaste” y no permitir un segundo juego con la misma matrícula.  
   - Si es una nueva matrícula, se inicia el juego con:  
     - **Nivel 1**  
     - **Puntaje 0**  
     - Un **temporizador** interno para calcular cuánto tarda en responder cada pregunta.  

4. **Preguntas y Respuestas**  
   - Cada nivel tiene una sola pregunta con varias opciones (una correcta y las demás incorrectas).  
   - Las opciones se deben mostrar en un contenedor estilo “chips” o botones MD3, **mezcladas aleatoriamente** para que no siempre esté la respuesta correcta en la misma posición.  
   - Cuando el jugador elige la respuesta:  
     - Si es **correcta**:  
       - Se calcula el puntaje con alguna fórmula (por ejemplo, `puntaje += 10 * Math.max(1, 60 - elapsedTime)`).  
       - Se avanza al siguiente nivel.  
       - Muestra un **modal** tipo “¡Correcto! Avanzas al Nivel {n}.”  
     - Si es **incorrecta**:  
       - Muestra un **modal** “¡Buen intento! Has fallado.”  
       - Se guarda el puntaje actual en el **Tablero de Campeones**.  
       - Se reinicia el juego (es decir, vuelve a nivel 0).  

5. **Tablero de Campeones**  
   - Debe ser una tabla con las columnas:  
     - **Jugador** (Nombre)  
     - **Nivel** (último nivel alcanzado o “Completado”)  
     - **Tiempo (s)** (total del juego o hasta que falló)  
     - **Puntaje** (entero o con decimales).  
   - **Orden** de la tabla: primero por **puntaje** DESC, luego por **tiempo** DESC (en caso de empate en puntaje).  
   - Se usa `localStorage` para persistir la información incluso si se recarga la página.  
   - La tabla debe **ocupar todo el ancho** disponible.  

6. **Restricción de Matrícula**  
   - Solo se puede jugar una vez por matrícula.  
   - Si se ingresa una matrícula que ya existe en la tabla, se muestra un **modal empático**: “Veo que ya has jugado con esa matrícula. Gracias por tu entusiasmo, pero solo puedes jugar una vez.” y se impide continuar.  

7. **Responsividad y Apariencia**  
   - Debe verse bien en pantallas pequeñas (mobile).  
   - Incluir un fondo degradado, tarjetas con color sutil, y un hover agradable en los botones o chips de respuesta.  
   - Los textos deben ser legibles y **no** montarse unos con otros.  
   - El **Tablero de Campeones** debe poder “Ocultarse/Mostrarse” con el botón de toggle.  
   - Ajustar columnas para que el ancho de la tabla sea coherente y ocupe el 100%.  

8. **Entrega del Código**  
   - Quiero que me entregues **los tres archivos completos**: `index.html`, `styles.css` y `scripts.js`.  
   - Todo debe funcionar con solo abrir `index.html` en un navegador moderno (Chrome, Firefox, Edge) sin necesidad de servidor adicional.  
   - Incluye comentarios en el JS explicando las secciones principales del código.  

9. **Extras**  
   - Muestra **emojis** de trofeo o medalla en el **Tablero de Campeones** para el top 3 (pero a la derecha del puntaje, por ejemplo “1200 🏆”).  
   - Muestra modales con MD3 (puedes usar los componentes Dialog de Material).  
   - Crea al menos 3 preguntas de ejemplo.  

**Resumen**:  
Necesito un proyecto de **juego de preguntas** (Quiz) con Material Design 3 minimal, con un “Tablero de Campeones” persistente, ordenado por puntaje y tiempo de forma descendente, restringiendo a una sola partida por matrícula, con dos botones de acción (Nuevo Juego y Ocultar/Mostrar Tablero), y un flujo de niveles con modales de retroalimentación.

Genera el **código completo** para `index.html`, `styles.css` y `scripts.js` que cumpla con todo lo anterior.
