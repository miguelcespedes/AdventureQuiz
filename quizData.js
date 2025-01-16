const quizData = [
  {
    id: "categoria01",
    titulo: "Review Request",
    preguntas: [
      {
        id: 1,
        pregunta: "¿En qué consiste la iniciativa?",
        opciones: [
          { id: "A", texto: "Es una automatización en JIRA que facilita la asignación de Revisiones de APIs" },
          { id: "B", texto: "Es una Inventario de Ordenes de Atención" },
          { id: "C", texto: "Es un sistema para inventarias APIs" }
        ],
        correcta: "A"
      },
      {
        id: 2,
        pregunta: "¿Cual es el principal beneficio?",
        opciones: [
          { id: "A", texto: "Ahorro en numero de horas del personal de APIs" },
          { id: "B", texto: "Mejora del tiempo de Ejecución del Pipeline" },
          { id: "C", texto: "Ahorro de dinero en costo de licencias" }
        ],
        correcta: "B"
      }
    ]
  },
  {
    id: "categoria02",
    titulo: "Governance Framework Design",
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cual es el principal beneficio?",
        opciones: [
          { id: "A", texto: "Eliminación del costo de licencias" },
          { id: "B", texto: "Eliminación de SwaggerHub" },
          { id: "C", texto: "Creación de trabajo manual" }
        ],
        correcta: "A"
      },
      {
        id: 2,
        pregunta: "La herramienta permite integrar con:",
        opciones: [
          { id: "A", texto: "Azure APIM" },
          { id: "B", texto: "Github y Sprectral" },
          { id: "C", texto: "Jenkins y Portal de APIs" }
        ],
        correcta: "B"
      }
    ]
  },
  {
    id: "categoria03",
    titulo: "Zero Trust API Validation",
    preguntas: [
      {
        id: 1,
        pregunta: "¿Cual es el principal beneficio?",
        opciones: [
          { id: "A", texto: "Ahorra tiempo en el login" },
          { id: "B", texto: "Mejora la experiencia de usuario" },
          { id: "C", texto: "Incorpora un mecanismo que garantiza que los clientes solo puede acceder a sus propios datos" }
        ],
        correcta: "C"
      },
      {
        id: 2,
        pregunta: "¿Qué es Zero Trust?",
        opciones: [
          { id: "A", texto: "Un efoque de seguridad" },
          { id: "B", texto: "Una arquitectura de software" },
          { id: "C", texto: "Un lineamiento del BCP" }
        ],
        correcta: "A"
      }
    ]
  }
  // Agrega más categorías aquí
];
