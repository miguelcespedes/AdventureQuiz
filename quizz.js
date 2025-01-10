// quizz.js
// Array de 20 preguntas sobre API Ops, API Gateway, microservicios, etc.
// Cada pregunta tiene 'pregunta', 'opciones', 'correcta' (índice de la opción correcta)

const questions = [
  {
    pregunta: "¿Cuál es la principal diferencia entre la metodología API Ops y un pipeline DevOps tradicional para microservicios?",
    opciones: [
      "API Ops automatiza la infraestructura de desarrollo, pero carece de monitoreo",
      "DevOps es solo para CI/CD de aplicaciones monolíticas, mientras que API Ops se aplica a contenedores",
      "API Ops extiende los principios de DevOps para incluir gobierno, versionado, seguridad y monitoreo de APIs de forma end-to-end",
      "No hay diferencia real; API Ops y DevOps son nombres intercambiables"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué característica define mejor un API Gateway en un entorno de microservicios?",
    opciones: [
      "Permite exponer directamente la base de datos al cliente final",
      "Actúa como único punto de entrada, gestionando enrutamiento, autenticación, rate-limiting y agregación de respuestas",
      "Reemplaza la necesidad de un balanceador de carga y servicios de seguridad",
      "Simplifica la necesidad de versionado en las APIs, pues centraliza todo"
    ],
    correcta: 1
  },
  {
    pregunta: "En un escenario de API Ops, ¿qué práctica ayuda a validar automáticamente cambios en un contrato de API (OpenAPI/Swagger)?",
    opciones: [
      "Realizar pruebas manuales en cada entorno local",
      "Usar un sistema de almacenamiento en caché para versiones antiguas de Swagger",
      "Incluir pruebas contractuales (contract testing) y validación continua del contrato en la pipeline",
      "Publicar la documentación en un Wiki y confiar en la verificación manual"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es el beneficio de configurar 'circuit breakers' y 'reintentos' en microservicios cuando se exponen a través de un API Gateway?",
    opciones: [
      "Permite que los clientes se conecten a la base de datos en caso de falla de red",
      "Evita que un servicio sobrecargado genere cascadas de errores y brinda resiliencia ante fallos temporales",
      "Hace que cada microservicio trabaje en modo monolítico, mejorando la latencia",
      "Reemplaza la autenticación OAuth por tokens JWT"
    ],
    correcta: 1
  },
  {
    pregunta: "Para manejar la evolución de una API sin interrumpir clientes actuales, ¿cuál de las siguientes estrategias se considera óptima?",
    opciones: [
      "Realizar 'hotfixes' en producción sin avisar a nadie",
      "Sobrescribir la API existente y romper la compatibilidad",
      "Implementar versionado (v1, v2) y prácticas de deprecación gradual con avisos claros",
      "Obligar a los clientes a actualizar su código en 24 horas"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es el propósito principal de implementar 'Rate Limiting' en un API Gateway?",
    opciones: [
      "Garantizar que los servicios backend estén siempre offline",
      "Permitir que cualquier cliente realice llamadas ilimitadas sin autenticación",
      "Controlar el volumen de peticiones por unidad de tiempo para evitar sobrecargas y abuso",
      "Deshabilitar por completo la comunicación HTTPS"
    ],
    correcta: 2
  },
  {
    pregunta: "Dentro de una estrategia de API Ops, ¿qué rol juega la Observabilidad (metrics, logs, tracing) en la publicación de APIs?",
    opciones: [
      "Carece de importancia; es suficiente con un log de texto plano",
      "Permite detectar cuellos de botella, monitorear SLAs y trazar peticiones a través de múltiples microservicios",
      "Se usa solo para medir la velocidad de la red local",
      "Sustituye la necesidad de tener un API Gateway"
    ],
    correcta: 1
  },
  {
    pregunta: "En microservicios expuestos vía un API Gateway, ¿qué ventaja ofrece el 'Blue-Green Deployment' en la entrega de nuevas versiones?",
    opciones: [
      "Hace que todos los clientes usen una sola versión al mismo tiempo sin fallback",
      "Permite tener dos entornos de producción (blue y green) y cambiar el tráfico sin downtime significativo",
      "Anula el versionado de API, ya que se publica todo en un único endpoint",
      "No tiene ninguna ventaja sobre un despliegue manual con scripts"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cómo impacta la definición de un 'service mesh' (ej. Istio) en el patrón de API Gateway?",
    opciones: [
      "Elimina por completo la necesidad de un API Gateway",
      "Agrega funcionalidades como encriptación, enrutamiento avanzado y telemetría a nivel de malla, complementando la capa de gateway",
      "Hace que los microservicios se fusionen en un monolito",
      "Inhabilita la posibilidad de escalado horizontal"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cuál es la mejor manera de proteger endpoints API de configuración interna (por ejemplo, /admin) en un API Gateway?",
    opciones: [
      "Exponerlos públicamente sin autenticación",
      "Colocar un WAF (Web Application Firewall) y exigir tokens de acceso o roles específicos",
      "Permitir únicamente llamadas en texto plano HTTP sin SSL",
      "Dejar que los microservicios apliquen la lógica de seguridad y no usar gateway"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué enfoque se recomienda para gestionar los secretos (API keys, tokens) en un flujo de API Ops?",
    opciones: [
      "Almacenar los secretos directamente en el código fuente",
      "Pedirle al equipo de QA que guarde todos los secretos en un documento Excel",
      "Utilizar un gestor de secretos (ej. HashiCorp Vault) e integrarlo en la pipeline con variables de entorno seguras",
      "Publicar las llaves en la documentación pública de la API"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Qué rol juega un 'Reverse Proxy' como parte de un API Gateway en microservicios?",
    opciones: [
      "Remplaza la capa BFF (Backend For Frontend) sin necesidad de autenticación",
      "Se encarga de almacenar en caché todas las peticiones fallidas",
      "Intercepta las peticiones al backend, manejando rutas, headers y añadiendo funcionalidades de seguridad",
      "Desactiva la posibilidad de hacer llamadas asíncronas"
    ],
    correcta: 2
  },
  {
    pregunta: "En un escenario de microservicios con alto tráfico, ¿qué técnica de despliegue permite probar una nueva versión de la API con un subconjunto de usuarios antes de lanzarla a todos?",
    opciones: [
      "Despliegue 'Monolítico' con rollback manual",
      "Canary Release o Canary Deployment",
      "Hacer un 404 intencional en la nueva versión hasta que esté lista",
      "Desplegar la nueva versión en el mismo contenedor sin notificar a los usuarios"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Por qué es relevante el estándar OpenAPI (Swagger) en una estrategia de API Ops?",
    opciones: [
      "Permite definir y documentar la API de forma automatizable, generando mocks, pruebas y clientes automáticamente",
      "Impide que se realicen actualizaciones automáticas de la API",
      "Es el único estándar que soporta GraphQL",
      "Solo sirve para exponer SOAP Web Services"
    ],
    correcta: 0
  },
  {
    pregunta: "¿Cuál de las siguientes opciones es un patrón típico para manejar compatibilidad al cambiar la estructura de datos en una API?",
    opciones: [
      "Forzar a todos los consumidores a actualizarse inmediatamente",
      "Implementar transformaciones de payload en el API Gateway (mapping de campos antiguos a nuevos) y usar versionado en endpoints",
      "Ignorar los cambios e implementar un control remoto en el front",
      "Eliminar los campos antiguos sin previo aviso"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué papel juega un BFF (Backend For Frontend) en conjunto con un API Gateway en microservicios?",
    opciones: [
      "Es un patrón inexistente en arquitecturas de microservicios",
      "El BFF se encarga de exponer la base de datos directamente, mientras el gateway encripta la información",
      "El BFF puede encapsular lógicas específicas para cada tipo de cliente (web, móvil), mientras el gateway se encarga de tareas transversales",
      "El BFF remplaza el gateway en tiempo de ejecución"
    ],
    correcta: 2
  },
  {
    pregunta: "¿Cuál es la finalidad de un 'Service Registry' (por ejemplo, Eureka) cuando hablamos de microservicios y API Gateway?",
    opciones: [
      "Almacenar logs históricos de cada microservicio",
      "Proveer la resolución dinámica de endpoints de servicios, para que el gateway sepa a qué instancia dirigir el tráfico",
      "Obligar a cada microservicio a compartir un mismo esquema de base de datos",
      "Inhabilitar la comunicación TLS dentro de la red interna"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Qué ventaja aporta la práctica de 'API Contract Testing' en un enfoque de API Ops?",
    opciones: [
      "Ninguna, pues solo sirve para aplicaciones monolíticas con WebForms",
      "Evitar discrepancias entre lo que el API promete (contrato) y la implementación real, detectando rupturas en la integración",
      "Permite exponer las tablas de la base de datos a todos los clientes",
      "Desactiva la necesidad de pruebas unitarias en los microservicios"
    ],
    correcta: 1
  },
  {
    pregunta: "En un escenario con un API Gateway y miles de solicitudes por segundo, ¿cómo ayuda la técnica de 'caching' en endpoints de lectura?",
    opciones: [
      "Hace que el gateway ignore las peticiones y retorne siempre el mismo resultado para todos",
      "Reduce la latencia y la carga en los microservicios si se configuran TTL y estrategias de invalidación adecuadas",
      "Inhabilita la posibilidad de escalado horizontal para el backend",
      "Deshabilita las funcionalidades de circuit breaker"
    ],
    correcta: 1
  },
  {
    pregunta: "¿Cuál de estas prácticas es fundamental para un pipeline de CI/CD en API Ops al publicar nuevas APIs o cambios?",
    opciones: [
      "Mantener todas las APIs en un documento .docx e introducirlas manualmente en producción",
      "No hacer pruebas unitarias y confiar en el gateway para manejar errores",
      "Automatizar pruebas unitarias, contract testing, despliegue continuo y documentación actualizada (OpenAPI) en cada cambio",
      "Lanzar las actualizaciones sin notificación ni versionado"
    ],
    correcta: 2
  }
];
