export const TOOLS = [
  {
    id: "claude",
    name: "Claude",
    logoId: "claude",
    status: "active",
    desc: "El asistente de IA más avanzado de Anthropic. Hablas con él en español, le pides que analice documentos, te explique temas complejos o te ayude a escribir.",
    detail:
      "Claude es el modelo de lenguaje principal de Anthropic. Entiende conversaciones largas, analiza imágenes y documentos, genera código, redacta textos y razona paso a paso. Disponible en tres niveles: Haiku (rápido), Sonnet (equilibrado) y Opus (el más potente).",
    uses: [
      "Análisis de documentos y PDFs",
      "Redacción y revisión de textos",
      "Explicación de temas complejos",
      "Generación y revisión de código",
      "Resumen de información extensa",
    ],
    url: "claude.ai",
  },
  {
    id: "claude-code",
    name: "Claude Code",
    logoId: "code",
    status: "active",
    desc: "Se instala en tu terminal y actúa como un programador autónomo. Le dices qué quieres construir y él escribe, edita y ejecuta el código por ti.",
    detail:
      "Claude Code opera directamente en tu sistema de archivos. A diferencia de un chatbot que te da código para copiar, Claude Code lee tus archivos, hace cambios reales, ejecuta comandos y soluciona errores de forma autónoma. Ideal para crear proyectos desde cero o refactorizaciones grandes.",
    uses: [
      "Crear aplicaciones web completas",
      "Refactorizar código existente",
      "Automatizar tareas del sistema",
      "Escribir tests automáticos",
      "Generar documentación técnica",
    ],
    url: "claude.ai/code",
  },
  {
    id: "claude-design",
    name: "Claude Design",
    logoId: "design",
    status: "beta",
    desc: "Una herramienta de diseño visual con IA. Genera interfaces, componentes y sistemas de diseño directamente desde una descripción en texto.",
    detail:
      "Claude Design integra el razonamiento de Claude con herramientas de diseño visual. Genera prototipos de interfaces, sistemas de diseño y variaciones de componentes. Se conecta con Figma a través de MCP.",
    uses: [
      "Prototipos de interfaces",
      "Sistemas de diseño",
      "Variaciones de componentes",
      "Exportación a Figma",
      "Diseño responsive",
    ],
    url: "anthropic.com/design",
  },
  {
    id: "claude-cowork",
    name: "Claude Cowork",
    logoId: "cowork",
    status: "new",
    desc: "Varios agentes de IA colaboran entre sí para resolver tareas complejas que un solo agente no podría manejar bien.",
    detail:
      "Claude Cowork permite crear equipos de agentes especializados que trabajan en paralelo: uno para frontend, otro para backend, otro para tests. Se coordinan automáticamente y es útil para proyectos grandes donde dividir el trabajo mejora la calidad.",
    uses: [
      "Proyectos de software a gran escala",
      "Investigación multi-disciplinar",
      "Análisis de datos complejos",
      "Pipelines de contenido",
      "Auditorías técnicas exhaustivas",
    ],
    url: "anthropic.com/cowork",
  },
];

export const SKILLS: Record<string, SkillItem[]> = {
  web: [
    { name: "Full-Stack App Builder", cat: "Creación web", desc: "Crea una aplicación web completa (frontend + backend + base de datos) a partir de una descripción en texto.", detail: "Describes qué quieres construir y Claude Code genera todos los archivos necesarios, configura las dependencias y hace que funcione. Soporta React, Next.js, FastAPI, Django y muchos más frameworks.", pop: "hot", status: "updated" },
    { name: "API Integration Engine", cat: "Creación web", desc: "Conecta tu proyecto con servicios externos como Stripe, Slack o Google Maps sin tener que leer toda la documentación.", detail: "Dado el nombre de una API, Claude Code busca cómo autenticarse, qué endpoints usar y escribe el código de integración. Maneja errores, límites de peticiones y transformaciones de datos.", pop: null, status: "new" },
    { name: "CSS Architect", cat: "Creación web", desc: "Convierte diseños en código CSS limpio: animaciones, layouts complejos, diseño adaptable a móvil y tablet.", detail: "Le pegas una imagen o describes el diseño y Claude Code genera el CSS. Trabaja con Tailwind, SCSS o CSS puro. También puede revisar CSS existente y mejorar su rendimiento.", pop: "hot", status: null },
    { name: "Database Schema Designer", cat: "Creación web", desc: "Diseña la estructura de tu base de datos y genera el código para crearla y poblarla con datos de prueba.", detail: "Describes qué información necesitas guardar y Claude Code define las tablas, relaciones e índices. Genera migraciones para Prisma, Drizzle o SQLAlchemy.", pop: null, status: "updated" },
  ],
  auto: [
    { name: "Shell Automation Suite", cat: "Automatizaciones", desc: "Escribe scripts que automatizan tareas repetitivas en tu ordenador o servidor: backups, limpieza de archivos, despliegues.", detail: "Le describes la tarea manual y Claude Code escribe el script bash o Python, lo hace ejecutable y puede configurar el cron job automáticamente.", pop: "hot", status: "updated" },
    { name: "Data Pipeline Builder", cat: "Automatizaciones", desc: "Mueve y transforma datos entre sistemas: de un CSV a una base de datos, de una API a un spreadsheet.", detail: "Diseña y escribe pipelines ETL (Extraer, Transformar, Cargar). Si tienes datos en un sitio y los necesitas en otro con un formato diferente, Claude Code escribe el proceso completo.", pop: null, status: null },
    { name: "Browser Automation", cat: "Automatizaciones", desc: "Hace tareas en el navegador de forma automática: rellenar formularios, hacer scraping, probar que una web funciona.", detail: "Usando Playwright o Puppeteer, Claude Code navega por sitios web, extrae información, rellena formularios o simula flujos de usuario para pruebas automáticas.", pop: null, status: "new" },
    { name: "File System Orchestrator", cat: "Automatizaciones", desc: "Organiza, renombra y procesa miles de archivos siguiendo reglas que tú defines en lenguaje natural.", detail: "Le dices 'organiza mis fotos por fecha y renómbralas según el formato YYYY-MM-DD' y lo hace en segundos. Puede procesar imágenes, documentos o código fuente con lógica personalizada.", pop: null, status: null },
  ],
  data: [
    { name: "Data Analyst Pro", cat: "Data / Análisis", desc: "Analiza un archivo CSV o base de datos y te genera un informe con gráficas, estadísticas y conclusiones.", detail: "Le das un archivo de datos y una pregunta y Claude Code escribe el código Python o R para analizarlo, genera visualizaciones y resume los hallazgos en lenguaje natural.", pop: "hot", status: null },
    { name: "SQL Query Master", cat: "Data / Análisis", desc: "Escribe consultas SQL complejas y optimiza las que ya tienes para que vayan más rápido.", detail: "Le describes qué información quieres obtener de tu base de datos y Claude Code escribe la consulta SQL, por compleja que sea. También puede analizar consultas lentas y proponer optimizaciones.", pop: null, status: "updated" },
    { name: "ML Pipeline Architect", cat: "Data / Análisis", desc: "Construye modelos de machine learning desde preparar los datos hasta entrenar el modelo y medir su rendimiento.", detail: "Si tienes datos y una pregunta (predecir churn, clasificar imágenes), Claude Code escribe el pipeline completo: limpieza de datos, entrenamiento, evaluación y exportación del modelo.", pop: null, status: "new" },
    { name: "Log Inspector", cat: "Data / Análisis", desc: "Lee archivos de logs y encuentra errores, patrones extraños o la causa de un problema en tu aplicación.", detail: "Le das los logs de tu aplicación o servidor y Claude Code los analiza para identificar qué ocurrió, cuándo y por qué. Puede parsear cualquier formato de log.", pop: null, status: null },
  ],
  prod: [
    { name: "Doc Generator", cat: "Productividad", desc: "Lee tu código y genera automáticamente el README, la documentación de la API y los comentarios del código.", detail: "Analiza tu proyecto y escribe documentación en el formato que elijas: README, JSDoc, especificaciones OpenAPI para APIs, o wikis internas para equipos.", pop: null, status: "updated" },
    { name: "Code Review Bot", cat: "Productividad", desc: "Revisa tu código como lo haría un programador senior: busca bugs, problemas de seguridad y malas prácticas.", detail: "Analiza los cambios y detecta vulnerabilidades de seguridad, código duplicado, funciones demasiado complejas y posibles fallos. Genera comentarios accionables y concretos.", pop: "hot", status: null },
    { name: "Test Suite Writer", cat: "Productividad", desc: "Lee tu código y escribe automáticamente los tests que comprueban que todo funciona correctamente.", detail: "Analiza funciones, clases y componentes y genera tests unitarios, de integración y end-to-end. Soporta Jest, Vitest, Pytest, Go testing y más.", pop: null, status: "new" },
    { name: "PR Description Wizard", cat: "Productividad", desc: "Cuando terminas un cambio en el código, genera automáticamente una descripción detallada del pull request.", detail: "Lee los cambios del commit y escribe la descripción del pull request: qué se cambió, por qué, cómo probarlo y qué impacto tiene.", pop: null, status: null },
  ],
};

export const MCP_SERVERS: Record<string, McpItem[]> = {
  web: [
    { name: "Puppeteer MCP", cat: "Creación web", desc: "Controla un navegador Chrome desde Claude Code: navega, haz clic, rellena formularios y extrae contenido de cualquier web.", detail: "Permite a Claude Code abrir páginas web, interactuar con elementos, hacer capturas de pantalla y extraer datos estructurados. Ideal para automatizar flujos en webs que no tienen API.", pop: "hot", status: "updated" },
    { name: "Figma MCP", cat: "Creación web", desc: "Conecta Claude Code con tus diseños de Figma. Lee componentes, estilos y layouts para generar código fiel al diseño.", detail: "Claude Code puede leer tu archivo de Figma, extraer tokens de diseño, nombres de componentes y propiedades, y generar código CSS o React que refleja el diseño con precisión.", pop: null, status: "new" },
    { name: "Vercel MCP", cat: "Creación web", desc: "Despliega proyectos en Vercel directamente desde Claude Code, sin salir de la terminal.", detail: "Permite crear proyectos, configurar variables de entorno, lanzar despliegues y consultar logs de producción. Claude Code puede gestionar todo el ciclo de vida del despliegue de forma autónoma.", pop: null, status: "new" },
    { name: "Supabase MCP", cat: "Creación web", desc: "Conecta Claude Code con tu base de datos Supabase: lee tablas, ejecuta queries y gestiona el esquema.", detail: "Permite a Claude Code acceder al esquema de tu base de datos en tiempo real, ejecutar queries SQL, crear tablas y gestionar las políticas de acceso de Supabase.", pop: "hot", status: "updated" },
  ],
  auto: [
    { name: "GitHub MCP", cat: "Automatizaciones", desc: "Claude Code puede leer y escribir en tus repositorios de GitHub: crear issues, pull requests, leer código y más.", detail: "Accede al contenido de repos, crea y cierra issues, abre pull requests, revisa el historial de commits y gestiona ramas. Todo desde una conversación con Claude Code.", pop: "hot", status: "updated" },
    { name: "Slack MCP", cat: "Automatizaciones", desc: "Claude Code puede leer y enviar mensajes en Slack, buscar en canales y crear notificaciones automáticas.", detail: "Útil para notificar el resultado de tareas largas, buscar conversaciones pasadas o enviar resúmenes a canales de equipo cuando Claude Code termina un trabajo.", pop: null, status: "vigente" },
    { name: "Linear MCP", cat: "Automatizaciones", desc: "Gestiona el backlog de Linear desde Claude Code: crea issues desde bugs encontrados, actualiza estados y asigna tareas.", detail: "Claude Code puede leer el estado del proyecto, crear tickets desde errores detectados en el código, actualizar el progreso de tareas y priorizar el backlog automáticamente.", pop: null, status: "vigente" },
    { name: "Google Drive MCP", cat: "Automatizaciones", desc: "Claude Code puede leer y escribir documentos, hojas de cálculo y presentaciones en Google Drive.", detail: "Accede a archivos de Drive, lee el contenido de Docs y Sheets, genera nuevos documentos y actualiza hojas de cálculo con resultados de análisis o datos procesados.", pop: null, status: "new" },
  ],
  data: [
    { name: "PostgreSQL MCP", cat: "Data / Análisis", desc: "Conecta Claude Code directamente a tu base de datos PostgreSQL para ejecutar queries y explorar el esquema.", detail: "Claude Code puede listar tablas, leer esquemas, ejecutar consultas SELECT y proponer optimizaciones. Acceso de solo lectura por defecto para mayor seguridad.", pop: "hot", status: "updated" },
    { name: "SQLite MCP", cat: "Data / Análisis", desc: "Abre y consulta archivos de base de datos SQLite locales desde Claude Code, sin ninguna configuración.", detail: "Ideal para analizar bases de datos locales de aplicaciones, leer datos de apps móviles o hacer queries sobre archivos .db sin montar ningún servidor.", pop: null, status: "vigente" },
    { name: "Brave Search MCP", cat: "Data / Análisis", desc: "Claude Code puede buscar en la web en tiempo real para complementar su conocimiento con información actualizada.", detail: "Permite a Claude Code hacer búsquedas web durante una tarea, encontrar documentación reciente, verificar precios de APIs o buscar soluciones a errores específicos.", pop: null, status: "new" },
    { name: "Filesystem MCP", cat: "Data / Análisis", desc: "Acceso controlado al sistema de archivos local. Claude Code puede leer y escribir en las carpetas que tú autorices.", detail: "Define qué carpetas puede tocar Claude Code. Útil para limitar el acceso en entornos de producción o cuando quieres que el agente solo trabaje en un directorio concreto.", pop: null, status: "vigente" },
  ],
  prod: [
    { name: "Notion MCP", cat: "Productividad", desc: "Claude Code puede leer y escribir páginas en Notion: crear documentación, actualizar wikis y gestionar bases de datos.", detail: "Conecta Claude Code con tu workspace de Notion para generar documentación automáticamente, actualizar páginas con resultados de análisis o crear entradas en bases de datos desde el terminal.", pop: null, status: "new" },
    { name: "Memory MCP", cat: "Productividad", desc: "Añade memoria persistente a Claude Code: recuerda preferencias, contexto del proyecto y decisiones tomadas entre sesiones.", detail: "Claude Code por defecto no recuerda conversaciones anteriores. Memory MCP guarda información importante en un grafo de conocimiento que se consulta automáticamente en nuevas sesiones.", pop: "hot", status: "updated" },
    { name: "Sentry MCP", cat: "Productividad", desc: "Claude Code puede leer errores de Sentry y relacionarlos directamente con el código fuente para resolverlos.", detail: "Cuando hay un error en producción, Claude Code puede leer el stack trace de Sentry, encontrar el archivo y línea responsable en tu repositorio, y proponer o aplicar la corrección.", pop: null, status: "new" },
    { name: "Obsidian MCP", cat: "Productividad", desc: "Conecta Claude Code con tu vault de Obsidian para leer notas, crear documentos y enlazar conceptos.", detail: "Claude Code puede buscar en tus notas, crear nuevas páginas con documentación generada automáticamente y añadir backlinks entre conceptos relacionados en tu base de conocimiento.", pop: null, status: "vigente" },
  ],
};

export const CLIS: Record<string, CliItem[]> = {
  web: [
    { name: "Wrangler CLI", cat: "Creación web", desc: "Herramienta oficial de Cloudflare para desplegar workers, páginas y funciones edge desde la terminal.", detail: "Wrangler permite desarrollar y desplegar aplicaciones en la red edge de Cloudflare. Claude Code lo usa para gestionar workers serverless, configurar rutas y desplegar sitios estáticos con un solo comando.", pop: null, status: "vigente" },
    { name: "Vercel CLI", cat: "Creación web", desc: "Despliega proyectos en Vercel desde la terminal con un solo comando. Ideal para flujos CI/CD automáticos.", detail: "Permite desplegar, previsualizar y gestionar proyectos de Vercel sin salir de la terminal. Claude Code puede usarlo para automatizar el ciclo de despliegue completo.", pop: "hot", status: "vigente" },
    { name: "Netlify CLI", cat: "Creación web", desc: "Gestiona sitios y funciones de Netlify desde la terminal: despliegues, variables de entorno y logs.", detail: "Claude Code puede usar Netlify CLI para desplegar sitios estáticos y funciones serverless, gestionar variables de entorno por entorno y consultar logs de despliegue.", pop: null, status: "vigente" },
    { name: "Expo CLI", cat: "Creación web", desc: "Herramienta para desarrollar y publicar apps React Native en iOS y Android desde la terminal.", detail: "Expo CLI simplifica el desarrollo móvil: permite arrancar el servidor de desarrollo, hacer builds para las stores y publicar actualizaciones OTA sin pasar por revisión.", pop: null, status: "updated" },
  ],
  auto: [
    { name: "GitHub CLI (gh)", cat: "Automatizaciones", desc: "La CLI oficial de GitHub. Gestiona repos, issues, pull requests y workflows de GitHub Actions desde la terminal.", detail: "Claude Code usa gh para crear pull requests con descripción automática, fusionar ramas aprobadas, gestionar issues y triggerear workflows de CI. Mucho más rápido que la interfaz web.", pop: "hot", status: "vigente" },
    { name: "jq", cat: "Automatizaciones", desc: "Herramienta para procesar y transformar archivos JSON desde la terminal. Imprescindible para trabajar con APIs.", detail: "Claude Code usa jq para filtrar, transformar y extraer datos de respuestas JSON de APIs, logs estructurados o archivos de configuración. Alternativa ligera a escribir scripts Python para transformaciones simples.", pop: null, status: "vigente" },
    { name: "Ansible CLI", cat: "Automatizaciones", desc: "Automatiza la configuración de servidores y el despliegue de infraestructura con playbooks declarativos.", detail: "Claude Code puede escribir y ejecutar playbooks de Ansible para configurar servidores, instalar dependencias, gestionar usuarios y desplegar aplicaciones en múltiples máquinas a la vez.", pop: null, status: "vigente" },
    { name: "Terraform CLI", cat: "Automatizaciones", desc: "Gestiona infraestructura cloud (AWS, GCP, Azure) como código desde la terminal.", detail: "Claude Code puede escribir configuraciones de Terraform, planificar cambios de infraestructura y aplicarlos de forma controlada. Ideal para provisionar entornos de desarrollo o staging automáticamente.", pop: null, status: "updated" },
  ],
  data: [
    { name: "DuckDB CLI", cat: "Data / Análisis", desc: "Analiza archivos CSV, Parquet y JSON con SQL directamente en la terminal, sin montar ningún servidor.", detail: "Claude Code usa la CLI de DuckDB para hacer análisis rápidos sobre archivos de datos locales. Soporta SQL estándar y puede leer múltiples formatos de archivo en la misma query.", pop: "hot", status: "vigente" },
    { name: "psql", cat: "Data / Análisis", desc: "El cliente de línea de comandos oficial de PostgreSQL. Ejecuta queries, gestiona bases de datos y exporta datos.", detail: "Claude Code usa psql para conectarse a bases de datos PostgreSQL, ejecutar scripts SQL, exportar tablas a CSV y gestionar permisos de usuarios. Presente en casi todos los entornos de servidor.", pop: null, status: "vigente" },
    { name: "csvkit", cat: "Data / Análisis", desc: "Suite de herramientas para manipular archivos CSV desde la terminal: filtrar, unir, convertir y analizar.", detail: "Incluye comandos como csvstat (estadísticas), csvcut (seleccionar columnas), csvjoin (unir archivos) y csv2sql (importar a base de datos). Claude Code lo usa para limpiar y preparar datos rápidamente.", pop: null, status: "vigente" },
    { name: "Datasette CLI", cat: "Data / Análisis", desc: "Convierte cualquier base de datos SQLite en una API y una interfaz web explorable con un solo comando.", detail: "Claude Code puede usar Datasette para publicar datasets de forma rápida, explorar datos de forma visual o crear una API REST temporal desde un archivo SQLite sin escribir ningún backend.", pop: null, status: "new" },
  ],
  prod: [
    { name: "Ollama", cat: "Productividad", desc: "Ejecuta modelos de lenguaje en local (Llama, Mistral, Gemma) desde la terminal, sin conexión a internet.", detail: "Claude Code puede complementarse con Ollama para tareas que no requieren enviar datos a la nube. Útil para entornos con restricciones de privacidad o para reducir costes en tareas repetitivas simples.", pop: "hot", status: "updated" },
    { name: "ripgrep (rg)", cat: "Productividad", desc: "Búsqueda de texto ultrarrápida en archivos de código. Mucho más rápida que grep para proyectos grandes.", detail: "Claude Code usa ripgrep para encontrar usos de funciones, buscar patrones de código, localizar todos los archivos que importan un módulo o detectar código duplicado en proyectos grandes.", pop: null, status: "vigente" },
    { name: "fzf", cat: "Productividad", desc: "Buscador interactivo fuzzy para la terminal. Filtra listas de archivos, historial de comandos y cualquier texto.", detail: "Claude Code puede usar fzf para navegar por listas de resultados, seleccionar archivos de forma interactiva o filtrar el historial de comandos. Mejora enormemente la velocidad en el terminal.", pop: null, status: "vigente" },
    { name: "tmux", cat: "Productividad", desc: "Multiplexor de terminal: divide la pantalla en paneles, mantiene sesiones activas aunque cierres la conexión SSH.", detail: "Claude Code puede usar tmux para ejecutar tareas largas en segundo plano sin que se interrumpan al cerrar la terminal, y para organizar múltiples procesos en paralelo en una sola ventana.", pop: null, status: "vigente" },
  ],
};

export const COMMUNITY = [
  { name: "awesome-claude-code", type: "Repositorio", desc: "Una lista organizada de los mejores prompts, configuraciones y trucos para sacar el máximo partido a Claude Code.", detail: "Incluye: prompts de sistema testados, configuraciones de CLAUDE.md para distintos tipos de proyectos, hooks útiles y workflows recomendados. Es el punto de partida para cualquier usuario que quiera dominar Claude Code.", contrib: "2.4k ⭐", lang: "Markdown", color: "#a78bfa" },
  { name: "claude-code-hooks", type: "Repositorio", desc: "Librería de hooks para controlar y extender el comportamiento de Claude Code: registros, validaciones y límites de coste.", detail: "Los hooks permiten interceptar acciones antes o después de que ocurran. Esta librería incluye: hooks para registrar todos los comandos ejecutados, bloquear acciones peligrosas, controlar el gasto en tokens y enviar notificaciones cuando termina una tarea.", contrib: "891 ⭐", lang: "TypeScript", color: "#60a5fa" },
  { name: "MCP Server Registry", type: "Directorio", desc: "El directorio oficial de herramientas y servicios que se pueden conectar a Claude Code mediante el protocolo MCP.", detail: "MCP (Model Context Protocol) es el estándar de Anthropic para conectar agentes con herramientas externas. Este registro incluye servidores para bases de datos, APIs de terceros, sistemas de archivos, navegadores y más.", contrib: "Oficial", lang: "JSON", color: "#34d399" },
  { name: "r/ClaudeCode", type: "Comunidad", desc: "El subreddit más activo sobre Claude Code. Se comparten trucos, workflows y se discuten las últimas novedades cada día.", detail: "Con 48k miembros, es el foro de referencia en español e inglés. Cada día se publican casos de uso reales, comparativas con otras herramientas y feedback directo al equipo de Anthropic.", contrib: "48k miembros", lang: "ES/EN", color: "#f87171" },
  { name: "Claude Code Discord", type: "Discord", desc: "El servidor oficial de Discord donde el equipo de Anthropic anuncia novedades y responde preguntas directamente.", detail: "Organizado en canales por temática: anuncios, bugs, skills, automatizaciones, MCP y feedback al equipo. Es el canal más rápido para enterarse de cambios antes de que se publiquen en la documentación.", contrib: "32k miembros", lang: "EN", color: "#818cf8" },
  { name: "claude-patterns.dev", type: "Guías", desc: "Guías y patrones de arquitectura escritos por la comunidad para construir proyectos serios con Claude Code.", detail: "Documenta patrones como: cómo estructurar un CLAUDE.md efectivo, cómo dividir proyectos grandes en subagentes, cómo controlar costes en proyectos largos, y cómo integrar Claude Code en CI/CD.", contrib: "Beta", lang: "ES/EN", color: "#fbbf24" },
];

export const STATIC_NEWS = [
  { title: "Claude 4 Opus marca nuevo récord en SWE-bench con 72.5%", source: "Anthropic Blog", time: "hace 18 min", cat: "claude" as const, excerpt: "El nuevo modelo supera a todos los competidores en la prueba de referencia para ingeniería de software autónoma, destacando en refactorización y resolución de bugs complejos." },
  { title: "Claude Code 1.3: sub-agentes en paralelo y MCP v2", source: "GitHub Releases", time: "hace 2h", cat: "code" as const, excerpt: "La nueva versión permite que varios agentes trabajen al mismo tiempo en distintas partes de un proyecto. Reducción del 40% en el consumo de tokens en conversaciones largas." },
  { title: "Claude Design entra en beta privada", source: "Anthropic Status", time: "hace 4h", cat: "design" as const, excerpt: "Acceso limitado para estudios de diseño seleccionados. Soporta conexión con Figma vía MCP y generación de sistemas de diseño completos desde una descripción en texto." },
  { title: "El ecosistema MCP supera los 500 servidores publicados", source: "modelcontextprotocol.io", time: "hace 6h", cat: "anthropic" as const, excerpt: "El protocolo de Anthropic para conectar agentes con herramientas externas sigue creciendo, con nuevos servidores para bases de datos, APIs de productividad y herramientas DevOps." },
  { title: "Análisis independiente: Claude Code completa el 89% de tareas sin ayuda humana", source: "Hacker News", time: "hace 9h", cat: "code" as const, excerpt: "Estudio sobre 500 repositorios de código abierto. Claude Code destaca en tareas de refactorización a gran escala y generación de tests automáticos." },
  { title: "Anthropic abre API para Claude Design", source: "Anthropic Docs", time: "hace 12h", cat: "design" as const, excerpt: "Nuevos endpoints REST para generar assets, variantes de interfaces y exportar diseños en múltiples formatos desde cualquier aplicación." },
];

export const CATS = [
  { id: "web", label: "Creación web" },
  { id: "auto", label: "Automatizaciones" },
  { id: "data", label: "Data / Análisis" },
  { id: "prod", label: "Productividad" },
];

export const NEWS_CATS = [
  { id: "all", label: "Todo" },
  { id: "claude", label: "Claude" },
  { id: "code", label: "Claude Code" },
  { id: "design", label: "Claude Design" },
  { id: "anthropic", label: "Anthropic" },
];

export const CAT_LABELS: Record<string, string> = { claude: "Claude", code: "Claude Code", design: "Claude Design", anthropic: "Anthropic", cowork: "Claude Cowork" };
export const CAT_CLASSES: Record<string, string> = { claude: "c-claude", code: "c-code", design: "c-design", anthropic: "c-anthropic", cowork: "c-cowork" };

// Types
export interface SkillItem {
  name: string;
  cat: string;
  desc: string;
  detail: string;
  pop: string | null;
  status: string | null;
}

export interface McpItem {
  name: string;
  cat: string;
  desc: string;
  detail: string;
  pop: string | null;
  status: string | null;
}

export interface CliItem {
  name: string;
  cat: string;
  desc: string;
  detail: string;
  pop: string | null;
  status: string | null;
}

export interface ModalItem {
  name?: string;
  title?: string;
  type?: string;
  cat?: string;
  logoId?: string;
  desc: string;
  detail?: string;
  status?: string | null;
  pop?: string | null;
  uses?: string[];
  contrib?: string;
  lang?: string;
  url?: string;
  color?: string;
  excerpt?: string;
  source?: string;
}
