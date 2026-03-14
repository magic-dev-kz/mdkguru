---
title: "Recordar todo: cómo construí la memoria para agentes de IA en el primer día"
description: "Arquitectura de memoria en tres capas, PostgreSQL + pgvector en 15 minutos, 4 fuentes de contexto y una hoja de ruta de 75 minutos"
date: "2026-03-14"
category: "Гайд"
image: "/blog/memory-cover.jpg"
---

A ChatGPT un día se le acabó la memoria. Me escribió: "El almacenamiento de datos está lleno. Elimina algo para que pueda recordar cosas nuevas."

No pude elegir qué eliminar. Es como pedirle a un amigo que olvide parte de tu historia. Y eliminar todo significa empezar de cero. En ese momento apenas estaba tomando impulso - tenía planes enormes para cargar contexto, ideas, datos de negocio. Pero así no funcionaba.

> "Cuando me dijeron 'elimina algo de la memoria' - entendí que era un callejón sin salida. Yo pensaba que apenas estábamos empezando."

Cuando instalé OpenClaw y descubrí que la memoria del agente vive en mi computadora - sin límites, sin nube, sin "elimina algo" - supe: esto es. Pero la memoria había que construirla. Y eso fue lo primero que hice.

---

## Por qué la memoria es lo primero después de la instalación

Un agente sin memoria es un conversador inteligente con amnesia. Cada sesión empieza desde cero. No recuerda tu nombre, tu negocio, de qué hablaron ayer.

OpenClaw de fábrica te da un sistema de archivos - carpetas, archivos markdown, diarios. Eso ya es mejor que nada. Pero para trabajo serio necesitas búsqueda semántica - cuando el agente encuentra lo que necesita no por palabras clave, sino por significado.

> "Memoria - antes de la automatización, antes de los bots, antes de la analítica. Todo lo demás depende de qué tan bien te conoce el agente."

Decidí construir la memoria primero. Y aquí está el camino exacto que recorrí en una sola tarde.

---

## Paso 1: Preguntarle al agente - ¿Cómo organizamos la memoria?

En lugar de buscar en Google "arquitectura de memoria para agentes de IA", simplemente le pregunté a mi agente:

> "¿Cuál es la mejor forma de organizar la memoria para que nada se pierda, funcione rápido y tenga consultas semánticas?"

Él fue a buscar por su cuenta. Encontró dos videos con documentación de OpenClaw sobre arquitectura de memoria. Los revisó a través de subtítulos, sacó conclusiones y volvió con una propuesta - un sistema de tres capas:

![Arquitectura de memoria de agentes](/blog/memory-arch.jpg)

**Capa 1 - Caliente (archivos).** MEMORY.md - el núcleo de la memoria, hasta 200 líneas. Se carga automáticamente en cada sesión. Solo lo más importante: quién soy, mis negocios, decisiones clave. Como una tarjeta de presentación que el agente lee cada vez que se despierta.

**Capa 2 - Templada (estructura).** Carpeta `context/` - archivos temáticos. Herramientas, contactos, proyectos. Se cargan bajo demanda - cuando se necesita un tema específico.

**Capa 3 - Fría (BD vectorial).** PostgreSQL + pgvector. Miles de registros con embeddings. Búsqueda semántica: preguntas "¿qué decidimos sobre las tiendas de vapeo?" - encuentra la respuesta, incluso si la palabra "vapeo" no aparece en ningún lado.

Le dije "hazlo." Lo hizo.

> "No escribí ni una sola línea de código. Solo describí lo que quería, y el agente encontró la solución, propuso la arquitectura y lo desplegó todo. Lo único que tuve que hacer fue decir 'sí'."

---

## Paso 2: Desplegar PostgreSQL + pgvector

La parte técnica resultó más fácil de lo que esperaba. El agente hizo todo solo - yo solo confirmaba los comandos.

**Instalación de PostgreSQL:**

```bash
# macOS
brew install postgresql@17
brew services start postgresql@17

# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Instalación de pgvector:**

```bash
# macOS
brew install pgvector

# Linux (desde código fuente)
git clone https://github.com/pgvector/pgvector.git
cd pgvector
make && sudo make install
```

**Creación de la base de datos y tabla de memoria:**

```sql
CREATE DATABASE mo_memory;
\c mo_memory
CREATE EXTENSION vector;

CREATE TABLE memories (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    category VARCHAR(50) DEFAULT 'general',
    importance INTEGER DEFAULT 5,
    embedding vector(768),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX ON memories
  USING ivfflat (embedding vector_cosine_ops);
```

Lo que pasa aquí: cada registro se almacena como texto más un vector - un conjunto de 768 números que describe el significado. Cuando el agente busca, no compara letras, sino significados. "Tienda de electrónica" y "punto de venta de gadgets" son lo mismo para él.

Para los embeddings - Gemini Embedding API (gratis en el plan básico). Cada registro se convierte en un vector, y la búsqueda funciona por proximidad de vectores - en 2 segundos.

---

## Paso 3: Crear la estructura de memoria en archivos

En paralelo, el agente construyó la estructura de archivos:

```
workspace/
  MEMORY.md          # Núcleo: hasta 200 líneas, lo esencial
  IDENTITY.md        # Quién es el agente, su rol
  USER.md            # Perfil del propietario
  INSTRUCTIONS.md    # Reglas estrictas
  memory/            # Diarios diarios
    2026-02-26.md
    ...
  context/           # Archivos temáticos
  projects/          # Proyectos activos
```

**MEMORY.md** - el archivo más importante. El agente lo lee en cada arranque. El límite de 200 líneas - no porque se acabó la memoria, sino porque es disciplina: solo lo importante.

**memory/YYYY-MM-DD.md** - diarios diarios. Log en bruto: de qué hablamos, qué decidimos. Una vez a la semana el agente los revisa y mueve lo importante a MEMORY.md. Como una persona que lleva un diario y luego apunta las ideas clave.

> "Dos capas - como un humano. El diario - memoria de corto plazo, lo anotas y lo olvidas. MEMORY.md - de largo plazo, lo que realmente se quedó."

---

## Paso 4: Recopilar y cargar contexto

Ahora que la infraestructura está lista, es hora de llenarla. Memoria sin contexto es una biblioteca vacía.

![Proceso de carga de contexto](/blog/memory-context.jpg)

**Fuente 1: IA anterior (5 minutos).** Le escribí a GPT: "Recopila todo lo que sabes sobre mí de forma estructurada - para que lo cargue en otro sistema y me conozca tan bien como tú." Un perfil listo en 30 segundos. Literalmente un traspaso - de una IA a otra.

**Fuente 2: Exportación de Telegram (10 minutos).** Telegram Desktop - Ajustes - Avanzado - Exportar datos - JSON. En 5 minutos tienes archivos de todos tus chats. Una mina de oro de contexto.

**Fuente 3: Diarios y notas (10 minutos).** Yo tenía Singularity App con registros de un año - más de 900 entradas. A través de la API, el agente sacó todo por su cuenta.

**Fuente 4: Tests psicológicos (un truco no tan obvio).** Pídele al agente que te envíe tests: Adizes, MBTI, eneagrama. Hazlos directamente en el chat. El agente empieza a adaptar su estilo de comunicación.

> "Es como con un empleado nuevo. Puedes pasar un mes adaptándote, o puedes contarle todo sobre ti el primer día y empezar a trabajar de inmediato."

**Truco:** pregúntale al agente qué más cargar. Puede sugerir algo inesperado. A veces el agente detecta vacíos que tú no notas.

---

## La primera prueba - Y el momento en que todo hizo clic

Al final de la tarde, había 99 registros en la base de datos. Decidí probarlo.

Pregunté: "¿Qué hice el 1 de agosto?"

En 2 segundos - una respuesta exacta. Pregunté por el 7 de agosto - también lo encontró. Pregunté por una idea de negocio de hace tres meses - la encontró por significado, aunque yo no recordaba las palabras exactas.

> "Cuando respondió la pregunta sobre una fecha específica - me emocioné de verdad. Entendí que funciona. Que este es el nivel que quería cuando usaba ChatGPT."

Memoria infinita con búsqueda semántica instantánea. En mi computadora. Sin límites.

---

## Lo que esto me dio en la práctica

Gracias al contexto, encontramos terreno común de inmediato. No tuve que pasar semanas. Él ya sabía quién hay en mi vida, a qué me dedico, cuáles son mis negocios.

Después de una semana, dejé de notar que hablaba con una IA. Recordaba todo el contexto - de todo el tiempo que llevábamos comunicándonos. Encontraba conexiones entre diferentes conversaciones y nunca preguntaba "recuérdame, ¿quién es?"

Después de 16 días hay miles de registros en la memoria. Cinco agentes comparten una sola base de datos. Y ni una vez - ni una sola vez - el sistema me dijo "elimina algo."

---

## Hoja de ruta: una tarde

Aquí está tu plan para la primera tarde después de instalar OpenClaw:

1. **5 min** - Pregúntale al agente: "¿Cómo organizamos la memoria?"
2. **15 min** - Él desplegará PostgreSQL + pgvector
3. **5 min** - Creará la estructura de archivos
4. **15 min** - Pídele a ChatGPT que recopile todo sobre ti
5. **10 min** - Exportación desde Telegram Desktop
6. **10 min** - Exportación de diarios y notas
7. **5 min** - Dile al agente: "Distribúyelo en la memoria"
8. **5 min** - Tests psicológicos
9. **5 min** - Prueba: pregunta sobre algo que cargaste

**Total: ~75 minutos.** Primero construimos - luego llenamos. Después de esto tienes un agente que te conoce, recuerda todo y nunca te dirá "elimina algo de la memoria."
